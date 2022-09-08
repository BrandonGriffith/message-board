import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [loginErrors, setLoginErrors] = useState("");
    let navigate = useNavigate();

    const LoginUser = (e) => {
        e.preventDefault();
        let formInfo = { username, password };
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/login`, formInfo, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate("/dashboard");
            })
            .catch(e => { if (e.response.data.message) setLoginErrors(e.response.data.message); console.log(e) });
    };

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={LoginUser}>
                <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" id="7" className='form-control' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="8" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <p className="text-danger">{loginErrors}</p>
                <input type="submit" value="Login" className="btn btn-success mt-3" />
            </form>
        </div>
    )
};
export default Login;