import React, { useState } from 'react';
import {
  FaTimes,
} from "react-icons/fa";

const DynamicQueAns = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [qaPairs, setQAPairs] = useState([]);

  const handleNumberChange = (event) => {
    const number = parseInt(event.target.value, 10) || 0;
    setNumberOfQuestions(number);
    setQAPairs([]);
  };

  const handleQAChange = (index, type, value) => {
    const updatedPairs = [...qaPairs];
    const pair = updatedPairs[index] || { question: '', answer: '', marks: '' };
    pair[type] = value;
    updatedPairs[index] = pair;
    setQAPairs(updatedPairs);
  };

  const handleDeleteQA = (index) => {
    const updatedPairs = [...qaPairs];
    updatedPairs.splice(index, 1);
    setQAPairs(updatedPairs);
  };

  const displayQA = () => {
    return qaPairs.map((pair, index) => (
      <div key={index} className="question-answer-item">
        <p>
          {`Question ${index + 1}: ${pair.question}, Answer ${index + 1}: ${pair.answer}, Marks: ${pair.marks}`}
          <button className="pencil"  onClick={() => handleDeleteQA(index)}><FaTimes/></button>
        </p>
      </div>
    ));
  };

  const calculateTotalMarks = () => {
    const totalMarks = qaPairs.reduce((sum, pair) => sum + parseFloat(pair.marks) || 0, 0);
    return totalMarks.toFixed(2); // Format to 2 decimal places
  };

  return (
    <div className='col-md-12'>
      <label>
        <h4>Enter the number of Q/A:</h4>
      </label>
      <input type="number" value={numberOfQuestions} onChange={handleNumberChange} />
      <br />
      <div className="question-answer-container">
        {[...Array(numberOfQuestions)].map((_, index) => (
          <div key={index} className="question-answer-item">
            <label>{`Question ${index + 1}: `}</label>
            <input
              type="text"
              placeholder={`Enter question ${index + 1}`}
              onChange={(e) => handleQAChange(index, 'question', e.target.value)}
            />
            <label>{`Answer ${index + 1}: `}</label>
            <input
              type="text"
              placeholder={`Enter answer ${index + 1}`}
              onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
            />
            <label>{`Marks ${index + 1}: `}</label>
            <input
              type="number"
              placeholder={`Enter marks ${index + 1}`}
              onChange={(e) => handleQAChange(index, 'marks', e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="summary-container">
        <h4>Entered Questions and Answers:</h4>
        {numberOfQuestions > 0 && (
          <div className="question-answer-container">
            {displayQA()}
          </div>
        )}
        {numberOfQuestions > 0 && (
          <div className='container'>
            <h5>Total Marks:</h5>
            {calculateTotalMarks()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicQueAns;
