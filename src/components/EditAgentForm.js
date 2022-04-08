import React, { useState } from "react";

export const EditAgentForm = (props) => {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [middleName, setMiddleName] = useState(props.middleName);
    const [dob, setDob] = useState(props.dob);
    const [heightInInches, setHeightInInches] = useState(props.heightInInches);

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

    const handleSubmit = event => {
        event.preventDefault();
        props.handleUpdateSubmit(firstName, middleName, lastName, dob, heightInInches);
    };

    return (
        <form onSubmit={handleSubmit} className="form-inline mx-2 my-4">
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
            <button
                type="submit"
                className="btn btn-success ml-2"
            >
                Update Agent
            </button>
            <button className="btn btn-warning ml-2" id="cancelButton" onClick={props.handleUpdateCancel}>
                Cancel
            </button>
        </form>
    );
};
