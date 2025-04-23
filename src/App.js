import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import JoinWaitlist from "./components/JoinWaitlist";
import FAQ from "./components/FAQ";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features /> 
      <HowItWorks />
      <Pricing />
      <JoinWaitlist />
      <FAQ />
      <ContactUs />
      <Footer />
      
    </>
  );
}
