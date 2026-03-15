//import useGlobal per accedere al contesto globale
import { useGlobal } from "../context/GlobalContext";

//import Link per navigazione
import { Link } from "react-router-dom";

//import useEffect e useState
import { useEffect } from "react";

function WishlistPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { addToCart } = useGlobal();

    return (
        <main>

        </main>
    )
}

export default WishlistPage;