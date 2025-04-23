import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{
        backgroundColor: "#f8f9fc",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "40px 40px",
        willChange: 'background-position'
      }}
    >
      {/* Floating blobs - only on desktop */}
      {!isMobile && (
        <>
          <motion.div
            initial={{ x: -100, y: -100 }}
            animate={{ x: 0, y: 0 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            className="absolute w-[400px] h-[400px] bg-gradient-to-br from-[#6246ea] to-[#e45858] rounded-full opacity-30 blur-3xl top-[-150px] left-[-150px] z-0"
            style={{ willChange: "transform" }}
          />
          <motion.div
            initial={{ x: 100, y: 100 }}
            animate={{ x: 0, y: 0 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#3fc1c9] to-[#e45858] rounded-full opacity-30 blur-3xl bottom-[-150px] right-[-100px] z-0"
            style={{ willChange: "transform" }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          <span className="bg-gradient-to-r from-[#6246ea] to-[#e45858] text-transparent bg-clip-text">
            AI-Powered Automation
          </span>{" "}
          for Your Business
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600">
          Respond to users on social platforms, send payment links, manage contacts, launch promotions, and get sales insights — with AI that learns from you.
        </p>
        <div className="mt-8">
          <a
            href="#join-waitlist"
            className="inline-block bg-[#6246ea] hover:bg-[#4e3ac9] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
