import React, { useState } from 'react';
import { recommendJobs } from '../services/api';

export default function Recommend() {
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
      const response = await recommendJobs(skills);
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch job recommendations. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Graph-Powered Job Matcher</h2>
      <p style={{ color: '#666' }}>Enter your skills to discover matching career opportunities via Cypher traversal.</p>

      {/* Skill Tags Input */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add a skill (e.g. SQL, Java)"
          style={{ padding: '0.6rem', flex: 1, borderRadius: '6px', border: '1px solid #ccc' }}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
        />
        <button onClick={addSkill} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Add Skill
        </button>
      </div>

      {/* Render Active Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
        {skills.map(s => (
          <span key={s} style={{ backgroundColor: '#e0e7ff', color: '#3730a3', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {s}
            <button onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>×</button>
          </span>
        ))}
      </div>

      <button onClick={handleSearch} style={{ width: '100%', padding: '0.8rem', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
        Find Recommended Jobs
      </button>

      {/* Loading & Error States */}
      {loading && <p style={{ textAlign: 'center', margin: '2rem 0', color: '#2563eb' }}>Traversing database graph...</p>}
      {error && <p style={{ color: '#dc2626', margin: '1rem 0' }}>{error}</p>}

      {/* Job Results Grid */}
      <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
        {!loading && jobs.length === 0 && <p style={{ color: '#888' }}>No job recommendations found for the selected skills.</p>}
        {jobs.map(job => (
          <div key={job.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#111827' }}>{job.title}</h3>
              <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                {job.matchPercentage}% Match
              </span>
            </div>
            <p style={{ color: '#4b5563', margin: '0.5rem 0 1rem' }}>{job.description}</p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#6b7280' }}>
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