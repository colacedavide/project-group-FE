import { Link } from "react-router-dom";
//importo useEffect
import { useEffect, useState } from "react";
//importo useSearchParams
import { useSearchParams } from "react-router-dom";
//axios
import axios from "axios";

function SearchPage() {

    const [searchParams] = useSearchParams();
    const searched = searchParams.get("query");
    //var di stato per salvare prodotti cercati dal db
    const [searchedItems, setSearchedItems] = useState([]);
    //var di stato per caricameto chiamata axiois
    const [isLoading, setIsLoading] = useState(true);
    //var di stato che gestisce grilgiato o listato della pagina
    const [isGridActive, setIsGridActive] = useState(true)
    //var di stato per salvare le categorie che arrivano da db
    const [categories, setCategories] = useState([])
    //var di stato che gestisce al select dell'utente
    const [selectedCategory, setSelectedCategory] = useState("")
    //var di stato che salva regioni che arrivano dal db
    const [regions, setRegions] = useState([])
    //var di stato che gestisce select untente
    const [selectedRegion, setSelectedRegions] = useState("")

    //chiamata axios per riempire array regioni al montaggiuo del componente con use effect
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

    //chiamata axiaos oer popolare array delle categoire al primo montaggio componente con use effect
    useEffect(() => {
        //enpoint che mi richiama le categorie
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
        const endpoint = `http://localhost:3000/api/products?search=${searched}&category=${selectedCategory}&region=${selectedRegion}` //uso backtic per inserrie van "searched" dentro la stringa
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

    //se is loading é true gestisci il caricamento
    if (isLoading) {
        return (
            <div className="loader-container">
                <h2>Caricamento in corso...</h2>
            </div>
        );
    }

    return (
        <div>

            {/* select categoria */}
            <div className="filter-section">
                <label>Categoria: </label>
                <select value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}>
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
                    onChange={(e) => setSelectedRegions(e.target.value)}>
                    <option value="">Tutte le regioni</option>
                    {regions.map(r => (
                        <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                </select>
            </div>

            {searchedItems.length > 0 ? (
                <div>
                    <h2>risultati per: {searched}</h2>
                    <button onClick={() => { setIsGridActive(true) }}>Vista Griglia</button>
                    <button onClick={() => { setIsGridActive(false) }}>Vista Lista</button>
                    <div className={isGridActive ? "home-container" : "list-layout"}>
                        {searchedItems.map(item => <div className={isGridActive ? "card-container" : "list-item"}
                            key={item.id}>
                            {/* operatore logico && per mostarere immagine solo se isGridActive é true */}
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
                                <div className="card-price">prezzo: {item.price} &euro;</div>
                            </div>
                        </div>)}
                    </div>
                </div>) : (<p>Nessun prodotto trovato per "{searched}"</p>)}

        </div>
    )
}

export default SearchPage