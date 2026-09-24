import React from 'react';
import { Heart, Activity, Info, BarChart3, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, apiConnected }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Cardio<span className="text-cyan-400">Care</span>
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Gradient Boosting
              </span>
            </div>
            <p className="text-xs text-slate-400">Heart Risk Evaluation Made Simple</p>
          </div>
        </div>

        {/* Clean Website Navigation */}
        <nav className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Risk Checker</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About & FAQ</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'insights'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Global Insights</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'tips'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Health Tips</span>
          </button>
        </nav>

        {/* Accuracy & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Model Accuracy: 91.2% 🔥</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300 font-medium">
              {apiConnected ? 'API Online' : 'Connecting...'}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
