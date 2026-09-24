# Alias package to allow `python -m uvicorn backend.main:app` even when working directory is inside backend/
import sys
import os

_parent = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _parent not in sys.path:
    sys.path.insert(0, _parent)
