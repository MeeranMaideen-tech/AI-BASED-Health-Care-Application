import React, { useState } from 'react';
import { BsFillChatDotsFill, BsPersonFill } from 'react-icons/bs'; // Importing icons
import './userportalcss/chatbot.css';

function SymptomChatBot({ onProceed }) {
  // List of predefined questions
  const questions = [
    "Are you experiencing fever or chills?",
    "Do you have a persistent cough?",
    "Are you experiencing shortness of breath?",
    "Have you lost your sense of taste or smell?",
    "Are you feeling unusually fatigued or tired?"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
  const [responses, setResponses] = useState([]); // Store user responses

  // Handle user response (Yes/No)
  const handleResponse = (answer) => {
    const newResponse = {
      question: questions[currentQuestionIndex],
      answer: answer,
    };
    setResponses([...responses, newResponse]);

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(-1); // Mark as completed
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="text-3xl font-bold mb-4 text-black">Symptom Checker ChatBot</h2>
      <div className="chatbox space-y-4">
        {responses.map((response, index) => (
          <div key={index} className="chat-message">
            {/* Chatbot Question */}
            <div className="flex items-start space-x-2">
              <BsFillChatDotsFill className="text-blue-500 text-2xl" />
              <div className="bg-blue-100 text-gray-800 p-3 rounded-lg shadow-md">
                {response.question}
              </div>
            </div>
            {/* User Response */}
            <div className="flex justify-end items-center space-x-2 mt-2">
              <div className="bg-green-200 text-gray-800 p-3 rounded-lg shadow-md">
                {response.answer}
              </div>
              <BsPersonFill className="text-green-500 text-2xl" />
            </div>
          </div>
        ))}
        {currentQuestionIndex >= 0 && (
          <div className="chat-question flex items-start space-x-2">
            <BsFillChatDotsFill className="text-blue-500 text-2xl" />
            <div className="bg-blue-100 text-gray-800 p-3 rounded-lg shadow-md">
              {questions[currentQuestionIndex]}
            </div>
          </div>
        )}
      </div>

      {/* Yes/No Buttons or Proceed Button */}
      {currentQuestionIndex >= 0 ? (
        <div className="response-buttons flex justify-center space-x-4 mt-4">
          <button
            className="response-button bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
            onClick={() => handleResponse("Yes")}
          >
            Yes
          </button>
          <button
            className="response-button bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
            onClick={() => handleResponse("No")}
          >
            No
          </button>
        </div>
      ) : (
        <button
          className="send-button bg-blue-600 text-white py-2 px-6 mt-4 rounded-lg hover:bg-blue-700 transition"
          onClick={onProceed}
        >
          Proceed to Checklist
        </button>
      )}
    </div>
  );
}

export default SymptomChatBot;
