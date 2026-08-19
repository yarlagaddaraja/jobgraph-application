import React from 'react';

export default function Home({ setActiveTab }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>
        Graph-Powered Job Matching Engine
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '2rem', lineHeight: '1.6' }}>
        Leverage graph traversals via CognoDB to find career opportunities matched precisely to your technical skills.
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