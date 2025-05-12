import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://islamic-ai-backend.onrender.com/ask", { question });
    setAnswer(res.data.answer);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-black text-white p-6">
      {/* Chat Header */}
      <div className="flex-1 overflow-auto mb-8">
        <h2 className="text-3xl font-semibold text-center mb-4">Ask an Islamic Question</h2>
        <div className="space-y-4">
          {answer && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-xl mx-auto">
              <h4 className="text-lg font-medium text-white mb-2">AI Answer:</h4>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>

      {/* Input Section at the Bottom */}
      <form
        onSubmit={ask}
        className="w-full flex items-center justify-center space-x-4 fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-3/4 p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default Chat;
