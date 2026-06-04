import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Heart size={28} color="var(--primary-color)" />
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>
            BloodLink
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Find Donors</Link>
          
          {user ? (
            <>
              <Link to="/create-request" className="nav-link">Request Blood</Link>
              <Link 
                to={user.role === 'ADMIN' ? '/admin-dashboard' : '/donor-dashboard'} 
                className="nav-link"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
                <LogOut size={16} className="mr-1" style={{ marginRight: '0.25rem' }} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Become a Donor</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
