import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen width for desktop/mobile
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Desktop is 768px or wider
    };

    handleResize(); // Check on load
    window.addEventListener("resize", handleResize); // Update on resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is FreshAI?",
      answer:
        "FreshAI is an AI-powered SaaS platform that helps businesses automate customer interactions, marketing campaigns, and sales analytics. It integrates with social media, CRM systems, and more.",
    },
    {
      question: "How does FreshAI help with customer support?",
      answer:
        "FreshAI offers AI-driven chatbots and virtual assistants that handle customer queries, provide automated responses, and integrate with popular customer service platforms.",
    },
    {
      question: "Can I integrate FreshAI with my CRM?",
      answer:
        "Yes, FreshAI integrates seamlessly with popular CRM systems like Salesforce and HubSpot to help you manage customer interactions and sales processes.",
    },
    {
      question: "What kind of businesses can benefit from FreshAI?",
      answer:
        "FreshAI is ideal for businesses of all sizes looking to automate their customer service, marketing, and sales processes. It’s particularly useful for eCommerce, SaaS, and service-oriented businesses.",
    },
    {
      question: "How do I get started with FreshAI?",
      answer:
        "Simply join our waitlist, and you’ll be notified once we’re live! After that, you can start using our platform by signing up and integrating your accounts.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative py-16 bg-[#f8f9fc] px-6"
      style={{
        backgroundColor: "#f8f9fc",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Floating blobs only for desktop */}
      {isDesktop && (
        <>
          <motion.div
            initial={{ x: -120, y: -80 }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
            className="absolute w-[350px] h-[350px] bg-gradient-to-br from-[#6246ea] to-[#3fc1c9] rounded-full opacity-30 blur-3xl top-[-100px] left-[-120px] z-0 hidden md:block"
          />
          <motion.div
            initial={{ x: 80, y: 120 }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
            className="absolute w-[250px] h-[250px] bg-gradient-to-tr from-[#e45858] to-[#6246ea] rounded-full opacity-30 blur-3xl bottom-[-100px] right-[-80px] z-0 hidden md:block"
          />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              // Only apply animation on desktop
              initial={isDesktop ? { opacity: 0, y: 30 } : {}}
              whileInView={isDesktop ? { opacity: 1, y: 0 } : {}}
              transition={isDesktop ? { duration: 0.5, delay: index * 0.2 } : {}}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div
                className="cursor-pointer text-xl font-semibold text-gray-900"
                onClick={() => toggleQuestion(index)}
              >
                {faq.question}
              </div>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-lg text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
