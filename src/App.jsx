import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Only load IntroVideo, Home and ComingSoon components with proper error handling
const IntroVideo = React.lazy(() => import('./components/IntroVideo'));
const Home = React.lazy(() => import('./components/Home'));
const ComingSoon = React.lazy(() => import('./components/ComingSoon'));
const NotFound = React.lazy(() => import('./components/NotFound'));

// Lazy loading fallback component
const LazyLoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#002f2f',
    color: '#c38f21',
    fontSize: '1.2rem',
    fontFamily: 'Samarkan, serif'
  }}>
    Loading Kalakritam...
  </div>
)

// Error boundary for lazy loading errors
class LazyLoadingErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
    // Only redirect if it's a critical error and we're not already on home
    if (window.location.pathname !== '/home' && window.location.pathname !== '/') {
      setTimeout(() => {
        window.location.href = '/home';
      }, 5000); // Increased delay to 5 seconds
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#002f2f',
          color: '#c38f21',
          textAlign: 'center',
          fontFamily: 'Samarkan, serif',
          padding: '2rem'
        }}>
          <h1 style={{ marginBottom: '1rem' }}>Kalakritam</h1>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            We're experiencing a temporary issue. Please try refreshing the page.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                background: '#c38f21',
                color: '#002f2f',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Refresh Page
            </button>
            <button 
              onClick={() => window.location.href = '/home'}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: '#c38f21',
                border: '2px solid #c38f21',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppContent = () => {
  return (
    <Router basename="/">
      <div className="app">
        <LazyLoadingErrorBoundary>
          <Suspense fallback={<LazyLoadingFallback />}>
            <Routes>
              <Route path="/" element={<IntroVideo />} />
              <Route path="/home" element={<Home />} />
              <Route path="/gallery" element={<ComingSoon />} />
              <Route path="/workshops" element={<ComingSoon />} />
              <Route path="/events" element={<ComingSoon />} />
              <Route path="/artists" element={<ComingSoon />} />
              <Route path="/artblogs" element={<ComingSoon />} />
              <Route path="/contact" element={<ComingSoon />} />
              <Route path="/about" element={<ComingSoon />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </LazyLoadingErrorBoundary>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AppContent />
  )
}

export default App
