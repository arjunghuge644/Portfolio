import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckCircle2, Save, X, BookOpen } from 'lucide-react';

export default function InsightsManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: '',
    category: 'TECHNICAL INSIGHTS',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
    published: true
  };

  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (art) => {
    setEditingId(art.id);
    setFormData({
      title: art.title || '',
      category: art.category || 'TECHNICAL INSIGHTS',
      excerpt: art.excerpt || '',
      content: art.content || '',
      coverImage: art.coverImage || '',
      tags: Array.isArray(art.tags) ? art.tags.join(', ') : '',
      published: art.published !== undefined ? art.published : true
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/articles/${editingId}` : '/api/admin/articles';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to save article.');

      setShowModal(false);
      setMessage(editingId ? 'Article updated.' : 'Article created.');
      fetchArticles();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete article: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete article.');
      fetchArticles();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>ARTICLES & INSIGHTS CMS</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>Write, edit, and publish technical articles, AI system write-ups, and engineering notes.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          style={{ padding: '0.65rem 1.4rem', borderRadius: '8px', border: 'none', backgroundColor: '#60a5fa', color: '#0b0b0b', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> New Article
        </button>
      </div>

      {message && (
        <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {message}
        </div>
      )}

      {/* Articles Table */}
      <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e2330', borderBottom: '1px solid #232733', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <th style={{ padding: '14px 18px' }}>Article Title</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Publication Date</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(art => (
              <tr key={art.id} style={{ borderBottom: '1px solid #232733' }}>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#f8fafc' }}>
                  {art.title}
                </td>
                <td style={{ padding: '14px 18px', color: '#94a3b8', fontSize: '0.8rem' }}>
                  {art.category}
                </td>
                <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.78rem' }}>
                  {new Date(art.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', backgroundColor: art.published ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: art.published ? '#22c55e' : '#ef4444' }}>
                    {art.published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleOpenEdit(art)}
                      style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '16px', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #232733', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                {editingId ? 'Edit Technical Article' : 'Write New Article'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>ARTICLE TITLE *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>EXCERPT / SUMMARY *</label>
                <textarea rows={2} required value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>ARTICLE BODY CONTENT (Markdown / HTML) *</label>
                <textarea rows={8} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none', fontFamily: 'monospace' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>CATEGORY</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>TAGS (Comma separated)</label>
                  <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="RAG, AI, Python" style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer', backgroundColor: '#1e2330', padding: '10px', borderRadius: '8px' }}>
                <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} />
                <span>Publish Article Instantly</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '9px 18px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: 'transparent', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 22px', borderRadius: '8px', border: 'none', backgroundColor: '#60a5fa', color: '#0b0b0b', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Save size={16} /> Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
