import { useNavigate } from 'react-router-dom'

function StartTest() {
  const navigate = useNavigate()

  const handleStartQuiz = () => {
    navigate('/big5-quiz')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>Welcome to the Big 5 Test</h1>
      <button onClick={handleStartQuiz} style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
        Start Test
      </button>
    </div>
  )
}

export default StartTest
