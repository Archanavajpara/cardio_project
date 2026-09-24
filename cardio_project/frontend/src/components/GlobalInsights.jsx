import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { Database, Users, HeartPulse, Activity, AlertCircle, Dna, Cpu } from 'lucide-react';

export default function GlobalInsights() {
  const [insightsData, setInsightsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/insights')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch insights data");
        return res.json();
      })
      .then(data => {
        setInsightsData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 font-mono">
        <div className="w-10 h-10 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-xs tracking-wider">FETCHING CLINICAL DATASET TELEMETRY...</p>
      </div>
    );
  }

  if (error || !insightsData) {
    return (
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3 font-mono">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <p className="text-slate-300 font-bold">UNABLE TO RETRIEVE CLINICAL COHORT DATA</p>
        <p className="text-slate-500 text-xs">{error || "Server unavailable"}</p>
      </div>
    );
  }

  const pieData = [
    { name: 'Healthy Cohort 💖', value: insightsData.healthy_count, color: '#06b6d4' },
    { name: 'High Risk Cohort 🥺', value: insightsData.high_risk_count, color: '#f472b6' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold tracking-wider uppercase">
          <Database className="w-3.5 h-3.5" /> Clinical Population Genomics
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Population Biomarker Telemetry</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto font-sans">
          Exploratory analysis mapping age vectors against systolic blood pressure distributions across clinical dataset samples.
        </p>
      </div>

      {/* Cohort Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-1 font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Sample Cohort</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{insightsData.total_records.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">Patient samples</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-1 font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Optimal Baseline</span>
            <Dna className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-400">{insightsData.healthy_count.toLocaleString()}</div>
          <div className="text-[10px] text-teal-500/80">Low risk category</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-1 font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Elevated Risk</span>
            <AlertCircle className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-pink-400">{insightsData.high_risk_count.toLocaleString()}</div>
          <div className="text-[10px] text-pink-500/80">Requires evaluation</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-1 font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Mean Systolic BP</span>
            <HeartPulse className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">{insightsData.avg_systolic_bp} mmHg</div>
          <div className="text-[10px] text-slate-500">Population average</div>
        </div>
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scatter Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between font-mono">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <span>🩸 Age vs. Systolic Pressure Vector</span>
            </h3>
            <span className="text-[11px] text-slate-500">N=300 SAMPLE</span>
          </div>

          <div className="h-80 w-full font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <XAxis 
                  type="number" 
                  dataKey="Age" 
                  name="Age" 
                  unit=" YRS" 
                  stroke="#64748b" 
                  fontSize={11} 
                />
                <YAxis 
                  type="number" 
                  dataKey="Systolic_BP" 
                  name="Systolic BP" 
                  unit=" mmHg" 
                  stroke="#64748b" 
                  fontSize={11} 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                />
                <Scatter data={insightsData.sample_data} fill="#8884d8">
                  {insightsData.sample_data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.Cardio === 1 ? '#f472b6' : '#06b6d4'} 
                      opacity={0.85}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Risk Distribution */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4 shadow-xl flex flex-col justify-between">
          <div className="font-mono">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">🍰 Cohort Ratio</h3>
            <p className="text-[11px] text-slate-500 mt-1">Population percentage split.</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center text-[10px] font-mono text-slate-500">
            DISTRIBUTION CALCULATED VIA FASTAPI ANALYTICS PIPELINE
          </div>
        </div>

      </div>
    </motion.div>
  );
}
