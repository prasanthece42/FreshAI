// src/components/Auth.js
import React, { useState } from "react";
import { supabase } from "../supabase"; // Supabase initialization

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert("Sign-up successful! Please check your email.");
  };

  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else alert("Login successful!");
  };

  const handleGoogleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) setError(error.message);
    else alert("Logged in with Google!");
  };

  return (
    <div className="auth-container">
      <h2>Login / Sign-Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Auth;
