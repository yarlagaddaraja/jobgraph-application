import React, { useState } from 'react';
import { createJob } from '../services/api';

export default function PostJob() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    experience: '0-2 years',
    company: '',
    location: '',
    skills: ''
  });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });

    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      await createJob(payload);
      setStatus({ loading: false, success: `Job "${formData.title}" posted successfully!`, error: '' });
      setFormData({ id: '', title: '', description: '', experience: '0-2 years', company: '', location: '', skills: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: 'Failed to create job node in graph.' });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginTop: 0, color: '#0f172a' }}>Post a New Job</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="id" value={formData.id} onChange={handleChange} placeholder="Job ID (e.g., JOB007)" required style={inputStyle} />
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required style={inputStyle} />
        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required style={inputStyle} />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location (e.g., Hyderabad)" required style={inputStyle} />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required rows={4} style={inputStyle} />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Required Skills (comma-separated, e.g. Java, React, SQL)" required style={inputStyle} />
        
        <button type="submit" disabled={status.loading} style={{ padding: '0.8rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          {status.loading ? 'Creating Graph Nodes...' : 'Post Job'}
        </button>
      </form>

      {status.success && <p style={{ color: '#16a34a', fontWeight: 'bold', marginTop: '1rem' }}>{status.success}</p>}
      {status.error && <p style={{ color: '#dc2626', fontWeight: 'bold', marginTop: '1rem' }}>{status.error}</p>}
    </div>
  );
}

const inputStyle = { padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' };