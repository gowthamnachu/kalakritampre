import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Direct imports for critical components (no lazy loading for Home)
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

// Only lazy load non-critical components
const IntroVideo = React.lazy(() => import('./components/IntroVideo'));
const ComingSoon = React.lazy(() => import('./components/ComingSoon'));
const NotFound = React.lazy(() => import('./components/NotFound'));

// Enhanced fallback that goes directly to Home if needed
const IntroVideoFallback = () => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/home';
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
      <p style={{ marginBottom: '1rem' }}>Loading...</p>
      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
        Redirecting to home page...
      </div>
    </div>
  );
};

// Error boundary for lazy loading errors
class LazyLoadingErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
    this.setState(prevState => ({ errorCount: prevState.errorCount + 1 }));
    
    // Only redirect if we've had multiple errors and we're not already on home
    if (this.state.errorCount > 2 && window.location.pathname !== '/home' && window.location.pathname !== '/') {
      setTimeout(() => {
        window.location.href = '/home';
      }, 5000);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, errorCount: 0 });
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
            We're experiencing a temporary issue loading this page.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={this.handleReset}
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
              Try Again
            </button>
            <button 
              onClick={() => window.location.reload()}
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
          <Suspense fallback={<IntroVideoFallback />}>
            <Routes>
              <Route path="/" element={<IntroVideo />} />
              <Route path="/home" element={<Home />} />
              <Route path="/gallery" element={
                <Suspense fallback={<IntroVideoFallback />}>
                  <ComingSoon />
                </Suspense>
              } />
              <Route path="/workshops" element={
                <Suspense fallback={<IntroVideoFallback />}>
                  <ComingSoon />
                </Suspense>
              } />
              <Route path="/events" element={
                <Suspense fallback={<IntroVideoFallback />}>
                  <ComingSoon />
                </Suspense>
              } />
              <Route path="/artists" element={
                <Suspense fallback={<IntroVideoFallback />}>
                  <ComingSoon />
                </Suspense>
              } />
              <Route path="/artblogs" element={
                <Suspense fallback={<IntroVideoFallback />}>
                  <ComingSoon />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<IntroVideoFallback />}>
                  <ComingSoon />
                </Suspense>
              } />
              <Route path="/about" element={
                <Suspense fallback={<IntroVideoFallback />}>
                  <ComingSoon />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<IntroVideoFallback />}>
                  <NotFound />
                </Suspense>
              } />
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
