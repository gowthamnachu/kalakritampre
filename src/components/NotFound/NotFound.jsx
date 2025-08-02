import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SEO from '../SEO';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <SEO 
        title="Page Not Found - Kalakritam"
        description="The page you're looking for doesn't exist. Explore Kalakritam's art gallery, workshops, and cultural experiences."
        url="/404"
        noindex={true}
      />
      
      <div className="not-found-container">
        <Header />
        
        <main className="not-found-content">
          <div className="not-found-hero">
            <div className="kalakritam-logo">
              <h1 className="kalakritam-title">Kalakritam</h1>
              <p className="kalakritam-subtitle">Manifesting Through Art</p>
            </div>
            
            <div className="error-message">
              <div className="error-code">404</div>
              <h2 className="error-title">Artistic Journey Interrupted</h2>
              <p className="error-description">
                It seems the page you're seeking has wandered off like a brush stroke on canvas. 
                Let us guide you back to the beautiful world of Kalakritam.
              </p>
              
              <div className="cta-buttons">
                <button 
                  className="cta-button primary"
                  onClick={() => navigate('/home')}
                >
                  Return Home
                </button>
                <button 
                  className="cta-button secondary"
                  onClick={() => navigate('/gallery')}
                >
                  Explore Gallery
                </button>
              </div>
            </div>
            
            <div className="suggestions">
              <h3>Continue Your Artistic Journey</h3>
              <div className="suggestion-links">
                <button onClick={() => navigate('/gallery')} className="suggestion-btn">
                  🎨 Art Gallery
                </button>
                <button onClick={() => navigate('/workshops')} className="suggestion-btn">
                  🖌️ Workshops
                </button>
                <button onClick={() => navigate('/events')} className="suggestion-btn">
                  🎭 Events
                </button>
                <button onClick={() => navigate('/artists')} className="suggestion-btn">
                  👨‍🎨 Artists
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
