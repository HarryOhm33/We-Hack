from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from ml_model.utils import clean_text


# Load trained model
clf, vectorizer, scaler = joblib.load("ml_model/model.pkl")

# Create FastAPI app
app = FastAPI()

# Define request format
class PredictionRequest(BaseModel):
    score: str
    coverLetter: str

@app.get("/")
def home():
    return {"message": "ML Model API is running!"}

@app.post("/predict/")
def predict(data: PredictionRequest):
    try:
        # Convert and validate score
        score = float(data.score.replace("%", ""))  
        if not (0 <= score <= 100):
            return {"error": "Score must be between 0 and 100."}

        # Normalize score
        score_scaled = scaler.transform(np.array([[score]]))

        # Preprocess cover letter
        cleaned_text = clean_text(data.coverLetter)
        text_vector = vectorizer.transform([cleaned_text]).toarray()

        # Make prediction
        input_features = np.hstack((text_vector, score_scaled))
        prediction = clf.predict(input_features)[0]

        return {"prediction": prediction}

    except Exception as e:
        return {"error": str(e)}
