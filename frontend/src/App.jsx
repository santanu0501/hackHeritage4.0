import React, { useState } from 'react';
import './index.css';

function AuthPage({ onLogin, onOnboard }) {
  const [authType, setAuthType] = useState('cpse'); // 'cpse' or 'govt'

  return (
    <div className="auth-container">
      <div className="auth-glass-panel">
        <div className="auth-header">
          <div className="logo auth-logo">OneCode AI</div>
          <h2>{authType === 'cpse' ? 'CPSE Employee Portal' : 'Govt Inter-Agency Portal'}</h2>
          <p>Unified material master and inventory correlation</p>
        </div>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${authType === 'cpse' ? 'active' : ''}`}
            onClick={() => setAuthType('cpse')}
          >
            CPSE Login
          </button>
          <button 
            className={`auth-tab ${authType === 'govt' ? 'active' : ''}`}
            onClick={() => setAuthType('govt')}
          >
            Govt Agency
          </button>
        </div>

        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="input-group">
            <label>Organization</label>
            <select className="auth-input">
                <option>Select Organization</option>
                {authType === 'cpse' ? (
                  <>
                    <option>ONGC</option>
                    <option>Indian Oil</option>
                    <option>NTPC</option>
                    <option>BHEL</option>
                    <option>SAIL</option>
                  </>
                ) : (
                  <>
                    <option>Ministry of Defence</option>
                    <option>Railways</option>
                    <option>NHAI</option>
                    <option>GeM Portal Admin</option>
                  </>
                )}
            </select>
          </div>
          <div className="input-group">
            <label>Employee ID</label>
            <input type="text" className="auth-input" placeholder="Enter your ID" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" className="auth-input" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary auth-btn">Access Portal</button>
        </form>
        
        <div className="auth-footer">
          <p>Initial login or new posting?</p>
          <button className="btn btn-secondary btn-small" onClick={onOnboard}>Complete Setup First</button>
        </div>
      </div>
    </div>
  );
}

function OnboardingPage({ onComplete }) {
  return (
    <div className="auth-container">
      <div className="auth-glass-panel" style={{maxWidth: '600px'}}>
        <div className="auth-header">
          <h2>Registration & Rank Setup</h2>
          <p>Please provide your deployment details for inter-CPSE access mapping.</p>
        </div>
        
        <form className="auth-form grid-form" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
          <div className="input-group full-width">
            <label>Full Name</label>
            <input type="text" className="auth-input" placeholder="e.g. John Doe" required />
          </div>
          <div className="input-group">
            <label>Post / Rank</label>
            <input type="text" className="auth-input" placeholder="e.g. Chief Procurement Officer" required />
          </div>
          <div className="input-group">
            <label>Department</label>
            <select className="auth-input" required>
              <option>Procurement</option>
              <option>Inventory & Maintenance</option>
              <option>Technical/Engineering</option>
              <option>Management</option>
            </select>
          </div>
          <div className="input-group full-width">
            <label>Clearance Level / Role</label>
            <select className="auth-input" required>
              <option>Standard Requestor</option>
              <option>Approver / Technical Committee</option>
              <option>System Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary auth-btn full-width">Save Profile & Continue</button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [authState, setAuthState] = useState('unauthenticated');
  const [activeTab, setActiveTab] = useState('inventory');

  if (authState === 'unauthenticated') {
    return <AuthPage onLogin={() => setAuthState('authenticated')} onOnboard={() => setAuthState('onboarding')} />;
  }

  if (authState === 'onboarding') {
    return <OnboardingPage onComplete={() => setAuthState('authenticated')} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">OneCode AI</div>
        <div className="nav-links">
          <span className={`nav-link ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>Add Inventory</span>
          <span className={`nav-link ${activeTab === 'request' ? 'active' : ''}`} onClick={() => setActiveTab('request')}>Request Inventory</span>
          <span className={`nav-link ${activeTab === 'matching' ? 'active' : ''}`} onClick={() => setActiveTab('matching')}>AI Matching</span>
          <span className={`nav-link ${activeTab === 'governance' ? 'active' : ''}`} onClick={() => setActiveTab('governance')}>Governance</span>
        </div>
        <div className="profile" onClick={() => setAuthState('unauthenticated')} style={{cursor: 'pointer'}} title="Sign Out">
          <div className="avatar" style={{background: 'linear-gradient(135deg, #ef4444, #991b1b)'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'matching' && (
          <>
            <header className="page-header">
              <h1>Selective Matching Pipeline</h1>
              <p className="subtitle">Phase 2: AI-Driven Entity Resolution identifying duplicate and equivalent materials.</p>
            </header>
            <div className="matching-grid">
              <div className="glass-panel candidate-card">
                <h3>Source: SAP Catalog</h3>
                <div className="data-row">
                  <span className="label">Material Code:</span>
                  <span className="value">100-M-992</span>
                </div>
                <div className="data-row">
                  <span className="label">Description:</span>
                  <span className="value text-highlight">Ball Bearing 6205 ZZ C3</span>
                </div>
                <div className="data-row">
                  <span className="label">Specs:</span>
                  <span className="value">Inner Dia 25mm, Outer Dia 52mm, Width 15mm</span>
                </div>
              </div>

              <div className="match-center">
                <div className="confidence-badge">
                  <span className="score">94%</span>
                  <span className="text">Match Probability</span>
                </div>
                <div className="network-path">
                  <div className="dot"></div>
                  <div className="line"></div>
                  <div className="dot"></div>
                </div>
              </div>

              <div className="glass-panel candidate-card">
                <h3>Source: GeM Database</h3>
                <div className="data-row">
                  <span className="label">Material Code:</span>
                  <span className="value">GEM-BBR-502</span>
                </div>
                <div className="data-row">
                  <span className="label">Description:</span>
                  <span className="value text-highlight">Bearing 6205 2Z C3</span>
                </div>
                <div className="data-row">
                  <span className="label">Specs:</span>
                  <span className="value">ID:25, OD:52, W:15, Clearance: C3</span>
                </div>
              </div>
            </div>

            <div className="glass-panel action-panel">
              <h3>Human-in-the-Loop Review</h3>
              <p>The AI suggests these materials are functionally equivalent. Please approve the mapping to a Common National Code.</p>
              <div className="actions">
                <button className="btn btn-primary">Map to Common Code</button>
                <button className="btn btn-secondary">Generate Distinct Item</button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'inventory' && (
          <div className="glass-panel">
            <header className="page-header" style={{ marginBottom: '32px' }}>
              <h2>Add New Inventory</h2>
              <p className="subtitle">Upload or manually enter new materials into the unified database.</p>
            </header>
            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label>Legacy Material Code (if any)</label>
                <input type="text" className="auth-input" placeholder="e.g. BHEL-1102" />
              </div>
              <div className="input-group">
                <label>Material Description</label>
                <input type="text" className="auth-input" placeholder="Describe the item explicitly" />
              </div>
              <div className="input-group">
                <label>Technical Specifications</label>
                <textarea className="auth-input" placeholder="Enter key parameters, e.g., Voltage: 220V, Dimensions..." style={{ minHeight: '100px', resize: 'vertical' }}></textarea>
              </div>
              <div className="input-group">
                <label>Stock Quantity Available</label>
                <input type="number" className="auth-input" placeholder="0" />
              </div>
              <button className="btn btn-primary" style={{ marginTop: '16px', maxWidth: '300px' }}>Submit to Pipeline for Standardization</button>
            </form>
          </div>
        )}

        {activeTab === 'request' && (
          <div className="glass-panel">
            <header className="page-header" style={{ marginBottom: '32px' }}>
              <h2>Request Inventory & Demand Aggregation</h2>
              <p className="subtitle">Search the National Unified Material Master to find cross-CPSE equivalents and pool demand.</p>
            </header>
            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label>Search Unified Code or Description</label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <input type="text" className="auth-input" placeholder="e.g. Bearing 6205, IND-BRG-..." style={{ flex: 1 }} />
                <button className="btn btn-primary">Search</button>
              </div>
            </div>
            
            <div className="results-grid">
              <div className="glass-panel candidate-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, padding: 0, border: 'none' }}>Common Code: IND-BRG-6205</h3>
                  <span style={{ padding: '8px 12px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontSize: '0.8rem', fontWeight: 600 }}>Available across 3 Agencies</span>
                </div>
                <div className="data-row" style={{ marginTop: '16px' }}>
                  <span className="label">Standardized Description:</span>
                  <span className="value">Ball Bearing 6205 ZZ C3</span>
                </div>
                <div className="data-row">
                  <span className="label">Total Pooled Inventory within Network:</span>
                  <span className="value text-highlight">1,240 Units</span>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary">Initiate Inter-CPSE Transfer</button>
                  <button className="btn btn-secondary">Add to Aggregated Procurement</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'governance' && (
          <div className="glass-panel">
            <header className="page-header" style={{ marginBottom: '32px' }}>
              <h2>Governance & Audit</h2>
              <p className="subtitle">Audit trail and Technical Committee approvals.</p>
            </header>
            <p style={{ color: 'var(--text-secondary)' }}>You are fully caught up. No pending mappings for review.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
