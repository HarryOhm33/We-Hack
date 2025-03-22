import sys
import joblib
import numpy as np
from utils import clean_text  # Import from utils.py

# Load trained model, vectorizer, and scaler
clf, vectorizer, scaler = joblib.load("ml_model/model.pkl")

try:
    # Read input from Express
    if len(sys.argv) < 3:
        raise ValueError("❌ Error: Missing input arguments. Expected: <score> <cover_letter>")

    score = float(sys.argv[1].replace("%", ""))  # Remove "%" and convert to float
    cover_letter = sys.argv[2]

    # Ensure score is within a valid range (0-100)
    if not (0 <= score <= 100):
        raise ValueError("❌ Error: Score must be between 0 and 100.")

    # Normalize score using the same scaler from training
    score_scaled = scaler.transform(np.array([[score]]))  # Scale input score

    # Preprocess cover letter
    cleaned_text = clean_text(cover_letter)
    text_vector = vectorizer.transform([cleaned_text]).toarray()

    # Combine features
    input_features = np.hstack((text_vector, score_scaled))

    # Make prediction
    prediction = clf.predict(input_features)[0]

    # Print output (Node.js will read this)
    print(prediction)

except Exception as e:
    print(f"❌ Error: {e}")
