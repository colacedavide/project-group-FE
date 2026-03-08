//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link } from "react-router-dom";

//import HeroSection
import HeroSection from "../components/HeroSection";

function HomePage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { products, fetchProducts } = useGlobal();


    //richiamiamo la funzione fetchProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(fetchProducts, []);

    return (
        <main>
            <div className="hero-section">
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

        </main>
    )
}

export default HomePage