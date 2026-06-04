import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bloodGroup: '',
    city: '',
    age: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await register({ ...formData, age: parseInt(formData.age) });
      navigate('/donor-dashboard');
    } catch (err) {
      if (err.response?.data && typeof err.response.data === 'object' && !err.response.data.error) {
        // Handle validation errors from backend
        const errors = Object.values(err.response.data).join(', ');
        setError(errors);
      } else {
        setError(err.response?.data?.error || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: 'calc(100vh - 72px)', padding: '2rem 1rem' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="flex flex-col items-center mb-6">
          <Heart size={48} color="var(--primary-color)" />
          <h2 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Become a Donor</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Join our community and save lives</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select id="bloodGroup" name="bloodGroup" className="input-control" required onChange={handleChange}>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" min="18" max="65" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" className="input-control" required onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-light)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
