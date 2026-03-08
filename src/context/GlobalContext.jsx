//import dei componenti di context e useState
import { useState, createContext, useContext } from "react";

<<<<<<< HEAD
=======
//import axios
import axios from "axios";

>>>>>>> Branch-di-Luca-G
//salviamo su una variabile il createContext
const GlobalContext = createContext();

function GlobalProvider({ children }) {

    //creiamo una variabile di stato per settare l'attivazione e la disattivazione del Loader
    const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
=======
    //creazione varibile endpoint in un salvare l'API
    const endpointIndexProducts = "http://localhost:3000/api/product";

    //creazione varbile di stato come un array vuoto
    const [products, setProducts] = useState([]);

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
                setTimeout(() => setIsLoading(false), 1000);
            });
    };

>>>>>>> Branch-di-Luca-G
    return (
        <GlobalContext.Provider
            value={{
                isLoading,
<<<<<<< HEAD
                setIsLoading,
=======
                products,
                endpointIndexProducts,
                setIsLoading,
                setProducts,
                fetchProducts
>>>>>>> Branch-di-Luca-G
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