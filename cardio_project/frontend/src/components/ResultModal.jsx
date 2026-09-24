import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShieldCheck, ShieldAlert, Heart, RefreshCw, ChevronRight, Dna, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ResultModal({ result, onReset }) {
  useEffect(() => {
    if (result && !result.is_high_risk) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#06b6d4', '#10b981', '#a855f7']
      });
    }
  }, [result]);

  if (!result) return null;

  const isHighRisk = result.is_high_risk;
  const probPct = result.probability_pct;

  let themeGradient = "from-emerald-500 to-teal-500";
  let badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  let ringColor = "#10b981";

  if (probPct >= 35 && probPct < 65) {
    themeGradient = "from-amber-500 to-orange-500";
    badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/30";
    ringColor = "#f59e0b";
  } else if (probPct >= 65) {
    themeGradient = "from-rose-500 to-red-600";
    badgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/30";
    ringColor = "#f43f5e";
  }

  const strokeDashoffset = 283 - (283 * probPct) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="max-w-4xl mx-auto my-6 p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
    >
      {/* Ambient background glow orb */}
      <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none bg-gradient-to-br ${themeGradient}`} />

      <div className="relative z-10 space-y-6">
        
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          
          <div className="space-y-2 text-center sm:text-left">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${badgeColor}`}>
              {isHighRisk ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              <span>{result.risk_level}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400 inline" />
              <span>Biomedical Clinical Report</span>
            </h3>
            <p className="text-slate-400 text-sm max-w-md">{result.status_message}</p>
          </div>

          {/* Radial Progress Telemetry Ring */}
          <div className="relative flex items-center justify-center p-2 rounded-2xl bg-slate-950/80 border border-slate-800">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-800/80"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="45"
                stroke={ringColor}
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-white font-mono">{probPct}%</span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Probability</span>
            </div>
          </div>

        </div>

        {/* Telemetry Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Model Recommendation</div>
              <div className="text-sm font-bold font-mono text-white">
                {isHighRisk ? 'CLINICAL EVALUATION URGENT 🏥' : 'PHYSIOLOGICAL OPTIMAL 🌸'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Metabolic Index (BMI)</div>
              <div className="text-sm font-bold font-mono text-white">{result.bmi} kg/m²</div>
            </div>
          </div>
        </div>

        {/* Actionable Clinical Recommendations */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Biomedical Action Protocols</span>
          </h4>
          <div className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-3 text-xs font-mono text-slate-200"
              >
                <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs uppercase tracking-wider transition-all border border-slate-700"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>RESET TELEMETRY SESSION</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
