#!/bin/bash
uvicorn ml_model.main:app --host 0.0.0.0 --port $PORT
