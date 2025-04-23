import React from "react";
import { motion } from "framer-motion";
import { Plug, Brain, Rocket, LineChart } from "lucide-react";

const steps = [
  {
    icon: <Plug className="w-8 h-8 text-[#6246ea]" />,
    title: "Connect Platforms",
    desc: "Link all your social media channels and centralize customer conversations."
  },
  {
    icon: <Brain className="w-8 h-8 text-[#6246ea]" />,
    title: "Train the AI",
    desc: "Feed it your business data — from your website, PDFs, or custom content."
  },
  {
    icon: <Rocket className="w-8 h-8 text-[#6246ea]" />,
    title: "Automate Everything",
    desc: "Let AI handle responses, payments, campaigns, and customer management."
  },
  {
    icon: <LineChart className="w-8 h-8 text-[#6246ea]" />,
    title: "Track Insights",
    desc: "Monitor real-time sales, customer behavior, and revenue performance."
  }
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 bg-[#f8f9fc] px-6"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "40px 40px"
      }}
    >
      {/* Floating blobs */}
      <motion.div
        initial={{ x: -100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[400px] h-[400px] bg-gradient-to-br from-[#6246ea] to-[#e45858] rounded-full opacity-30 blur-3xl top-[-150px] left-[-150px] z-0"
      />
      <motion.div
        initial={{ x: 100, y: 100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#3fc1c9] to-[#e45858] rounded-full opacity-30 blur-3xl bottom-[-150px] right-[-100px] z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          How FreshAI Supercharges Your Workflow
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
          From setup to results in minutes — here’s how FreshAI transforms your business with smart automation.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
