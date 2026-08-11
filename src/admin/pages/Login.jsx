import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Lock, KeyRound, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const { loginStep1, verifyMfa, mfaRequired } = useAdminAuth();

  const [email, setEmail] = useState('admin@arjun.dev');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mfaRequired) {
        await verifyMfa(mfaCode);
      } else {
        await loginStep1(email, password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0b0b', color: '#f1f0ec', fontFamily: 'system-ui, sans-serif', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#141414', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)' }}>
        
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(184, 255, 53, 0.12)', color: '#b8ff35', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid rgba(184, 255, 53, 0.3)' }}>
            <Lock size={26} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
            ADMINISTRATION CMS
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#aaaaaa', marginTop: '0.4rem' }}>
            {mfaRequired ? 'Multi-Factor Authentication Required' : 'Enter credentials to access private dashboard'}
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', padding: '10px 14px', marginBottom: '1.5rem', color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {!mfaRequired ? (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaaaaa', marginBottom: '6px' }}>
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@arjun.dev"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: '#1a1a1a',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaaaaa', marginBottom: '6px' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: '#1a1a1a',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </>
          ) : (
            <div>
              <div style={{ backgroundColor: 'rgba(184, 255, 53, 0.08)', border: '1px solid rgba(184, 255, 53, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '0.82rem', color: '#b8ff35', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} />
                <span>Password verified. Enter TOTP authenticator code.</span>
              </div>

              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaaaaa', marginBottom: '6px' }}>
                6-Digit Authenticator Code
              </label>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                required
                placeholder="123456"
                autoFocus
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #b8ff35',
                  backgroundColor: '#1a1a1a',
                  color: '#b8ff35',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  letterSpacing: '0.3em',
                  textAlign: 'center',
                  outline: 'none'
                }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#b8ff35',
              color: '#0b0b0b',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '0.5rem'
            }}
          >
            {loading ? 'Authenticating...' : (mfaRequired ? 'Verify TOTP & Sign In' : 'Sign In to Dashboard')}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#777777', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.2rem' }}>
          Strictly Protected Security Boundary • HTTPS & HttpOnly Sessions
        </div>

      </div>
    </div>
  );
}
