//import axios
import axios from "axios";

//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";


function RegionPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { setIsLoading } = useGlobal();

    //creazione varibile endpoint in un salvare l'API
    const endpoint = "http://localhost:3000/api/regions";

    //creazione varbile di stato come un array vuoto
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [productsRegion, setProductsRegion] = useState([]);

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

    function fetchRegionProducts(regionName) {
        setIsLoading(true);

        axios.get(`http://localhost:3000/api/regions/name/${encodeURIComponent(regionName)}/products`)
            .then(res => {
                setProductsRegion(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleRegionClick(regionName) {
        setSelectedRegion(regionName);
    }

    useEffect(() => {
        fetchRegions();
    }, []);

    useEffect(() => {
        if (selectedRegion !== "") {
            fetchRegionProducts(selectedRegion);
        }
    }, [selectedRegion]);



    return (
        <main>
            <div className="region-container">
                {[...regions]
                    .sort(() => Math.random() - 0.5)
                    .map(region => (
                        <div
                            className="region-card-container"
                            key={region.id}
                            onClick={() => handleRegionClick(region.name)}
                        >
                            <div className="region-text-container">
                                <button
                                    type="button"
                                    className="card-link"
                                    onClick={() => handleRegionClick(region.name)}
                                >
                                    {region.name}
                                </button>
                            </div>

                            <div className="region-img-container">
                                <img
                                    className="card-image"
                                    src={region.image}
                                    alt={region.name}
                                />
                            </div>
                        </div>
                    ))}
            </div>

            {selectedRegion !== "" && (
                <>
                    <h2 className="home-subtitle">
                        Prodotti della regione: {selectedRegion}
                    </h2>

                    <div className="home-container">
                        {productsRegion.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </>
            )}
        </main>
    )
}

export default RegionPage