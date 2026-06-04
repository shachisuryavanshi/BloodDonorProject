import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, Activity, MapPin, Droplet, Clock } from 'lucide-react';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileRes, requestsRes] = await Promise.all([
          api.get(`/donors/${user.id}`),
          api.get(`/requests`) // Real app might fetch specific requests matching donor's city/blood group
        ]);
        setProfile(profileRes.data);
        
        // Filter requests that might be relevant to the donor (matching blood group and pending)
        const relevantRequests = requestsRes.data.filter(r => 
          r.status === 'PENDING' && (r.bloodGroup === profileRes.data.bloodGroup || profileRes.data.bloodGroup === 'O-')
        ).slice(0, 5); // Show top 5
        setRequests(relevantRequests);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchDashboardData();
  }, [user]);

  const toggleAvailability = async () => {
    setUpdating(true);
    const newStatus = profile.availabilityStatus === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';
    try {
      const res = await api.put(`/donors/${user.id}`, { ...profile, availabilityStatus: newStatus });
      setProfile(res.data);
    } catch (err) {
      console.error("Error updating status", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading dashboard...</div>;
  if (!profile) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Error loading profile.</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Donor Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="card md:col-span-1">
          <div className="flex flex-col items-center text-center pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <User size={40} color="var(--primary-color)" />
            </div>
            <h3 style={{ margin: 0 }}>{profile.name}</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{profile.email}</p>
          </div>
          
          <div className="pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}><Droplet size={14} className="inline mr-1" /> Blood Group</span>
              <strong style={{ color: 'var(--primary-color)' }}>{profile.bloodGroup}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}><MapPin size={14} className="inline mr-1" /> City</span>
              <strong>{profile.city}</strong>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}><Activity size={14} className="inline mr-1" /> Status</span>
              <span className={`badge ${profile.availabilityStatus === 'AVAILABLE' ? 'badge-success' : 'badge-danger'}`}>
                {profile.availabilityStatus}
              </span>
            </div>
            <button 
              className={`btn ${profile.availabilityStatus === 'AVAILABLE' ? 'btn-danger' : 'btn-primary'} mt-4`} 
              onClick={toggleAvailability}
              disabled={updating}
            >
              {updating ? 'Updating...' : `Mark as ${profile.availabilityStatus === 'AVAILABLE' ? 'Unavailable' : 'Available'}`}
            </button>
          </div>
        </div>

        {/* Recent Urgent Requests */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity color="var(--primary-color)" /> Urgent Requests Near You
            </h3>
            
            {requests.length === 0 ? (
              <p style={{ color: 'var(--text-light)' }}>No matching urgent requests at the moment.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {requests.map(request => (
                  <div key={request.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '1rem' }}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 style={{ margin: 0 }}>{request.hospitalName}</h4>
                      <span className={`badge ${request.urgency === 'CRITICAL' || request.urgency === 'HIGH' ? 'badge-danger' : 'badge-warning'}`}>
                        {request.urgency}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                      <div><strong>Patient:</strong> {request.patientName}</div>
                      <div><strong>Group Needed:</strong> <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{request.bloodGroup}</span></div>
                      <div><strong>Units:</strong> {request.unitsRequired}</div>
                      <div><strong>Location:</strong> {request.city}</div>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3" style={{ borderTop: '1px dashed var(--border-color)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> Needed by: {new Date(request.requiredDate).toLocaleDateString()}
                      </span>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
