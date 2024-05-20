import React, { useState } from "react";

const Message = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const sampleData = [
    {
      q: "What are the interest rates for fixed deposits?",
      a: (
        <div>
          <p>The interest rates for fixed deposits are as follows:</p>
          <ul>
            <li>Three Months - 10%</li>
            <li>Six Months - 15%</li>
            <li>More Than One year - 25%</li>
          </ul>
        </div>
      ),
    },
    {
      q: "What are the interest rates for savings accounts?",
      a: (
        <p>The interest rate for savings accounts is currently 2% per month.</p>
      ),
    },
    {
      q: "What are the minimum balance requirements for invest on forign currency?",
      a: (
        <p>The minimum balance requirement for savings accounts is 1000 Rs.</p>
      ),
    },
    {
      q: "How do I apply for a loan?",
      a: <p>You can apply for a loan by visiting our nearest branch.</p>,
    },
  ];

  const handleMessageIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div
      className="fixed bottom-4 right-4"
      style={{ width: "5vw", height: "5vw" }}
    >
      <div
        className={`bg-[#EFBC9B] rounded-full flex items-center justify-center cursor-pointer animate-pulse`}
        style={{
          width: "100%",
          height: "100%",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleMessageIconClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-slide-in-right"
          style={{ zIndex: 9999 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-[#9CAFAA]">
            Ask a Question
          </h3>
          <ul>
            {sampleData.map((item, index) => (
              <li
                key={index}
                className="mb-2 text-[#9CAFAA] hover:text-[#EFBC9B] cursor-pointer"
                onClick={() => handleQuestionClick(item)}
              >
                {item.q}
              </li>
            ))}
          </ul>
          {selectedQuestion && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2 text-[#9CAFAA]">
                {selectedQuestion.q}
              </h4>
              <div className="bg-[#FBF3D5] p-4 rounded-lg">
                {selectedQuestion.a}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
