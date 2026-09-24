import React, { useEffect, useState } from 'react';
import { 
  Heart, Apple, Activity, HeartHandshake, ShieldCheck, 
  CheckCircle2, BookmarkCheck, Award 
} from 'lucide-react';

const ICON_MAP = {
  Apple: Apple,
  Activity: Activity,
  HeartHandshake: HeartHandshake,
  ShieldCheck: ShieldCheck
};

const DEFAULT_PROTOCOLS = [
  {
    id: "diet",
    category: "Nutrition & Diet",
    title: "🥑 Eat the Rainbow",
    icon: "Apple",
    description: "A balanced diet is the best fuel to keep your heart smiling.",
    bullets: [
      "Healthy Fats: Avocados, almonds, and olive oil help improve HDL cholesterol.",
      "Lower Sodium: Keep daily salt intake under 2,300mg to keep blood pressure steady.",
      "Fiber Focus: Oats, lentils, and fresh berries work like a natural broom for your arteries!"
    ]
  },
  {
    id: "exercise",
    category: "Physical Activity",
    title: "🏃‍♀️ Keep Moving Daily",
    icon: "Activity",
    description: "Your heart is a powerful muscle that loves regular activity!",
    bullets: [
      "Cardio Goals: Aim for 150 minutes of moderate exercise per week.",
      "Strength & Tone: Muscle mass improves metabolism and insulin sensitivity.",
      "Post-Meal Walks: A quick 10-minute walk after lunch lowers blood sugar spikes."
    ]
  },
  {
    id: "mindfulness",
    category: "Mental Wellness",
    title: "🧘‍♀️ Stress & Sleep",
    icon: "HeartHandshake",
    description: "Your emotional state directly impacts your heart rate and arterial pressure.",
    bullets: [
      "Deep Breathing: Practice 5-minute box breathing when feeling anxious.",
      "Restorative Sleep: 7-9 hours of regular sleep restores cardiovascular tissue.",
      "Unplug & Relax: Limit screen time 1 hour before bed to lower cortisol."
    ]
  },
  {
    id: "habits",
    category: "Healthy Lifestyle",
    title: "🚫 Smart Choices",
    icon: "ShieldCheck",
    description: "Eliminating risky habits provides immediate protection to your blood vessels.",
    bullets: [
      "Quit Smoking: Arterial pressure begins dropping within 20 minutes of quitting.",
      "Moderate Alcohol: Keep alcohol intake low to protect liver and heart function.",
      "Hydrate Well: Drink 2-3 liters of water daily to maintain smooth blood viscosity."
    ]
  }
];

export default function ClinicalProtocols({ theme }) {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedItems, setCompletedItems] = useState({});

  useEffect(() => {
    fetch('/api/health-tips')
      .then(res => {
        if (!res.ok) throw new Error("Failed to load health protocols");
        return res.json();
      })
      .then(data => {
        setTips(data && data.length ? data : DEFAULT_PROTOCOLS);
        setLoading(false);
      })
      .catch(() => {
        setTips(DEFAULT_PROTOCOLS);
        setLoading(false);
      });
  }, []);

  const toggleCheck = (id) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalBullets = tips.reduce((acc, t) => acc + (t.bullets ? t.bullets.length : 0), 0);
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const adherenceScore = totalBullets > 0 ? Math.round((completedCount / totalBullets) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Header with Interactive Adherence Score */}
      <div className="theme-glass-card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold mb-2"
              style={{
                backgroundColor: theme.badge_bg,
                color: theme.badge_text,
                border: `1px solid ${theme.badge_border}`
              }}
            >
              <BookmarkCheck className="w-3.5 h-3.5" /> Evidence-Based Cardiology Standards (AHA / ESC)
            </div>
            <h2 className="text-xl font-extrabold" style={{ color: theme.text_primary }}>
              Preventive Cardiovascular Protocols & Adherence Tracker
            </h2>
            <p className="text-xs font-medium mt-1" style={{ color: theme.text_secondary }}>
              Interactive clinical pathways designed to reduce arterial plaque progression and optimize hemodynamic load.
            </p>
          </div>

          {/* Live Adherence Score Widget */}
          <div 
            className="p-4 px-5 rounded-2xl border flex items-center gap-4 shrink-0"
            style={{ backgroundColor: theme.input_bg, borderColor: theme.input_border }}
          >
            <div 
              className="w-11 h-11 rounded-xl text-white flex items-center justify-center font-bold text-sm shadow-md"
              style={{ background: theme.accent_gradient }}
            >
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: theme.text_secondary }}>
                Lifestyle Adherence
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono" style={{ color: theme.text_primary }}>
                  {adherenceScore}%
                </span>
                <span className="text-xs font-bold" style={{ color: theme.text_secondary }}>
                  ({completedCount}/{totalBullets} active)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((protocol, pIdx) => {
          const Icon = ICON_MAP[protocol.icon] || Heart;

          return (
            <div 
              key={protocol.id || pIdx} 
              className="theme-glass-card p-6 space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/30">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2.5 rounded-xl border"
                      style={{
                        backgroundColor: theme.badge_bg,
                        color: theme.badge_text,
                        borderColor: theme.badge_border
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.accent_cyan }}>
                        {protocol.category}
                      </span>
                      <h3 className="font-extrabold text-base" style={{ color: theme.text_primary }}>
                        {protocol.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs mt-3 leading-relaxed font-medium" style={{ color: theme.text_secondary }}>
                  {protocol.description}
                </p>

                {/* Interactive Checklist Directives */}
                <div className="space-y-2 mt-4">
                  {protocol.bullets && protocol.bullets.map((bullet, bIdx) => {
                    const itemKey = `${protocol.id}-${bIdx}`;
                    const isChecked = !!completedItems[itemKey];

                    return (
                      <div
                        key={bIdx}
                        onClick={() => toggleCheck(itemKey)}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                            : 'border-slate-700/40 hover:border-slate-500'
                        }`}
                        style={{
                          backgroundColor: isChecked ? undefined : theme.input_bg,
                          color: isChecked ? '#6ee7b7' : theme.text_primary
                        }}
                      >
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-600 bg-black/30'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`leading-relaxed font-medium ${isChecked ? 'line-through opacity-75' : ''}`}>
                          {bullet}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
