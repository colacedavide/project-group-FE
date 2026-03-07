//import axios
import axios from "axios";

//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link } from "react-router-dom";

function RegionPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { setIsLoading } = useGlobal();

    //creazione varibile endpoint in un salvare l'API
    const endpoint = "http://localhost:3000/api/regions";

    //creazione varbile di stato come un array vuoto
    const [regions, setRegions] = useState([]);

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchRegions() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpoint)
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

    //richiamiamo la funzione fetchProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(fetchRegions, []);


    return (
        <div className="region-container">
            {regions.map(region => {
                return (
                    <div
                        className="region-card-container"
                        key={region.id}>
                        <div className="region-text-container">
                            <Link className="card-link" to={"/product/:id"}>
                                {region.name}
                            </Link>
                        </div>
                        <div className="region-img-container">
                            <img className="card-image"
                                src={region.image} alt={region.name} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default RegionPage