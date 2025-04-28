import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function SignUp({ onSignInClick }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);  // To show success message after sign-up

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Clear any previous error message
    setError("");

    // Set loading state
    setIsLoading(true);

    try {
      // Sign up user with Supabase
      const { user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
      } else if (user) {
        // Handle successful sign-up
        setIsSuccess(true); // Show success message
        alert("Sign up successful! Please check your email to confirm.");
        // Reset form
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

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
        willChange: "background-position",
      }}
    >
      <motion.div
        initial={{ x: -100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[400px] h-[400px] bg-gradient-to-br from-[#6246ea] to-[#e45858] rounded-full opacity-30 blur-3xl top-[-150px] left-[-150px] z-0"
        style={{ willChange: "transform" }}
      />
      <motion.div
        initial={{ x: 100, y: 100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#3fc1c9] to-[#e45858] rounded-full opacity-30 blur-3xl bottom-[-150px] right-[-100px] z-0"
        style={{ willChange: "transform" }}
      />

      <div className="relative z-10 max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Sign Up for FreshAI
        </h2>

        {isSuccess && (
          <div className="text-green-500 text-center">
            <p>Account created! Please check your email to verify.</p>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
          {error && (
            <div className="text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea] text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea] text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea] text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea] text-gray-700"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#6246ea] hover:bg-[#4e3ac9] text-white rounded-xl text-lg font-medium shadow-md transition"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSignInClick}
              className="text-[#6246ea] hover:text-[#4e3ac9] font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
