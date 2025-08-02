import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SEO from '../SEO';
import './ComingSoon.css';
import '../../fonts/fonts.css';

const ComingSoon = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page name from the URL
  const getPageName = () => {
    const path = location.pathname.slice(1);
    if (!path) return 'This Page';
    
    const pageNames = {
      'gallery': 'Gallery',
      'workshops': 'Workshops', 
      'events': 'Events',
      'artists': 'Artists',
      'artblogs': 'Art Blogs',
      'contact': 'Contact',
      'about': 'About Us'
    };
    
    return pageNames[path] || 'This Page';
  };

  const getPageInfo = (pageName) => {
    const pageData = {
      'gallery': {
        title: 'Art Gallery',
        description: 'Explore our curated collection of traditional and contemporary Indian art',
        icon: '🎨'
      },
      'workshops': {
        title: 'Art Workshops', 
        description: 'Interactive workshops with master artists and traditional techniques',
        icon: '🖌️'
      },
      'events': {
        title: 'Cultural Events',
        description: 'Art exhibitions, cultural festivals, and community gatherings', 
        icon: '🎭'
      },
      'artists': {
        title: 'Featured Artists',
        description: 'Discover talented artists and their incredible artistic journeys',
        icon: '👨‍🎨'
      },
      'artblogs': {
        title: 'Art Blogs',
        description: 'Insights, stories, and knowledge from the world of Indian art',
        icon: '📚'
      },
      'contact': {
        title: 'Contact Us',
        description: 'Get in touch with our team for visits, partnerships, and inquiries',
        icon: '📞'
      },
      'about': {
        title: 'About Kalakritam',
        description: 'Our story, mission, and vision for preserving Indian artistic heritage',
        icon: '🏛️'
      }
    };

    const path = location.pathname.slice(1);
    return pageData[path] || {
      title: 'New Section',
      description: 'Exciting new features coming to Kalakritam',
      icon: '✨'
    };
  };

  const pageInfo = getPageInfo();

  useEffect(() => {
    // Update page title
    document.title = `${pageInfo.title} - Coming Soon | Kalakritam`;
    
    // Auto-redirect to home after 8 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 8000);

    return () => clearTimeout(timer);
  }, [location, navigate, pageInfo.title]);

  return (
    <>
      <SEO 
        title={`${pageInfo.title} - Coming Soon | Kalakritam`}
        description={`${pageInfo.description}. This section is currently under development. Stay tuned for an amazing experience at Kalakritam.`}
        keywords={`Kalakritam, ${location.pathname.slice(1)}, coming soon, Indian art, development, ${pageInfo.title.toLowerCase()}`}
        url={location.pathname}
        noindex={true}
      />
      
      <div className="coming-soon-container">
      <Header currentPage={location.pathname.slice(1)} />
      
      <main className="coming-soon-content">
        <div className="coming-soon-hero">
          <div className="coming-soon-animation">
            <div className="kalakritam-logo">
              <h1 className="kalakritam-title">Kalakritam</h1>
              <p className="kalakritam-subtitle">Manifesting Through Art</p>
            </div>
            
            <div className="development-status">
              <div className="status-icon">
                <div className="paintbrush-icon">🎨</div>
              </div>
              
              <h2 className="status-title">
                {getPageName()} is Under Development
              </h2>
              
              <p className="status-description">
                We're carefully crafting the <strong>{getPageName().toLowerCase()}</strong> experience 
                to bring you the finest in Indian art and culture. Our artisans are working 
                diligently to create something truly magnificent for you.
              </p>
              
              <div className="progress-container">
                <div className="progress-label">Development Progress</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <div className="progress-percentage">75%</div>
              </div>
            </div>
            
            <div className="expected-features">
              <h3>What to Expect:</h3>
              <ul className="features-list">
                {getFeaturesList(getPageName())}
              </ul>
            </div>
            
            <div className="cta-section">
              <p className="cta-text">
                Meanwhile, explore our home page to discover the world of Kalakritam
              </p>
              <div className="cta-buttons">
                <button 
                  className="cta-button primary"
                  onClick={() => navigate('/home')}
                >
                  Explore Home
                </button>
                <button 
                  className="cta-button secondary"
                  onClick={() => alert('Newsletter signup coming soon!')}
                >
                  Notify Me When Ready
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="development-timeline">
          <h3>Development Timeline</h3>
          <div className="timeline-items">
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Foundation</h4>
                <p>Basic structure and design system</p>
                <span className="timeline-status">Completed</span>
              </div>
            </div>
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Home Page</h4>
                <p>Main landing page with intro video</p>
                <span className="timeline-status">Completed</span>
              </div>
            </div>
            <div className="timeline-item in-progress">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>{getPageName()}</h4>
                <p>Currently under development</p>
                <span className="timeline-status">In Progress</span>
              </div>
            </div>
            <div className="timeline-item upcoming">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Full Launch</h4>
                <p>Complete Kalakritam experience</p>
                <span className="timeline-status">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
    </>
  );
};

// Helper function to get features list based on page
const getFeaturesList = (pageName) => {
  const features = {
    'Gallery': [
      'Curated collection of traditional Indian art',
      'Interactive virtual gallery tours',
      'High-resolution artwork viewing',
      'Artist information and artwork history'
    ],
    'Workshops': [
      'Live and recorded art workshops',
      'Step-by-step tutorials by master artists',
      'Interactive learning experiences',
      'Certification programs'
    ],
    'Events': [
      'Art exhibitions and cultural events',
      'Artist meet and greet sessions',
      'Cultural festivals and celebrations',
      'Community art competitions'
    ],
    'Artists': [
      'Featured artist profiles and portfolios',
      'Artist interviews and stories',
      'Emerging talent showcase',
      'Artist collaboration opportunities'
    ],
    'Art Blogs': [
      'In-depth articles on Indian art forms',
      'Art history and cultural insights',
      'Artist spotlights and interviews',
      'Art technique tutorials'
    ],
    'Contact': [
      'Multiple ways to reach our team',
      'Visit planning and booking system',
      'Partnership and collaboration inquiries',
      'Customer support and assistance'
    ],
    'About Us': [
      'Our mission and vision',
      'Team and leadership profiles',
      'Kalakritam history and journey',
      'Our impact on Indian art community'
    ]
  };

  const defaultFeatures = [
    'Rich, immersive user experience',
    'Beautiful, responsive design',
    'Accessibility and inclusion focused',
    'Mobile-optimized interface'
  ];

  return (features[pageName] || defaultFeatures).map((feature, index) => (
    <li key={index}>{feature}</li>
  ));
};

export default ComingSoon;
