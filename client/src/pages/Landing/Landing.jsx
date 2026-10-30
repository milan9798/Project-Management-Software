       
//  import React, { useState } from 'react';
// import './Landing.css';
// import CircularWorkflow from "../../components/CircularWorkflow/CircularWorkflow";
// import toplandLogo from "../../assets/icon.png";
// export default function Landing({ onNavigateToLogin }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
// const scrollToSection = (id) => {
//   const element = document.getElementById(id);

//   if (element) {
//     element.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   }

//   setMobileMenuOpen(false);
// };


//   return (
//     <div className="landing-container">

//       {/* 1. Premium Navbar */}

//       <nav className="landing-navbar">
//         <div className="nav-brand" onClick={() => scrollToSection('hero')}>

//                    <img
//                     src={toplandLogo}
//                          alt="Topland Engine Logo"
//                             className="nav-logo-img"
//                                onError={(e) => {
//                            console.error("Topland logo load nahi hua:", e.currentTarget.src);
//                                  }}
//                              />


//           <div className="brand-text">
//             <span className="brand-title">TOPLAND ENGINE</span>
//             <span className="brand-subtitle">PRIVATE LIMITED</span>
//           </div>
//         </div>

//         <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
//           <button onClick={() => scrollToSection('hero')} className="nav-link-btn">Home</button>
//           <button onClick={() => scrollToSection('capabilities')} className="nav-link-btn">Capabilities</button>
//           <button onClick={() => scrollToSection('workflow')} className="nav-link-btn">Workflow</button>
//           <button onClick={() => scrollToSection('about')} className="nav-link-btn">About</button>
//         </div>

//         <div className="nav-actions">
//           <button className="btn-login-outline" onClick={onNavigateToLogin}>
//             Log In
//           </button>
//           <button 
//             className="mobile-menu-toggle" 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle navigation menu"
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//         </div>
//       </nav>

//       {/* 2. Hero Section */}

//       <header id="hero" className="hero-section">
//         <div className="hero-content">
//           <div className="hero-badge">
//             <span className="pulse-dot"></span> Enterprise Steel Fabrication ERP
//           </div>
//           <h1 className="hero-headline">
//             Precision Engineering & <span className="highlight-text">Fabrication Control</span>
//           </h1>
//           <p className="hero-description">
//             An intelligent project management ecosystem built specifically for heavy fabrication and manufacturing operations. Track production lifecycles, structural BOMs, and dispatch execution with absolute precision.
//           </p>
//           <div className="hero-cta-group">
//             <button className="btn-primary" onClick={() => scrollToSection('showcase')}>
//               Explore Platform <span className="arrow">→</span>
//             </button>
//             <button className="btn-secondary" onClick={onNavigateToLogin}>
//               Log In to Portal
//             </button>
//           </div>
//         </div>


// {/* 

//         <div className="hero-visual">
//           <div className="erp-mini-preview">
//             <div className="preview-header">
//               <span className="dot red"></span>
//               <span className="dot yellow"></span>
//               <span className="dot green"></span>
//               <span className="preview-title">topland-erp-core.exe [LIVE SIMULATION]</span>
//             </div>
//             <div className="preview-body">
//               <div className="metric-row">
//                 <div className="metric-card">
//                   <span className="m-label">Active Structures</span>
//                   <span className="m-val">28 Units</span>
//                 </div>
//                 <div className="metric-card">
//                   <span className="m-label">Shop Floor Load</span>
//                   <span className="m-val">84.2%</span>
//                 </div>
//               </div>
//               <div className="progress-container-preview">
//                 <div className="prog-info">
//                   <span>BOM & Fabrication Status</span>
//                   <span className="text-blue">On Schedule</span>
//                 </div>
//                 <div className="progress-bar-bg">
//                   <div className="progress-bar-fill" style={{ width: '78%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}

        
        
//         <div className="hero-visual">
//           <div className="hero-workflow-preview">
//             <CircularWorkflow />
//           </div>
//         </div>


//       </header>

//       {/* 3. ERP Product Showcase */}

//       <section id="showcase" className="showcase-section">

//         <div className="section-header">
//           <h2>Enterprise Control Center</h2>
//           <p>Real-time visibility across engineering, material planning, fabrication bays, and dispatch yards.</p>
//           <span className="sample-badge">[ Illustrative / Sample Data for Demonstration ]</span>

//         </div>

//         <div className="showcase-grid">
//           <div className="showcase-card">
//             <div className="sc-header">
//               <span>Project Tracker #TP-9042</span>
//               <span className="badge-status in-progress">In Fabrication</span>
//             </div>
//             <div className="sc-body">
//               <div className="data-row"><span>Client Ref:</span> <strong>Industrial Heavy Structs</strong></div>
//               <div className="data-row"><span>Order Tonnage:</span> <strong>450 Metric Tons</strong></div>
//               <div className="data-row"><span>Current Stage:</span> <strong>Welding & NDT Inspection</strong></div>
//             </div>
//           </div>

//           <div className="showcase-card">
//             <div className="sc-header">
//               <span>BOM & Material Yield</span>
//               <span className="badge-status optimized">Optimized</span>
//             </div>
//             <div className="sc-body">
//               <div className="data-row"><span>Steel Grade:</span> <strong>E350 / IS 2062</strong></div>
//               <div className="data-row"><span>Plate Allocation:</span> <strong>120 Tonnes Issued</strong></div>
//               <div className="data-row"><span>Scrap Efficiency:</span> <strong>94.8% Yield</strong></div>
//             </div>
//           </div>

//           <div className="showcase-card">
//             <div className="sc-header">
//               <span>Dispatch & Logistics</span>
//               <span className="badge-status dispatched">Ready / Loading</span>
//             </div>
//             <div className="sc-body">
//               <div className="data-row"><span>Consignment:</span> <strong>Truss Assemblies Set A</strong></div>
//               <div className="data-row"><span>Vehicle Tag:</span> <strong>GJ-12-AZ-4410</strong></div>
//               <div className="data-row"><span>Gate Pass:</span> <strong>Approved #GP-889</strong></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 4. Core Capabilities */}

//       <section id="capabilities" className="capabilities-section">
//         <div className="section-header">
//           <h2>Core Industrial Capabilities</h2>
//           <p>Engineered to handle complex workflows unique to heavy fabrication environments.</p>
//         </div>

//         <div className="capabilities-grid">
//           <div className="capability-card">
//             <div className="icon-box">⚙️</div>
//             <h3>Project Management</h3>
//             <p>End-to-end tracking of fabrication milestones, resource allocation, and shop-floor timeline adherence.</p>
//           </div>
//           <div className="capability-card">
//             <div className="icon-box">📐</div>
//             <h3>Design & BOM</h3>
//             <p>Seamless bill of materials management, structural drawing integration, and raw material grade tracing.</p>
//           </div>
//           <div className="capability-card">
//             <div className="icon-box">🚛</div>
//             <h3>Dispatch Management</h3>
//             <p>Automated gate pass generation, heavy vehicle loading logs, and automated dispatch documentation.</p>
//           </div>
//         </div>
//       </section>

//       {/* 5. Connected Workflow */}

//       <section id="workflow" className="workflow-section">

//         <div className="section-header">

//           <h2>Connected Operational Workflow</h2>
//           <p>Seamless transition from initial planning and engineering to fabrication, testing, and final dispatch.</p>

//         </div>

//         <div className="workflow-wrapper">
//           <CircularWorkflow />
//         </div>
//       </section>

//       {/* 6. Built for Fabrication */}

//       <section className="built-for-fab-section">
//         <div className="fab-container">
//           <div className="fab-text-content">
//             <h2>Built Specifically for Heavy Fabrication</h2>
//             <p>
//               Standard enterprise software fails to capture the nuances of heavy steel manufacturing—from plate cutting optimization and welding quality logs to structural tonnage calculations. Topland Engine ERP bridges the gap between engineering drawings and shop-floor execution.
//             </p>
//             <ul className="fab-list">
//               <li>✓ Real-time shop floor progress monitoring</li>
//               <li>✓ Strict material traceability and grade verification</li>
//               <li>✓ Streamlined coordination between engineering and dispatch</li>
//             </ul>
//           </div>
//           <div className="fab-graphic-box">
//             <div className="stat-box-large">
//               <span className="stat-num">100%</span>
//               <span className="stat-txt">Digital Traceability for Structural Components</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 7. About TOPLAND ENGINE */}

//       <section id="about" className="about-section">
//         <div className="section-header">
//           <h2>About Topland Engine Private Limited</h2>
//           <p>Excellence in heavy manufacturing, fabrication engineering, and industrial infrastructure solutions.</p>
//         </div>
//         <div className="about-card-single">
//           <p>
//             Topland Engine Private Limited stands at the forefront of industrial fabrication and precision manufacturing. Driven by technical rigor and uncompromising quality standards, our facilities execute complex structural fabrication projects with complete adherence to international engineering codes. This proprietary Enterprise Resource Planning system anchors our operational backbone, ensuring absolute transparency and efficiency across every manufacturing cycle.
//           </p>
//         </div>
//       </section>

//       {/* 8. Final CTA and Footer */}

//       <section className="final-cta-section">
//         <div className="final-cta-box">
//           <h2>Ready to Optimize Your Manufacturing Operations?</h2>
//           <p>Access the secure enterprise portal to manage active projects, fabrication schedules, and dispatch logs.</p>
//           <button className="btn-primary large" onClick={onNavigateToLogin}>
//             Log In to Enterprise Portal
//           </button>
//         </div>
//       </section>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <div className="footer-brand">

//            <img
//                   src={toplandLogo}
//                 alt="Topland Engine Logo"
//                     className="footer-logo"
//                   />


//             <span>TOPLAND ENGINE PRIVATE LIMITED</span>
//           </div>
//           <p className="copyright">
//             © {new Date().getFullYear()} TOPLAND ENGINE PRIVATE LIMITED. All rights reserved. Secure Enterprise Environment.
//           </p>
//         </div>
//       </footer>

//     </div>

//   );

// } 













import React, { useState } from 'react';

import "./Landing.css";

import toplandLogo from "../../assets/icon.png";

import CircularWorkflow from "../../components/CircularWorkflow/CircularWorkflow";



export default function Landing({ onNavigateToLogin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (

    <div className="landing-container">
      {/* 1. Premium Navbar */}
      <nav className="landing-navbar">
        <div className="nav-brand" onClick={() => scrollToSection('hero')}>

          <img
           src={toplandLogo}
                  alt="Topland Engine Logo"
                   className="nav-logo-img"
                     />


          <div className="brand-text">
            <span className="brand-title">TOPLAND ENGINE</span>
            <span className="brand-subtitle">PRIVATE LIMITED</span>
          </div>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <button onClick={() => scrollToSection('hero')} className="nav-link-btn">Home</button>
          <button onClick={() => scrollToSection('capabilities')} className="nav-link-btn">Capabilities</button>
          <button onClick={() => scrollToSection('workflow')} className="nav-link-btn">Workflow</button>
          <button onClick={() => scrollToSection('about')} className="nav-link-btn">About</button>
        </div>

        <div className="nav-actions">
          <button className="btn-login-outline" onClick={onNavigateToLogin}>
            Log In
          </button>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span> Enterprise Steel Fabrication ERP
          </div>
          <h1 className="hero-headline">
            Precision Engineering & <span className="highlight-text">Fabrication Control</span>
          </h1>
          <p className="hero-description">
            An intelligent project management ecosystem built specifically for heavy fabrication and manufacturing operations. Track production lifecycles, structural BOMs, and dispatch execution with absolute precision.
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => scrollToSection('showcase')}>
              Explore Platform <span className="arrow">→</span>
            </button>
            <button className="btn-secondary" onClick={onNavigateToLogin}>
              Log In to Portal
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="erp-mini-preview">
            <div className="preview-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="preview-title">topland-erp-core.exe [LIVE SIMULATION]</span>
            </div>
            <div className="preview-body">
              <div className="metric-row">
                <div className="metric-card">
                  <span className="m-label">Active Structures</span>
                  <span className="m-val">28 Units</span>
                </div>
                <div className="metric-card">
                  <span className="m-label">Shop Floor Load</span>
                  <span className="m-val">84.2%</span>
                </div>
              </div>
              <div className="progress-container-preview">
                <div className="prog-info">
                  <span>BOM & Fabrication Status</span>
                  <span className="text-blue">On Schedule</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. ERP Product Showcase */}
      <section id="showcase" className="showcase-section">
        <div className="section-header">
          <h2>Enterprise Control Center</h2>
          <p>Real-time visibility across engineering, material planning, fabrication bays, and dispatch yards.</p>
          <span className="sample-badge">[ Illustrative / Sample Data for Demonstration ]</span>
        </div>

        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="sc-header">
              <span>Project Tracker #TP-9042</span>
              <span className="badge-status in-progress">In Fabrication</span>
            </div>
            <div className="sc-body">
              <div className="data-row"><span>Client Ref:</span> <strong>Industrial Heavy Structs</strong></div>
              <div className="data-row"><span>Order Tonnage:</span> <strong>450 Metric Tons</strong></div>
              <div className="data-row"><span>Current Stage:</span> <strong>Welding & NDT Inspection</strong></div>
            </div>
          </div>

          <div className="showcase-card">
            <div className="sc-header">
              <span>BOM & Material Yield</span>
              <span className="badge-status optimized">Optimized</span>
            </div>
            <div className="sc-body">
              <div className="data-row"><span>Steel Grade:</span> <strong>E350 / IS 2062</strong></div>
              <div className="data-row"><span>Plate Allocation:</span> <strong>120 Tonnes Issued</strong></div>
              <div className="data-row"><span>Scrap Efficiency:</span> <strong>94.8% Yield</strong></div>
            </div>
          </div>

          <div className="showcase-card">
            <div className="sc-header">
              <span>Dispatch & Logistics</span>
              <span className="badge-status dispatched">Ready / Loading</span>
            </div>
            <div className="sc-body">
              <div className="data-row"><span>Consignment:</span> <strong>Truss Assemblies Set A</strong></div>
              <div className="data-row"><span>Vehicle Tag:</span> <strong>GJ-12-AZ-4410</strong></div>
              <div className="data-row"><span>Gate Pass:</span> <strong>Approved #GP-889</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities */}
      <section id="capabilities" className="capabilities-section">
        <div className="section-header">
          <h2>Core Industrial Capabilities</h2>
          <p>Engineered to handle complex workflows unique to heavy fabrication environments.</p>
        </div>

        <div className="capabilities-grid">
          <div className="capability-card">
            <div className="icon-box">⚙️</div>
            <h3>Project Management</h3>
            <p>End-to-end tracking of fabrication milestones, resource allocation, and shop-floor timeline adherence.</p>
          </div>
          <div className="capability-card">
            <div className="icon-box">📐</div>
            <h3>Design & BOM</h3>
            <p>Seamless bill of materials management, structural drawing integration, and raw material grade tracing.</p>
          </div>
          <div className="capability-card">
            <div className="icon-box">🚛</div>
            <h3>Dispatch Management</h3>
            <p>Automated gate pass generation, heavy vehicle loading logs, and automated dispatch documentation.</p>
          </div>
        </div>
      </section>

      {/* 5. Connected Workflow */}
      <section id="workflow" className="workflow-section">
        <div className="section-header">
          <h2>Connected Operational Workflow</h2>
          <p>Seamless transition from initial planning and engineering to fabrication, testing, and final dispatch.</p>
        </div>
        <div className="workflow-wrapper">
          <CircularWorkflow />
        </div>
      </section>

      {/* 6. Built for Fabrication */}
      <section className="built-for-fab-section">
        <div className="fab-container">
          <div className="fab-text-content">
            <h2>Built Specifically for Heavy Fabrication</h2>
            <p>
              Standard enterprise software fails to capture the nuances of heavy steel manufacturing—from plate cutting optimization and welding quality logs to structural tonnage calculations. Topland Engine ERP bridges the gap between engineering drawings and shop-floor execution.
            </p>
            <ul className="fab-list">
              <li>✓ Real-time shop floor progress monitoring</li>
              <li>✓ Strict material traceability and grade verification</li>
              <li>✓ Streamlined coordination between engineering and dispatch</li>
            </ul>
          </div>
          <div className="fab-graphic-box">
            <div className="stat-box-large">
              <span className="stat-num">100%</span>
              <span className="stat-txt">Digital Traceability for Structural Components</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. About TOPLAND ENGINE */}
      <section id="about" className="about-section">
        <div className="section-header">
          <h2>About Topland Engine Private Limited</h2>
          <p>Excellence in heavy manufacturing, fabrication engineering, and industrial infrastructure solutions.</p>
        </div>
        <div className="about-card-single">
          <p>
            Topland Engine Private Limited stands at the forefront of industrial fabrication and precision manufacturing. Driven by technical rigor and uncompromising quality standards, our facilities execute complex structural fabrication projects with complete adherence to international engineering codes. This proprietary Enterprise Resource Planning system anchors our operational backbone, ensuring absolute transparency and efficiency across every manufacturing cycle.
          </p>
        </div>
      </section>


      {/* 8. Final CTA and Footer */}
      
      <section className="final-cta-section">
        <div className="final-cta-box">
          <h2>Ready to Optimize Your Manufacturing Operations?</h2>
          <p>Access the secure enterprise portal to manage active projects, fabrication schedules, and dispatch logs.</p>
          <button className="btn-primary large" onClick={onNavigateToLogin}>
            Log In to Enterprise Portal
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">


                   <img 
                     src={toplandLogo}
                           alt="Topland Logo"
                        className="footer-logo"
                       />

            <span>TOPLAND ENGINE PRIVATE LIMITED</span>

          </div>

          <p className="copyright">
            © {new Date().getFullYear()} TOPLAND ENGINE PRIVATE LIMITED. All rights reserved. Secure Enterprise Environment.
          </p>
        </div>
      </footer>
    </div>
  );
}