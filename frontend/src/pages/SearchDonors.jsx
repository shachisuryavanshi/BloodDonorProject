import React, { useState, useEffect } from 'react';
import { Search, MapPin, Droplet } from 'lucide-react';
import api from '../services/api';

const SearchDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ bloodGroup: '', city: '' });

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.bloodGroup) params.append('bloodGroup', filters.bloodGroup);
      if (filters.city) params.append('city', filters.city);
      
      const res = await api.get(`/donors?${params.toString()}`);
      setDonors(res.data);
    } catch (err) {
      console.error('Failed to fetch donors', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDonors();
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2>Find Blood Donors</h2>
        <p style={{ color: 'var(--text-light)' }}>Search our database for available blood donors in your city.</p>
      </div>

      <div className="card mb-8" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-4 items-end">
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="bloodGroup">Blood Group</label>
            <select 
              id="bloodGroup" 
              className="input-control" 
              value={filters.bloodGroup}
              onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})}
            >
              <option value="">All Blood Groups</option>
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
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="city">City</label>
            <input 
              type="text" 
              id="city" 
              className="input-control" 
              placeholder="e.g. New York" 
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: '42px' }}>
            <Search size={18} className="mr-2" style={{ marginRight: '0.5rem' }} /> Search
          </button>
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>Loading donors...</div>
      ) : donors.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
          No donors found matching your criteria.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map(donor => (
            <div key={donor.id} className="card flex flex-col justify-between" style={{ padding: '1.5rem' }}>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{donor.name}</h3>
                  <span className={`badge ${donor.availabilityStatus === 'AVAILABLE' ? 'badge-success' : 'badge-danger'}`}>
                    {donor.availabilityStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--text-light)' }}>
                  <Droplet size={16} color="var(--primary-color)" /> <strong>{donor.bloodGroup}</strong>
                </div>
                <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--text-light)' }}>
                  <MapPin size={16} /> {donor.city}
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Contact:</div>
                <div style={{ fontWeight: 500 }}>{donor.phone}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
