import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../Header";
import SplitText from "../components/SplitText"; 
import ShinyText from '../components/ShinyText'; 

const Home = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-blue-900 to-black text-white">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <SplitText
            text="Welcome to Islamic AI"
            className="text-4xl md:text-5xl font-bold mb-4"
            delay={80}
            animationFrom={{ opacity: 0, transform: "translate3d(0,40px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />       

          <p className="text-lg md:text-xl text-gray-300 mb-6 mt-6">
            Ask any Islamic question and receive accurate, respectful, and well-researched responses — powered by AI and trusted Islamic sources.
          </p>

          <Link to="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-b from-blue-600 to-black text-white px-8 py-3 rounded-full text-lg font-bold border-3 border-transparent hover:bg-transparent transition"
            >
              <ShinyText text="Start a Conversation" disabled={false} speed={1} className="custom-class" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
