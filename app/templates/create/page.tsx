'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Palette, Settings, Eye, FileText } from 'lucide-react';

export default function CreateTemplatePage() {
  const [step, setStep] = useState(1);
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    category: 'Modern',
    color: 'from-purple-500 to-pink-500',
    features: [''],
    targetAudience: 'Professional',
    preview: '',
    fullDescription: ''
  });

  const categories = ['Modern', 'Classic', 'Dark', 'Creative', 'Tech', 'Minimal', 'Professional'];
  const colors = [
    { name: 'Purple-Pink', value: 'from-purple-500 to-pink-500' },
    { name: 'Blue-Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Green-Emerald', value: 'from-green-500 to-emerald-600' },
    { name: 'Orange-Red', value: 'from-orange-400 to-red-500' },
    { name: 'Slate-Gray', value: 'from-slate-600 to-slate-800' },
    { name: 'Rose-Pink', value: 'from-rose-400 to-pink-500' },
    { name: 'Indigo-Purple', value: 'from-indigo-400 to-purple-400' },
    { name: 'Amber-Orange', value: 'from-amber-500 to-orange-600' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTemplateData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (idx: number, value: string) => {
    const newFeatures = [...templateData.features];
    newFeatures[idx] = value;
    setTemplateData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setTemplateData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (idx: number) => {
    setTemplateData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = () => {
    console.log('Template submitted:', templateData);
    alert('Template submitted for approval! Our team will review it soon. 🎉');
    setStep(1);
    setTemplateData({
      name: '',
      description: '',
      category: 'Modern',
      color: 'from-purple-500 to-pink-500',
      features: [''],
      targetAudience: 'Professional',
      preview: '',
      fullDescription: ''
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
            <Link href="/dashboard" className="text-sm text-white/70 hover:text-white transition">Templates</Link>
            <Link href="/templates/community" className="text-sm text-purple-400 transition font-medium">Community</Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">Create Your Template</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Design a unique portfolio template and share it with our community
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar - Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-32 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-8">Creation Steps</h3>
              <div className="space-y-4">
                {[
                  { num: 1, title: 'Basic Info', icon: '📋' },
                  { num: 2, title: 'Design', icon: '🎨' },
                  { num: 3, title: 'Features', icon: '⚡' },
                  { num: 4, title: 'Preview', icon: '👁️' }
                ].map((s) => (
                  <button
                    key={s.num}
                    onClick={() => setStep(s.num)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition ${
                      step === s.num
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{s.icon}</div>
                    <div className="text-sm font-medium">Step {s.num}</div>
                    <div className="text-xs opacity-70">{s.title}</div>
                  </button>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  💡 Pro Tips
                </h4>
                <ul className="space-y-2 text-xs text-white/60">
                  <li>• Use descriptive names and descriptions</li>
                  <li>• Highlight unique features</li>
                  <li>• Add a compelling preview</li>
                  <li>• Target the right audience</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-12">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <FileText size={28} /> Basic Information
                  </h2>

                  <div className="space-y-6">
                    {/* Template Name */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Template Name *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g., Modern Portfolio Pro"
                        value={templateData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <p className="text-xs text-white/50 mt-1">Make it memorable and descriptive</p>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Short Description *</label>
                      <input
                        type="text"
                        name="description"
                        placeholder="One line summary of your template"
                        value={templateData.description}
                        onChange={handleInputChange}
                        maxLength={100}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <p className="text-xs text-white/50 mt-1">{templateData.description.length}/100 characters</p>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Category *</label>
                      <select
                        name="category"
                        value={templateData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-slate-950">{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Target Audience */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Target Audience *</label>
                      <select
                        name="targetAudience"
                        value={templateData.targetAudience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {['Professional', 'Creative', 'Tech', 'Startup', 'Freelancer', 'Agency'].map(aud => (
                          <option key={aud} value={aud} className="bg-slate-950">{aud}</option>
                        ))}
                      </select>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4 pt-6">
                      <button
                        onClick={() => setStep(2)}
                        disabled={!templateData.name || !templateData.description}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Design
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Design */}
              {step === 2 && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Palette size={28} /> Design & Color
                  </h2>

                  <div className="space-y-8">
                    {/* Color Scheme */}
                    <div>
                      <label className="block text-sm font-bold mb-4">Select Color Scheme *</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {colors.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setTemplateData(prev => ({ ...prev, color: color.value }))}
                            className={`relative group`}
                          >
                            <div
                              className={`h-24 rounded-lg bg-gradient-to-br ${color.value} border-2 transition ${
                                templateData.color === color.value
                                  ? 'border-white'
                                  : 'border-transparent hover:border-white/50'
                              }`}
                            />
                            <p className="text-xs text-white/70 text-center mt-2">{color.name}</p>
                            {templateData.color === color.value && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">✓</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preview */}
                    <div>
                      <label className="block text-sm font-bold mb-4">Template Preview Image URL</label>
                      <input
                        type="url"
                        name="preview"
                        placeholder="https://example.com/preview.jpg"
                        value={templateData.preview}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                      />
                      {templateData.preview && (
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <p className="text-xs text-white/50 mb-2">Preview:</p>
                          <img src={templateData.preview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                        </div>
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4 pt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:border-white/40 transition font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
                      >
                        Continue to Features
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Features */}
              {step === 3 && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Settings size={28} /> Key Features
                  </h2>

                  <div className="space-y-6">
                    <p className="text-white/70">List the main features that make your template special</p>

                    <div className="space-y-4">
                      {templateData.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-3">
                          <input
                            type="text"
                            placeholder={`Feature ${idx + 1}`}
                            value={feature}
                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          {templateData.features.length > 1 && (
                            <button
                              onClick={() => removeFeature(idx)}
                              className="px-4 py-3 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={addFeature}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Add Feature
                    </button>

                    {/* Full Description */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Full Description</label>
                      <textarea
                        name="fullDescription"
                        placeholder="Describe your template in detail, target audience, use cases..."
                        value={templateData.fullDescription}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      />
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4 pt-6">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:border-white/40 transition font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(4)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
                      >
                        Review & Submit
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Preview */}
              {step === 4 && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Eye size={28} /> Review Your Template
                  </h2>

                  <div className="space-y-8">
                    {/* Preview Card */}
                    <div className={`bg-gradient-to-br ${templateData.color} rounded-xl p-8 text-white`}>
                      <div className="text-5xl mb-4">🎨</div>
                      <h3 className="text-2xl font-bold mb-2">{templateData.name || 'Template Name'}</h3>
                      <p className="text-white/90 mb-6">{templateData.description || 'Template description'}</p>
                      
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="font-bold">Category:</span> {templateData.category}
                        </div>
                        <div className="text-sm">
                          <span className="font-bold">Target Audience:</span> {templateData.targetAudience}
                        </div>
                        {templateData.features.filter(f => f).length > 0 && (
                          <div className="text-sm">
                            <span className="font-bold">Features:</span>
                            <ul className="mt-2 space-y-1">
                              {templateData.features.filter(f => f).map((feature, idx) => (
                                <li key={idx}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                      <h4 className="font-bold">Summary:</h4>
                      <div className="text-sm text-white/70 space-y-2">
                        <p>✓ Template Name: <span className="text-white">{templateData.name}</span></p>
                        <p>✓ Category: <span className="text-white">{templateData.category}</span></p>
                        <p>✓ Target Audience: <span className="text-white">{templateData.targetAudience}</span></p>
                        <p>✓ Features: <span className="text-white">{templateData.features.filter(f => f).length}</span></p>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <input type="checkbox" className="mt-1" />
                      <p className="text-sm text-white/80">
                        I agree that my template will be reviewed by our team and added to the community gallery if approved. I understand it will be available for other users to use.
                      </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4 pt-6">
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:border-white/40 transition font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition font-medium"
                      >
                        Submit for Approval
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
