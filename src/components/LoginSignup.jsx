import React from 'react';
import Login from './Login';
import Signup from './Signup';


const LoginSignup = () => {
    return (
        <div>
            <h1 className=''>Login or Signup</h1>
            <div className='row'>
                <div className='col'><Login /></div>
                <div className='col'><Signup /></div>
            </div>
        </div>
    )
};
export default LoginSignup;