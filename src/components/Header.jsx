import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { signInWithGoogle } from '../auth/authService';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 20px', 
        borderBottom: '1px solid #ddd' 
    }}>
      

      {/* Right side: User info, cart, and auth buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {currentUser ? (
          <>
            <span style={{ fontWeight: 'bold' }}>Hello, {currentUser.displayName || currentUser.email}!</span>
          
            {/* Logout button */}
            <button 
                onClick={handleLogout}
                style={{
                    backgroundColor: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Logout
            </button>
          </>
        ) : (
          null
        )}
      </div>
    </header>
  );
};

export default Header;