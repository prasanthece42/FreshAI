import React from "react";
import { motion } from "framer-motion";
import { Zap, MessageSquare, Send, TrendingUp, BarChart3, Database, Mail, Target, Users, DollarSign } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="w-6 h-6 text-[#6246ea]" />,
    title: "AI Social Media Assistant",
    desc: "Respond instantly to customer messages across all major social platforms."
  },
  {
    icon: <Send className="w-6 h-6 text-[#6246ea]" />,
    title: "Smart Payment Links",
    desc: "Send dynamic, trackable payment links directly from conversations."
  },
  {
    icon: <Users className="w-6 h-6 text-[#6246ea]" />,
    title: "Contact Management",
    desc: "Organize, track, and engage with all your customers in one place."
  },
  {
    icon: <Zap className="w-6 h-6 text-[#6246ea]" />,
    title: "Promotional Campaigns",
    desc: "Launch personalized promotions and measure their impact in real-time."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-[#6246ea]" />,
    title: "Sales Analytics",
    desc: "Track revenue, conversions, and performance insights instantly."
  },
  {
    icon: <Database className="w-6 h-6 text-[#6246ea]" />,
    title: "Train Your AI",
    desc: "Teach your AI with custom data — via text, PDFs, or your website."
  },
  {
    icon: <Target className="w-6 h-6 text-[#6246ea]" />,
    title: "Automated Ad Targeting",
    desc: "Automatically target ads to your ideal customer profiles."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-[#6246ea]" />,
    title: "AI Insights",
    desc: "Get data-backed suggestions for marketing, sales, and growth."
  },
  {
    icon: <DollarSign className="w-6 h-6 text-[#6246ea]" />,
    title: "Lightweight CRM",
    desc: "Simple CRM to manage leads, pipelines, and customer journeys."
  },
  {
    icon: <Mail className="w-6 h-6 text-[#6246ea]" />,
    title: "Email Marketing Automation",
    desc: "Send intelligent campaigns with AI-generated content & scheduling."
  }
];

function Features() {
  return (
    <section
      id="features"
      className="relative py-20 px-6 bg-gradient-to-r from-[#f8f9fc] via-[#e8eaf0] to-[#ffffff]"
      style={{
        backgroundSize: "40px 40px",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `
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
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Everything You Need in One AI Platform
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
          Our AI does more than chat. It helps you sell, support, and scale your business with advanced automation and deep insights.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
