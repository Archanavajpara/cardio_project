import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, Heart, Flame, Cigarette, Wine, Sparkles, Scale, Ruler } from 'lucide-react';

export default function AssessmentForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    age: 45,
    gender: 1, // 1: Female, 2: Male
    height: 170,
    weight: 70,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: 1,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Real-time BMI calculation
  const heightM = formData.height / 100;
  const bmi = (formData.weight / (heightM * heightM)).toFixed(1);
  const getBmiInfo = (val) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    if (val < 25) return { label: 'Normal Weight', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (val < 30) return { label: 'Overweight', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' };
    return { label: 'Obese', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
  };
  const bmiInfo = getBmiInfo(parseFloat(bmi));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
      id="assessment-form"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Form Title Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Simple 2-Minute Health Form
            </div>
            <h2 className="text-2xl font-bold text-white">Enter Your Health Details</h2>
            <p className="text-slate-400 text-sm mt-1">Adjust the controls below to check your heart risk level.</p>
          </div>

          {/* BMI Live Widget */}
          <div className="p-3.5 px-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3.5 shrink-0">
            <Scale className="w-6 h-6 text-cyan-400" />
            <div>
              <div className="text-xs text-slate-400">Your Body Mass Index</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">{bmi}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${bmiInfo.color}`}>
                  {bmiInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 1: Basic Details */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-3">
              <User className="w-5 h-5" />
              <span>1. Basic Biometrics</span>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-200 font-semibold">Age 🎂</label>
                <span className="text-cyan-400 font-bold px-2.5 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  {formData.age} years old
                </span>
              </div>
              <input 
                type="range" 
                min="18" 
                max="100" 
                value={formData.age} 
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">Gender 👩‍🦰👨‍🦰</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('gender', 1)}
                  className={`py-3 px-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
                    formData.gender === 1
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Female</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('gender', 2)}
                  className={`py-3 px-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
                    formData.gender === 2
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Male</span>
                </button>
              </div>
            </div>

            {/* Height & Weight */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-200 font-semibold flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5 text-cyan-400" /> Height
                  </span>
                  <span className="text-cyan-400 font-bold">{formData.height} cm</span>
                </div>
                <input 
                  type="range" 
                  min="120" 
                  max="220" 
                  value={formData.height} 
                  onChange={(e) => handleChange('height', parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-200 font-semibold flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-purple-400" /> Weight
                  </span>
                  <span className="text-purple-400 font-bold">{formData.weight} kg</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="180" 
                  value={formData.weight} 
                  onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
                  className="w-full accent-purple-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Section 2: Blood Pressure & Labs */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-teal-400 font-bold border-b border-slate-800 pb-3">
              <Activity className="w-5 h-5" />
              <span>2. Blood Pressure & Labs</span>
            </div>

            {/* Blood Pressure Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-200">
                  Systolic BP (Top Number) 💓
                </label>
                <input 
                  type="number"
                  min="70"
                  max="240"
                  value={formData.ap_hi}
                  onChange={(e) => handleChange('ap_hi', parseInt(e.target.value) || 120)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white rounded-2xl px-4 py-2.5 text-sm font-bold text-center transition-all"
                />
                <div className="text-[11px] text-slate-400 text-center">Normal is around 120</div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-200">
                  Diastolic BP (Bottom) 💗
                </label>
                <input 
                  type="number"
                  min="40"
                  max="160"
                  value={formData.ap_lo}
                  onChange={(e) => handleChange('ap_lo', parseInt(e.target.value) || 80)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white rounded-2xl px-4 py-2.5 text-sm font-bold text-center transition-all"
                />
                <div className="text-[11px] text-slate-400 text-center">Normal is around 80</div>
              </div>
            </div>

            {/* Cholesterol Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-200">Cholesterol Level 🧈</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 1, label: 'Normal' },
                  { val: 2, label: 'Above Normal' },
                  { val: 3, label: 'High' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => handleChange('cholesterol', item.val)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      formData.cholesterol === item.val
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glucose Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-200">Glucose (Blood Sugar) 🍬</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 1, label: 'Normal' },
                  { val: 2, label: 'Above Normal' },
                  { val: 3, label: 'High' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => handleChange('gluc', item.val)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      formData.gluc === item.val
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Lifestyle Habits */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-800 pb-3">
            <Flame className="w-5 h-5" />
            <span>3. Lifestyle Habits</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Smoking */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cigarette className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-sm font-bold text-white">Do you smoke?</div>
                  <div className="text-xs text-slate-400">Cigarettes/tobacco</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleChange('smoke', formData.smoke === 1 ? 0 : 1)}
                className={`w-12 h-7 rounded-full p-1 transition-colors ${
                  formData.smoke === 1 ? 'bg-amber-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  formData.smoke === 1 ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Alcohol */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wine className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm font-bold text-white">Alcohol intake?</div>
                  <div className="text-xs text-slate-400">Regular drinking</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleChange('alco', formData.alco === 1 ? 0 : 1)}
                className={`w-12 h-7 rounded-full p-1 transition-colors ${
                  formData.alco === 1 ? 'bg-purple-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  formData.alco === 1 ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Physical Activity */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm font-bold text-white">Physically active?</div>
                  <div className="text-xs text-slate-400">Regular exercise</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleChange('active', formData.active === 1 ? 0 : 1)}
                className={`w-12 h-7 rounded-full p-1 transition-colors ${
                  formData.active === 1 ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  formData.active === 1 ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-slate-950 font-extrabold text-lg shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Your Heart Metrics...</span>
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6 fill-slate-950 text-slate-950" />
                  <span>Check My Heart Risk 💖</span>
                </>
              )}
            </span>
          </button>
        </div>

      </form>
    </motion.div>
  );
}
