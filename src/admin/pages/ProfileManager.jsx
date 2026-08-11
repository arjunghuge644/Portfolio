import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, User, Award, GraduationCap, Briefcase } from 'lucide-react';

export default function ProfileManager() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    status: '',
    subtext: '',
    bio: '',
    email: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: ''
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const res = await fetch('/api/public/profile');
      if (res.ok) {
        const data = await res.json();
        if (data.profile) setProfile(data.profile);
      }
    } catch (err) {
      setError('Error loading profile information.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaved(false);
    setError('');

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (!res.ok) throw new Error('Failed to update profile.');

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', maxWidth: '840px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>PROFILE & BIO MANAGEMENT</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>Manage personal details, status line, bio, and social links displayed across the portfolio.</p>
        </div>

        {saved && (
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={16} /> Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSaveProfile} style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>FULL NAME</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>PRIMARY TITLE / ROLE</label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>AVAILABILITY & STATUS BADGE</label>
          <input
            type="text"
            value={profile.status}
            onChange={(e) => setProfile({ ...profile, status: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#b8ff35', fontWeight: 600, fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>HERO SUBTEXT</label>
          <input
            type="text"
            value={profile.subtext}
            onChange={(e) => setProfile({ ...profile, subtext: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>ABOUT BIOGRAPHY</label>
          <textarea
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>CONTACT EMAIL</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>LOCATION</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>GITHUB URL</label>
            <input
              type="text"
              value={profile.github}
              onChange={(e) => setProfile({ ...profile, github: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>LINKEDIN URL</label>
            <input
              type="text"
              value={profile.linkedin}
              onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>TWITTER / X URL</label>
            <input
              type="text"
              value={profile.twitter}
              onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{ width: 'fit-content', padding: '10px 22px', borderRadius: '8px', border: 'none', backgroundColor: '#b8ff35', color: '#0b0b0b', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.8rem' }}
        >
          <Save size={16} /> Save Profile Changes
        </button>

      </form>

    </div>
  );
}
