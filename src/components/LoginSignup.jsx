import React from 'react';
import Login from './Login';
import Signup from './Signup';


const LoginSignup = () => {
    return (
        <div>
            <div>Login_signup</div>
            <div className='row'>
                <div className='col'><Login /></div>
                <div className='col'><Signup /></div>
            </div>
        </div>
    )
};
export default LoginSignup;