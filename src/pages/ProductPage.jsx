//import axios
import axios from "axios";

//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link di connessione rotte, useParams e useNavigate
import { Link, useParams, useNavigate } from "react-router-dom"

// import del component card prodotto
import ProductCard from "../components/ProductCard";


function ProductPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { setIsLoading, endpointIndexProducts } = useGlobal();

    //ricaviamo l'id dall'url di rotta
    const { id } = useParams();

    //salviamo un'istanza di useNavigate per poterlo poi utilizzare 
    const redirect = useNavigate();

    //creiamo una varibile di stato come un oggetto vuoto
    const [product, setProduct] = useState({});

    //creiamo una funzione per gestire la chiamta axios alla rotta show
    function fetchProduct() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(`${endpointIndexProducts}/slug/${id}`)
            .then(res => { setProduct(res.data) })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 404) {
                    redirect('/404');
                }
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setIsLoading(false)
            });

        console.log(product);

    };

    //richiamiamo la funzione fetchProduct (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(() => { fetchProduct(); }, [id]);

    return (
        <>
            {product && <ProductCard product={product} />}

            <Link to="/">Back to home</Link>

        </>
    )
}

export default ProductPage