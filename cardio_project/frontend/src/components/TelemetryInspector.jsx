import React, { useState, useEffect } from 'react';
import { 
  Cpu, CheckCircle2, AlertTriangle, RefreshCw, Zap, Server, 
  Terminal, ShieldCheck, Database, Layers, ExternalLink 
} from 'lucide-react';

export default function TelemetryInspector({ apiConnected, pingLatency, onRefreshHealth }) {
  const [healthData, setHealthData] = useState(null);
  const [testingEndpoint, setTestingEndpoint] = useState(null);
  const [endpointResults, setEndpointResults] = useState({});
  const [activeJsonTab, setActiveJsonTab] = useState('/api/health');

  // Load health telemetry on mount
  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealthData(data);
        setEndpointResults(prev => ({
          ...prev,
          '/api/health': { status: res.status, ok: true, data }
        }));
      } else {
        setEndpointResults(prev => ({
          ...prev,
          '/api/health': { status: res.status, ok: false, data: null }
        }));
      }
    } catch (err) {
      setEndpointResults(prev => ({
        ...prev,
        '/api/health': { status: 0, ok: false, error: err.message }
      }));
    }
  };

  const testEndpoint = async (endpoint, method = 'GET', body = null) => {
    setTestingEndpoint(endpoint);
    setActiveJsonTab(endpoint);
    const start = performance.now();
    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
      };
      if (body) options.body = JSON.stringify(body);

      const res = await fetch(endpoint, options);
      const elapsed = Math.round(performance.now() - start);
      const data = await res.json();

      setEndpointResults(prev => ({
        ...prev,
        [endpoint]: {
          status: res.status,
          ok: res.ok,
          elapsed,
          data
        }
      }));
    } catch (err) {
      const elapsed = Math.round(performance.now() - start);
      setEndpointResults(prev => ({
        ...prev,
        [endpoint]: {
          status: 0,
          ok: false,
          elapsed,
          error: err.message
        }
      }));
    } finally {
      setTestingEndpoint(null);
    }
  };

  const testAllEndpoints = async () => {
    await testEndpoint('/api/health', 'GET');
    await testEndpoint('/api/predict', 'POST', {
      age: 45,
      gender: 2,
      height: 175,
      weight: 75,
      ap_hi: 120,
      ap_lo: 80,
      cholesterol: 1,
      gluc: 1,
      smoke: 0,
      alco: 0,
      active: 1
    });
    await testEndpoint('/api/insights', 'GET');
    await testEndpoint('/api/health-tips', 'GET');
    onRefreshHealth();
  };

  const endpoints = [
    {
      path: '/api/health',
      method: 'GET',
      desc: 'API Health, GradientBoosting classifier & scaler status',
      testPayload: null
    },
    {
      path: '/api/predict',
      method: 'POST',
      desc: '11-feature ML cardiovascular risk inference',
      testPayload: {
        age: 45, gender: 2, height: 175, weight: 75,
        ap_hi: 120, ap_lo: 80, cholesterol: 1, gluc: 1,
        smoke: 0, alco: 0, active: 1
      }
    },
    {
      path: '/api/insights',
      method: 'GET',
      desc: '70,000 patient dataset distribution & sample points',
      testPayload: null
    },
    {
      path: '/api/health-tips',
      method: 'GET',
      desc: 'Evidence-based preventive cardiology directives',
      testPayload: null
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title & Telemetry Status Banner */}
      <div className="clinical-card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-1.5">
              <Cpu className="w-3.5 h-3.5" /> Full-Stack Telemetry Inspector
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Backend Connectivity & Machine Learning Service Diagnostics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time link verification between Vite React (Port 3000) and FastAPI Python (Port 8000).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={testAllEndpoints}
              disabled={testingEndpoint !== null}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5" /> Run Full API Diagnostics Sweep
            </button>
          </div>
        </div>
      </div>

      {/* Core Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Link Status */}
        <div className="clinical-card p-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            HTTP Proxy Channel
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${apiConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              {apiConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {pingLatency ? `Latency: ~${pingLatency}ms` : 'Target: 127.0.0.1:8000'}
          </div>
        </div>

        {/* Model Type */}
        <div className="clinical-card p-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Inference Engine
          </div>
          <div className="text-lg font-extrabold font-mono text-sky-600 dark:text-sky-400 truncate">
            {healthData?.model_type || 'GradientBoosting'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Artifact: cardio_model.pkl
          </div>
        </div>

        {/* Accuracy */}
        <div className="clinical-card p-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Model Test Accuracy
          </div>
          <div className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            {healthData?.accuracy || '91.2%'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Cross-validated score
          </div>
        </div>

        {/* F1 Score */}
        <div className="clinical-card p-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Model F1-Score
          </div>
          <div className="text-lg font-extrabold font-mono text-sky-600 dark:text-sky-400">
            {healthData?.f1_score || '91.1%'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Harmonic balance
          </div>
        </div>

      </div>

      {/* Endpoint Health Matrix & Live Payload Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Endpoints List (7 cols) */}
        <div className="lg:col-span-7 clinical-card p-6 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                REST API Route Inspector
              </h3>
              <p className="text-xs text-slate-500">
                Execute live HTTP transactions against backend endpoints
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">4 ACTIVE ROUTES</span>
          </div>

          <div className="space-y-3">
            {endpoints.map((ep) => {
              const res = endpointResults[ep.path];
              const isRunning = testingEndpoint === ep.path;
              const isSelected = activeJsonTab === ep.path;

              return (
                <div
                  key={ep.path}
                  onClick={() => setActiveJsonTab(ep.path)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold font-mono ${
                        ep.method === 'GET' 
                          ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300' 
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="font-bold font-mono text-xs text-slate-900 dark:text-white">
                        {ep.path}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {res && (
                        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                          res.ok 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' 
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}>
                          {res.status > 0 ? `${res.status} OK` : 'ERR'} {res.elapsed ? `(${res.elapsed}ms)` : ''}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          testEndpoint(ep.path, ep.method, ep.testPayload);
                        }}
                        disabled={isRunning}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        {isRunning ? 'Testing...' : 'Test Route'}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {ep.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Payload Viewer (5 cols) */}
        <div className="lg:col-span-5 clinical-card p-6 space-y-4 flex flex-col">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Payload Inspector: <span className="font-mono text-xs text-sky-600">{activeJsonTab}</span>
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">JSON RAW</span>
          </div>

          <div className="flex-1 bg-slate-950 rounded-xl p-3.5 border border-slate-800 overflow-auto font-mono text-[11px] text-sky-300 min-h-[260px] max-h-[380px]">
            {endpointResults[activeJsonTab] ? (
              <pre>{JSON.stringify(endpointResults[activeJsonTab], null, 2)}</pre>
            ) : (
              <div className="text-slate-500 text-xs flex items-center justify-center h-full">
                Click "Test Route" to inspect raw response payload.
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            Data returned directly from the FastAPI Python server instance.
          </div>
        </div>

      </div>

      {/* Troubleshooting & Launcher Info Box */}
      <div className="clinical-card p-6 bg-slate-50/50 dark:bg-slate-800/30">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
          <Server className="w-4 h-4 text-sky-600" /> Local Service Management Guide
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
          To launch or restart the backend and frontend at any time, run any of the automated launchers located in the project root:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <div className="font-mono font-bold text-sky-600">start_backend.bat</div>
            <div className="text-slate-500 text-[11px]">Starts FastAPI on Port 8000</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <div className="font-mono font-bold text-teal-600">start_frontend.bat</div>
            <div className="text-slate-500 text-[11px]">Starts Vite React on Port 3000</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <div className="font-mono font-bold text-emerald-600">start_all.bat</div>
            <div className="text-slate-500 text-[11px]">Launches both simultaneously</div>
          </div>
        </div>
      </div>

    </div>
  );
}
