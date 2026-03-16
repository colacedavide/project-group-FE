//import NavLink
import { NavLink } from "react-router-dom"
//importo searchBar
import SearchBar from "./SearchBar"

function MainHeader() {

    return (
        <header>
            <ul className="header-link-container">
                <li>
                    <NavLink
                        className="header-link"
                        to={"/"}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="header-link"
                        to={"/region"}>
                        Regioni
                    </NavLink>
                </li>
            </ul>
<<<<<<< HEAD
            <div className="cart-link-contrainer">
                <NavLink
                    className="cart-link"
                    to={"/wishlist"}>
                    Lista dei desideri
                </NavLink>
                <NavLink
                    className="cart-link"
                    to={"/cart"}>
                    Carello
                </NavLink>
            </div>
=======
            <SearchBar />
>>>>>>> seachFeature
        </header>
    )
}

export default MainHeader