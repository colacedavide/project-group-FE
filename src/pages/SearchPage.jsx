//import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
//importo useEffect
import { useEffect, useState } from "react";
//importo useSearchParams
import { useSearchParams } from "react-router-dom";
//axios
import axios from "axios";
//import useGlobal
import { useGlobal } from "../context/GlobalContext";
//import react icons
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

function SearchPage() {

    //importiamo gli elementi che ci servono dal contesto globale
    const { onlyDiscounted, addToCart, addToWishlist } = useGlobal();

    const [searchParams, setSearchParams] = useSearchParams();

    const [searched, setSearched] = useState(searchParams.get("query"));
    //var di stato per salvare prodotti cercati dal db
    const [searchedItems, setSearchedItems] = useState([]);
    //var di stato per caricameto chiamata axios
    const [isLoading, setIsLoading] = useState(true);
    //var di stato che gestisce grigliato o listato della pagina
    const [isGridActive, setIsGridActive] = useState(true)
    //var di stato per salvare le categorie che arrivano da db
    const [categories, setCategories] = useState([])
    //var di stato che gestisce al select dell'utente
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
    //var di stato che salva regioni che arrivano dal db
    const [regions, setRegions] = useState([])
    //var di stato che gestisce select untente
    const [selectedRegion, setSelectedRegion] = useState(searchParams.get("region") || "")
    // stato per ordinamento
    const [sort, setSort] = useState(searchParams.get("sort") || "");

    const updateFilters = (key, value) => {
        // copia dei parametri attuali
        const newParams = new URLSearchParams(searchParams);

        // se c'è valore → set
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }

        // logica speciale SOLO per category e region
        if (key === "category" || key === "region") {
            newParams.delete("query"); // reset ricerca
            setSearched("");
        }

        // aggiorna URL
        setSearchParams(newParams);
    };

    //importiamo getProductPricing per gestire eventuali sconti
    const { getProductPricing } = useGlobal();

    //chiamata axios per riempire array regioni al montaggio del componente con useEffect
    useEffect(() => {
        //endpoint che punta alla regioni
        const endpoint = 'http://localhost:3000/api/regions'
        //chiamata axios
        axios.get(endpoint)
            .then((res) => {
                setRegions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    //chiamata axios per popolare array delle categorie al primo montaggio componente con useEffect
    useEffect(() => {
        //endpoint che mi richiama le categorie
        const endpoint = `http://localhost:3000/api/products/categories`
        //chiamata axios
        axios.get(endpoint)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    //chiamata axios per popolare array parola cercata al primo montaggio componente con useEffect
    useEffect(() => {
        setIsLoading(true);

        let endpoint = `http://localhost:3000/api/products?search=${searched}&category=${selectedCategory}&region=${selectedRegion}&sort=${sort}`;

        // cambio endpoint se filtro attivo
        if (onlyDiscounted) {
            endpoint = `http://localhost:3000/api/products/discounted?search=${searched}&category=${selectedCategory}&region=${selectedRegion}&sort=${sort}`;
        }

        //chiamata SEMPRE eseguita
        axios.get(endpoint)
            .then((res) => {
                setSearchedItems(res.data.results);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });

    }, [searched, selectedCategory, selectedRegion, onlyDiscounted, sort]);

    // Ogni volta che l'URL cambia, aggiorniamo i nostri stati locali
    useEffect(() => {
        setSelectedCategory(searchParams.get("category") || "");
        setSelectedRegion(searchParams.get("region") || "");
        setSearched(searchParams.get("query") || "");
        setSort(searchParams.get("sort") || "");
    }, [searchParams]); // Ascolta i cambiamenti dell'URL

    //se is loading é true gestisci il caricamento
    if (isLoading) {
        return (
            <div className="loader-container">
                <h2>Caricamento in corso...</h2>
            </div>
        );
    }


    return (
        <main>

            <div className="selcet-container">
                <div className="filter-section">
                    <label>Categoria: </label>
                    <select value={selectedCategory}
                        onChange={(e) => updateFilters("category", e.target.value)}>
                        <option value="">Tutte le categorie</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* select regioni */}
                <div className="filter-region">
                    <label>Regione: </label>
                    <select value={selectedRegion}
                        onChange={(e) => updateFilters("region", e.target.value)}>
                        <option value="">Tutte le regioni</option>
                        {regions.map(r => (
                            <option key={r.id} value={r.name}>{r.name}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-sort">
                    <label>Ordina per: </label>
                    <select
                        value={sort}
                        onChange={(e) => updateFilters("sort", e.target.value)}
                    >
                        <option value="">Default</option>
                        <option value="name_asc">Nome A-Z</option>
                        <option value="name_desc">Nome Z-A</option>
                        <option value="price_asc">Prezzo crescente</option>
                        <option value="price_desc">Prezzo decrescente</option>
                    </select>
                </div>
            </div>
            {searchedItems.length > 0 ? (
                <div>
                    <div className="search-button-container">
                        <h2>Risultati per: {searched}</h2>
                        <button
                            className="search-button-search"
                            onClick={() => setIsGridActive(prev => !prev)}
                        >
                            {isGridActive ? "Vista Lista" : "Vista Griglia"}
                        </button>
                    </div>
                    <div className={isGridActive ? "home-container" : "list-layout"}>
                        {searchedItems.map(item => {
                            //calcolo prezzi con getProductPricing
                            const { price, finalPrice, isOnSale } = getProductPricing(item);
                            return (
                                <div className={isGridActive ? "card-container" : "list-item"}
                                    key={item.id}>


                                    <div className="img-container">
                                        <img className="card-image" src={item.image} alt={item.name} />
                                    </div>
                                    {isGridActive || (
                                        <p
                                            className="description-container"
                                        >{item.descriptions}</p>
                                    )}
                                    <div className="text-container">
                                        <Link className="card-link" to={`/product/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                        <div className="card-weight-button-container">
                                            <div
                                                className="card-weight">
                                                {item.weight} g
                                            </div>
                                            <div className="card-button-container">
                                                <button
                                                    className="card-button"
                                                    onClick={() => addToCart(item)}>
                                                    <FaCartPlus />
                                                </button>

                                                <button
                                                    className="card-button"
                                                    onClick={() => addToWishlist(item)}>
                                                    <FaHeart />
                                                </button>
                                            </div>

                                        </div>
                                        <div className="card-price">
                                            Prezzo: {isOnSale ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through', color: '#999' }}>
                                                        €{price.toFixed(2)}
                                                    </span>{' '}
                                                    <span style={{ color: 'red' }}>
                                                        €{finalPrice.toFixed(2)}
                                                    </span>
                                                </>
                                            ) : (
                                                <>€{price.toFixed(2)}</>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (<p>Nessun prodotto trovato </p>)}

        </main>
    )
}

export default SearchPage;