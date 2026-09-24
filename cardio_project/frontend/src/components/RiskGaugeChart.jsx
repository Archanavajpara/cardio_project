import React from 'react';

export default function RiskGaugeChart({ probabilityPct, isHighRisk, theme }) {
  const pct = Math.min(100, Math.max(0, probabilityPct || 0));
  
  // Calculate angle for gauge: -180 deg (left) to 0 deg (right)
  const angle = -180 + (pct / 100) * 180;
  
  // Needle calculation on 200x120 SVG viewport
  const cx = 100;
  const cy = 95;
  const r = 70;
  const rad = (angle * Math.PI) / 180;
  const nx = cx + r * Math.cos(rad);
  const ny = cy + r * Math.sin(rad);

  const delta = (pct - 50).toFixed(1);
  const isPositiveDelta = pct >= 50;

  return (
    <div className="w-full flex flex-col items-center justify-center p-3">
      <div className="relative w-full max-w-[280px] h-[155px] flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
          <defs>
            {/* Gradients */}
            <linearGradient id="gaugeGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gaugeYellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gaugeRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Background Arc (Gray Base) */}
          <path
            d="M 25 95 A 75 75 0 0 1 175 95"
            fill="none"
            stroke={theme.isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Segment 1: Low Risk (0 - 35%) */}
          <path
            d="M 25 95 A 75 75 0 0 1 54 44"
            fill="none"
            stroke="url(#gaugeGreen)"
            strokeWidth="14"
            strokeLinecap="round"
            className="opacity-75"
          />

          {/* Segment 2: Moderate Risk (35 - 65%) */}
          <path
            d="M 58 40 A 75 75 0 0 1 142 40"
            fill="none"
            stroke="url(#gaugeYellow)"
            strokeWidth="14"
            className="opacity-75"
          />

          {/* Segment 3: High Risk (65 - 100%) */}
          <path
            d="M 146 44 A 75 75 0 0 1 175 95"
            fill="none"
            stroke="url(#gaugeRed)"
            strokeWidth="14"
            strokeLinecap="round"
            className="opacity-75"
          />

          {/* Active Value Arc Fill */}
          <circle
            cx={cx}
            cy={cy}
            r="75"
            fill="none"
            stroke={pct >= 50 ? "#ef4444" : "#10b981"}
            strokeWidth="6"
            strokeDasharray={`${(pct / 100) * 235.6} 235.6`}
            strokeDashoffset="0"
            transform="rotate(-180 100 95)"
            strokeLinecap="round"
          />

          {/* Needle Center & Pointer */}
          <line
            x1={cx}
            y1={cy}
            x2={nx}
            y2={ny}
            stroke={theme.accent_cyan}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          <circle cx={cx} cy={cy} r="6" fill={theme.accent_cyan} />
          <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
          <circle cx={nx} cy={ny} r="4" fill={theme.accent_glow} />

          {/* Tick Labels */}
          <text x="22" y="114" fill={theme.text_secondary} fontSize="8.5" fontWeight="bold" textAnchor="middle">0%</text>
          <text x="56" y="28" fill={theme.text_secondary} fontSize="8" fontWeight="bold" textAnchor="middle">35%</text>
          <text x="100" y="14" fill={theme.text_secondary} fontSize="8.5" fontWeight="bold" textAnchor="middle">50%</text>
          <text x="144" y="28" fill={theme.text_secondary} fontSize="8" fontWeight="bold" textAnchor="middle">65%</text>
          <text x="178" y="114" fill={theme.text_secondary} fontSize="8.5" fontWeight="bold" textAnchor="middle">100%</text>
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute bottom-0 flex flex-col items-center text-center">
          <div className="flex items-baseline gap-1">
            <span 
              className="text-3xl font-extrabold font-mono tracking-tight"
              style={{ color: theme.text_primary }}
            >
              {pct.toFixed(1)}
            </span>
            <span className="text-base font-bold" style={{ color: theme.text_secondary }}>%</span>
          </div>
          <span 
            className="text-[11px] font-bold mt-0.5"
            style={{ color: isPositiveDelta ? "#ef4444" : "#10b981" }}
          >
            {isPositiveDelta ? `▲ +${delta}% vs baseline` : `▼ ${delta}% vs baseline`}
          </span>
        </div>
      </div>
    </div>
  );
}
