import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav style={{
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1e293b',
      color: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#38bdf8' }}>JobGraph AI</span>
        <span style={{ fontSize: '0.75rem', backgroundColor: '#0284c7', padding: '2px 8px', borderRadius: '10px' }}>
          CognoDB Powered
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => setActiveTab('recommend')}
          style={{
            background: activeTab === 'recommend' ? '#0284c7' : 'transparent',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
          Match Jobs
        </button>
        <button 
          onClick={() => setActiveTab('post')}
          style={{
            background: activeTab === 'post' ? '#0284c7' : 'transparent',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
          Post New Job
        </button>
      </div>
    </nav>
  );
}