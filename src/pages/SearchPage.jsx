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
    //var di stato per salvare prodotti cercati
    const [searchedItems, setSearchedItems] = useState([]);
    //var di stato per caricameto chiamata axiois
    const [isLoading, setIsLoading] = useState(true);
    //var di stato che gestisce grilgiato o listato della pagina
    const [isGridActive, setIsGridActive] = useState(true)

    useEffect(() => {
        setIsLoading(true);
        //salvo endpoint dentro una costante
        const endpoint = `http://localhost:3000/api/products?search=${searched}` //uso backtic per inserrie van "searched" dentro la stringa
        //chiamata axios
        axios.get(endpoint)
            .then((res) => {
                setSearchedItems(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [searched]);

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