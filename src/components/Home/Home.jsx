import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SEO from '../SEO';
import './Home.css';
import '../../fonts/fonts.css';

const Home = () => {
  const [showVideoLogo, setShowVideoLogo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if video was completed or if we're coming from intro
    const videoCompleted = sessionStorage.getItem('videoCompleted');
    const fromIntro = sessionStorage.getItem('fromIntro');
    
    if (videoCompleted || fromIntro) {
      setShowVideoLogo(true);
      // Set a flag that we've shown the logo
      sessionStorage.setItem('logoShown', 'true');
      // Clear the temporary flags
      sessionStorage.removeItem('videoCompleted');
      sessionStorage.removeItem('fromIntro');
    } else {
      // Check if logo was already shown in this session
      const logoShown = sessionStorage.getItem('logoShown');
      if (logoShown) {
        setShowVideoLogo(true);
      }
    }

    // Add performance marks for analytics
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark('kalakritam-home-loaded');
    }

    // Simplified structured data - removed complex schemas that cause validation errors
    // Logo is already handled in index.html Organization schema
    
    // Cleanup function for any existing structured data scripts
    return () => {
      // Remove any injected scripts when component unmounts
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.text && (script.text.includes('kalakritam.com/#organization') || script.text.includes('ArtGallery'))) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <>
      <SEO 
        title="Kalakritam - Manifesting Through Art"
        description="Discover Kalakritam - Manifesting Through Art. Experience our curated collection of traditional and contemporary Indian artworks, join immersive workshops, and connect with India's vibrant artistic community."
        keywords="Kalakritam, Indian art gallery, traditional kala art, contemporary kritam, Madhubani paintings, Warli art, Tanjore paintings, Indian cultural heritage, art workshops, art exhibitions, Indian artists, art community, art education, cultural tours, artist residency"
        url="/"
      />
      
      <div className="home-container">
      {/* Video Logo in top-left corner */}
      {showVideoLogo && (
        <div className="video-logo-container">
          <video
            className="video-logo"
            muted
            loop
            autoPlay
            playsInline
          >
            <source src="/intro-video.mp4" type="video/mp4" />
          </video>
        </div>
      )}
      
      <Header currentPage="home" />
      
      <main className="home-content">
        <section className="hero-section">
          <div className="hero-text">
            <h2>Discover the Art of Creation</h2>
            <h3>Experience Kalakritam</h3>
            <p>
              Kalakritam is India's premier destination for exploring the magnificent world of traditional <strong>kala</strong> (art) 
              and contemporary <strong>kritam</strong> (creation). Our curated gallery showcases the finest collection of 
              Indian artistic heritage, from ancient traditional paintings and sculptures to innovative modern masterpieces. 
              Join us on this extraordinary journey through India's rich cultural landscape and artistic evolution spanning centuries.
            </p>
            <div className="cta-buttons">
              <button 
                className="cta-button primary" 
                aria-label="Start exploring Kalakritam art gallery"
                onClick={() => navigate('/gallery')}
              >
                Explore Gallery
              </button>
              <button 
                className="cta-button secondary" 
                aria-label="Learn about Kalakritam workshops"
                onClick={() => navigate('/workshops')}
              >
                Join Workshops
              </button>
            </div>
          </div>
        </section>
        
        <section className="features-section">
          <h2 className="section-title">Experience Indian Art at Kalakritam</h2>
          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Traditional Kala Gallery</h3>
              <p>Explore our curated collection of traditional Indian art forms including Madhubani, Warli, 
              Tanjore paintings, Pichwai, and classical sculptures. Each piece represents centuries of artistic heritage 
              and cultural significance in Indian art history, carefully preserved and presented.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🖌️</div>
              <h3>Contemporary Kritam Workshops</h3>
              <p>Learn from master artists in our interactive workshops featuring modern art techniques, 
              digital art creation, fusion styles, and mixed media. Perfect for beginners and advanced artists seeking 
              to explore contemporary Indian art expressions and develop their unique voice.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Kalakritam Community</h3>
              <p>Connect with fellow art enthusiasts, collectors, and creators in India's most vibrant 
              art community. Share your passion for Indian art, participate in exhibitions, discover 
              emerging talents, and build lasting relationships in the Kalakritam network.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Cultural Heritage Tours</h3>
              <p>Experience guided tours through our gallery spaces, learning about the historical context, 
              techniques, and stories behind each masterpiece. Our expert curators share insights into the 
              evolution of Indian art and its cultural significance across different regions.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Artist Residency Program</h3>
              <p>Supporting emerging and established artists through our residency program, providing workspace, 
              mentorship, and exhibition opportunities. We foster creativity and innovation while preserving 
              traditional techniques and encouraging experimental approaches.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Art Education & Research</h3>
              <p>Comprehensive educational programs, art history courses, and research initiatives dedicated 
              to documenting and preserving Indian artistic traditions. Access to our extensive library and 
              archives for scholars, students, and art enthusiasts.</p>
            </article>
          </div>
        </section>

        <section className="about-section">
          <h2>About Kalakritam - Preserving Indian Artistic Heritage</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Kalakritam, derived from the Sanskrit words <em>kala</em> (art/skill) and <em>kritam</em> (creation/work), 
                represents our commitment to preserving and promoting Indian art forms. Founded with the vision of 
                bridging traditional Indian artistry with contemporary expressions, we serve as a cultural hub 
                for art lovers, collectors, and creators across India and beyond.
              </p>
              <p>
                Our gallery features over 500 masterpieces spanning various Indian art forms, regional styles, 
                and time periods. From ancient temple art and miniature paintings to modern Indian contemporary works, 
                Kalakritam offers an immersive experience in India's artistic journey through the ages.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Artworks</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Artists</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">25+</div>
                  <div className="stat-label">Art Forms</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Years Legacy</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2 className="section-title">What Our Visitors Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Kalakritam opened my eyes to the incredible depth of Indian art. The curated collection and 
                knowledgeable guides made my visit truly memorable."</p>
              </div>
              <div className="testimonial-author">
                <strong>Priya Sharma</strong>
                <span>Art Enthusiast</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The workshops at Kalakritam are exceptional. I learned traditional Madhubani techniques 
                while exploring my own contemporary style. Highly recommended!"</p>
              </div>
              <div className="testimonial-author">
                <strong>Rajesh Kumar</strong>
                <span>Workshop Participant</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"As an artist, finding Kalakritam was transformative. The community here supports creativity 
                while honoring our rich artistic traditions."</p>
              </div>
              <div className="testimonial-author">
                <strong>Anita Desai</strong>
                <span>Resident Artist</span>
              </div>
            </div>
          </div>
        </section>

        <section className="call-to-action-section">
          <div className="cta-content">
            <h2>Begin Your Artistic Journey</h2>
            <p>Join thousands of art lovers who have discovered the magic of Kalakritam. 
            Whether you're a collector, artist, or simply appreciate beautiful art, we welcome you to our community.</p>
            <div className="cta-buttons">
              <button 
                className="cta-button primary"
                onClick={() => navigate('/contact')}
              >
                Plan Your Visit
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => navigate('/contact')}
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
    </>
  );
};

export default Home;
