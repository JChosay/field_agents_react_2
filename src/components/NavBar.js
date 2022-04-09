import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";

const NavBar = () => {

    const auth = useContext(AuthContext);

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
                {!auth.user && (
                    <>
                        <li id="navList">
                            <Link to="/login">Login</Link>
                        </li>
                        <li id="navList">
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
            {auth.user && (
                <div id="loggedInLabel">
                    <p id="loggedInMessage">Hello, {auth.user.username}!</p>
                    <button onClick={() => auth.logout()} className="btn btn-primary">Logout</button>
                </div>
            )}
        </>
    )
}

export default NavBar;