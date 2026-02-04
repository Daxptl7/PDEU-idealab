export default function Loading() {
    return (
      <div style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ height: '60px', width: '300px', background: '#e0e0e0', marginBottom: '20px', borderRadius: '4px' }}></div>
        <div style={{ height: '20px', width: '500px', background: '#f0f0f0', marginBottom: '40px', borderRadius: '4px' }}></div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} style={{ height: '300px', background: '#f5f5f5', borderRadius: '16px' }}></div>
           ))}
        </div>
      </div>
    );
  }
