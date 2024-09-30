import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import ApplicationComponent from './components/ApplicationComponent';
import PrivateRoute from './PrivateRoute';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = () => {
    return isLoggedIn;
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.setItem('token', '');
    document.cookie = "mazhar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
  };

  return (
    <div>
      <BrowserRouter>
        <HeaderComponent isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signup" element={<RegisterComponent />} />
            <Route path="/signin" element={<LoginComponent setIsLoggedIn={setIsLoggedIn} />} />
            <Route 
              path="/application" 
              element={
                <PrivateRoute 
                  element={<ApplicationComponent />} 
                  isAuthenticated={isAuthenticated()}
                />
              } 
            />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
