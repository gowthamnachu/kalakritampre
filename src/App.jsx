import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Simple and reliable lazy loading - Cloudflare optimized
const IntroVideo = React.lazy(() => import('./components/IntroVideo'));
const Home = React.lazy(() => import('./components/Home'));
const ComingSoon = React.lazy(() => import('./components/ComingSoon'));
const NotFound = React.lazy(() => import('./components/NotFound'));

// Enhanced lazy loading fallback component
const LazyLoadingFallback = () => {
  const [retryCount, setRetryCount] = React.useState(0);
  
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    window.location.reload();
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#002f2f',
      color: '#c38f21',
      fontSize: '1.2rem',
      fontFamily: 'Samarkan, serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>Kalakritam</h1>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Loading...</div>
        <div style={{ 
          width: '200px', 
          height: '4px', 
          background: 'rgba(195, 143, 33, 0.3)', 
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: '#c38f21',
            animation: 'loading 2s ease-in-out infinite'
          }} />
        </div>
      </div>
      {retryCount > 0 && (
        <button 
          onClick={handleRetry}
          style={{
            padding: '12px 24px',
            background: '#c38f21',
            color: '#002f2f',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Retry Loading
        </button>
      )}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
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
