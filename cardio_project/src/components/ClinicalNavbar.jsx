import React from 'react';
import { Activity, Stethoscope, BarChart3, BookOpen, Sparkles, RefreshCw, Palette } from 'lucide-react';
import { THEMES } from '../themes';

export default function ClinicalNavbar({
  activeTab,
  setActiveTab,
  apiConnected,
  pingLatency,
  onRefreshHealth,
  selectedThemeName,
  setSelectedThemeName,
  theme
}) {
  const navItems = [
    { id: 'workstation', label: 'Diagnostic Console', icon: Stethoscope },
    { id: 'analytics', label: 'Cohort Intelligence', icon: BarChart3 },
    { id: 'protocols', label: 'Clinical Protocols', icon: BookOpen }
  ];

  return (
    <header 
      className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors"
      style={{
        backgroundColor: theme.bg_secondary + 'F0',
        borderColor: theme.card_border,
        color: theme.text_primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ background: theme.accent_gradient }}
            >
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight" style={{ color: theme.text_primary }}>
                  Cardio<span style={{ color: theme.accent_cyan }}>Pulse</span>
                </span>
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: theme.badge_bg,
                    color: theme.badge_text,
                    border: `1px solid ${theme.badge_border}`
                  }}
                >
                  AI Suite
                </span>
              </div>
              <p className="text-[11px] font-medium leading-none" style={{ color: theme.text_secondary }}>
                Cardiovascular Health Diagnostics
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav 
            className="hidden md:flex items-center p-1 rounded-xl border"
            style={{
              backgroundColor: theme.input_bg,
              borderColor: theme.input_border
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'font-extrabold shadow-sm'
                      : 'font-semibold hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.bg_primary : 'transparent',
                    color: isActive ? theme.accent_cyan : theme.text_secondary,
                    border: isActive ? `1px solid ${theme.card_border}` : '1px solid transparent'
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Selector Dropdown + API Status */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Theme Selector */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold" style={{ backgroundColor: theme.input_bg, borderColor: theme.input_border }}>
                <Palette className="w-3.5 h-3.5" style={{ color: theme.accent_cyan }} />
                <select
                  value={selectedThemeName}
                  onChange={(e) => setSelectedThemeName(e.target.value)}
                  className="bg-transparent text-xs font-extrabold cursor-pointer focus:outline-none pr-1"
                  style={{ color: theme.text_primary }}
                >
                  {Object.keys(THEMES).map((thName) => (
                    <option 
                      key={thName} 
                      value={thName} 
                      style={{ 
                        backgroundColor: THEMES[thName].bg_card_solid, 
                        color: THEMES[thName].text_primary 
                      }}
                    >
                      {thName.split(' (')[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Backend Connection Status Pill */}
            <button
              type="button"
              onClick={onRefreshHealth}
              title="Click to refresh connection status"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
              style={{
                backgroundColor: apiConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: apiConnected ? '#10b981' : '#ef4444',
                borderColor: apiConnected ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'
              }}
            >
              <span className="relative flex h-2 w-2">
                {apiConnected && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: apiConnected ? '#10b981' : '#ef4444' }}
                ></span>
              </span>
              <span className="hidden sm:inline">
                {apiConnected ? "Backend Online" : "Hybrid Mode"}
              </span>
              {apiConnected && pingLatency !== null && (
                <span className="text-[10px] font-mono border-l border-emerald-500/40 pl-1.5 ml-0.5">
                  {pingLatency}ms
                </span>
              )}
              <RefreshCw className="w-3 h-3 text-slate-400 hover:rotate-180 transition-transform duration-300" />
            </button>

          </div>

        </div>

        {/* Mobile Submenu Navigation */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-slate-700/30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap cursor-pointer font-bold"
                style={{
                  backgroundColor: isActive ? theme.accent_cyan : theme.input_bg,
                  color: isActive ? '#000000' : theme.text_primary
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
