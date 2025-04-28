import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import JoinWaitlist from "./components/JoinWaitlist";
import FAQ from "./components/FAQ";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default function App() {
  const [session, setSession] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    // Get the current session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Set up the authentication state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Update session on auth state change
    });

    // Cleanup function to remove the listener
    return () => {
      if (authListener) {
        authListener.unsubscribe && authListener.unsubscribe();
      }
    };
  }, []);

  const handleDashboardClick = () => {
    setShowDashboard(true);
  };

  const handleHomeClick = () => {
    setShowDashboard(false);
    setShowSignIn(false);  // Ensure that SignIn doesn't show when on the homepage
    setShowSignUp(false);   // Ensure that SignUp doesn't show when on the homepage
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);  // Ensure SignIn is shown and SignUp is hidden
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);  // Ensure SignUp is shown and SignIn is hidden
  };

  return (
    <>
      <Navbar
        isAuthenticated={!!session}
        onDashboardClick={handleDashboardClick}
        onHomeClick={handleHomeClick}
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
      />
      {session ? (
        showDashboard ? (
          <AdminDashboard />
        ) : (
          <>
            <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
            <JoinWaitlist />
            <FAQ />
            <ContactUs />
            <Footer />
          </>
        )
      ) : showSignIn ? (
        <SignIn onSignUpClick={handleSignUpClick} />
      ) : showSignUp ? (
        <SignUp onSignInClick={handleSignInClick} />
      ) : (
        <>
          <Hero />
          <Features />
          <HowItWorks />
          <Pricing />
          <JoinWaitlist />
          <FAQ />
          <ContactUs />
          <Footer />
        </>
      )}
    </>
  );
}
