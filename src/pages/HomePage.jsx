//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link, useParams } from "react-router-dom";

//import HeroSection
import HeroSection from "../components/HeroSection";

//import axios
import axios from "axios";

<<<<<<< HEAD
=======
//import card prodotto
import ProductCard from "../components/ProductCard";

>>>>>>> branch_LucaS
function HomePage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { products, fetchProducts, fetchRegions, setIsLoading, regions } = useGlobal();


    //creazione varibile di stato come stringa vuota
    const [selected, setSelected] = useState("");

<<<<<<< HEAD
=======
    //var di stato per prodotti favoriti
    const [favorites, setFavorites] = useState([]);

    //var di stato per gli oli
    const [oils, setOils] = useState([]);

    //var prodotti random
    const [randomProducts, setRandomProducts] = useState([]);

    function fetchFavorites() {

        setIsLoading(true);

        axios.get("http://localhost:3000/api/products/favorites")
            .then(res => {
                console.log("FAVORITES API:", res.data);
                setFavorites(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function fetchOils() {

        setIsLoading(true);

        axios.get("http://localhost:3000/api/products/oils")
            .then(res => {
                setOils(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function fetchRandomProducts() {

        setIsLoading(true);

        axios.get("http://localhost:3000/api/products/random")
            .then(res => {
                setRandomProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }



>>>>>>> branch_LucaS
    //creiamo una funzione per recuperare il valore selezionato dalla select
    const handleChange = (e) => {
        setSelected(e.target.value);
    };

<<<<<<< HEAD
=======


>>>>>>> branch_LucaS
    //creazione varibile endpoint in un salvare l'API
    const endpointProductsRegion = `http://localhost:3000/api/regions/name/${selected}/products`;

    //creazione varbile di stato come un array vuoto
    const [productsRegion, setProductsRegion] = useState([]);

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchRegionProducts() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpointProductsRegion)
            .then(res => { setProductsRegion(res.data) })
            .catch(err => {
                console.log(err);
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setIsLoading(false)
            });
    };

    //richiamo la funzione ogni volta che cambia il name
    useEffect(() => {
        if (selected !== "") {
            fetchRegionProducts();
        }
    }, [selected]);

    //richiamiamo la funzione fetchProducts e fetchRegions (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(() => {
<<<<<<< HEAD
        fetchProducts();
        fetchRegions();
=======

        fetchProducts();

        if (fetchRegions) {
            fetchRegions();
        }

        fetchFavorites();
        fetchOils();
        fetchRandomProducts();

>>>>>>> branch_LucaS
    }, []);


    console.log(productsRegion);

    return (
        <main>
            <div className="hero-section">
                <HeroSection />
            </div>

            <select value={selected} onChange={handleChange}>
                <option value="">-- Seleziona una regione --</option>
<<<<<<< HEAD
    {
        regions.map((region) => (
=======
                {regions?.map((region) => (
>>>>>>> branch_LucaS
            <option key={region.id} value={region.name}>
                {region.name}
            </option>
        ))
    }
            </select >

        { selected === "" ? (
        <>
            <h2 className="home-subtitle">Tavola dei preferiti</h2>
            <div className="home-container">
                {favorites.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <h2 className="home-subtitle">Tavola degli oli</h2>
            <div className="home-container">
<<<<<<< HEAD
    {
        products
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
                    <div className="card-price">prezzo: {product.price} &euro;</div>
                </div>
            </div>
        ))
    }
=======
                        {oils.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
>>>>>>> branch_LucaS
                    </div >

                    <h2 className="home-subtitle">Tavola imbandita</h2>
                    <div className="home-container">
<<<<<<< HEAD
    {
        products
            .sort(() => Math.random() - 0.5)
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
                    <div className="card-price">prezo: {product.price} &euro;</div>
                </div>
            </div>
        ))
    }
=======
                        {randomProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
>>>>>>> branch_LucaS
                    </div >
                </>
            ) : (
        <>
            <h2 className="home-subtitle">Tavola imbandita</h2>
            <div className="home-container">
                {productsRegion.map(product => (
<<<<<<< HEAD
                    <div className="card-container" key={product.id}>
                        <div className="img-container">
                            <img
                                className="card-image"
                                src={product.image.replace('regions-images', 'product-images')}
                                alt={product.name}
                            />
                        </div>
                        <div className="text-container">
                            <Link className="card-link" to={`/product/${product.slug}`}>
                                {product.name}
                            </Link>
                            <div>{product.weight} g</div>
                            <div className="card-price">prezo: {product.price} &euro;</div>
                        </div>
                    </div>
=======
                            <ProductCard
                                key={product.id}
                                product={product}
                                imageOverride={(image) =>
                                    image.replace('regions-images', 'product-images')
                                }
                            />
>>>>>>> branch_LucaS
                ))}
            </div>
        </>
    )
}
        </main >
    )
}

export default HomePage