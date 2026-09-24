import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Cpu, HelpCircle, ChevronDown, CheckCircle2, Lock, Stethoscope } from 'lucide-react';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is Cardio Care AI a substitute for seeing a medical doctor?",
      a: "No. Cardio Care is an educational AI demonstration tool built using machine learning classification models. While it evaluates key risk indicators like blood pressure, cholesterol, and BMI, you should always consult a licensed medical professional or physician for official clinical diagnostics and treatment."
    },
    {
      q: "How does the AI model calculate my heart risk percentage?",
      a: "Our machine learning model was trained on 8,000 anonymized clinical patient samples. It scales your input parameters (age, blood pressure, BMI, glucose, cholesterol, and lifestyle habits) and compares them against pattern clusters to calculate a calibrated risk probability percentage."
    },
    {
      q: "Is my private health data saved on a server?",
      a: "No. Your privacy is paramount. All inputs are evaluated in-memory during your session and are never logged, stored in a database, or shared with third parties."
    },
    {
      q: "What factors have the biggest impact on heart risk?",
      a: "Systolic blood pressure, cholesterol levels, age, and smoking are among the highest-weighted predictive features. Making small lifestyle adjustments like regular cardio exercise and reducing sodium can significantly lower your risk score over time."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-12 py-4"
    >
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold">
          <Heart className="w-3.5 h-3.5 fill-pink-400" /> About Cardio Care
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Empowering Heart Health Awareness</h2>
        <p className="text-slate-300 text-base max-w-2xl mx-auto">
          Combining modern machine learning with accessible design to help everyone understand their cardiovascular metrics.
        </p>
      </div>

      {/* 3 Step Process Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white text-center">How Cardio Care Works in 3 Simple Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center font-bold text-xl mx-auto">
              1
            </div>
            <h4 className="text-lg font-bold text-white">Input Your Vitals</h4>
            <p className="text-slate-400 text-sm">Enter basic measurements such as age, height, weight, blood pressure, and daily habits.</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-xl mx-auto">
              2
            </div>
            <h4 className="text-lg font-bold text-white">AI Neural Prediction</h4>
            <p className="text-slate-400 text-sm">Our trained classification model evaluates your parameters against population health benchmarks.</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xl mx-auto">
              3
            </div>
            <h4 className="text-lg font-bold text-white">Personalized Guidance</h4>
            <p className="text-slate-400 text-sm">Receive immediate risk category scores, BMI insights, and actionable health recommendations.</p>
          </div>
        </div>
      </div>

      {/* Trust & Features Section */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-pink-400 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" /> Built with Care & Security
          </div>
          <h3 className="text-2xl font-bold text-white">Why Use Cardio Care?</h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0" />
              <span><strong>Instant Feedback:</strong> No waiting for lab tests or waiting rooms for preliminary checks.</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0" />
              <span><strong>Evidence-Based Features:</strong> Trained on standard clinical parameters (ap_hi, ap_lo, cholesterol, glucose).</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0" />
              <span><strong>Zero Data Logging:</strong> Your privacy is respected and your inputs are processed in-memory only.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
          <Stethoscope className="w-12 h-12 text-pink-400 mx-auto" />
          <h4 className="text-lg font-bold text-white">Medical Disclaimer</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Cardio Care is designed solely for informational, risk awareness, and educational purposes. It does not provide medical diagnosis, treatment, or clinical prescriptions. Always seek the advice of your physician or qualified health provider regarding medical conditions.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-pink-400" />
            <span>Frequently Asked Questions</span>
          </h3>
          <p className="text-slate-400 text-sm">Got questions about how Cardio Care works? Here are answers to common queries.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-200 text-sm sm:text-base hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-pink-400 shrink-0 transition-transform ${openFaq === idx ? 'transform rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-slate-400 text-sm border-t border-slate-800/60 leading-relaxed bg-slate-950/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
