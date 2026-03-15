//import axios
import axios from "axios";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import useState 
import { useState, useEffect } from "react";

function CheckoutPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { cart, setCart, shippingData, setShippingData, billingData, setBillingData, discountCode, setDiscountCode, discountPercentage, setDiscountPercentage, applyDiscount, fetchShipping, shippingPrice, setShippingPrice } = useGlobal();

    //aggiungiamo una varibile di stato per far combaciare i duen dati di fatturazione
    const [sameAsShipping, setSameAsShipping] = useState(true);

    //creazione varibile endpoint in un salvare l'API
    const endpointCheckout = "http://localhost:3000/api/orders/checkout";

    //creiamo una funzione per avviare la chiamta POST al click
    function handleCheckout() {
        axios.post(endpointCheckout, {
            shippingData,
            billingData,
            products: cart,
            shipping_price: shippingPrice,
            discount_code: discountCode,
            discount_percentage: discountPercentage
        })
            .then(res => {
                const order = res.data.order;

                //prepariamo messaggio alert
                let message = `Ordine confermato!\nID: ${order.id}\nTotale: €${order.totalAmount}\n\nProdotti:\n`;
                order.products.forEach(p => {
                    message += `- ${p.name} x${p.quantity} (€${p.price})\n`;
                });
                message += `\nSpedizione: €${shippingPrice}\nSconto: €${discountAmount.toFixed(2)}`;
                message += `\nTotale finale: €${totalFinal.toFixed(2)}`;

                //mostriamo alert
                alert(message);

                //reset dei campi
                setShippingData({});
                setBillingData({});
                setDiscountCode("");
                setCart([]);
                setDiscountPercentage(0);
            })
            .catch(err => console.error("Errore nella chiamata POST:", err));
    }

    //creiamo una funzione per generaliziane la presa dei valori dagli input per i dati di spedizione
    function handleChangeShippingData(e) {
        //prende name e value dall'input
        const { name, value } = e.target;
        //salviamo in una nuova varibile i valori di shippingData
        const updatedShipping = { ...shippingData, [name]: value };
        //aggiorniamo shippingData
        setShippingData(updatedShipping);
        //se sameAsShipping è vero
        if (sameAsShipping) {
            //lo copiamo anche in billing data
            setBillingData(updatedShipping);
        }
    }

    //creiamo una funzione per generaliziane la presa dei valori dagli input per i dati di fatturazione
    function handleChangeBillingData(e) {
        //prende name e value dall'input
        const { name, value } = e.target;
        setBillingData({ ...billingData, [name]: value });
    }

    //creaimo un calcolo di spedizione dinamico
    useEffect(() => {
        if (cart.length > 0) {
            fetchShipping(cart);
        } else {
            //se carrello vuoto, resetta spedizione
            setShippingPrice(0);
        }
    }, [cart]);

    //creaimno constanti per i calcoli per il totale carrello, sconto e totale finale
    const cartTotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const discountAmount = cartTotal * (discountPercentage / 100);
    const totalFinal = cartTotal - discountAmount + shippingPrice;

    return (
        <main>
            <div className="checkout-container">
                <div>
                    <h2 className="cheackout-title">Checkout</h2>

                    <div className="checkout-dates-container">
                        <div className="checkout-dates">
                            <h2>Dati spedizione</h2>
                            <div className="checkout-input-container">
                                <input
                                    placeholder="Nome"
                                    name="name"
                                    value={shippingData?.name || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                                <input
                                    placeholder="Cognome"
                                    name="surname"
                                    value={shippingData?.surname || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                                <input
                                    placeholder="Email"
                                    name="email"
                                    value={shippingData?.email || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                                <input
                                    placeholder="Telefono"
                                    name="phone"
                                    value={shippingData?.phone || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                                <input
                                    placeholder="Via"
                                    name="street"
                                    value={shippingData?.street || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                                <input
                                    placeholder="Città"
                                    name="city"
                                    value={shippingData?.city || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                                <input
                                    placeholder="Regione"
                                    name="region"
                                    value={shippingData?.region || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                                <input
                                    placeholder="Provincia"
                                    name="province"
                                    value={shippingData?.province || ""}
                                    onChange={handleChangeShippingData}
                                    required />
                                <input
                                    placeholder="CAP"
                                    name="postal_code"
                                    value={shippingData?.postal_code || ""}
                                    onChange={handleChangeShippingData}
                                    required />
                                <input
                                    placeholder="Nazione"
                                    name="country"
                                    value={shippingData?.country || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </div>
                        </div>

                        <div className="checkout-dates">
                            <div className="cheackout-billing-title">
                                <h2>Dati fatturazione</h2>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={sameAsShipping}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setSameAsShipping(checked);

                                            if (checked) {
                                                setBillingData(shippingData);
                                            }
                                        }}
                                    />
                                    Usa gli stessi dati della spedizione
                                </label>
                            </div>

                            <div className="checkout-input-container">
                                <input
                                    placeholder="Nome"
                                    name="name"
                                    value={billingData?.name || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="Cognome"
                                    name="surname"
                                    value={billingData?.surname || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="Email"
                                    name="email"
                                    value={billingData?.email || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="Telefono"
                                    name="phone"
                                    value={billingData?.phone || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="Via"
                                    name="street"
                                    value={billingData?.street || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="Città"
                                    name="city"
                                    value={billingData?.city || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="Regione"
                                    name="region"
                                    value={billingData?.region || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="Provincia"
                                    name="province"
                                    value={billingData?.province || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="CAP"
                                    name="postal_code"
                                    value={billingData?.postal_code || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                                <input
                                    placeholder="Nazione"
                                    name="country"
                                    value={billingData?.country || ""}
                                    onChange={handleChangeBillingData}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                    <div className="checkout-footer">

                        <div className="checkout-discount-container">
                            <div>
                                <h2>Codice sconto</h2>
                                <input
                                    placeholder="Inserisci codice sconto"
                                    value={discountCode || ""}
                                    onChange={e => setDiscountCode(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={applyDiscount}
                                >
                                    Applica
                                </button>
                                {discountPercentage > 0 && (
                                    <p>Sconto applicato: {discountPercentage}%</p>
                                )}
                            </div>
                            <div>
                                <h4>
                                    Totale carrello: €{cartTotal.toFixed(2)}
                                </h4>
                                {discountPercentage > 0 && (
                                    <h5>
                                        Sconto applicato: €{discountAmount.toFixed(2)} ({discountPercentage}%)
                                    </h5>
                                )}
                                <h4>
                                    Spedizione: {shippingPrice === 0 ? "Gratuita" : `€${shippingPrice.toFixed(2)}`}
                                </h4>
                                <h3>
                                    Totale finale: €{totalFinal.toFixed(2)}
                                </h3>
                            </div>
                        </div>



                        <div className="checkout-button-container">
                            <button
                                className="checkout-button"
                                onClick={handleCheckout}>
                                Conferma ordine
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CheckoutPage;