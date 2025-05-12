import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [userQuestion, setUserQuestion] = useState(""); // for displaying in chat
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setUserQuestion(question); // store the submitted question
    setAnswer("");
    setLoading(true);
    try {
      const res = await axios.post("https://islamic-ai-backend.onrender.com/ask", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setQuestion(""); // clear input
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-black text-white p-6">
      {/* Chat Header */}
      <div className="flex-1 overflow-auto mb-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Ask an Islamic Question</h2>

        <div className="space-y-4 max-w-xl mx-auto">
          {userQuestion && (
            <div className="bg-gray-700 p-3 rounded-lg shadow">
              <span className="font-semibold text-blue-300">You:</span>
              <p className="mt-1">{userQuestion}</p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-400 border-solid"></div>
              <span className="ml-3 text-blue-300 self-center">Generating response...</span>
            </div>
          )}

          {answer && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h4 className="text-lg font-medium text-white mb-2">AI Answer:</h4>
              <p className="whitespace-pre-line">{answer}</p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-yellow-400 text-sm text-center mt-6">
          ⚠️ These responses are AI-generated and should not be treated as religious fatwa. Always consult a qualified scholar.
        </p>
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
