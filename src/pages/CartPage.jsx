//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link } from "react-router-dom";

function CartPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { cart, removeFromCart, addToCart } = useGlobal();

    return (
        <main>
            <h1>Carrello</h1>
            {cart.map(product => (
                <div key={product.id} >
                    <h3>{product.name}</h3>
                    <div className="card-product-container">
                        <img src={product.image} alt={product.name} className="cart-img" />
                        <div>
                            <p>Quantità: {product.quantity}</p>
                            <p>Prezzo unitario: {product.price} €</p>
                        </div>
                        <div className="cart-button-container">
                            <button onClick={() => addToCart(product)}>Aggiungi</button>
                            <button onClick={() => removeFromCart(product.id)}>Rimuovi</button>
                        </div>
                    </div>
                </div>
            ))}

            <h2>
                Totale: {(cart.reduce((sum, p) => sum + p.price * p.quantity, 0)).toFixed(2)} €
            </h2>
            <Link

                to={"/checkout"}>
                Vai al checkout
            </Link>
        </main>
    );
}

export default CartPage;