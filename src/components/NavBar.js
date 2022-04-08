import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <ul id="nav">
                <li id="navList">
                    <Link to="/">Home</Link>
                </li>
                <li id="navList">
                    <Link to="/about">About</Link>
                </li>
                <li id="navList">
                    <Link to="/contact">Contact</Link>
                </li>
                <li id="navList">
                    <Link to="/agents">Agents</Link>
                </li>
                <li id="navList">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </>
    )
}

export default NavBar;