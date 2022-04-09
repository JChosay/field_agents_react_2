import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import { Errors } from "./Errors";


const AddAgent = (props) => {

    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [middleName, setMiddleName] = useState(props.middleName);
    const [dob, setDob] = useState(props.dob);
    const [heightInInches, setHeightInInches] = useState(props.heightInInches);
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);
    const history = useHistory();

    const handleInputChangeFn = (event) => {
        setFirstName(event.target.value);
    };

    const handleInputChangeMn = (event) => {
        setMiddleName(event.target.value);
    };

    const handleInputChangeLn = (event) => {
        setLastName(event.target.value);
    };

    const handleInputChangeDob = (event) => {
        setDob(event.target.value);
    };

    const handleInputChangeHeight = (event) => {
        setHeightInInches(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newAgent = {
            firstName,
            middleName,
            lastName,
            dob,
            heightInInches
        }

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(newAgent),
        };

        fetch("http://localhost:8080/api/agent", init)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                }
                return Promise.reject("Server Error: Something unexpected went wrong.");
            })
            .then(data => {
                if (data.agentId) {
                    history.push("/agents");
                } else {
                    setErrors(data);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <>
        <h2 id="subformHeader">Add Agent</h2>
        <form onSubmit={handleSubmit} className="form-inline mx-2 my-4">
            <Errors errors={errors} />
            <input
                type="text"
                className="form-control col-1"
                id="firstName"
                name="firstName"
                placeholder="First name..."
                value={firstName}
                onChange={handleInputChangeFn}
            />
            <input
                type="text"
                className="form-control col-1"
                id="middleName"
                name="middleName"
                placeholder="Middle name..."
                value={middleName}
                onChange={handleInputChangeMn}
            />
            <input
                type="text"
                className="form-control col-1"
                id="lastName"
                name="lastName"
                placeholder="Last name..."
                value={lastName}
                onChange={handleInputChangeLn}
            />
            <input
                type="text"
                className="form-control col-1"
                id="dob"
                name="dob"
                placeholder="Date of Birth..."
                value={dob}
                onChange={handleInputChangeDob}
            />
            <input
                type="text"
                className="form-control col-1"
                id="height"
                name="height"
                placeholder="Height in inches..."
                value={heightInInches}
                onChange={handleInputChangeHeight}
            />
            <button type="submit" className="btn btn-success ml-2">
                Add Agent
            </button>

            <Link to="/agents" id="cancelButton" className="btn btn-warning ml-2">
                Cancel
            </Link>

        </form>
        </>
    );
}

export default AddAgent;