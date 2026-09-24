import React, { useState, useEffect } from 'react';
import { 
  Heart, Activity, Zap, Shield, Sparkles, FileText, 
  ChevronRight, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2,
  Download, Stethoscope, User, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RiskGaugeChart from './RiskGaugeChart';
import BiometricRadarChart from './BiometricRadarChart';
import ReportExportModal from './ReportExportModal';
import { PRESETS } from '../themes';

export default function DiagnosticConsole({
  theme,
  onPredict,
  predictionResult,
  loading,
  errorMsg,
  apiConnected
}) {
  const [formData, setFormData] = useState({
    gender: "Female",
    gender_val: 1,
    age: 48,
    height: 164,
    weight: 70.0,
    ap_hi: 128,
    ap_lo: 82,
    cholesterol: "Normal",
    chol_val: 1,
    gluc: "Normal",
    gluc_val: 1,
    smoke: "No",
    smoke_val: 0,
    alco: "No",
    alco_val: 0,
    active: "Yes",
    active_val: 1
  });

  const [activePreset, setActivePreset] = useState("💼 Average Middle-Aged");
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Trigger celebration confetti on low-risk results
  useEffect(() => {
    if (predictionResult && !predictionResult.is_high_risk && predictionResult.probability_pct < 40) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [predictionResult]);

  // Handle Preset Selection
  const handleSelectPreset = (presetName) => {
    const preset = PRESETS[presetName];
    if (preset) {
      setActivePreset(presetName);
      setFormData({
        gender: preset.gender,
        gender_val: preset.gender_val,
        age: preset.age,
        height: preset.height,
        weight: preset.weight,
        ap_hi: preset.ap_hi,
        ap_lo: preset.ap_lo,
        cholesterol: preset.cholesterol,
        chol_val: preset.chol_val,
        gluc: preset.gluc,
        gluc_val: preset.gluc_val,
        smoke: preset.smoke,
        smoke_val: preset.smoke_val,
        alco: preset.alco,
        alco_val: preset.alco_val,
        active: preset.active,
        active_val: preset.active_val
      });
      // Automatically trigger prediction for instant feedback
      onPredict({
        age: preset.age,
        gender: preset.gender_val,
        height: preset.height,
        weight: preset.weight,
        ap_hi: preset.ap_hi,
        ap_lo: preset.ap_lo,
        cholesterol: preset.chol_val,
        gluc: preset.gluc_val,
        smoke: preset.smoke_val,
        alco: preset.alco_val,
        active: preset.active_val
      });
    }
  };

  const handleFieldChange = (field, value) => {
    setActivePreset(null);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 1. BMI Calculation
  const heightM = (formData.height || 160) / 100;
  const bmi = ((formData.weight || 60) / (heightM * heightM)).toFixed(1);

  const getBmiDetails = (val) => {
    const n = parseFloat(val);
    if (n < 18.5) return { label: "Underweight", badge: "pill-info", desc: "Body mass below recommended baseline" };
    if (n < 25.0) return { label: "Normal weight", badge: "pill-normal", desc: "Optimal cardiovascular body composition" };
    if (n < 30.0) return { label: "Overweight", badge: "pill-warning", desc: "Slightly elevated metabolic load" };
    return { label: "Obese (Class I+)", badge: "pill-danger", desc: "Higher risk of vascular and metabolic strain" };
  };

  // 2. Blood Pressure AHA Classification
  const getBpDetails = (sys, dia) => {
    if (sys > 180 || dia > 120) {
      return { label: "Hypertensive Crisis", badge: "pill-danger", desc: "Emergency medical consultation strongly advised!" };
    }
    if (sys >= 140 || dia >= 90) {
      return { label: "Stage 2 Hypertension", badge: "pill-danger", desc: "Significantly elevated arterial pressure requiring clinical care." };
    }
    if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      return { label: "Stage 1 Hypertension", badge: "pill-warning", desc: "Moderate elevation. Dietary and lifestyle intervention advised." };
    }
    if (sys >= 120 && sys <= 129 && dia < 80) {
      return { label: "Elevated Blood Pressure", badge: "pill-warning", desc: "Pressure slightly exceeds optimal baseline." };
    }
    if (sys < 120 && dia < 80) {
      return { label: "Normal Blood Pressure", badge: "pill-normal", desc: "Optimal cardiovascular hemodynamic range." };
    }
    return { label: "Unclassified Reading", badge: "pill-info", desc: "Review measurement numbers." };
  };

  const bmiDetails = getBmiDetails(bmi);
  const bpDetails = getBpDetails(formData.ap_hi, formData.ap_lo);
  const meanArterialPressure = Math.round((2 * formData.ap_lo + formData.ap_hi) / 3);

  // 3. Risk and Protective Factors Breakdown
  const getFactorsAnalysis = () => {
    const riskFlags = [];
    const protectiveFlags = [];

    if (formData.ap_hi >= 130 || formData.ap_lo >= 85) {
      riskFlags.push(`Elevated Blood Pressure: ${formData.ap_hi}/${formData.ap_lo} mmHg indicates vascular strain.`);
    } else {
      protectiveFlags.push(`Healthy Blood Pressure: ${formData.ap_hi}/${formData.ap_lo} mmHg within optimal limits.`);
    }

    if (parseFloat(bmi) >= 25.0) {
      riskFlags.push(`Elevated BMI (${bmi} kg/m²): Classified as ${bmiDetails.label}.`);
    } else {
      protectiveFlags.push(`Optimal Body Weight: BMI ${bmi} kg/m² supports metabolic health.`);
    }

    if (formData.cholesterol !== "Normal") {
      riskFlags.push(`Elevated Cholesterol (${formData.cholesterol}): Contributes to arterial plaque buildup.`);
    } else {
      protectiveFlags.push("Normal Cholesterol: Reduces risk of coronary artery obstruction.");
    }

    if (formData.gluc !== "Normal") {
      riskFlags.push(`Elevated Glucose (${formData.gluc}): Blood sugar fluctuation stresses vascular lining.`);
    } else {
      protectiveFlags.push("Optimal Fasting Glucose: Normal blood sugar baseline.");
    }

    if (formData.smoke === "Yes") {
      riskFlags.push("Active Tobacco Smoking: Damages endothelial arterial walls.");
    } else {
      protectiveFlags.push("Non-Smoker: Preserves cardiovascular elasticity.");
    }

    if (formData.active === "No") {
      riskFlags.push("Physical Inactivity: Sedentary routine increases cardiovascular vulnerability.");
    } else {
      protectiveFlags.push("Physically Active: Enhances myocardial endurance and efficiency.");
    }

    return { riskFlags, protectiveFlags };
  };

  // 4. Personalized Action Plan
  const getPersonalizedRecommendations = () => {
    const recs = [];
    if (formData.ap_hi >= 130 || formData.ap_lo >= 85) {
      recs.push("**DASH / Low-Sodium Dietary Plan**: Reduce sodium intake below 2,000 mg/day; monitor blood pressure weekly.");
    }
    if (parseFloat(bmi) >= 25.0) {
      recs.push("**Caloric & Body Composition Balance**: Target 5-10% gradual weight management via portion control and whole foods.");
    }
    if (formData.cholesterol !== "Normal") {
      recs.push("**Lipid Optimization**: Increase soluble dietary fiber, incorporate omega-3 fatty acids, and reduce saturated fats.");
    }
    if (formData.smoke === "Yes") {
      recs.push("**Smoking Cessation Support**: Consult a healthcare provider regarding nicotine replacement therapy and cessation programs.");
    }
    if (formData.active === "No") {
      recs.push("**Aerobic Exercise Goal**: Aim for at least 150 minutes of moderate-intensity activity (e.g., brisk walking) per week.");
    }
    if (formData.alco === "Yes") {
      recs.push("**Moderate Alcohol Intake**: Limit consumption to prevent alcohol-induced blood pressure elevation.");
    }
    if (recs.length === 0) {
      recs.push("**Maintain Optimal Health Protocol**: Continue balanced nutrition, regular physical activity, and annual wellness screenings.");
    }
    return recs;
  };

  const { riskFlags, protectiveFlags } = getFactorsAnalysis();
  const actionPlan = getPersonalizedRecommendations();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onPredict({
      age: parseInt(formData.age),
      gender: formData.gender === "Male" ? 2 : 1,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      ap_hi: parseInt(formData.ap_hi),
      ap_lo: parseInt(formData.ap_lo),
      cholesterol: formData.cholesterol === "Well Above Normal" ? 3 : formData.cholesterol === "Above Normal" ? 2 : 1,
      gluc: formData.gluc === "Well Above Normal" ? 3 : formData.gluc === "Above Normal" ? 2 : 1,
      smoke: formData.smoke === "Yes" ? 1 : 0,
      alco: formData.alco === "Yes" ? 1 : 0,
      active: formData.active === "Yes" ? 1 : 0
    });
  };

  return (
    <div className="space-y-6">
      
      {/* ⚡ Quick Patient Presets Selector Bar */}
      <div className="theme-glass-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/30">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: theme.accent_cyan }}>
              <Zap className="w-3.5 h-3.5" /> Quick Patient Presets
            </span>
            <p className="text-xs font-semibold mt-0.5" style={{ color: theme.text_secondary }}>
              Load typical clinical profiles in one click to test predictions and compare metrics:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {Object.entries(PRESETS).map(([key, preset]) => {
            const isSelected = activePreset === key;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(key)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500/15 shadow-md'
                    : 'border-slate-700/40 hover:border-slate-500 bg-black/20 hover:bg-black/30'
                }`}
                style={{
                  color: theme.text_primary
                }}
              >
                <div className="font-extrabold text-xs mb-1 flex items-center justify-between">
                  <span>{preset.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent_cyan }} />
                  )}
                </div>
                <div className="text-[11px] font-medium leading-snug" style={{ color: theme.text_secondary }}>
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split: Input Forms & Biometrics (Left) vs Diagnostics & Charts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ===================== LEFT COLUMN: Intake Cards (6 cols) ===================== */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Form wrapper */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Card 1: Personal & Biometrics */}
            <div className="theme-glass-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/30 pb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: theme.accent_cyan }} />
                  <h3 className="font-extrabold text-sm sm:text-base" style={{ color: theme.text_primary }}>
                    1. Personal & Biometrics
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: theme.input_bg, color: theme.text_secondary }}>
                  Anthropometry
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sex */}
                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: theme.text_primary }}>
                    Biological Sex
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Female", "Male"].map(sex => (
                      <button
                        key={sex}
                        type="button"
                        onClick={() => handleFieldChange("gender", sex)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          formData.gender === sex
                            ? 'theme-btn-primary shadow-sm'
                            : 'border-slate-700/50 hover:bg-slate-800/40'
                        }`}
                        style={{
                          backgroundColor: formData.gender === sex ? undefined : theme.input_bg,
                          color: formData.gender === sex ? '#ffffff' : theme.text_primary
                        }}
                      >
                        {sex}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold" style={{ color: theme.text_primary }}>
                      Age (years)
                    </label>
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded" style={{ backgroundColor: theme.input_bg, color: theme.accent_cyan }}>
                      {formData.age} yrs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleFieldChange("age", parseInt(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-2 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-bold font-mono mt-1" style={{ color: theme.text_secondary }}>
                    <span>18</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: theme.text_primary }}>
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="230"
                    value={formData.height}
                    onChange={(e) => handleFieldChange("height", parseFloat(e.target.value) || 100)}
                    className="w-full theme-input p-2.5 text-xs font-extrabold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: theme.text_primary }}>
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="220"
                    step="0.5"
                    value={formData.weight}
                    onChange={(e) => handleFieldChange("weight", parseFloat(e.target.value) || 30)}
                    className="w-full theme-input p-2.5 text-xs font-extrabold"
                  />
                </div>
              </div>

              {/* Live BMI Banner */}
              <div className="p-3 rounded-xl flex items-center justify-between border border-slate-700/40" style={{ backgroundColor: theme.input_bg }}>
                <div>
                  <span className="text-xs font-bold" style={{ color: theme.text_secondary }}>Calculated BMI: </span>
                  <span className="text-sm font-extrabold font-mono ml-1" style={{ color: theme.text_primary }}>
                    {bmi} kg/m²
                  </span>
                </div>
                <span className={`metric-pill ${bmiDetails.badge}`}>
                  {bmiDetails.label}
                </span>
              </div>
            </div>

            {/* Card 2: Hemodynamics & Blood Pressure */}
            <div className="theme-glass-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/30 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" style={{ color: theme.accent_glow }} />
                  <h3 className="font-extrabold text-sm sm:text-base" style={{ color: theme.text_primary }}>
                    2. Hemodynamics & Blood Pressure
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: theme.input_bg, color: theme.text_secondary }}>
                  AHA Guidelines
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: theme.text_primary }}>
                    Systolic BP (ap_hi mmHg)
                  </label>
                  <input
                    type="number"
                    min="70"
                    max="240"
                    value={formData.ap_hi}
                    onChange={(e) => handleFieldChange("ap_hi", parseInt(e.target.value) || 70)}
                    className="w-full theme-input p-2.5 text-xs font-extrabold"
                    title="Upper pressure during heart contractions"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: theme.text_primary }}>
                    Diastolic BP (ap_lo mmHg)
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="180"
                    value={formData.ap_lo}
                    onChange={(e) => handleFieldChange("ap_lo", parseInt(e.target.value) || 40)}
                    className="w-full theme-input p-2.5 text-xs font-extrabold"
                    title="Lower resting arterial pressure between beats"
                  />
                </div>
              </div>

              {/* Live BP Classification Readout */}
              <div className="p-3.5 rounded-xl border border-slate-700/40 space-y-1.5" style={{ backgroundColor: theme.input_bg }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: theme.text_secondary }}>
                    AHA Blood Pressure Status:
                  </span>
                  <span className={`metric-pill ${bpDetails.badge}`}>
                    {bpDetails.label}
                  </span>
                </div>
                <div className="text-[11px] font-medium" style={{ color: theme.text_secondary }}>
                  {bpDetails.desc}
                </div>
                <div className="text-[11px] font-bold font-mono pt-1 border-t border-slate-700/30 flex justify-between" style={{ color: theme.accent_cyan }}>
                  <span>Mean Arterial Pressure (MAP):</span>
                  <span>{meanArterialPressure} mmHg (Norm: 70–100)</span>
                </div>
              </div>
            </div>

            {/* Card 3: Blood Chemistry & Lifestyle Factors */}
            <div className="theme-glass-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/30 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: theme.accent_cyan }} />
                  <h3 className="font-extrabold text-sm sm:text-base" style={{ color: theme.text_primary }}>
                    3. Blood Chemistry & Lifestyle Factors
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: theme.input_bg, color: theme.text_secondary }}>
                  Biochemical Markers
                </span>
              </div>

              {/* Cholesterol & Glucose */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: theme.text_primary }}>
                    Cholesterol Level
                  </label>
                  <select
                    value={formData.cholesterol}
                    onChange={(e) => handleFieldChange("cholesterol", e.target.value)}
                    className="w-full theme-input p-2.5 text-xs font-bold cursor-pointer"
                  >
                    <option value="Normal">Normal (Level 1)</option>
                    <option value="Above Normal">Above Normal (Level 2)</option>
                    <option value="Well Above Normal">Well Above Normal (Level 3)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: theme.text_primary }}>
                    Glucose Level
                  </label>
                  <select
                    value={formData.gluc}
                    onChange={(e) => handleFieldChange("gluc", e.target.value)}
                    className="w-full theme-input p-2.5 text-xs font-bold cursor-pointer"
                  >
                    <option value="Normal">Normal (Fasting)</option>
                    <option value="Above Normal">Above Normal (Impaired)</option>
                    <option value="Well Above Normal">Well Above Normal (Diabetic)</option>
                  </select>
                </div>
              </div>

              {/* Lifestyle Toggles: Smoking, Alcohol, Active */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {/* Smoking */}
                <div>
                  <label className="text-xs font-bold block mb-1 text-center" style={{ color: theme.text_primary }}>
                    Smoking
                  </label>
                  <button
                    type="button"
                    onClick={() => handleFieldChange("smoke", formData.smoke === "Yes" ? "No" : "Yes")}
                    className={`w-full py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                      formData.smoke === "Yes"
                        ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                        : 'border-slate-700/50 hover:bg-slate-800/40'
                    }`}
                    style={{
                      backgroundColor: formData.smoke === "Yes" ? undefined : theme.input_bg,
                      color: formData.smoke === "Yes" ? '#f43f5e' : theme.text_primary
                    }}
                  >
                    {formData.smoke === "Yes" ? "Yes 🚬" : "No 🚫"}
                  </button>
                </div>

                {/* Alcohol */}
                <div>
                  <label className="text-xs font-bold block mb-1 text-center" style={{ color: theme.text_primary }}>
                    Alcohol
                  </label>
                  <button
                    type="button"
                    onClick={() => handleFieldChange("alco", formData.alco === "Yes" ? "No" : "Yes")}
                    className={`w-full py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                      formData.alco === "Yes"
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'border-slate-700/50 hover:bg-slate-800/40'
                    }`}
                    style={{
                      backgroundColor: formData.alco === "Yes" ? undefined : theme.input_bg,
                      color: formData.alco === "Yes" ? '#fbbf24' : theme.text_primary
                    }}
                  >
                    {formData.alco === "Yes" ? "Yes 🍷" : "No 💧"}
                  </button>
                </div>

                {/* Physical Activity */}
                <div>
                  <label className="text-xs font-bold block mb-1 text-center" style={{ color: theme.text_primary }}>
                    Active
                  </label>
                  <button
                    type="button"
                    onClick={() => handleFieldChange("active", formData.active === "Yes" ? "No" : "Yes")}
                    className={`w-full py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                      formData.active === "Yes"
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'border-slate-700/50 hover:bg-slate-800/40'
                    }`}
                    style={{
                      backgroundColor: formData.active === "Yes" ? undefined : theme.input_bg,
                      color: formData.active === "Yes" ? '#34d399' : theme.text_primary
                    }}
                  >
                    {formData.active === "Yes" ? "Yes 🏃" : "No 🛋️"}
                  </button>
                </div>
              </div>

            </div>

            {/* Run Prediction Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full theme-btn-primary py-4 px-6 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating ML Model Inference...</span>
                  </>
                ) : (
                  <>
                    <span>🔮 Evaluate Cardiovascular Risk Score</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>


        {/* ===================== RIGHT COLUMN: Risk Assessment & Diagnostics (6 cols) ===================== */}
        <div className="lg:col-span-6 space-y-5">
          
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-300 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Results Container Card */}
          <div className="theme-glass-card p-5 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-700/30 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" style={{ color: theme.accent_cyan }} />
                <h3 className="font-extrabold text-sm sm:text-base" style={{ color: theme.text_primary }}>
                  📊 Comprehensive Risk Assessment & Diagnostics
                </h3>
              </div>

              {predictionResult && (
                <button
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                  className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer"
                  style={{ color: theme.text_primary }}
                  title="Export Patient Health Summary"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Export Report</span>
                </button>
              )}
            </div>

            {/* High / Low Risk Highlight Banner */}
            {predictionResult ? (
              predictionResult.is_high_risk ? (
                <div className="result-banner-high p-5 rounded-2xl text-center">
                  <h2 className="text-lg sm:text-xl font-extrabold text-rose-500 m-0">
                    ⚠️ HIGH CARDIOVASCULAR RISK DETECTED
                  </h2>
                  <p className="text-sm font-bold text-rose-300 mt-1.5 mb-1">
                    Estimated probability of cardiovascular event: <strong>{predictionResult.probability_pct}%</strong>
                  </p>
                  <div className="text-xs font-medium text-slate-300">
                    Clinical screening indicates notable adverse biometric markers.
                  </div>
                </div>
              ) : (
                <div className="result-banner-low p-5 rounded-2xl text-center">
                  <h2 className="text-lg sm:text-xl font-extrabold text-emerald-400 m-0">
                    ✅ LOW CARDIOVASCULAR RISK PROFILE
                  </h2>
                  <p className="text-sm font-bold text-emerald-300 mt-1.5 mb-1">
                    Estimated probability of cardiovascular event: <strong>{predictionResult.probability_pct}%</strong>
                  </p>
                  <div className="text-xs font-medium text-slate-300">
                    Patient metrics currently sit within standard manageable health ranges.
                  </div>
                </div>
              )
            ) : (
              <div className="p-6 rounded-2xl border border-dashed border-slate-700/60 text-center" style={{ backgroundColor: theme.input_bg }}>
                <Activity className="w-8 h-8 mx-auto mb-2 text-sky-400 animate-pulse" />
                <h4 className="font-extrabold text-sm" style={{ color: theme.text_primary }}>
                  Diagnostic Engine Calibrated & Standby
                </h4>
                <p className="text-xs mt-1" style={{ color: theme.text_secondary }}>
                  Select a patient preset above or enter biometrics, then click "Evaluate Cardiovascular Risk Score".
                </p>
              </div>
            )}

            {/* Visual Charts: Gauge + Biometric Radar Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Radial Gauge Chart */}
              <div className="p-4 rounded-xl border border-slate-700/40 flex flex-col items-center justify-between" style={{ backgroundColor: theme.input_bg }}>
                <span className="text-xs font-extrabold uppercase tracking-wider text-center block mb-1" style={{ color: theme.text_secondary }}>
                  Risk Probability Gauge
                </span>
                <RiskGaugeChart
                  probabilityPct={predictionResult ? predictionResult.probability_pct : 50}
                  isHighRisk={predictionResult ? predictionResult.is_high_risk : false}
                  theme={theme}
                />
                <span className="text-[10px] font-bold text-center" style={{ color: theme.text_secondary }}>
                  Calibrated ML Decision Boundary: 50%
                </span>
              </div>

              {/* Biometric Polar / Radar Chart */}
              <div className="p-4 rounded-xl border border-slate-700/40 flex flex-col items-center justify-between" style={{ backgroundColor: theme.input_bg }}>
                <span className="text-xs font-extrabold uppercase tracking-wider text-center block mb-1" style={{ color: theme.text_secondary }}>
                  Biometric Profile Radar
                </span>
                <BiometricRadarChart
                  formData={formData}
                  bmi={bmi}
                  theme={theme}
                />
              </div>

            </div>

          </div>

          {/* Key Risk Factors & Tailored Lifestyle Recommendations */}
          <div className="theme-glass-card p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-700/30 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" style={{ color: theme.accent_glow }} />
                <h3 className="font-extrabold text-sm sm:text-base" style={{ color: theme.text_primary }}>
                  🩺 Key Risk Factors & Tailored Lifestyle Recommendations
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Identified Contributing Factors */}
              <div className="p-4 rounded-xl border border-slate-700/40 space-y-3" style={{ backgroundColor: theme.input_bg }}>
                <div className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: theme.accent_cyan }}>
                  <span>🔍 Identified Contributing Factors</span>
                </div>

                {riskFlags.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-rose-400 block">⚠️ Potential Risk Flags:</span>
                    {riskFlags.map((flag, i) => (
                      <div key={i} className="text-xs font-medium text-slate-200 flex items-start gap-1.5 leading-snug">
                        <span className="text-rose-400 shrink-0">•</span>
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                )}

                {protectiveFlags.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-emerald-400 block">🛡️ Protective Health Assets:</span>
                    {protectiveFlags.map((flag, i) => (
                      <div key={i} className="text-xs font-medium text-slate-200 flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-400 shrink-0">•</span>
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Personalized Action Plan */}
              <div className="p-4 rounded-xl border border-slate-700/40 space-y-3" style={{ backgroundColor: theme.input_bg }}>
                <div className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: theme.accent_glow }}>
                  <span>💡 Personalized Action Plan</span>
                </div>

                <div className="space-y-2">
                  {actionPlan.map((rec, i) => (
                    <div key={i} className="text-xs font-medium leading-snug flex items-start gap-2" style={{ color: theme.text_primary }}>
                      <span className="font-extrabold shrink-0" style={{ color: theme.accent_cyan }}>{i + 1}.</span>
                      <span>{rec.replace(/\*\*/g, '')}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Report Export Modal */}
      <ReportExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        formData={formData}
        bmi={bmi}
        bmiCat={bmiDetails}
        bpCat={bpDetails}
        predictionResult={predictionResult}
        recommendations={actionPlan}
        theme={theme}
      />

    </div>
  );
}
