import React, { useState } from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-gray-900">
          <span className="bg-gradient-to-r from-[#6246ea] to-[#e45858] text-transparent bg-clip-text">
            FreshAI
          </span>
        </a>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-900 hover:text-[#6246ea] focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Nav Links (Desktop) */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="hover:text-[#6246ea] transition"
          >
            Features
          </Link>
          <Link
            to="how-it-works"
            smooth={true}
            duration={500}
            className="hover:text-[#6246ea] transition"
          >
            How It Works
          </Link>
          <Link
            to="pricing"
            smooth={true}
            duration={500}
            className="hover:text-[#6246ea] transition"
          >
            Pricing
          </Link>
          <Link
            to="join-waitlist" // Ensure this matches the id of JoinWaitlist section
            smooth={true}
            duration={500}
            className="hover:text-[#6246ea] transition"
          >
            Join Waitlist
          </Link>
        </nav>

        {/* CTA Button (Desktop) */}
        <Link
          to="join-waitlist"
          smooth={true}
          duration={500}
          className="hidden md:inline-block px-6 py-2 bg-[#6246ea] hover:bg-[#4e3ac9] text-white rounded-xl text-sm font-semibold transition"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu (Mobile) */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-0 left-0 w-full bg-white/90 p-6 space-y-4`}
      >
        <Link
          to="features"
          smooth={true}
          duration={500}
          onClick={() => setIsOpen(false)}
          className="hover:text-[#6246ea] transition block"
        >
          Features
        </Link>
        <Link
          to="how-it-works"
          smooth={true}
          duration={500}
          onClick={() => setIsOpen(false)}
          className="hover:text-[#6246ea] transition block"
        >
          How It Works
        </Link>
        <Link
          to="pricing"
          smooth={true}
          duration={500}
          onClick={() => setIsOpen(false)}
          className="hover:text-[#6246ea] transition block"
        >
          Pricing
        </Link>
        <Link
          to="join-waitlist"
          smooth={true}
          duration={500}
          onClick={() => setIsOpen(false)}
          className="hover:text-[#6246ea] transition block"
        >
          Join Waitlist
        </Link>
        <Link
          to="join-waitlist"
          smooth={true}
          duration={500}
          onClick={() => setIsOpen(false)}
          className="bg-[#6246ea] hover:bg-[#4e3ac9] text-white px-6 py-2 rounded-xl text-sm font-semibold transition block text-center"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
