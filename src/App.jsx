import React, { useState } from 'react';
import axios from 'axios';

// Configure Backend Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jobgraph-backend-production.up.railway.app/api/jobs';

// ==========================================
// 1. NAVBAR COMPONENT
// ==========================================
function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1e293b',
      color: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        onClick={() => setActiveTab('home')}
      >
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#38bdf8' }}>JobGraph AI</span>
        <span style={{ fontSize: '0.75rem', backgroundColor: '#0284c7', padding: '2px 8px', borderRadius: '10px' }}>
          CognoDB
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => setActiveTab('home')}
          style={{
            background: activeTab === 'home' ? '#0284c7' : 'transparent',
            color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
          }}>
          Home
        </button>
        <button 
          onClick={() => setActiveTab('recommend')}
          style={{
            background: activeTab === 'recommend' ? '#0284c7' : 'transparent',
            color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
          }}>
          Match Jobs
        </button>
        <button 
          onClick={() => setActiveTab('post')}
          style={{
            background: activeTab === 'post' ? '#0284c7' : 'transparent',
            color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
          }}>
          Post Job
        </button>
      </div>
    </nav>
  );
}

// ==========================================
// 2. HOME COMPONENT
// ==========================================
function Home({ setActiveTab }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>
        Graph-Powered Job Matching Engine
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '2rem', lineHeight: '1.6' }}>
        Leverage multi-hop Cypher traversals via CognoDB to find career opportunities matched precisely to your technical skill set.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setActiveTab('recommend')} 
          style={{ padding: '0.8rem 1.5rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Find Matching Jobs
        </button>
        <button 
          onClick={() => setActiveTab('post')} 
          style={{ padding: '0.8rem 1.5rem', backgroundColor: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Post a Job
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. RECOMMEND (JOB MATCHER) COMPONENT
// ==========================================
function Recommend() {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['Java', 'Spring Boot', 'React']);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSearch = async () => {
    if (skills.length === 0) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/recommend/match`, {
        params: { skills: skills.join(',') }
      });
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch job recommendations. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ color: '#0f172a' }}>Graph-Powered Job Matcher</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Enter your skills to discover matching career opportunities via Cypher traversal.</p>

      {/* Skill Input Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add a skill (e.g. SQL, Java, React)"
          style={{ padding: '0.6rem', flex: 1, borderRadius: '6px', border: '1px solid #cbd5e1' }}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
        />
        <button onClick={addSkill} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Add Skill
        </button>
      </div>

      {/* Active Skill Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
        {skills.map(s => (
          <span key={s} style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
            {s}
            <button onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#0369a1' }}>×</button>
          </span>
        ))}
      </div>

      <button onClick={handleSearch} style={{ width: '100%', padding: '0.8rem', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
        Find Recommended Jobs
      </button>

      {/* States */}
      {loading && <p style={{ textAlign: 'center', margin: '2rem 0', color: '#0284c7', fontWeight: 'bold' }}>Traversing database graph...</p>}
      {error && <p style={{ color: '#dc2626', margin: '1rem 0', fontWeight: 'bold' }}>{error}</p>}

      {/* Results */}
      <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
        {!loading && jobs.length === 0 && <p style={{ color: '#94a3b8', textAlign: 'center', margin: '2rem 0' }}>No job recommendations found. Click "Find Recommended Jobs" or add skills.</p>}
        {jobs.map(job => (
          <div key={job.id} style={{ border: '1px solid #e2e8f0', backgroundColor: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#0f172a' }}>{job.title}</h3>
              <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                {job.matchPercentage}% Match
              </span>
            </div>
            <p style={{ color: '#475569', margin: '0.5rem 0 1rem' }}>{job.description}</p>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
              <span><strong>ID:</strong> {job.id}</span>
              <span><strong>Experience:</strong> {job.experience}</span>
              <span><strong>Matched Skills:</strong> {job.matchedSkills} / {job.totalSkills}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. POST JOB COMPONENT
// ==========================================
function PostJob() {
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
      await axios.post(`${API_BASE_URL}/create`, payload);
      setStatus({ loading: false, success: `Job "${formData.title}" created successfully in graph!`, error: '' });
      setFormData({ id: '', title: '', description: '', experience: '0-2 years', company: '', location: '', skills: '' });
    } catch (err) {
      setStatus({ loading: false, success: '', error: 'Failed to create job node in database.' });
    }
  };

  const inputStyle = { padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginTop: 0, color: '#0f172a' }}>Post a New Job</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="id" value={formData.id} onChange={handleChange} placeholder="Job ID (e.g., JOB007)" required style={inputStyle} />
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required style={inputStyle} />
        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required style={inputStyle} />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location (e.g., Hyderabad)" required style={inputStyle} />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required rows={4} style={inputStyle} />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Required Skills (comma-separated: Java, React, SQL)" required style={inputStyle} />
        
        <button type="submit" disabled={status.loading} style={{ padding: '0.8rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          {status.loading ? 'Creating Graph Nodes...' : 'Post Job'}
        </button>
      </form>

      {status.success && <p style={{ color: '#16a34a', fontWeight: 'bold', marginTop: '1rem' }}>{status.success}</p>}
      {status.error && <p style={{ color: '#dc2626', fontWeight: 'bold', marginTop: '1rem' }}>{status.error}</p>}
    </div>
  );
}

// ==========================================
// 5. MAIN APP CONTAINER
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#334155', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ padding: '1rem' }}>
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'recommend' && <Recommend />}
        {activeTab === 'post' && <PostJob />}
      </main>
    </div>
  );
}