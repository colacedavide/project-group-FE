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
                <li>
                    <NavLink
                        className="header-link"
                        to={"/wishlist"}>
                        Lista dei desideri
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="header-link"
                        to={"/cart"}>
                        Carrello
                    </NavLink>
                </li>
            </ul>

            <SearchBar />
        </header>
    )
}

export default MainHeader