import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Errors } from "./Errors";
import AuthContext from "../AuthContext";

const Login = () => {

    const initUser = {
        username: "",
        password: "",
    };

    const [user, setUser] = useState(initUser);
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useHistory();

    const handleInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        };

        fetch('http://localhost:8080/api/authenticate', init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 403) {
                    return null;
                }
                return Promise.reject('Something unexpected went wrong.');
            })
            .then(data => {
                if (data) {
                    auth.login(data.jwt_token);
                    history.push("/");
                } else {
                    setErrors(['Login failure']);
                }
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <h2 id="subformHeader">Log In</h2>
            <Errors errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-5">
                    <button className="btn btn-success" type="submit">
                        <i className="bi bi-plus-circle-fill"></i> Login
                    </button>
                    <Link to="/" className="btn btn-warning ml-2">
                        <i className="bi bi-x"></i> Cancel
                    </Link>
                </div>
            </form>
        </>
    );
};


export default Login;