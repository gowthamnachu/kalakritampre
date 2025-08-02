import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Only load IntroVideo, Home and ComingSoon components with error fallback
const IntroVideo = React.lazy(() => 
  import('./components/IntroVideo/IntroVideo').catch(() => ({
    default: () => <div>Error loading IntroVideo. Redirecting to home...</div>
  }))
);
const Home = React.lazy(() => 
  import('./components/Home/Home').catch(() => ({
    default: () => <div>Error loading Home page. Please refresh.</div>
  }))
);
const ComingSoon = React.lazy(() => 
  import('./components/ComingSoon/ComingSoon').catch(() => ({
    default: () => <div>Error loading page. Redirecting to home...</div>
  }))
);
const NotFound = React.lazy(() => 
  import('./components/NotFound/NotFound').catch(() => ({
    default: () => <div>Error loading NotFound page. Redirecting to home...</div>
  }))
);

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
    // Redirect to home after error
    setTimeout(() => {
      window.location.href = '/home';
    }, 3000);
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
          fontFamily: 'Samarkan, serif'
        }}>
          <h2>Something went wrong loading this page</h2>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#c38f21',
              color: '#002f2f',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppContent = () => {
  return (
    <Router>
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
