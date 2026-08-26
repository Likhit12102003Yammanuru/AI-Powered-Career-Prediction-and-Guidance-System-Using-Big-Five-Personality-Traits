import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, description, examples, reasoning, traits } = location.state || {};

  if (!prediction || !traits) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No result found!</h2>
        <button onClick={() => navigate('/')}>Go back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Career Prediction Result</h1>

      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ color: 'green' }}>The Most Suitable Career Path For You:</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{prediction}</p>

        {description && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Description:</h3>
            <p>{description}</p>
          </div>
        )}

        {examples && examples.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Example Careers:</h3>
            <ul style={{ listStyleType: 'disc', textAlign: 'left', marginLeft: '2rem' }}>
              {examples.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          </div>
        )}

        {reasoning && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Why This Fits You:</h3>
            <p>{reasoning}</p>
          </div>
        )}
      </div>

      <h3>Big 5 Personality Breakdown</h3>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {[
          { label: 'Openness', key: 'O' },
          { label: 'Conscientiousness', key: 'C' },
          { label: 'Extroversion', key: 'E' },
          { label: 'Agreeableness', key: 'A' },
          { label: 'Neuroticism', key: 'N' }
        ].map(({ label, key }) => (
          <div key={key} style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '0.3rem' }}><strong>{label}</strong>: {traits[key]}/50</div>
            <div style={{ backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${(traits[key] / 50) * 100}%`,
                  backgroundColor: '#4caf50',
                  height: '10px'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '3rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go Back Home
      </button>

      <button
        onClick={() => {
          localStorage.removeItem('name');
          localStorage.removeItem('cgpa');
          localStorage.removeItem('hobbies');
          localStorage.removeItem('strengths');
          localStorage.removeItem('weaknesses');
          localStorage.removeItem('goals');
          navigate('/');
        }}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Retake Quiz
      </button>
    </div>
  );
}

export default ResultPage;

