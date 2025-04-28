import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { supabase } from "../supabase";

function Navbar({ onSignInClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* FreshAI Text with Multicolor Gradient */}
        <RouterLink 
          to="/" 
          className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9b59b6] to-[#6a1b9a] hover:text-transparent"
        >
          FreshAI
        </RouterLink>

        <nav className="hidden md:flex space-x-8 items-center text-[#0a2540] font-medium">
          {["features", "how-it-works", "pricing", "join-waitlist"].map((item) => (
            <ScrollLink
              key={item}
              to={item}
              smooth
              duration={500}
              className="cursor-pointer relative group"
            >
              {item.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#0a2540] group-hover:w-full transition-all duration-300"></span>
            </ScrollLink>
          ))}
          {user && (
            <RouterLink to="/dashboard" className="hover:text-[#0984e3]">
              Dashboard
            </RouterLink>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                Hi, {user.user_metadata?.name || user.email}
              </span>
              <button onClick={handleLogout} className="text-sm text-[#e74c3c] hover:text-[#c0392b]">
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={onSignInClick} className="text-sm text-[#0a2540] hover:text-[#0984e3]">
                Sign In
              </button>
              <ScrollLink
                to="join-waitlist"
                smooth
                duration={500}
                className="bg-[#0984e3] hover:bg-[#075a96] text-white px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer"
              >
                Get Started
              </ScrollLink>
            </>
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-[#0a2540] hover:text-[#0984e3]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white shadow-md">
          {["features", "how-it-works", "pricing", "join-waitlist"].map((item) => (
            <ScrollLink
              key={item}
              to={item}
              smooth
              duration={500}
              onClick={toggleMenu}
              className="block hover:text-[#0984e3]"
            >
              {item.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </ScrollLink>
          ))}
          {user && (
            <RouterLink to="/dashboard" onClick={toggleMenu} className="block hover:text-[#0984e3]">
              Dashboard
            </RouterLink>
          )}
          {user ? (
            <>
              <span className="block text-sm text-gray-700">
                Hi, {user.user_metadata?.name || user.email}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block text-sm text-[#e74c3c] hover:text-[#c0392b]"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={onSignInClick} className="block text-sm text-[#0a2540] hover:text-[#0984e3]">
                Sign In
              </button>
              <ScrollLink
                to="join-waitlist"
                smooth
                duration={500}
                onClick={toggleMenu}
                className="block text-center bg-[#0984e3] hover:bg-[#075a96] text-white py-2 rounded-xl text-sm font-semibold"
              >
                Get Started
              </ScrollLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
