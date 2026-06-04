import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CreateRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    unitsRequired: 1,
    hospitalName: '',
    city: '',
    contactNumber: '',
    urgency: 'MEDIUM',
    requiredDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/requests', { ...formData, requesterId: user.id });
      navigate('/donor-dashboard'); // Redirect to dashboard or requests list
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: 'calc(100vh - 72px)', padding: '2rem 1rem' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Request Blood</h2>
        
        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="input-group">
              <label htmlFor="patientName">Patient Name</label>
              <input type="text" id="patientName" name="patientName" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="bloodGroup">Blood Group Required</label>
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
              <label htmlFor="unitsRequired">Units Required</label>
              <input type="number" id="unitsRequired" name="unitsRequired" min="1" className="input-control" value={formData.unitsRequired} required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="hospitalName">Hospital Name</label>
              <input type="text" id="hospitalName" name="hospitalName" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input type="tel" id="contactNumber" name="contactNumber" className="input-control" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="urgency">Urgency Level</label>
              <select id="urgency" name="urgency" className="input-control" value={formData.urgency} required onChange={handleChange}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="requiredDate">Required Date</label>
              <input type="date" id="requiredDate" name="requiredDate" className="input-control" required onChange={handleChange} />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem' }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
