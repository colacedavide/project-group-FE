//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link } from "react-router-dom";

//import HeroSection
import HeroSection from "../components/HeroSection";

//import axios
import axios from "axios";

function HomePage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { products, fetchProducts, setIsLoading } = useGlobal();

    //creazione varibile endpoint in un salvare l'API
    const endpointRegion = "http://localhost:3000/api/regions";

    //creazione varbile di stato come un array vuoto
    const [regions, setRegions] = useState([]);

    //creazione varibile di stato come stringa vuota
    const [selected, setSelected] = useState("");

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchRegions() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpointRegion)
            .then(res => { setRegions(res.data) })
            .catch(err => {
                console.log(err);
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setTimeout(() => setIsLoading(false), 1000);
            });
    };

    //creiamo una funzione per recuperare il valore selezionato dalla select
    const handleChange = (e) => {
        setSelected(e.target.value);
    };

    //richiamiamo la funzione fetchProducts e fetchRegions (una sola volta) al motnaggio della pagine grazie ad useEffect
    //import axios
    useEffect(() => {
        fetchProducts();
        fetchRegions();
    }, []);

    console.log(regions);


    return (
        <main>
            <div className="hero-section">
                <HeroSection />
            </div>

            <select value={selected} onChange={handleChange}>
                <option value="">-- Seleziona una regione --</option>
                {regions.map((region) => (
                    <option key={region.id} value={region.name}>
                        {region.name}
                    </option>
                ))}
            </select>

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

        </main>
    )
}

export default HomePage