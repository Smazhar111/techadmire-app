import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HeaderComponent.css'; 

const HeaderComponent = ({ isLoggedIn, onSignOut }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        onSignOut();
        navigate('/signin'); // Redirect to sign-in page after logout
    };

    return (
        <header className="header">
            <img src="https://www.techadmire.agency/wp-content/uploads/2024/07/logo-futuristic.svg" alt="Logo" className="logo" />
            <h1 className="title">Tech Admire Application</h1>
            <nav className="nav">
                {isLoggedIn ? (
                    <button onClick={handleSignOut} className="nav-button">Sign Out</button>
                ) : (
                    <>
                        <button onClick={() => navigate('/signin')} className="nav-button">Sign In</button>
                        <button onClick={() => navigate('/signup')} className="nav-button">Register</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default HeaderComponent;