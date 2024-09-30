import React, { useState } from 'react';
import { loginAPICall } from '../AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate();
    
    function handleLoginForm(e) {
        e.preventDefault();
        const signInObj = { username, password };

        loginAPICall(signInObj)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then((data) => {
                console.log(data); // Now data should contain your response
                if (data) {
                    // Assuming your API returns user details or a token
                    setIsLoggedIn(true);
                    const token = data.token; // Adjust this if the structure is different
                    console.log(token);
                    // Save the token in local storage
                    if (token) {
                        localStorage.setItem('token', token);
                    }
                    navigate('/application'); // Redirect after login
                } else {
                    console.error('No data returned from the API');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Invalid username or password. Please try again.'); // Set error message
            });
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>Login Form</h2>
                        </div>
                        <div className='card-body'>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}
                            <form onSubmit={handleLoginForm}>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Username</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='username'
                                            className='form-control'
                                            placeholder='Enter username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            autoComplete='username' // Add autocomplete attribute
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Password</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete='current-password' // Add autocomplete attribute
                                        />
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' type='submit'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
