import React from 'react';

export default function BiometricRadarChart({ formData, bmi, theme }) {
  const categories = [
    { label: 'BP (Systolic)', key: 'sys' },
    { label: 'BP (Diastolic)', key: 'dia' },
    { label: 'BMI Level', key: 'bmi' },
    { label: 'Cholesterol', key: 'chol' },
    { label: 'Glucose', key: 'gluc' },
    { label: 'Sedentary Factor', key: 'inactivity' }
  ];

  // Calculate normalized patient scores (0-100)
  const ap_hi = formData.ap_hi || 120;
  const ap_lo = formData.ap_lo || 80;
  const bmiVal = parseFloat(bmi) || 22;
  const chol_val = formData.cholesterol === "Well Above Normal" ? 3 : formData.cholesterol === "Above Normal" ? 2 : (formData.chol_val || 1);
  const gluc_val = formData.gluc === "Well Above Normal" ? 3 : formData.gluc === "Above Normal" ? 2 : (formData.gluc_val || 1);
  const active_val = formData.active === "No" ? 0 : (formData.active_val !== undefined ? formData.active_val : 1);

  const patientScores = [
    Math.min(100, Math.round((ap_hi / 160) * 100)),
    Math.min(100, Math.round((ap_lo / 100) * 100)),
    Math.min(100, Math.round((bmiVal / 35) * 100)),
    Math.min(100, Math.round((chol_val / 3) * 100)),
    Math.min(100, Math.round((gluc_val / 3) * 100)),
    active_val === 0 ? 100 : 20
  ];

  const optimalScores = [75, 75, 65, 33, 33, 20];

  // SVG Geometry on 300x300 canvas
  const cx = 150;
  const cy = 150;
  const maxR = 95;
  const total = categories.length;

  const getCoordinates = (value, index) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (value / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  const patientPoints = patientScores.map((val, idx) => getCoordinates(val, idx));
  const optimalPoints = optimalScores.map((val, idx) => getCoordinates(val, idx));

  const patientPath = patientPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  const optimalPath = optimalPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-[320px] h-[280px]">
        <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
          {/* Background Concentric Webs */}
          {[0.25, 0.5, 0.75, 1.0].map((level, lvlIdx) => {
            const levelPoints = categories.map((_, i) => {
              const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
              const r = level * maxR;
              return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
            }).join(' ');
            return (
              <polygon
                key={lvlIdx}
                points={levelPoints}
                fill="none"
                stroke={theme.isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)"}
                strokeWidth="1"
                strokeDasharray={lvlIdx < 3 ? "3,3" : "none"}
              />
            );
          })}

          {/* Spokes radiating from center */}
          {categories.map((cat, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const x = cx + maxR * Math.cos(angle);
            const y = cy + maxR * Math.sin(angle);

            // Label positioning
            const labelR = maxR + 24;
            const lx = cx + labelR * Math.cos(angle);
            const ly = cy + labelR * Math.sin(angle);

            return (
              <g key={i}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke={theme.isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)"}
                  strokeWidth="1"
                />
                <text
                  x={lx}
                  y={ly}
                  fill={theme.text_primary}
                  fontSize="9"
                  fontWeight="700"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {cat.label}
                </text>
              </g>
            );
          })}

          {/* Optimal Target Polygon (Green dashed) */}
          <polygon
            points={optimalPoints.map(p => `${p.x},${p.y}`).join(' ')}
            fill="rgba(16, 185, 129, 0.12)"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeDasharray="4,4"
          />

          {/* Patient Vitals Polygon (Accent Gradient fill & stroke) */}
          <polygon
            points={patientPoints.map(p => `${p.x},${p.y}`).join(' ')}
            fill={theme.isDark ? "rgba(255, 42, 95, 0.25)" : "rgba(37, 99, 235, 0.25)"}
            stroke={theme.accent_glow}
            strokeWidth="2.5"
          />

          {/* Patient Value Nodes */}
          {patientPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill={theme.accent_cyan}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-1 text-xs font-bold">
        <div className="flex items-center gap-2">
          <span 
            className="w-3.5 h-3.5 rounded-full inline-block"
            style={{ backgroundColor: theme.accent_glow }}
          />
          <span style={{ color: theme.text_primary }}>Patient Vitals Profile</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-1 border-t-2 border-dashed border-emerald-500 inline-block" />
          <span style={{ color: theme.text_secondary }}>Optimal Target Benchmark</span>
        </div>
      </div>
    </div>
  );
}
