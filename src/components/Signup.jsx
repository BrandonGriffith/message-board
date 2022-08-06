import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Signup = () => {
    let [username, setUsername] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");
    let [formErrors, setFormErrors] = useState({});

    const Register = (e) => {
        let navigate = useNavigate();
        e.preventDefault();
        let formInfo = { username, firstName, lastName, email, password, confirm };
        axios.post("http://localhost/api/v1/users/signup", formInfo, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.data.errors) setFormErrors(res.data.errors);
                else navigate("/dashboard");
            })
            .catch(e => console.log(e))
    };

    return (<>
        <h1>Signup</h1>
        <form onSubmit={Register}>
            <div className="form-group">
                <label htmlFor="">Username</label>
                <input type="text" name="username" id="" className='form-control' onChange={(e) => setUsername(e.target.value)} />
                <p className="text-danger">{formErrors.username?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">First Name</label>
                <input type="text" name="firstName" id="" className='form-control' onChange={(e) => setFirstName(e.target.value)} />
                <p className="text-danger">{formErrors.firstName?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Last Name</label>
                <input type="text" name="lastName" id="" className='form-control' onChange={(e) => setLastName(e.target.value)} />
                <p className="text-danger">{formErrors.lastName?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Email</label>
                <input type="text" name="email" id="" className='form-control' onChange={(e) => setEmail(e.target.value)} />
                <p className="text-danger">{formErrors.email?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="password" name="password" id="" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                <p className="text-danger">{formErrors.password?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Confirm Password</label>
                <input type="password" name="confirm" id="" className='form-control' onChange={(e) => setConfirm(e.target.value)} />
                <p className="text-danger">{formErrors.confirm?.message}</p>
            </div>
            <input type="submit" value="Register" className="btn btn-primary mt-3" />
        </form>
    </>)
};
export default Signup;