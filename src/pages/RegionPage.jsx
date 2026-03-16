import axios from "axios";
import { useState, useEffect } from "react";
import { useGlobal } from "../context/GlobalContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function RegionPage() {

    const { regions, fetchRegions, setIsLoading } = useGlobal();

    const [selectedRegion, setSelectedRegion] = useState("");
    const [productsRegion, setProductsRegion] = useState([]);

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
                        <div className="region-card-container">
                            <Link to={`/region/${region.name}/products`} >
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
                            </Link>
                        </div>

                    ))}
            </div>

            {
                selectedRegion !== "" && (
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
                )
            }
        </main >
    );
}

export default RegionPage;