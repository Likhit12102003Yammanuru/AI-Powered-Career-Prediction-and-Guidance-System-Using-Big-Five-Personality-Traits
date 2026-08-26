import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const questions = [
  // EXTROVERSION (10)
  "I feel comfortable around people.",
  "I start conversations.",
  "I don't mind being the center of attention.",
  "I talk to a lot of different people at parties.",
  "I make friends easily.",
  "I am quiet around strangers.",    // Reverse
  "I have little to say.",            // Reverse
  "I don't like to draw attention to myself.", // Reverse
  "I keep in the background.",        // Reverse
  "I find it difficult to approach others.", // Reverse

  // NEUROTICISM (10)
  "I get stressed out easily.",
  "I worry about things.",
  "I am easily disturbed.",
  "I get upset easily.",
  "I change my mood a lot.",
  "I have frequent mood swings.",
  "I get irritated easily.",
  "I often feel blue.",
  "I feel threatened easily.",
  "I panic easily.",

  // AGREEABLENESS (10)
  "I sympathize with others' feelings.",
  "I have a soft heart.",
  "I take time out for others.",
  "I feel others' emotions.",
  "I make people feel at ease.",
  "I am not interested in other people's problems.", // Reverse
  "I am not really interested in others.", // Reverse
  "I insult people.", // Reverse
  "I feel little concern for others.", // Reverse
  "I am critical of others.", // Reverse

  // CONSCIENTIOUSNESS (10)
  "I am always prepared.",
  "I pay attention to details.",
  "I get chores done right away.",
  "I like order.",
  "I follow a schedule.",
  "I make a mess of things.", // Reverse
  "I often forget to put things back in their proper place.", // Reverse
  "I shirk my duties.", // Reverse
  "I leave my belongings around.", // Reverse
  "I waste my time.", // Reverse

  // OPENNESS (10)
  "I have a rich vocabulary.",
  "I have a vivid imagination.",
  "I have excellent ideas.",
  "I am quick to understand things.",
  "I spend time reflecting on things.",
  "I am full of ideas.",
  "I have difficulty understanding abstract ideas.", // Reverse
  "I am not interested in abstract ideas.", // Reverse
  "I do not have a good imagination.", // Reverse
  "I am not interested in artistic experiences." // Reverse
];

const reverseQuestions = new Set([
  5, 6, 7, 8, 9,     // Extroversion reverse (index 5-9)
  20, 21, 22, 23, 24, // Agreeableness reverse
  30, 31, 32, 33, 34, // Conscientiousness reverse
  46, 47, 48, 49      // Openness reverse
]);

function Big5Quiz() {
  const [answers, setAnswers] = useState(Array(50).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handleOptionChange = (questionIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = parseInt(value);
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    const start = currentPage * 10;
    const end = start + 10;
    if (answers.slice(start, end).includes(null)) {
      alert("Please answer all questions before proceeding.");
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("Please answer all 50 questions!");
      return;
    }

    let traitScores = { O: 0, C: 0, E: 0, A: 0, N: 0 };

    for (let i = 0; i < 50; i++) {
      let score = answers[i];
      if (reverseQuestions.has(i)) {
        score = 6 - score; // Reverse scoring
      }

      if (i < 10) traitScores.E += score;
      else if (i < 20) traitScores.N += score;
      else if (i < 30) traitScores.A += score;
      else if (i < 40) traitScores.C += score;
      else traitScores.O += score;
    }

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        O: traitScores.O,
        C: traitScores.C,
        E: traitScores.E,
        A: traitScores.A,
        N: traitScores.N,
      });

      console.log("✅ Prediction Response:", response.data);

      const { prediction, description, examples, reasoning } = response.data;
      navigate("/result", {
        state: {
          prediction: prediction || "Unknown",
          description,
          examples,
          reasoning,
          traits: traitScores
        }
      });
    } catch (error) {
      console.error("Error submitting the quiz:", error);
      alert("Error submitting the quiz. Please try again later.");
    }
  };


  const start = currentPage * 10;
  const end = start + 10;
  const currentQuestions = questions.slice(start, end);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Big 5 Personality Quiz</h2>

      <div>
        {currentQuestions.map((q, idx) => {
          const absoluteIndex = start + idx;
          return (
            <div key={absoluteIndex} style={{ marginBottom: "1rem" }}>
              <p>
                <strong>Q{absoluteIndex + 1}:</strong> {q}
              </p>
              <div
                style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num}>
                    <input
                      type="radio"
                      name={`question-${absoluteIndex}`}
                      value={num}
                      checked={answers[absoluteIndex] === num}
                      onChange={() => handleOptionChange(absoluteIndex, num)}
                    />
                    {num === 1 && " Strongly Disagree"}
                    {num === 2 && " Disagree"}
                    {num === 3 && " Neutral"}
                    {num === 4 && " Agree"}
                    {num === 5 && " Strongly Agree"}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {currentPage > 0 && <button onClick={handlePrevious}>Previous</button>}
        {currentPage < 4 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default Big5Quiz;
