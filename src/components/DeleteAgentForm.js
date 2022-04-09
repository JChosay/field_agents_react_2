import React, { useState } from "react";

export const DeleteAgentForm = (props) => {
    const [agent, setAgent] = useState(props.agent);
    const [agentId, SetAgentId] = useState(props.agentId);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [middleName, setMiddleName] = useState(props.middleName);
    const [dob, setDob] = useState(props.dob);
    const [heightInInches, setHeightInInches] = useState(props.heightInInches);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleDelete(firstName, middleName, lastName, dob, heightInInches);
    };

    return (
        <>
        <h2 id="subformHeader">Delete Agent</h2>
        <form onSubmit={handleSubmit} className="form-inline mx-2 my-4">
            <input
                type="text"
                className="form-control col-1"
                id="firstName"
                name="firstName"
                placeholder="First name..."
                value={firstName}
            />
            <input
                type="text"
                className="form-control col-1"
                id="middleName"
                name="middleName"
                placeholder="Middle name..."
                value={middleName}
            />
            <input
                type="text"
                className="form-control col-1"
                id="lastName"
                name="lastName"
                placeholder="Last name..."
                value={lastName}
            />
            <input
                type="text"
                className="form-control col-1"
                id="dob"
                name="dob"
                placeholder="Date of Birth..."
                value={dob}
            />
            <input
                type="text"
                className="form-control col-1"
                id="height"
                name="height"
                placeholder="Height in inches..."
                value={heightInInches}
            />
            <button type="submit" className="btn btn-danger ml-2">
                Delete Agent
            </button>

            <button
                className="btn btn-warning ml-2"
                id="cancelButton"
                type="button"
                onClick={props.handleUpdateCancel}
            >
                Cancel
            </button>

        </form>
        </>
    );
};