import React from 'react';
import { AdminAuthProvider, useAdminAuth } from './admin/context/AdminAuthContext';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/pages/Login';

function AdminContainer() {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0b0b', color: '#b8ff35', fontFamily: 'system-ui, sans-serif' }}>
        Authenticating session security boundary...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return <AdminLayout />;
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AdminContainer />
    </AdminAuthProvider>
  );
}
