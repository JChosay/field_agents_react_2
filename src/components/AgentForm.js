import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";

function AgentForm() {
    const [agents, setAgents] = useState([]);

    const auth = useContext(AuthContext);

    const getData = async () => {
        fetch("http://localhost:8080/api/agent")
            .then((response) => response.json())
            .then((data) => setAgents(data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = (agentId) => {
        const init = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${auth.user.token}`, // NEW
            }
        };

        fetch(`http://localhost:8080/api/agent/${agentId}`, init)
            .then((response) => {
                if (response.status === 204) {
                    getData();
                } else if (response.status === 404) {
                    Promise.reject(`Agent ID #${agentId} not found.`);
                } else {
                    Promise.reject("Shoot! Something unexpected went wrong :(");
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <h2 id="subformHeader">Agents</h2>

            <table className="table" id="agentTable">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Agent Name</th>
                        <th>Date of Birth</th>
                        <th>Height</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {agents.length > 0 ? (
                        agents.map((agent) => (
                            <tr key={agent.agentId}>
                                <td>{agent.agentId}</td>
                                <td>{agent.firstName} {agent.middleName} {agent.lastName}</td>
                                <td>{agent.dob}</td>
                                <td>{agent.heightInInches}"</td>
                                <td>
                                    <div className="float-right" id="buttonGroup">
                                        <Link
                                            to={`/agents/edit/${agent.id}`}
                                            className="btn btn-success btn-sm"
                                            id="leftButton"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/agents/delete/${agent.id}`}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>No Agents</td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>



    )

}

export default AgentForm;