import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Direct imports - no lazy loading for maximum reliability
import IntroVideo from './components/IntroVideo'
import Home from './components/Home'
import ComingSoon from './components/ComingSoon'
import NotFound from './components/NotFound'

// Simple error boundary
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
          <h1>Kalakritam</h1>
          <p>Something went wrong. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#c38f21',
              color: '#002f2f',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Refresh Page
          </button>
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
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App
