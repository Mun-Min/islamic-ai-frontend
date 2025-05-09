import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rippleStyle, setRippleStyle] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      setMousePosition({ x, y });

      // Create ripple effect (using radial gradient)
      const ripple = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.5), rgba(10, 10, 50, 0.8))`;
      setRippleStyle({
        background: ripple,
        transition: "background 1s ease-out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="h-screen w-full text-white flex items-center justify-center px-4"
      style={{
        ...rippleStyle,
        background: "linear-gradient(135deg, rgba(3, 3, 41, 0.8), rgba(22, 22, 22, 0.8))", // Default gradient
        backgroundSize: "200% 200%", // This makes the ripple effect more expansive
        backgroundPosition: "center",
        transition: "background 1s ease-out", // Smooth transition for ripple effect
      }}
    >
      <motion.div
        className="text-center max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Islamic AI</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Ask any Islamic question and receive accurate, respectful, and well-researched responses — powered by AI and trusted Islamic sources.
        </p>
        <Link to="/chat">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition"
          >
            Ask a Question
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
