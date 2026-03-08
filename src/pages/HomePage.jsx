<<<<<<< HEAD
//import axios
import axios from "axios";

=======
>>>>>>> Branch-di-Luca-G
//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link } from "react-router-dom";

<<<<<<< HEAD
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
=======
//import HeroSection
import HeroSection from "../components/HeroSection";

function HomePage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { products, fetchProducts } = useGlobal();

>>>>>>> Branch-di-Luca-G

    //richiamiamo la funzione fetchProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(fetchProducts, []);

    return (
        <main>
            <div className="hero-section">
<<<<<<< HEAD
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
=======
                <HeroSection />
            </div>

            <h2 className="home-subtitle">Tavola dei preferiti</h2>
            <div className="home-container">
                {products
                    //mescola l'array
                    .sort(() => Math.random() - 0.5)
                    .filter(product => product.favorites === 1)
                    .map(product => (
                        <div className="card-container" key={product.id}>
                            <div className="img-container">
                                <img className="card-image" src={product.image} alt={product.name} />
                            </div>
                            <div className="text-container">
                                <Link className="card-link" to={`/product/${product.slug}`}>
                                    {product.name}
                                </Link>
                                <div>{product.weight} g</div>
                                <div className="card-price"> prezzo: {product.price} &euro; </div>
                            </div>
                        </div>
                    ))}
            </div>

            <h2 className="home-subtitle">Tavola degli oli</h2>
            <div className="home-container">
                {products
                    //mescola l'array
                    .sort(() => Math.random() - 0.5)
                    .filter(product => product.category_id === 23)
                    .map(product => (
                        <div className="card-container" key={product.id}>
                            <div className="img-container">
                                <img className="card-image" src={product.image} alt={product.name} />
                            </div>
                            <div className="text-container">
                                <Link className="card-link" to={`/product/${product.slug}`}>
                                    {product.name}
                                </Link>
                                <div>{product.weight} g</div>
                                <div className="card-price"> prezzo: {product.price} &euro; </div>
                            </div>
                        </div>
                    ))}
            </div>

            <h2 className="home-subtitle">Tavola imbandita</h2>
            <div className="home-container">
                {products
                    //mescola l'array
                    .sort(() => Math.random() - 0.5)
                    .map(product => {
                        return (
                            <div
                                className="card-container"
                                key={product.id}>
                                <div className="img-container">
                                    <img className="card-image"
                                        src={product.image} alt={product.name} />
                                </div>
                                <div className="text-container">
                                    <Link className="card-link" to={`/product/${product.slug}`}>
                                        {product.name}
                                    </Link>
                                    <div>{product.weight} g</div>
                                    <div className="card-price"> prezo: {product.price} &euro; </div>
                                </div>
                            </div>
                        )
                    })}
            </div>

>>>>>>> Branch-di-Luca-G
        </main>
    )
}

export default HomePage