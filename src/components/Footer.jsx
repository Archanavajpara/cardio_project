import React from 'react';
import { Heart, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-10 px-4 lg:px-8 mt-12 relative z-10 text-sm">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Cardio<span className="text-pink-400">Care</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Cardio Care is an AI-powered cardiovascular health risk assessment platform. Helping individuals monitor their heart metrics through machine learning insights and evidence-based wellness guidelines.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-pink-400 transition-colors">
                  Risk Checker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-pink-400 transition-colors">
                  About & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('insights')} className="hover:text-pink-400 transition-colors">
                  Global Insights
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tips')} className="hover:text-pink-400 transition-colors">
                  Health Tips
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Privacy & Security</h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> 100% Private Session
              </div>
              <p className="text-slate-500 text-[11px]">No personal data is saved or transmitted to third-party databases.</p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Cardio Care AI. All rights reserved.</p>
          <p>Disclaimer: For educational & risk awareness purposes only. Not medical advice.</p>
        </div>

      </div>
    </footer>
  );
}
