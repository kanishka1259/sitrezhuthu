export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050A07',
      color: '#3DAA7A'
    }}>
      <div style={{
        position: 'relative',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid rgba(61,170,122,0.1)',
          borderTopColor: '#3DAA7A',
          animation: 'spin 1s linear infinite'
        }} />
        <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>S</span>
      </div>
      <p style={{
        fontSize: '0.82rem',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        opacity: 0.6
      }}>
        Loading Portfolio...
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
