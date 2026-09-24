"""
CardioPulse AI - Full Stack Launcher
Starts both FastAPI Backend (Port 8000) and Vite React Frontend (Port 3000)
"""

import os
import sys
import time
import subprocess
import webbrowser
import signal

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

processes = []

def cleanup(signum=None, frame=None):
    print("\n\n🛑 Shutting down CardioPulse AI services...")
    for p in processes:
        try:
            p.terminate()
            p.wait(timeout=2)
        except Exception:
            try:
                p.kill()
            except Exception:
                pass
    print("✨ All services stopped. Goodbye!")
    sys.exit(0)

signal.signal(signal.SIGINT, cleanup)
signal.signal(signal.SIGTERM, cleanup)

def main():
    print("=" * 65)
    print("       ❤️  CARDIOPULSE AI - CLINICAL SUITE LAUNCHER  ❤️       ")
    print("=" * 65)
    print(f"📁 Project Base: {BASE_DIR}")
    
    # 1. Start FastAPI Backend
    print("\n[1/2] 🚀 Starting FastAPI Backend Server on http://127.0.0.1:8000 ...")
    backend_cmd = [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]
    try:
        backend_proc = subprocess.Popen(
            backend_cmd,
            cwd=BACKEND_DIR,
            shell=False
        )
        processes.append(backend_proc)
        print("      ✅ Backend process started (PID: {})".format(backend_proc.pid))
    except Exception as e:
        print(f"      ⚠️ Failed to start backend with uvicorn: {e}")
        print("      Trying fallback: python main.py")
        try:
            backend_proc = subprocess.Popen(
                [sys.executable, "main.py"],
                cwd=BACKEND_DIR,
                shell=False
            )
            processes.append(backend_proc)
        except Exception as e2:
            print(f"      ❌ Could not launch backend: {e2}")

    # Give backend a moment to initialize
    time.sleep(2)

    # 2. Start Frontend Vite Server
    print("\n[2/2] ⚡ Starting React Frontend on http://localhost:3000 ...")
    npm_cmd = "npm run dev" if os.name != 'nt' else "cmd.exe /c npm run dev"
    try:
        frontend_proc = subprocess.Popen(
            npm_cmd,
            cwd=FRONTEND_DIR,
            shell=True
        )
        processes.append(frontend_proc)
        print("      ✅ Frontend process started (PID: {})".format(frontend_proc.pid))
    except Exception as e:
        print(f"      ❌ Failed to start frontend: {e}")

    print("\n" + "=" * 65)
    print("🎉 CardioPulse AI is running!")
    print("   🌐 Frontend Web App:  http://localhost:3000")
    print("   🔌 FastAPI Docs:     http://127.0.0.1:8000/docs")
    print("   📊 API Health:       http://127.0.0.1:8000/api/health")
    print("=" * 65)
    print("\nPress Ctrl+C at any time to stop all servers.\n")

    time.sleep(2)
    try:
        webbrowser.open("http://localhost:3000")
    except Exception:
        pass

    try:
        while True:
            time.sleep(1)
            # Check if any process terminated unexpectedly
            for p in processes:
                if p.poll() is not None:
                    pass
    except KeyboardInterrupt:
        cleanup()

if __name__ == "__main__":
    main()
