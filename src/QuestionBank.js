import React, { useState } from 'react';

const QuestionBank = () => {
    const [questions, setQuestions] = useState([
      { id: 1, text: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
      { id: 2, text: 'How does React handle state?', answer: 'React uses a virtual DOM and a reconciliation algorithm to efficiently update the user interface.' },
      { id: 3, text: 'What are React hooks?', answer: 'React hooks are functions that let you use state and other React features in functional components.' },
      { id: 4, text: 'Explain the concept of virtual DOM in React.', answer: 'The virtual DOM is a lightweight copy of the real DOM. React uses it to improve performance by comparing it with the previous state and updating only the parts of the actual DOM that have changed.' },
      { id: 5, text: 'What is JSX in React?', answer: 'JSX (JavaScript XML) is a syntax extension for JavaScript recommended by React. It looks similar to XML/HTML and is used to describe what the UI should look like.' },
      { id: 6, text: 'What is the purpose of React Router?', answer: 'React Router is used for navigation in React applications. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps UI in sync with the URL.' },
      // Add more questions as needed
    ]);
  
    const [selectedQuestion, setSelectedQuestion] = useState(null);
  
    const handleQuestionClick = (questionId) => {
      setSelectedQuestion(selectedQuestion === questionId ? null : questionId);
    };
    return (
      <div>
        <h1>Question Bank</h1>
        <div className="questions-container">
          {questions.map((question) => (
            <div key={question.id} className={`question ${selectedQuestion === question.id ? 'selected' : ''}`} onClick={() => handleQuestionClick(question.id)}>
              {question.text}
              {selectedQuestion === question.id && <p className="answer">{question.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default QuestionBank;
