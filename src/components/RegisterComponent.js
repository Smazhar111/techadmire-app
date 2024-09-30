import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAPICall } from '../AuthService';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleRegistrationForm = (e) => {
        e.preventDefault();

        const register = { username, email, password };
        console.log(register);

        registerAPICall(register)
            .then((response) => {
                console.log(response.data);
                setSuccessMessage('Registration successful!'); // Set success message
                setTimeout(() => {
                    navigate('/signin'); // Navigate to /signin after a brief pause
                }, 2000); // Pause for 2 seconds
            })
            .catch((error) => {
                console.error(error);
                setSuccessMessage('Registration failed. Please try again.'); // Set error message
            });
    };

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'> User Registration Form </h2>
                        </div>

                        <div className='card-body'>
                            <form>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'> Username </label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='username'
                                            className='form-control'
                                            placeholder='Enter username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'> Email </label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='email'
                                            className='form-control'
                                            placeholder='Enter email address'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'> Password </label>
                                    <div className='col-md-9'>
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' onClick={handleRegistrationForm}>Submit</button>
                                </div>
                            </form>

                            {successMessage && <div className='alert alert-success'>{successMessage}</div>} {/* Show success message */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;
