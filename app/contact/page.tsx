'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, Briefcase, MessageSquare, CheckCircle, Copy } from 'lucide-react';

const services = [
  { id: 'web', label: 'Web Development', checked: false },
  { id: 'design', label: 'UI/UX Design', checked: false },
  { id: 'branding', label: 'Branding', checked: false },
  { id: 'consulting', label: 'Consulting', checked: false },
  { id: 'optimization', label: 'Performance Optimization', checked: false },
  { id: 'other', label: 'Other', checked: false }
];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [copied, setCopied] = useState(false);

  const handleServiceToggle = (id: string) => {
    const newServices = new Set(selectedServices);
    if (newServices.has(id)) {
      newServices.delete(id);
    } else {
      newServices.add(id);
    }
    setSelectedServices(newServices);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '', budget: '', timeline: '' });
      setSelectedServices(new Set());
    }, 3000);
  };

  const canProceed = step === 1 ? selectedServices.size > 0 : step === 2 ? formData.email && formData.name : true;

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@sitrezhuthu.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-white/10 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-lg font-gotu font-bold tracking-wider hover:text-purple-400 transition">
            SITREZHUTHU
          </Link>
          <div className="flex gap-8">
            <Link href="/" className="text-sm text-white/70 hover:text-white transition">Home</Link>
            <Link href="/contact" className="text-sm text-purple-400 transition font-medium">Contact</Link>
            <Link href="/services" className="text-sm text-white/70 hover:text-white transition">Services</Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Let's discuss your project and see how I can help bring your vision to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Email */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Mail size={24} className="text-purple-400" />
                </div>
                <h3 className="text-lg font-bold">Email</h3>
              </div>
              <p className="text-white/60 mb-4">Reach out to me directly</p>
              <button
                onClick={copyEmail}
                className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 transition"
              >
                hello@sitrezhuthu.com
                <Copy size={16} className={copied ? 'text-green-400' : ''} />
              </button>
              {copied && <p className="text-green-400 text-sm mt-2">Copied!</p>}
            </div>

            {/* Response Time */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare size={24} className="text-pink-400" />
                </div>
                <h3 className="text-lg font-bold">Response Time</h3>
              </div>
              <p className="text-white/60">I typically respond within</p>
              <p className="text-purple-400 font-bold text-lg mt-2">24-48 hours</p>
            </div>

            {/* Availability */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Briefcase size={24} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold">Availability</h3>
              </div>
              <p className="text-white/60">Timezone:</p>
              <p className="text-purple-400 font-bold mt-1">EST (UTC-5)</p>
              <p className="text-white/60 mt-4">Currently available for:</p>
              <p className="text-pink-400 font-bold mt-1">New projects & consulting</p>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Github'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg hover:bg-purple-600 transition flex items-center justify-center text-sm font-medium"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
                          s <= step
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {s}
                      </div>
                      <span className="text-xs text-white/60">
                        {s === 1 ? 'Services' : s === 2 ? 'Details' : 'Message'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Success Message */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-white/70">
                      Thank you for reaching out. I'll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                  >
                    {/* Step 1: Services */}
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-bold mb-6">What services are you interested in?</h3>
                          <div className="space-y-3 mb-8">
                            {services.map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => handleServiceToggle(service.id)}
                                className={`w-full p-4 rounded-lg border-2 text-left transition ${
                                  selectedServices.has(service.id)
                                    ? 'border-purple-500 bg-purple-500/20'
                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                      selectedServices.has(service.id)
                                        ? 'border-purple-400 bg-purple-400'
                                        : 'border-white/30'
                                    }`}
                                  >
                                    {selectedServices.has(service.id) && (
                                      <span className="text-white text-xs font-bold">✓</span>
                                    )}
                                  </div>
                                  <span>{service.label}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Details */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-bold mb-6">Tell me about yourself</h3>
                          <div className="space-y-4 mb-8">
                            <input
                              type="text"
                              name="name"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              required
                            />
                            <input
                              type="email"
                              name="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              required
                            />
                            <input
                              type="text"
                              name="company"
                              placeholder="Your Company (Optional)"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="">Select a budget range</option>
                              <option value="under-5k">Under $5,000</option>
                              <option value="5k-10k">$5,000 - $10,000</option>
                              <option value="10k-25k">$10,000 - $25,000</option>
                              <option value="25k+">$25,000+</option>
                            </select>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Message */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-bold mb-6">Tell me more about your project</h3>
                          <div className="space-y-4 mb-8">
                            <textarea
                              name="message"
                              placeholder="Share details about your project, goals, and any specific requirements..."
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={6}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                              required
                            />
                            <select
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="">When do you need this completed?</option>
                              <option value="asap">ASAP (1-2 weeks)</option>
                              <option value="1month">1 Month</option>
                              <option value="2months">2 Months</option>
                              <option value="flexible">Flexible</option>
                            </select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white hover:border-white/40 transition"
                        >
                          Back
                        </button>
                      )}
                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={() => setStep(step + 1)}
                          disabled={!canProceed}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
                        >
                          Send Message
                        </button>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
