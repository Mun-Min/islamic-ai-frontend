import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Header from "../Header";

// Function to clean up excess newlines
const cleanText = (text) => {
  return text.replace(/\n{2,}/g, "\n\n").trim(); // Collapsing multiple newlines to a single one
};

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const ask = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    const newMessages = [...messages, { role: "user", content: question }];

    try {
      const res = await axios.post("https://islamic-ai-backend.onrender.com/ask", {
        messages: newMessages,
      });

      const rawBotReply = res.data.answer || "⚠️ No response received.";
      const cleanedBotReply = cleanText(rawBotReply);

      setMessages([...newMessages, { role: "assistant", content: cleanedBotReply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ An error occurred. Please try again." },
      ]);
    }

    setQuestion("");
    setLoading(false);
  };

  useEffect(() => {
    if (chatRef.current) {
      // Scroll to the bottom when new messages arrive
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-black text-white">
      <Header />

      <div className="flex-1 p-6 overflow-hidden">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Ask an Islamic Question
        </h2>

        <div className="text-center text-sm text-yellow-400 mb-6">
          ⚠️ Responses are AI-generated and may not be 100% accurate. Always consult a qualified scholar for religious matters.
        </div>

        <div
          ref={chatRef}
          className="space-y-4 w-full max-w-4xl mx-auto flex-1 overflow-y-auto px-4 bg-gray-900 rounded-lg p-4 shadow-inner"
          style={{ maxHeight: "calc(100vh - 290px)" }} // Adjust to keep space for header and input form
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg shadow-md max-w-none whitespace-pre-wrap break-words ${
                msg.role === "user"
                  ? "bg-gray-700 text-green-300"
                  : "bg-gray-800 text-white"
              }`}
            >
              <ReactMarkdown>{msg.role === "user" ? `**You:** ${msg.content}` : msg.content}</ReactMarkdown>
            </div>
          ))}

          {loading && (
            <div className="flex items-center justify-center space-x-2 text-blue-300">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              <span>Generating response...</span>
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={ask}
        className="w-full flex items-center justify-center space-x-4 fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 px-4"
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
