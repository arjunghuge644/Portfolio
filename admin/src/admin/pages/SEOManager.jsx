import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Globe } from 'lucide-react';

export default function SEOManager() {
  const [seo, setSeo] = useState({
    siteTitle: '',
    metaDescription: '',
    ogImage: '',
    canonicalUrl: ''
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/seo')
      .then(res => res.json())
      .then(data => {
        if (data.seo) setSeo(data.seo);
      })
      .catch(console.error);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seo)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', maxWidth: '780px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>SEO & OPENGRAPH MANAGEMENT</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>Configure global search engine titles, meta descriptions, and social preview sharing images.</p>
        </div>

        {saved && (
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={16} /> Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>GLOBAL SITE TITLE</label>
          <input
            type="text"
            value={seo.siteTitle}
            onChange={e => setSeo({ ...seo, siteTitle: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>META DESCRIPTION</label>
          <textarea
            rows={3}
            value={seo.metaDescription}
            onChange={e => setSeo({ ...seo, metaDescription: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>OPEN GRAPH PREVIEW IMAGE URL</label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={e => setSeo({ ...seo, ogImage: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>CANONICAL SITE URL</label>
            <input
              type="text"
              value={seo.canonicalUrl}
              onChange={e => setSeo({ ...seo, canonicalUrl: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{ width: 'fit-content', padding: '10px 22px', borderRadius: '8px', border: 'none', backgroundColor: '#b8ff35', color: '#0b0b0b', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.8rem' }}
        >
          <Save size={16} /> Save SEO Settings
        </button>

      </form>

    </div>
  );
}
