import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mfaRequired, setMfaRequired] = useState(false);

  // Check current session status on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginStep1 = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed.');
    }

    if (data.mfaRequired) {
      setMfaRequired(true);
      return { mfaRequired: true };
    }

    setUser(data.user);
    setMfaRequired(false);
    return { success: true };
  };

  const verifyMfa = async (code) => {
    const res = await fetch('/api/auth/mfa-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'MFA verification failed.');
    }

    setUser(data.user);
    setMfaRequired(false);
    return { success: true };
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    setMfaRequired(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        mfaRequired,
        loginStep1,
        verifyMfa,
        logout,
        checkSession
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
