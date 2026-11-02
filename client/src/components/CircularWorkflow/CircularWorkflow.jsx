
import React from 'react';
import './CircularWorkflow.css';

export default function CircularWorkflow() {
  return (
    <div className="circular-workflow-container">
      <div className="workflow-orbit-wrapper">
        
        {/* Center Core Node (Static in the middle) */}

        <div className="center-node">
          <div className="core-logo-box">
            <img src="/icon.png" alt="Topland Core" className="core-icon-img" onError={(e)=>{e.target.style.display='none'}} />
            <span className="core-text-fallback">TOPLAND</span>
            <span className="core-dot-blue"></span>
          </div>
        </div> 

        {/* Rotating Orbit System (Properly Un-commented and wrapping everything) */}
        <div className="rotating-orbit-system">
          
          {/* SVG Dotted Ring & Connector Rays */}

          <svg className="orbit-svg-layer" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="170" className="orbit-ring-circle" />
            <line x1="250" y1="250" x2="420" y2="150" className="ray-line" />
            <line x1="250" y1="250" x2="420" y2="350" className="ray-line" />
            <line x1="250" y1="250" x2="250" y2="420" className="ray-line" />
            <line x1="250" y1="250" x2="80" y2="350" className="ray-line" />
            <line x1="250" y1="250" x2="80" y2="150" className="ray-line" />
            <line x1="250" y1="250" x2="250" y2="80" className="ray-line" />
            <line x1="250" y1="250" x2="360" y2="80" className="ray-line" />
          </svg> 

          {/* 7 Orbiting Module Cards */}

          <div className="node-item pos-1">
            <div className="node-card">
              <span className="node-title">Project Mgmt</span>
              <span className="node-val">98.4%</span>
              <span className="node-desc">Active Status</span>
              <div className="node-top-dot"></div>
            </div>
          </div>

          <div className="node-item pos-2">
            <div className="node-card">
              <span className="node-title">Design & BOM</span>
              <span className="node-val">+5.1%</span>
              <span className="node-desc">Yield Rate</span>
              <div className="node-top-dot"></div>
            </div>
          </div>

          <div className="node-item pos-3">
            <div className="node-card">
              <span className="node-title">Engineering</span>
              <span className="node-val">345</span>
              <span className="node-desc">Structs Ready</span>
              <div className="node-top-dot"></div>
            </div>
          </div>

          <div className="node-item pos-4">
            <div className="node-card">
              <span className="node-title">Fabrication</span>
              <span className="node-val">96.8%</span>
              <span className="node-desc">Shop Load</span>
              <div className="node-top-dot"></div>
            </div>
          </div>

          <div className="node-item pos-5">
            <div className="node-card">
              <span className="node-title">Quality & NDT</span>
              <span className="node-val">$2.5M</span>
              <span className="node-desc">Pipeline Val</span>
              <div className="node-top-dot"></div>
            </div>
          </div>

          <div className="node-item pos-6">
            <div className="node-card">
              <span className="node-title">Shop Floor</span>
              <span className="node-val">19 Live</span>
              <span className="node-desc">Signals</span>
              <div className="node-top-dot"></div>
            </div>
          </div>

          <div className="node-item pos-7">
            <div className="node-card">
              <span className="node-title">Dispatch Yard</span>
              <span className="node-val">99.3%</span>
              <span className="node-desc">Cleared</span>
              <div className="node-top-dot"></div>
            </div>
          </div>

     

        </div> {/* Closing rotating-orbit-system */}

      </div>
    </div>
  );
}



