import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabase";

function JoinWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation using regular expression for a valid email pattern
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ email, submitted_at: new Date() }]);

      if (error) throw error;

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("There was an error submitting your email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="join-waitlist"
      className="py-16 bg-[#f8f9fc] px-6"
      style={{
        backgroundColor: "#f8f9fc",
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "40px 40px",
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
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
          Be the First to Experience FreshAI!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Sign up to get early access and receive exclusive updates on our
          latest AI features.
        </p>

        <div className="space-y-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl text-green-600"
            >
              Thank you for signing up! We'll notify you once we're live.
            </motion.div>
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              {error && <div className="text-red-600 mb-4">{error}</div>}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row justify-center gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-96 px-6 py-3 text-lg rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea] mb-4 md:mb-0"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#6246ea] hover:bg-[#4e3ac9] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition disabled:opacity-60"
                >
                  {loading ? "Joining..." : "Join the Waitlist"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default JoinWaitlist;
