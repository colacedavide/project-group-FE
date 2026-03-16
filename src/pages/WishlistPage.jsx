//import useGlobal per accedere al contesto globale
import { useGlobal } from "../context/GlobalContext";

//import Link per navigazione
import { Link } from "react-router-dom";

//import useEffect e useState
import { useEffect } from "react";

function WishlistPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { addToCart, removeFromWishlist, wishlist } = useGlobal();

    return (
        <main>
            <div className="wishlist-container">
                <h2>Lista dei desideri</h2>
                {wishlist.map(product => (
                    <div
                        className="wishlist-card-container"
                        key={product.id}
                    >
                        <h3>{product.name}</h3>
                        <div
                            className="wishlist-card">
                            <div className="wishlist-image-container">
                                <img
                                    className="wishlist-image"
                                    src={product.image} alt={product.name} />
                            </div>
                            <div className="wishlist-text-container">
                                <h3>{product.price}&euro;/{product.weight}g</h3>
                                <h6>{product.descriptions}</h6>
                            </div>

                            <div className="wishlist-button-container">
                                <button
                                    className="remove-wishlist-button"
                                    onClick={() => removeFromWishlist(product.id)}>
                                    Rimuovi dalla lista desideri
                                </button>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="add-cart">
                                    Aggiungi al carrello
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default WishlistPage;