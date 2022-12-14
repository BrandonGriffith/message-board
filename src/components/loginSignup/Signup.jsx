import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    let [username, setUsername] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPass, setConfirmPass] = useState("");
    let [formErrors, setFormErrors] = useState("");
    let navigate = useNavigate();

    const SignupUser = (e) => {
        e.preventDefault();
        let formInfo = { username, firstName, lastName, email, password, confirmPass };
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/signup`, formInfo, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate("/dashboard");
            })
            .catch(e => {
                if (e.response.data.error.errors) setFormErrors(e.response.data.error.errors);
                if (e.response.data.error.keyValue) setFormErrors(e.response.data.error);
            });
    };

    return (<>
        <h1>Signup</h1>
        <form onSubmit={SignupUser}>
            <div className="form-group">
                <label htmlFor="">Username</label>
                <input type="text" name="username" id="1" className='form-control' onChange={(e) => setUsername(e.target.value)} />
                <p className="text-danger">{formErrors.username?.message}</p>
                <p className="text-danger">{formErrors?.keyValue?.username ? "username already exists" : null}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">First Name</label>
                <input type="text" name="firstName" id="2" className='form-control' onChange={(e) => setFirstName(e.target.value)} />
                <p className="text-danger">{formErrors.firstName?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Last Name</label>
                <input type="text" name="lastName" id="3" className='form-control' onChange={(e) => setLastName(e.target.value)} />
                <p className="text-danger">{formErrors.lastName?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Email</label>
                <input type="text" name="email" id="4" className='form-control' onChange={(e) => setEmail(e.target.value)} />
                <p className="text-danger">{formErrors.email?.message}</p>
                <p className="text-danger">{formErrors?.keyValue?.email ? "email already exists" : null}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="password" name="password" id="5" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                <p className="text-danger">{formErrors.password?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Confirm Password</label>
                <input type="password" name="confirm" id="6" className='form-control' onChange={(e) => setConfirmPass(e.target.value)} />
                <p className="text-danger">{formErrors.confirm?.message}</p>
            </div>
            <input type="submit" value="Signup" className="btn btn-primary mt-3" />
        </form>
    </>)
};
export default Signup;