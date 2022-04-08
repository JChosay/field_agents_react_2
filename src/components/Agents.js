import React, { useState, useEffect } from "react";
import { AddAgentForm } from "./AddAgentForm";
import { EditAgentForm } from "./EditAgentForm";
import { AgentTable } from "./AgentTable";
import { Errors } from "./Errors";
import { DeleteAgentForm } from "./DeleteAgentForm";

function Agents() {
    const [agents, setAgents] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [heightInInches, setHeightInInches] = useState("");
    const [editAgentId, setEditAgentId] = useState(0);
    const [deleteAgentId, setDeleteAgentId] = useState(0);
    const [toggleForm, setToggleForm] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/agent");
                const data = await response.json();
                setAgents(data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const formToggle = () => {
        setToggleForm(1);
    }

    const handleAddSubmit = async (firstName, middleName, lastName, dob, heightInInches) => {
        const newAgent = {
            firstName,
            middleName,
            lastName,
            dob,
            heightInInches
        };

        const body = JSON.stringify(newAgent);

        try {
            const response = await fetch("http://localhost:8080/api/agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            });

            if (response.status === 201 || response.status === 400) {
                const data = await response.json();

                if (data.agentId) {
                    setAgents([...agents, data]);
                    setFirstName("");
                    setMiddleName("");
                    setLastName("");
                    setDob("");
                    setHeightInInches("");
                    setErrors([]);
                    setToggleForm(0);
                } else {
                    setErrors(data);
                }
            } else {
                throw new Error("Server Error: Something unexpected occurred.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (agentId) => {
        const agentToEdit = agents.find((agent) => agent.agentId === agentId);
        setToggleForm(1);
        setEditAgentId(agentToEdit.agentId);
        setFirstName(agentToEdit.firstName);
        setMiddleName(agentToEdit.middleName);
        setLastName(agentToEdit.lastName);
        setDob(agentToEdit.dob);
        setHeightInInches(agentToEdit.heightInInches);
    };

    const handleDeleteAgent = (agentId) => {
        const agentToDelete = agents.find((agent) => agent.agentId === agentId);
        setToggleForm(1);
        setDeleteAgentId(agentToDelete.agentId);
        setFirstName(agentToDelete.firstName);
        setMiddleName(agentToDelete.middleName);
        setLastName(agentToDelete.lastName);
        setDob(agentToDelete.dob);
        setHeightInInches(agentToDelete.heightInInches);
    };

    const handleUpdateSubmit = async (firstName, middleName, lastName, dob, heightInInches) => {
        const updatedAgent = {
            agentId: editAgentId,
            firstName,
            middleName,
            lastName,
            dob,
            heightInInches
        };

        const body = JSON.stringify(updatedAgent);

        try {
            const response = await fetch(
                `http://localhost:8080/api/agent/${editAgentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body,
                }
            );

            if (response.status === 204) {
                const newAgents = [...agents];

                const agentIndexToEdit = agents.findIndex(
                    (agent) => agent.agentId === editAgentId
                );

                newAgents[agentIndexToEdit] = {
                    agentId: editAgentId,
                    firstName,
                    middleName,
                    lastName,
                    dob,
                    heightInInches,
                };

                setAgents(newAgents);
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setDob("");
                setHeightInInches("");
                setErrors([]);
                setToggleForm(0);

            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data);
            } else {
                throw new Error("Server Error: Something unexpected occurred.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (firstName, middleName, lastName, dob, heightInInches) => {

        console.log("Delete Function");

        let agentToDelete = agents.find((agent => agent.firstName === firstName),
            (agent => agent.lastName === lastName), (agent => agent.middleName === middleName),
            (agent => agent.dob === dob), (agent => agent.heightInInches === heightInInches));

        const agentId = agentToDelete.agentId;

        try {
            const response = await fetch(
                `http://localhost:8080/api/agent/${agentId}`,
                {
                    method: "DELETE",
                }
            );

            if (response.status === 204) {
                const newAgents = agents.filter((agent) => agent.agentId !== agentId);
                setAgents(newAgents);
            } else {
                throw new Error("Server Error: Something unexpected occurred.");
            }
        } catch (error) {
            console.log(error);
        }

        setFirstName("");
        setMiddleName("");
        setLastName("");
        setDob("");
        setHeightInInches("");
        setEditAgentId(0);
        setErrors([]);
        setToggleForm(0);
        setDeleteAgentId(0);
    };

    const handleUpdateCancel = () => {
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setDob("");
        setHeightInInches("");
        setEditAgentId(0);
        setErrors([]);
        setToggleForm(0);
        setDeleteAgentId(0);
    };

    return (
        <>
            <h2 id="subformHeader">Agents</h2>
            <Errors errors={errors} />

            <AgentTable
                agents={agents}
                handleEdit={handleEdit}
                // handleDelete={handleDelete}
                handleDeleteAgent={handleDeleteAgent}
            />

            {toggleForm === 0 && editAgentId === 0 && deleteAgentId === 0 ? (
                <button className="btn btn-warning ml-2" onClick={formToggle}>
                    Add an Agent
                </button>
            ) : (null)}

            {editAgentId === 0 && toggleForm === 1 && deleteAgentId === 0 ? (
                <AddAgentForm
                    handleAddSubmit={handleAddSubmit}
                    errors={errors}
                    firstName={firstName}
                    middleName={middleName}
                    lastName={lastName}
                    dob={dob}
                    heightInInches={heightInInches}
                    handleUpdateCancel={handleUpdateCancel}
                />
            ) : (null)}

            {editAgentId !== 0 && toggleForm === 1 && deleteAgentId === 0 ? (
                <EditAgentForm
                    handleUpdateSubmit={handleUpdateSubmit}
                    firstName={firstName}
                    middleName={middleName}
                    lastName={lastName}
                    dob={dob}
                    heightInInches={heightInInches}
                    handleUpdateCancel={handleUpdateCancel}
                />
            ) : (null)}

            {deleteAgentId !== 0 && toggleForm === 1 ? (
                <DeleteAgentForm
                    handleDelete={handleDelete}
                    firstName={firstName}
                    middleName={middleName}
                    lastName={lastName}
                    dob={dob}
                    heightInInches={heightInInches}
                    handleUpdateCancel={handleUpdateCancel}
                />
            ) : (null)}


        </>
    );
}

export default Agents;