import React from 'react';
import { Activity, Shield, Sparkles } from 'lucide-react';
import AnimatedHero from './AnimatedHero';

export default function HeroHeader({ currentThemeName, theme, apiConnected }) {
  const shortThemeName = currentThemeName.split(' (')[0];

  return (
    <div className="theme-hero-header p-6 sm:p-7 mb-6 relative overflow-hidden">
      {/* Background 3D animation */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none flex justify-end overflow-hidden">
        <div className="w-full max-w-lg relative right-0 sm:-right-24 transform scale-75 sm:scale-100">
          <AnimatedHero />
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Title and Subtitle */}
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl heartbeat-icon">❤️</span>
            <h1 
              className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{
                background: theme.accent_gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              CardioRisk AI
            </h1>
            <span 
              className="text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                backgroundColor: theme.badge_bg,
                color: theme.badge_text,
                border: `1px solid ${theme.badge_border}`
              }}
            >
              Clinical v2.0
            </span>
          </div>
          <p 
            className="text-sm sm:text-base mt-2 font-medium max-w-xl"
            style={{ color: theme.text_secondary }}
          >
            Intelligent Cardiovascular Disease Risk Assessment & Clinical Screening Platform
          </p>
        </div>

        {/* Right Status Badges */}
        <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
          <span className="metric-pill pill-info text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Theme: {shortThemeName}</span>
          </span>
          <span className="metric-pill pill-normal text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>{apiConnected ? "ML Engine: Online & Calibrated" : "ML Engine: Hybrid Active"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
