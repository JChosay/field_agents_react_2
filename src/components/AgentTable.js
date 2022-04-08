import React, { useState } from "react";

export const AgentTable = (props) => (
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
            {props.agents.length > 0 ? (
                props.agents.map((agent) => (
                    <tr key={agent.agentId}>
                        <td>{agent.agentId}</td>
                        <td>{agent.firstName} {agent.middleName} {agent.lastName}</td>
                        <td>{agent.dob}</td>
                        <td>{agent.heightInInches}"</td>
                        <td>
                            <div id="buttonGroup">
                                <button
                                    className="btn btn-success btn-sm"
                                    id="leftButton"
                                    onClick={() => props.handleEdit(agent.agentId)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => props.handleDeleteAgent(agent.agentId)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
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
)