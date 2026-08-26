import { Routes, Route } from 'react-router-dom';
import StartTest from './components/StartTest';
import Big5Quiz from './components/Big5Quiz';
import ResultPage from './components/ResultPage';  // Import the ResultPage component

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartTest />} />
      <Route path="/big5-quiz" element={<Big5Quiz />} />
      <Route path="/result" element={<ResultPage />} />  {/* Add this route */}
    </Routes>
  );
}

export default App;
