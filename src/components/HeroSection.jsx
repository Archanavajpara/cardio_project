import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Zap, Award, BarChart } from 'lucide-react';

export default function HeroSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8 md:py-12 space-y-6 max-w-4xl mx-auto"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wide">
        <Sparkles className="w-3.5 h-3.5" /> High-Accuracy Gradient Boosting Machine Learning Model
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
        Check Your Heart Risk in <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Under 2 Minutes</span>
      </h1>

      <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Cardio Care uses a Gradient Boosting Classifier trained on clinical health records to deliver instant cardiovascular risk evaluation.
      </p>

      {/* Model Performance Stats Banner */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Model Accuracy: <span className="text-emerald-400 font-extrabold text-sm">91.2% 🔥</span></span>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200">
          <BarChart className="w-4 h-4 text-cyan-400" />
          <span>F1-Score: <span className="text-cyan-400 font-extrabold text-sm">91.1% ✨</span></span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200">
          <Zap className="w-4 h-4 text-purple-400" />
          <span>Classifier: <span className="text-purple-400 font-extrabold">GradientBoostingClassifier</span></span>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Instant AI Analysis</div>
            <div className="text-xs text-slate-400">Get probability score & risk level in seconds.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">100% Private</div>
            <div className="text-xs text-slate-400">Your health data stays strictly in your browser session.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Personalized Tips</div>
            <div className="text-xs text-slate-400">Receive customized lifestyle recommendations.</div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
