import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserPlus } from 'lucide-react'
// Import Supabase client
import { supabase } from '../supabase' // Adjust the path if needed

export default function JoinWaitlist() {
  const [isMobile, setIsMobile] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Add email to Supabase and set the 'submitted_at' column to current timestamp
      const { data, error } = await supabase
        .from('waitlist') // Replace with your actual table name
        .insert([
          {
            email,
            submitted_at: new Date().toISOString(), // Manually set the timestamp
          },
        ])

      if (error) throw error

      console.log('Supabase Insert Success:', data); // Log data to confirm it's inserted

      // 2. Trigger the Supabase email (custom function or use Supabase Auth for user-related emails)
      // Supabase doesn't send custom emails directly, but you can create a custom function to send an email
      // For now, you can use the email sending service that Supabase supports in the function trigger below

      // 3. Send confirmation to UI
      setIsSubmitting(false)
      setMessage('Thank you for signing up! We will notify you once we launch.')
      setEmail('')

    } catch (error) {
      console.error('Error submitting the form:', error)
      setIsSubmitting(false)
      setMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <section
      id="join-waitlist"
      className="relative w-full px-6 py-20 overflow-x-hidden"
      style={{
        backgroundColor: '#f8f9fc',
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-semibold text-gray-900 mb-4">
          Join the Waitlist
        </h2>
        <p className="text-lg text-gray-600">
          Be the first to experience the future of customer engagement.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto relative space-y-8">
        <motion.div
          layout
          className="relative backdrop-blur-lg bg-white/60 border border-gray-200 rounded-xl shadow-lg px-8 py-12 flex flex-col items-center gap-6"
        >
          <div className="pt-2">
            <UserPlus className="text-[#6246ea] w-8 h-8" />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Sign up for the waitlist
            </h3>
            <p className="text-sm text-gray-500">
              Get exclusive access to FreshAI's features and be the first to know when we launch!
            </p>

            <form onSubmit={handleSubmit} className="mt-6 w-full flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-6 py-3 w-full sm:w-[320px] rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#6246ea] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 mt-4 sm:mt-0 w-full sm:w-auto bg-[#6246ea] text-white font-semibold rounded-lg hover:bg-[#6246ea]/90 transition-all duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Join Now'}
              </button>
            </form>

            {message && (
              <p className="text-sm mt-4 text-green-600 font-medium">
                {message}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
