import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function SignIn({ onSignUpClick }) {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Function to check the session asynchronously
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }

      // Listen for changes in auth state
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_, session) => {
          setUser(session?.user);
        }
      );

      return () => {
        authListener?.unsubscribe();
      };
    };

    checkSession(); // Call the async function

    // Clean up the listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Sign in with email and password
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setErrorMessage(error.message);
    } else {
      setUser(data.user);
      navigate("/dashboard");  // Redirect to dashboard after successful login
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign-out error:", error.message);
    } else {
      setUser(null);
      navigate("/sign-in");  // Redirect to sign-in page after sign out
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
      {!isMobile && (
        <>
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
        </>
      )}

      <div className="relative z-10 max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          {user ? `Welcome, ${user.email}` : "Sign In to FreshAI"}
        </h2>

        {!user ? (
          <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea] text-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6246ea] text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mt-6">
              <button type="submit" className="w-full px-6 py-3 bg-[#6246ea] hover:bg-[#4e3ac9] text-white rounded-xl text-lg font-medium shadow-md transition">
                Sign In
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 text-center">
            <button
              onClick={handleSignOut}
              className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg font-medium shadow-md transition"
            >
              Sign Out
            </button>
          </div>
        )}

        <div className="mt-4">
          {!user && (
            <button
              onClick={handleGoogleSignIn}
              className="w-full px-6 py-3 border border-gray-300 rounded-xl text-gray-700 text-lg font-medium hover:bg-gray-50 transition mt-2"
            >
              Continue with Google
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={onSignUpClick}
              className="text-[#6246ea] hover:text-[#4e3ac9] font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
