import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Activity, Phone } from 'lucide-react';
import api from '../services/api';

const Home = () => {
  const [stats, setStats] = useState({ totalDonors: 0, activeDonors: 0, bloodRequests: 0 });

  useEffect(() => {
    // In a real scenario without auth for this endpoint, we'd fetch public stats
    // For now, mocking stats to show the UI
    setStats({ totalDonors: 1542, activeDonors: 890, bloodRequests: 324 });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <Heart size={64} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
            Donate Blood, Save Lives
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Your blood donation can give a precious smile to someone's face. Join our community of lifesavers today.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}>
              Become a Donor
            </Link>
            <Link to="/search" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem', backgroundColor: 'white' }}>
              Find Blood
            </Link>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Donate Blood?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center flex flex-col items-center">
              <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                <Activity size={32} color="var(--primary-color)" />
              </div>
              <h3>Health Benefits</h3>
              <p style={{ color: 'var(--text-light)' }}>
                Regular blood donation is linked to lower blood pressure and lower risk of heart attacks.
              </p>
            </div>
            <div className="card text-center flex flex-col items-center">
              <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                <Users size={32} color="var(--primary-color)" />
              </div>
              <h3>Community Impact</h3>
              <p style={{ color: 'var(--text-light)' }}>
                One donation can save up to three lives. You directly impact your local community.
              </p>
            </div>
            <div className="card text-center flex flex-col items-center">
              <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                <Heart size={32} color="var(--primary-color)" />
              </div>
              <h3>Free Checkup</h3>
              <p style={{ color: 'var(--text-light)' }}>
                Every donation includes a mini-physical and health screening.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{ backgroundColor: 'white', padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary-color)' }}>{stats.totalDonors}</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-light)', fontWeight: 500 }}>Registered Donors</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--success-color)' }}>{stats.activeDonors}</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-light)', fontWeight: 500 }}>Active Donors</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--warning-color)' }}>{stats.bloodRequests}</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-light)', fontWeight: 500 }}>Lives Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '3rem 0 1rem' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>BloodLink</h3>
              <p style={{ color: '#9ca3af' }}>Connecting blood donors with those in need, quickly and efficiently.</p>
            </div>
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link to="/search" style={{ color: '#9ca3af' }}>Find Donors</Link>
                <Link to="/register" style={{ color: '#9ca3af' }}>Register</Link>
                <Link to="/login" style={{ color: '#9ca3af' }}>Login</Link>
              </div>
            </div>
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Contact</h3>
              <div className="flex items-center gap-2 mb-2" style={{ color: '#9ca3af' }}>
                <Phone size={16} /> +91 987 XXX XXX
              </div>
              <div className="flex items-center gap-2" style={{ color: '#9ca3af' }}>
                <Heart size={16} /> support@bloodlink.com
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', borderTop: '1px solid #374151', paddingTop: '1rem' }}>
            &copy; 2026 BloodLink Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
