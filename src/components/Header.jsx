import React from 'react';
import { Activity, Dna, Database, ShieldCheck, Cpu, Terminal, Zap } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, apiConnected }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Biotech Brand Identity */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer group" 
          onClick={() => setActiveTab('assessment')}
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Dna className="w-6 h-6 text-cyan-400 animate-pulse-ring" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                <span>CARDIO</span>
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">LABS</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold font-mono">
                BIOTECH AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-wide flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>CLINICAL TELEMETRY v2.4</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs - Samuel Oktavianus Biotech Pill Style */}
        <nav className="flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('assessment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase font-mono transition-all duration-300 ${
              activeTab === 'assessment'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase font-mono transition-all duration-300 ${
              activeTab === 'insights'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/25 ring-1 ring-purple-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Genomics Cohort</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase font-mono transition-all duration-300 ${
              activeTab === 'tips'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Protocols</span>
          </button>
        </nav>

        {/* Live System Status Telemetry Badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 font-mono text-[11px]">
          <div className="relative flex items-center justify-center">
            <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            {apiConnected && (
              <span className="absolute w-3 h-3 rounded-full bg-emerald-400/40 animate-ping" />
            )}
          </div>
          <span className="text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-200 font-semibold">
              {apiConnected ? 'FASTAPI REST ACTIVE' : 'CONNECTING SERVER...'}
            </span>
          </span>
        </div>

      </div>
    </header>
  );
}
