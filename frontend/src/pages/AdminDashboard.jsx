import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Users, Activity, Droplet, List as ListIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, donorsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/donors')
        ]);
        setStats(statsRes.data);
        setDonors(donorsRes.data.slice(0, 5)); // Show recent 5 for demo
      } catch (err) {
        console.error("Error fetching admin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading dashboard...</div>;

  const chartData = [
    { name: 'Total Donors', value: stats?.totalDonors || 0 },
    { name: 'Available Donors', value: stats?.availableDonors || 0 },
    { name: 'Total Requests', value: stats?.totalRequests || 0 },
    { name: 'Pending Requests', value: stats?.pendingRequests || 0 },
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div className="flex justify-between items-center mb-6">
        <h2>Admin Dashboard</h2>
        <span className="badge badge-warning" style={{ fontSize: '0.875rem' }}>Welcome, {user.name}</span>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="card flex items-center justify-between" style={{ padding: '1.5rem 1rem' }}>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Donors</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-dark)' }}>{stats?.totalDonors}</div>
          </div>
          <div style={{ backgroundColor: '#e0e7ff', padding: '1rem', borderRadius: '50%' }}>
            <Users size={24} color="#4f46e5" />
          </div>
        </div>
        
        <div className="card flex items-center justify-between" style={{ padding: '1.5rem 1rem' }}>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Available</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-dark)' }}>{stats?.availableDonors}</div>
          </div>
          <div style={{ backgroundColor: '#d1fae5', padding: '1rem', borderRadius: '50%' }}>
            <Droplet size={24} color="#059669" />
          </div>
        </div>

        <div className="card flex items-center justify-between" style={{ padding: '1.5rem 1rem' }}>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Requests</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-dark)' }}>{stats?.totalRequests}</div>
          </div>
          <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '50%' }}>
            <ListIcon size={24} color="#d97706" />
          </div>
        </div>

        <div className="card flex items-center justify-between" style={{ padding: '1.5rem 1rem' }}>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Pending</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-dark)' }}>{stats?.pendingRequests}</div>
          </div>
          <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '50%' }}>
            <Activity size={24} color="#dc2626" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>System Overview</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-light)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-light)', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(229, 57, 53, 0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="value" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Donors Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: 0 }}>Recent Registered Donors</h3>
          </div>
          <div className="table-container" style={{ boxShadow: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donors.map(donor => (
                  <tr key={donor.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{donor.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{donor.city}</div>
                    </td>
                    <td>
                      <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{donor.bloodGroup}</span>
                    </td>
                    <td>
                      <span className={`badge ${donor.availabilityStatus === 'AVAILABLE' ? 'badge-success' : 'badge-danger'}`}>
                        {donor.availabilityStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
