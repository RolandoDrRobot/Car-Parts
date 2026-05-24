import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '24px', textAlign: 'center', background: '#0a0a0a',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: 'white', fontFamily: 'Saira Condensed, sans-serif', fontSize: '1.6rem', marginBottom: '10px' }}>
            Algo salió mal
          </h2>
          <p style={{ color: '#a0aec0', fontSize: '0.95rem', marginBottom: '20px' }}>
            Recarga la página para continuar.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg,#ef4444,#dc2626)',
              color: 'white', border: 'none', borderRadius: '6px',
              padding: '12px 24px', cursor: 'pointer',
              fontFamily: 'Saira Condensed, sans-serif',
              fontWeight: 700, fontSize: '1rem',
            }}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
