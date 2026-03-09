//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link, useParams, useNavigate } from "react-router-dom";

//import axios
import axios from "axios";

function RegionProductPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { setIsLoading } = useGlobal();

    //ricaviamo l'id dall'url di rotta
    const { name } = useParams();

    //salviamo un'istanza di useNavigate per poterlo poi utilizzare 
    const redirect = useNavigate();

    //creazione varibile endpoint in un salvare l'API
    const endpoint = `http://localhost:3000/api/regions/name/${name}/products`;

    //creazione varbile di stato come un array vuoto
    const [products, setProducts] = useState([]);

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchRegionProducts() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpoint)
            .then(res => { setProducts(res.data) })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 404) {
                    redirect('/404');
                }
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setTimeout(() => setIsLoading(false), 1000);
            });
    };

    //richiamiamo la funzione fetchProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(fetchRegionProducts, []);

    console.log(products);


    return (
        <main>

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
                                    <div className="card-price"> prezo: {product.price} &euro; </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <Link to="/">Torna alla home</Link>
            <br />
            <Link to="/region">Torna alla pagina delle regioni</Link>
        </main>
    )
}

export default RegionProductPage