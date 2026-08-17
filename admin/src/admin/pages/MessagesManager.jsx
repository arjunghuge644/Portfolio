import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Trash2, Archive, MessageSquare } from 'lucide-react';

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [selectedMsg, setSelectedMsg] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchMessages();
        if (selectedMsg && selectedMsg.id === id) {
          setSelectedMsg({ ...selectedMsg, status });
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact submission?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedMsg && selectedMsg.id === id) setSelectedMsg(null);
        fetchMessages();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filter === 'ALL') return true;
    return m.status === filter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>CONTACT MESSAGES INBOX</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>Review inquiries, recruiter proposals, and project offers submitted via the contact form.</p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: '#161922', padding: '4px', borderRadius: '8px', border: '1px solid #232733' }}>
          {['ALL', 'UNREAD', 'READ', 'REPLIED', 'ARCHIVED'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: filter === tab ? '#b8ff35' : 'transparent',
                color: filter === tab ? '#0b0b0b' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        
        {/* Messages List */}
        <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', overflow: 'hidden' }}>
          {filteredMessages.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No messages found in this view.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredMessages.map(msg => {
                const isSelected = selectedMsg && selectedMsg.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMsg(msg);
                      if (msg.status === 'UNREAD') handleStatusChange(msg.id, 'READ');
                    }}
                    style={{
                      padding: '1rem 1.2rem',
                      borderBottom: '1px solid #232733',
                      backgroundColor: isSelected ? '#1e2330' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.9rem' }}>{msg.name}</span>
                        {msg.status === 'UNREAD' && (
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#b8ff35', marginTop: '2px' }}>{msg.subject}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{msg.message}</div>
                    </div>

                    <div style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'right' }}>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Message Detail Panel */}
        {selectedMsg ? (
          <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #232733', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>{selectedMsg.subject}</h3>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>From: {selectedMsg.name} ({selectedMsg.email})</div>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{new Date(selectedMsg.createdAt).toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: '#1e2330', padding: '1.2rem', borderRadius: '8px', fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {selectedMsg.message}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleStatusChange(selectedMsg.id, 'REPLIED')}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#22c55e', color: '#0b0b0b', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Mark Replied
                </button>
                <button
                  onClick={() => handleStatusChange(selectedMsg.id, 'ARCHIVED')}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#94a3b8', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Archive
                </button>
              </div>

              <button
                onClick={() => handleDelete(selectedMsg.id)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '3rem', textAlign: 'center', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Select a message from the inbox to read details.
          </div>
        )}

      </div>

    </div>
  );
}
