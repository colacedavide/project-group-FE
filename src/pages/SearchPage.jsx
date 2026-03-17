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

function SearchPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const searched = searchParams.get("query");
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

    const updateFilters = (key, value) => {
        //creo copia parametri persenti nell url
        const newParams = new URLSearchParams(searchParams);

        // se il valore eieste lo aggiungo o aggiorno la chiave, altrimenti la rimuovo
        if (value) {
            newParams.set(key, value); // aggiungo o aggirno la coppia chiave valore
        } else {
            newParams.delete(key); // se la chiave é vuota perche ha scelto "tutte", cancello la chiave
        }

        // il broswer aggiorna url
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
        //salvo endpoint dentro una costante
        const endpoint = `http://localhost:3000/api/products?search=${searched}&category=${selectedCategory}&region=${selectedRegion}` //uso backtick per inserire var "searched" dentro la stringa
        //chiamata axios
        axios.get(endpoint)
            .then((res) => {
                setSearchedItems(res.data.results);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [searched, selectedCategory, selectedRegion]);

<<<<<<< HEAD
    //se isLoading è true gestisci il caricamento
=======
    // Ogni volta che l'URL cambia, aggiorniamo i nostri stati locali
    useEffect(() => {
        setSelectedCategory(searchParams.get("category") || "");
        setSelectedRegion(searchParams.get("region") || "");
    }, [searchParams]); // Ascolta i cambiamenti dell'URL

    //se is loading é true gestisci il caricamento
>>>>>>> searchUrl
    if (isLoading) {
        return (
            <div className="loader-container">
                <h2>Caricamento in corso...</h2>
            </div>
        );
    }

    return (
        <main>

            {/* select categoria */}
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

            {searchedItems.length > 0 ? (
                <div>
                    <h2>Risultati per: {searched}</h2>
                    <button onClick={() => { setIsGridActive(true) }}>Vista Griglia</button>
                    <button onClick={() => { setIsGridActive(false) }}>Vista Lista</button>
                    <div className={isGridActive ? "home-container" : "list-layout"}>
                        {searchedItems.map(item => {
                            //calcolo prezzi con getProductPricing
                            const { price, finalPrice, isOnSale } = getProductPricing(item);
                            return (
                                <div className={isGridActive ? "card-container" : "list-item"}
                                    key={item.id}>
                                    {/* operatore logico && per mostrare immagine solo se isGridActive è true */}
                                    {isGridActive && (
                                        <div className="img-container">
                                            <img className="card-image" src={item.image} alt={item.name} />
                                        </div>
                                    )}
                                    <div className="text-container">
                                        <Link className="card-link" to={`/product/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                        <div>{item.weight} g</div>
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
            ) : (<p>Nessun prodotto trovato per "{searched}"</p>)}

        </main>
    )
}

export default SearchPage;