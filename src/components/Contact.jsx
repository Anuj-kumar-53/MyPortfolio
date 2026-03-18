import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Github, Linkedin } from 'lucide-react'

export default function Contact({ isDark }) {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
    if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "04093882-08f3-40ff-a7d9-7019118ec308", // 🔧 Get your key from https://web3forms.com/
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error('Web3Forms error:', err)
      setStatus('error')
    }

    setTimeout(() => setStatus(null), 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`section-padding relative ${isDark ? 'bg-dark-surface' : 'bg-gray-50'}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Background blobs */}
      {isDark && (
        <>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >

          <h2
            className={`font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-4" />
          <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            Have a project in mind or just want to chat? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value="anuj@example.com"
              href="mailto:anuj@example.com"
              color="#6366f1"
              isDark={isDark}
            />
            <InfoCard
              icon={<MapPin size={18} />}
              label="Location"
              value="India"
              color="#a855f7"
              isDark={isDark}
            />
            <InfoCard
              icon={<Github size={18} />}
              label="GitHub"
              value="github.com/anujkumar"
              href="https://github.com"
              color="#6e5494"
              isDark={isDark}
            />
            <InfoCard
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value="linkedin.com/in/anujkumar"
              href="https://linkedin.com"
              color="#0A66C2"
              isDark={isDark}
            />

            {/* Availability indicator */}
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-dark-card border border-green-500/20' : 'bg-green-50 border border-green-100'
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                </div>
                <span className={`text-sm font-semibold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                  Available for opportunities
                </span>
              </div>
              <p className={`text-xs pl-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Open to internships, freelance, and full-time roles.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`p-5 sm:p-8 rounded-2xl ${isDark
                  ? 'bg-dark-card border border-dark-border/60'
                  : 'bg-white border border-gray-200 shadow-sm'
                }`}
            >
              <div className="space-y-5">
                {/* Name */}
                <FormField
                  label="Your Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  isDark={isDark}
                />

                {/* Email */}
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  isDark={isDark}
                />

                {/* Message */}
                <div>
                  <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or just say hi..."
                    value={form.message}
                    onChange={handleChange}
                    className={`form-input w-full px-4 py-3 rounded-xl text-sm font-body resize-none transition-all ${isDark
                        ? 'bg-dark-bg border border-dark-border text-white placeholder-gray-600'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                      } ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-shimmer w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-body font-semibold text-sm text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                >
                  {status === 'loading' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-green-400 text-sm p-3 rounded-xl bg-green-500/10 border border-green-500/20"
                    >
                      <CheckCircle size={16} />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle size={16} />
                      Failed to send. Please try emailing me directly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({ icon, label, value, href, color, isDark }) {
  const content = (
    <motion.div
      whileHover={{ x: 4 }}
      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isDark
          ? 'bg-dark-card border border-dark-border/60 hover:border-indigo-500/30'
          : 'bg-gray-50 border border-gray-200 hover:border-indigo-300'
        }`}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20`, color }}
      >
        {icon}
      </div>
      <div>
        <p className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{label}</p>
        <p className={`text-sm font-body font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{value}</p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }
  return content
}

function FormField({ label, name, type, placeholder, value, onChange, error, isDark }) {
  return (
    <div>
      <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`form-input w-full px-4 py-3 rounded-xl text-sm font-body transition-all ${isDark
            ? 'bg-dark-bg border border-dark-border text-white placeholder-gray-600'
            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
          } ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  )
}
