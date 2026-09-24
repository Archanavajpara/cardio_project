import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export default function ClinicalFooter({ setActiveTab, theme }) {
  return (
    <footer 
      className="border-t py-8 px-4 lg:px-8 mt-12 text-xs no-print transition-colors"
      style={{
        backgroundColor: theme.bg_secondary,
        borderColor: theme.card_border,
        color: theme.text_secondary
      }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: theme.accent_gradient }}
            >
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold" style={{ color: theme.text_primary }}>
                CardioPulse™ Clinical AI Suite
              </span>
              <span className="text-[11px] ml-2 font-medium" style={{ color: theme.text_secondary }}>
                FastAPI ML + GradientBoosting Classifier
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('workstation')}
              className="hover:opacity-80 transition-colors cursor-pointer"
              style={{ color: theme.text_primary }}
            >
              Diagnostic Console
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className="hover:opacity-80 transition-colors cursor-pointer"
              style={{ color: theme.text_primary }}
            >
              Cohort Intelligence
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('protocols')}
              className="hover:opacity-80 transition-colors cursor-pointer"
              style={{ color: theme.text_primary }}
            >
              Clinical Protocols
            </button>
          </div>
        </div>

        <div 
          className="border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]"
          style={{ borderColor: theme.card_border }}
        >
          <p style={{ color: theme.text_secondary }}>
            © {new Date().getFullYear()} CardioPulse AI. Cardiovascular Risk Intelligence Platform.
          </p>
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> HIPAA-Compliant In-Memory Evaluation (Zero Patient Retention)
          </div>
        </div>

      </div>
    </footer>
  );
}
