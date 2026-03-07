import { NavLink } from "react-router-dom"

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
        </header>
    )
}

export default MainHeader