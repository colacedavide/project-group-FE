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
    const { regions, fetchRegions } = useGlobal();

    //richiamiamo la funzione fetchProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(fetchRegions, []);

    return (
        <div className="region-container">
            {regions
                //mescola l'array
                .sort(() => Math.random() - 0.5)
                .map(region => {
                    return (
                        <div
                            className="region-card-container"
                            key={region.id}>
                            <div className="region-text-container">
                                <Link className="card-link" to={`/region/${region.name}`}>
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