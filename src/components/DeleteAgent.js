import { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import AuthContext from '../AuthContext';

import Errors from './Errors';

function DeleteAgent(props) {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [middleName, setMiddleName] = useState(props.middleName);
    const [dob, setDob] = useState(props.dob);
    const [heightInInches, setHeightInInches] = useState(props.heightInInches);
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {

        const init = {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            }
        };
        fetch(`http://localhost:8080/api/agent/${id}`, init)
            .then(response => {
                if (response.status === 404) {
                    return Promise.reject(`Received 404 Not Found for Agent ID# ${id}`);
                }
                return response.json();
            })
            .then(data => {
                setFirstName(data.firstName);
                setMiddleName(data.middleName);
                setLastName(data.lastName);
                setDob(data.dob);
                setHeightInInches(data.heightInInches);
                
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, auth.user.token]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const agentToDelete = {
            agentId: id,
            firstName,
            middleName,
            lastName,
            dob,
            heightInInches
        };

        const init = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(agentToDelete)
        };

        fetch(`http://localhost:8080/api/agent/${agentToDelete.agentId}`, init)
            .then(response => {
                if (response.status === 204) {
                    return null;
                } else if (response.status === 400) {
                    return response.json();
                }
                return Promise.reject('Something unexpected went wrong');
            })
            .then(data => {
                if (!data) {
                    history.push('/agents');
                } else {

                    setErrors(data);
                }
            })
            .catch(error => console.log(error));
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

            <Link to="/agents" className="btn btn-warning ml-2" id="cancelButton">
                Cancel
            </Link>

        </form>
        </>
    );

}

export default DeleteAgent;