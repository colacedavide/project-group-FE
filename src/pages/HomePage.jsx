//import axios
import axios from "axios";

//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link } from "react-router-dom";

function HomePage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { setIsLoading } = useGlobal();

    //creazione varibile endpoint in un salvare l'API
    const endpoint = "http://localhost:3000/api/product";

    //creazione varbile di stato come un array vuoto
    const [products, setProducts] = useState([]);

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchProducts() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpoint)
            .then(res => { setProducts(res.data) })
            .catch(err => {
                console.log(err);
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setTimeout(() => setIsLoading(false), 1000);
            });
    };

    //richiamiamo la funzione fetchProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(fetchProducts, []);

    return (
        <main>
            <div className="hero-section">
                <h2>Qui ci andrà la Hero Section</h2>
            </div>
            <div className="home-container">
                {products.map(product => {
                    return (
                        <div
                            className="card-container"
                            key={product.id}>
                            <div className="img-container">
                                <img className="card-image"
                                    src={product.image} alt={product.name} />
                            </div>
                            <div className="text-container">
                                <Link className="card-link" to={"/product/:id"}>
                                    {product.name}
                                </Link>
                                <div>{product.weight} g</div>
                                <div className="card-price"> prezo: {product.price} &euro; </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default HomePage