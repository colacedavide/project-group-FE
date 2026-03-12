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

    useEffect(() => {
        //salvo endpoint dentro una costante
        const endpoint = `http://localhost:3000/api/products?search=${searched}` //uso backtic per inserrie van "searched" dentro la stringa
        //chiamata axios
        axios.get(endpoint)
            .then((res) => {
                setSearchedItems(res.data)
            })
            .catch((err) => console.log(err));
    }, [searched]);

    return (
        <div>
            {searchedItems.length > 0 ? (
                <div>
                    <h2>risultati per: {searched}</h2>
                    {searchedItems.map(item => <div className="card-container" key={item.id}>
                        <div className="img-container">
                            <img className="card-image" src={item.image} alt={item.name} />
                        </div>
                        <div className="text-container">
                            <Link className="card-link" to={`/product/${item.slug}`}>
                                {item.name}
                            </Link>
                            <div>{item.weight} g</div>
                            <div className="card-price">prezzo: {item.price} &euro;</div>
                        </div>
                    </div>)}
                </div>) : (<p>Nessun prodotto trovato per "{searched}"</p>)}

        </div>
    )
}

export default SearchPage