import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Activity, HeartHandshake, ShieldCheck, CheckCircle2, Lightbulb, Sparkles, Dna, FileCheck2 } from 'lucide-react';

export default function HealthTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health-tips')
      .then(res => res.json())
      .then(data => {
        setTips(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load health tips", err);
        setLoading(false);
      });
  }, []);

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'Apple': return <Apple className="w-5 h-5 text-emerald-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      default: return <Lightbulb className="w-5 h-5 text-amber-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 font-mono">
        <div className="w-10 h-10 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-xs tracking-wider">RETRIEVE PROTOCOL DIRECTIVES...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono font-bold tracking-wider uppercase">
          <FileCheck2 className="w-3.5 h-3.5" /> Preventive Medicine Protocols
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Biomedical Wellness Directives</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto font-sans">
          Evidence-based lifestyle practices and metabolic guidelines for long-term arterial and cardiovascular resilience.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip) => (
          <motion.div
            key={tip.id}
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{tip.category}</span>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {getIcon(tip.icon)}
                </div>
              </div>

              <h3 className="text-lg font-black text-white font-sans">{tip.title}</h3>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">{tip.description}</p>

              <div className="space-y-2 pt-3 border-t border-slate-800/80 font-mono text-xs">
                {tip.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
