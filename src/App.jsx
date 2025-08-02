import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Direct imports - no lazy loading for maximum reliability on Cloudflare
import IntroVideo from './components/IntroVideo'
import Home from './components/Home'
import ComingSoon from './components/ComingSoon'
import NotFound from './components/NotFound'
import SEODebug from './components/SEODebug'

// Simple, reliable error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
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
          <p style={{ marginBottom: '2rem' }}>Something went wrong. Please refresh the page.</p>
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

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
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
          <SEODebug />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App
