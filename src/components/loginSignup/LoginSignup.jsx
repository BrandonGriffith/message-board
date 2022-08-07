import React from 'react';
import Login from './Login';
import Signup from './Signup';


const LoginSignup = () => {
    return (
        <div className="App container d-flex justify-content-center">
            <div className='col-8'>
                <h1 className='text-center pb-4'>Login or Signup</h1>
                <div className='row d-flex justify-content-between'>
                    <div className='col-4'><Signup /></div>
                    <div className='col-4'><Login /></div>
                </div>
            </div>
        </div>
    )
};
export default LoginSignup;