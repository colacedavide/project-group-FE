//import dei componenti di context, useState e useEffect
import { useState, useEffect, createContext, useContext } from "react";

//import axios
import axios from "axios";

//salviamo su una variabile il createContext
const GlobalContext = createContext();

function GlobalProvider({ children }) {

    //creiamo una variabile di stato per settare l'attivazione e la disattivazione del Loader
    const [isLoading, setIsLoading] = useState(false);

    //creazione varibile endpoint in un salvare l'API
    const endpointIndexProducts = "http://localhost:3000/api/products";

    //creazione varbile di stato come un array vuoto
    const [products, setProducts] = useState([]);

    //creazione varbile di stato come un array vuoto
    const [regions, setRegions] = useState([]);

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchProducts() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpointIndexProducts)
            .then(res => { setProducts(res.data) })
            .catch(err => {
                console.log(err);
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setIsLoading(false)
            });
    };


    //creazione variabile di stato per il carello
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //salviamo il carello nel browswer al al cambio della varibile di stato Cart
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //creazione variabili si statp per indirizzi di spedizione e fatturazione
    const [shippingData, setShippingData] = useState({});
    const [billingData, setBillingData] = useState({});

    //creiamo una funzione per aggiungere i prodotti al carello
    function addToCart(product) {
        //cerchiamo nel carrello se il prodotto esiste già, confrontando l'id
        const exist = cart.find(p => p.id === product.id);

        //se il prodotto esiste già nel carrello:
        if (exist) {
            //facciamo un map su tutti gli elementi del carrello:
            setCart(cart.map(p =>
                //se l'id corrisponde al prodotto da aggiungere
                p.id === product.id
                    //incrementiamo la quantità di 1
                    ? { ...p, quantity: p.quantity + 1 }
                    //altrimenti lasciamo il prodotto invariato
                    : p
            ));
            //se il prodotto non esiste ancora nel carrello
        } else {
            //aggiungiamo il prodotto al carrello con quantità iniziale 1
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    }

    //creiamo una funzione per rimuovere i prodotti dal carello
    function removeFromCart(id) {
        setCart(
            //facciamo un map su tutti i prodotti del carrello
            cart
                .map(p =>
                    //se l'id del prodotto corrisponde a quello che vogliamo rimuovere
                    p.id === id
                        //creiamo una nuova copia del prodotto con quantità diminuita di 1
                        ? { ...p, quantity: p.quantity - 1 }
                        //altrimenti lasciamo il prodotto invariato
                        : p
                )
                //filtriamo l'array: rimangono solo i prodotti con quantità maggiore di 0
                .filter(p => p.quantity > 0)
        );
    }

    //creaimo una varibile di codice sconto e una di percentuale
    const [discountCode, setDiscountCode] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState(0);

    async function applyDiscount() {
        //se l'utente non inserisce alcun codice, non facciamo nulla
        if (!discountCode) {
            //impostiamo lo sconto a 0 per sicurezza
            setDiscountPercentage(0);
            //usciamo dalla funzione senza chiamare il backend
            return;
        }

        //se l'utente inserisce un codice di sconto
        try {
            //facciamo partire una chiamata al backend per validare il codice sconto
            const response = await axios.post(
                "http://localhost:3000/api/discounts/validate",
                { code: discountCode }
            );

            //se il codice è valido, aggiorniamo lo stato della percentuale
            setDiscountPercentage(response.data.percentage);

            //mostriamo un messaggio di conferma all'utente
            alert(`Codice valido! Sconto ${response.data.percentage}%`);

        } catch (error) {
            //se il codice non è valido o scaduto, resettiamo lo sconto a 0
            console.error(error);
            setDiscountPercentage(0);

            //informiamo l'utente
            alert("Codice sconto non valido o scaduto");
        }
    }

    // //creiamo una funzione per gestire la chiamta axios alla rotta index
    // function fetchRegions() {

    //     //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
    //     setIsLoading(true)

    //     axios.get(endpointRegions)
    //         .then(res => { setRegions(res.data) })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //         //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
    //         .finally(() => {
    //             //metto questi secondi per verificare che funzioni
    //             setIsLoading(false)
    //         });
    // };


    return (
        <GlobalContext.Provider
            value={{
                endpointIndexProducts,
                // endpointRegions,
                fetchProducts,
                // fetchRegions,
                isLoading,
                setIsLoading,
                products,
                setProducts,
                regions,
                setRegions,
                cart,
                setCart,
                addToCart,
                removeFromCart,
                shippingData,
                setShippingData,
                billingData,
                setBillingData,
                discountCode,
                setDiscountCode,
                discountPercentage,
                setDiscountPercentage,
                applyDiscount

            }}
        >
            {children}
        </GlobalContext.Provider>
    );

}

//definiamo un hook per consumare il contesto
function useGlobal() {
    const context = useContext(GlobalContext);
    return context;
}

export { GlobalProvider, useGlobal }