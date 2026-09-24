# Alias module to allow `python -m uvicorn backend.main:app` from inside backend/
import sys
import os

_parent = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _parent not in sys.path:
    sys.path.insert(0, _parent)

from main import app, load_ml_assets, model, scaler
