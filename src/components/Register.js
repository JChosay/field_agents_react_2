import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import { Errors } from "./Errors";

const Register = () => {
    const initUser = {
        username: "",
        password: "",
        confirmPassword: "",
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

        setErrors([]);

        if (user.password !== user.confirmPassword) {
            setErrors(["Password and confirm password don't match"]);
            return;
        }

        const newUserName = user.username;
        const newPassword = user.password;
        const newUser = {
            newUserName,
            newPassword,
        };
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        };

        fetch("http://localhost:8080/api/create_account", init)
            .then((response) => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                }
                return Promise.reject("Something unexpected went wrong.");
            })
            .then((data) => {
                if (data.id) {
                    const init = {
                        method: "POST", // GET by default
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUser),
                    };

                    fetch("http://localhost:8080/api/authenticate", init)
                    console.log()
                        .then((response) => {
                            if (response.status === 200) {
                                return response.json();
                            } else if (response.status === 403) {
                                return null;
                            }
                            return Promise.reject("Something unexpected went wrong.");
                        })
                        .then((data) => {
                            if (data) {
                                auth.login(data.jwt_token);
                                history.push("/");
                            } else {
                                setErrors(["Login failure"]);
                            }
                        })
                        .catch((error) => console.log(error));
                } else {
                    setErrors(data.messages);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <h2 id="subformHeader" className="my-4">Register</h2>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-5">
                    <button className="btn btn-success" type="submit">
                        <i className="bi bi-plus-circle-fill"></i> Register
                    </button>
                    <Link to="/" className="btn btn-warning ml-2">
                        <i className="bi bi-x"></i> Cancel
                    </Link>
                </div>
            </form>
        </>
    );
};

export default Register;