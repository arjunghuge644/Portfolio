import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, KeyRound, Smartphone, CheckCircle2, AlertTriangle, Monitor, LogOut, RefreshCw } from 'lucide-react';

export default function SecurityCenter() {
  const [mfaState, setMfaState] = useState({ enabled: false, qrCodeUrl: '', secret: '' });
  const [sessions, setSessions] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [mfaTokenInput, setMfaTokenInput] = useState('');
  
  const [passData, setPassData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      const [secRes, sessRes, auditRes] = await Promise.all([
        fetch('/api/admin/security/stats'),
        fetch('/api/admin/security/sessions'),
        fetch('/api/admin/security/audit-logs')
      ]);

      if (secRes.ok) {
        const sec = await secRes.json();
        setMfaState(prev => ({ ...prev, enabled: sec.mfaEnabled }));
      }

      if (sessRes.ok) {
        const s = await sessRes.json();
        setSessions(s.sessions || []);
      }

      if (auditRes.ok) {
        const a = await auditRes.json();
        setAuditLogs(a.auditLogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Setup TOTP MFA
  const handleStartMfaSetup = async () => {
    setError('');
    try {
      const res = await fetch('/api/admin/security/mfa/setup', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMfaState(prev => ({ ...prev, qrCodeUrl: data.qrCodeUrl, secret: data.secret }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Confirm TOTP Code & Enable MFA
  const handleConfirmEnableMfa = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/security/mfa/enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: mfaTokenInput })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMfaState(prev => ({ ...prev, enabled: true, qrCodeUrl: '', secret: '' }));
      setMessage('TOTP Multi-Factor Authentication enabled successfully.');
      fetchSecurityData();
    } catch (err) {
      setError(err.message);
    }
  };

  // Revoke Specific Session
  const handleRevokeSession = async (sessionId) => {
    try {
      const res = await fetch(`/api/admin/security/sessions/${sessionId}`, { method: 'DELETE' });
      if (res.ok) fetchSecurityData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Revoke All Other Sessions
  const handleRevokeOtherSessions = async () => {
    if (!window.confirm('Log out all other active sessions?')) return;
    try {
      const res = await fetch('/api/admin/security/sessions/revoke-others', { method: 'POST' });
      if (res.ok) fetchSecurityData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (passData.newPassword !== passData.confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passData.currentPassword,
          newPassword: passData.newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Password changed successfully. All other active sessions have been revoked.');
      setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      fetchSecurityData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>SECURITY CONTROL CENTER</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>Manage 2-Factor Authentication, active sessions, password security, and audit history.</p>
      </div>

      {message && (
        <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#22c55e', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {message}
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      {/* Grid: 2FA & Password */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* TOTP Multi-Factor Authentication Card */}
        <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smartphone size={20} color="#b8ff35" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>MULTI-FACTOR AUTHENTICATION</h3>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
            TOTP Authenticator app support adds a high-security boundary to your portfolio dashboard.
          </div>

          <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: mfaState.enabled ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)', border: `1px solid ${mfaState.enabled ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, color: mfaState.enabled ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} />
            <span>MFA Status: {mfaState.enabled ? 'ENABLED & ACTIVE' : 'DISABLED (NOT RECOMMENDED)'}</span>
          </div>

          {!mfaState.enabled && !mfaState.qrCodeUrl && (
            <button
              onClick={handleStartMfaSetup}
              style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#b8ff35', color: '#0b0b0b', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
            >
              Configure TOTP Authenticator (QR Code)
            </button>
          )}

          {mfaState.qrCodeUrl && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', backgroundColor: '#1e2330', padding: '1rem', borderRadius: '10px' }}>
              <img src={mfaState.qrCodeUrl} alt="TOTP QR Code" style={{ width: '150px', height: '150px', borderRadius: '8px' }} />
              <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>Scan QR Code with Google Authenticator / Authy, then enter the 6-digit token below:</div>
              
              <form onSubmit={handleConfirmEnableMfa} style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <input
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={mfaTokenInput}
                  onChange={e => setMfaTokenInput(e.target.value.replace(/\D/g, ''))}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#161922', color: '#b8ff35', fontWeight: 800, fontSize: '1.1rem', textAlign: 'center', outline: 'none' }}
                />
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#22c55e', color: '#0b0b0b', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>
                  Enable MFA
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Change Password Card */}
        <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <KeyRound size={20} color="#60a5fa" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>PASSWORD SECURITY</h3>
          </div>

          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>CURRENT PASSWORD</label>
              <input type="password" required value={passData.currentPassword} onChange={e => setPassData({...passData, currentPassword: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.85rem', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>NEW PASSWORD (MIN 8 CHARS)</label>
              <input type="password" required value={passData.newPassword} onChange={e => setPassData({...passData, newPassword: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.85rem', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>CONFIRM NEW PASSWORD</label>
              <input type="password" required value={passData.confirmPassword} onChange={e => setPassData({...passData, confirmPassword: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.85rem', outline: 'none' }} />
            </div>

            <button type="submit" style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#60a5fa', color: '#0b0b0b', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', marginTop: '0.4rem' }}>
              Update Password & Revoke Other Sessions
            </button>
          </form>
        </div>

      </div>

      {/* Active Sessions Table */}
      <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Monitor size={18} color="#b8ff35" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>ACTIVE SERVER-MANAGED SESSIONS</h3>
          </div>

          <button
            onClick={handleRevokeOtherSessions}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Log Out All Other Sessions
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sessions.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1e2330', borderRadius: '8px', border: s.isCurrent ? '1px solid #b8ff35' : '1px solid #282e3f' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>{s.userAgent.split(' ')[0] || 'Browser Session'}</span>
                  {s.isCurrent && <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#b8ff35', color: '#0b0b0b' }}>CURRENT SESSION</span>}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '3px' }}>IP: {s.ip} • Last Active: {new Date(s.lastActive).toLocaleString()}</div>
              </div>

              {!s.isCurrent && (
                <button
                  onClick={() => handleRevokeSession(s.id)}
                  style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.4)', backgroundColor: 'transparent', color: '#ef4444', fontSize: '0.72rem', cursor: 'pointer' }}
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '1.8rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.2rem', margin: 0 }}>FULL SECURITY & ADMINISTRATIVE AUDIT TRAIL</h3>
        
        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1e2330', color: '#94a3b8', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <th style={{ padding: '10px 14px' }}>Timestamp</th>
                <th style={{ padding: '10px 14px' }}>Event</th>
                <th style={{ padding: '10px 14px' }}>Details</th>
                <th style={{ padding: '10px 14px' }}>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #232733' }}>
                  <td style={{ padding: '10px 14px', color: '#64748b', whiteSpace: 'nowrap' }}>{new Date(log.timestamp).toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#b8ff35' }}>{log.event}</td>
                  <td style={{ padding: '10px 14px', color: '#e2e8f0' }}>{log.details}</td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
