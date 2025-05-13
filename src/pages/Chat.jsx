import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setUserQuestion(question);
    setAnswer("");

    // Clean up markdown formatting
    const cleanMarkdown = (text) =>
      text
        .replace(/\n{3,}/g, "\n\n") // Replace 3+ line breaks with just 2
        .replace(/[ \t]+\n/g, "\n") // Remove trailing spaces/tabs
        .trim();

    try {
      const res = await axios.post("https://islamic-ai-backend.onrender.com/ask", { question });
      const cleaned = cleanMarkdown(res.data.answer);
      setAnswer(cleaned);
    } catch (err) {
      setAnswer("⚠️ An error occurred. Please try again.");
    }

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-black text-white p-6">
      <div className="flex-1 overflow-auto mb-8">
        <h2 className="text-3xl font-semibold text-center mb-4">Ask an Islamic Question</h2>

        {/* Disclaimer */}
        <div className="text-center text-sm text-yellow-400 mb-6">
          ⚠️ Responses are AI-generated and may not be 100% accurate. Always consult a qualified scholar for religious matters.
        </div>

        <div className="space-y-4 max-w-xl mx-auto">
          {userQuestion && (
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-base font-semibold text-green-300">You asked:</h4>
              <p className="text-white">{userQuestion}</p>
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center space-x-2 text-blue-300">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              <span>Generating response...</span>
            </div>
          )}
          {answer && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg whitespace-pre-line">
              <h4 className="text-lg font-bold text-white mb-2">🤖 AI Answer:</h4>
              <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
              {answer.includes("\n") && <br />}
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
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
