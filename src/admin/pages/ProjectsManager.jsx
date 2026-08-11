import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckCircle2, Eye, EyeOff, Save, X, ExternalLink } from 'lucide-react';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: '',
    category: 'FULL-STACK DEVELOPMENT',
    description: '',
    techStack: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    featured: true,
    published: true,
    problem: '',
    solution: '',
    architecture: '',
    challenges: '',
    results: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
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

  const handleOpenEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      category: project.category || 'FULL-STACK DEVELOPMENT',
      description: project.description || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured !== undefined ? project.featured : true,
      published: project.published !== undefined ? project.published : true,
      problem: project.caseStudy ? project.caseStudy.problem : '',
      solution: project.caseStudy ? project.caseStudy.solution : '',
      architecture: project.caseStudy ? project.caseStudy.architecture : '',
      challenges: project.caseStudy ? project.caseStudy.challenges : '',
      results: project.caseStudy ? project.caseStudy.results : ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to save project.');

      setShowModal(false);
      setMessage(editingId ? 'Project updated successfully.' : 'Project created successfully.');
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete project: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project.');
      fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>PROJECTS CMS & CASE STUDY BUILDER</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>Create, edit, and publish visual project case studies without modifying code.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          style={{ padding: '0.65rem 1.4rem', borderRadius: '8px', border: 'none', backgroundColor: '#b8ff35', color: '#0b0b0b', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add New Project
        </button>
      </div>

      {message && (
        <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {message}
        </div>
      )}

      {/* Projects Table */}
      <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e2330', borderBottom: '1px solid #232733', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <th style={{ padding: '14px 18px' }}>Project Title</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Tech Stack</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(proj => (
              <tr key={proj.id} style={{ borderBottom: '1px solid #232733' }}>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#f8fafc' }}>
                  {proj.title}
                </td>
                <td style={{ padding: '14px 18px', color: '#94a3b8', fontSize: '0.8rem' }}>
                  {proj.category}
                </td>
                <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.78rem' }}>
                  {Array.isArray(proj.techStack) ? proj.techStack.slice(0, 3).join(', ') : proj.techStack}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', backgroundColor: proj.published ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: proj.published ? '#22c55e' : '#ef4444' }}>
                    {proj.published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id, proj.title)}
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '16px', width: '100%', maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #232733', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                {editingId ? 'Edit Project Case Study' : 'Create New Project Case Study'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>PROJECT TITLE *</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>CATEGORY *</label>
                  <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>SHORT SUMMARY / DESCRIPTION *</label>
                <textarea rows={2} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>TECHNOLOGIES (Comma separated)</label>
                  <input type="text" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} placeholder="React, Node.js, Python, AWS" style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>COVER IMAGE URL</label>
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="/assets/project1.png" style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>GITHUB REPO URL</label>
                  <input type="text" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>LIVE DEMO URL</label>
                  <input type="text" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.88rem', outline: 'none' }} />
                </div>
              </div>

              {/* Extended Case Study Details */}
              <div style={{ borderTop: '1px solid #232733', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b8ff35', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>EXTENDED CASE STUDY DETAILS</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '4px' }}>PROBLEM STATEMENT</label>
                    <textarea rows={2} value={formData.problem} onChange={e => setFormData({...formData, problem: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.82rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '4px' }}>SOLUTION & APPROACH</label>
                    <textarea rows={2} value={formData.solution} onChange={e => setFormData({...formData, solution: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #232733', backgroundColor: '#1e2330', color: '#f8fafc', fontSize: '0.82rem' }} />
                  </div>
                </div>
              </div>

              {/* Status Toggles */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', backgroundColor: '#1e2330', padding: '12px', borderRadius: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} />
                  <span>Publish Project to Public Portfolio</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                  <span>Feature on Home Showcase</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '9px 18px', borderRadius: '8px', border: '1px solid #232733', backgroundColor: 'transparent', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 22px', borderRadius: '8px', border: 'none', backgroundColor: '#b8ff35', color: '#0b0b0b', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Save size={16} /> Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
