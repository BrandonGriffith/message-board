import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AllPosts from './posts/AllPosts';
import PostForm from './posts/PostForm';


const Dashboard = () => {
    let [loggedInUser, setLoggedInUser] = useState({});
    let [submitHandler, setSubmitHandler] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:80/api/v1/users/user", { withCredentials: true })
            .then(res => setLoggedInUser(res.data.user))
            .catch(e => { console.log(e); navigate('/') })
    }, [])

    const logout = () => {
        axios.get("http://localhost:80/api/v1/users/logout", { withCredentials: true })
            .then(navigate('/'))
            .catch()
    };

    return (
        <div className="container">
            <h1>{loggedInUser?.username}'s dashboard</h1>
            <button className="btn btn-secondary" onClick={logout}>LOGOUT</button>
            <PostForm submitHandler={submitHandler} setSubmitHandler={setSubmitHandler} />
            <AllPosts submitHandler={submitHandler} setSubmitHandler={setSubmitHandler} loggedInUser={loggedInUser} />
        </div>
    )
};
export default Dashboard;