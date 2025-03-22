import os
import re
import joblib
import string
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MinMaxScaler
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk

nltk.download("stopwords")
nltk.download("punkt")

# Sample dataset (for training)
data = pd.DataFrame({
    "score": [90, 85, 60, 50, 30],
    "coverLetter": [
        "I have 5 years of experience in MERN stack.",
        "I am skilled in React and Node.js with great projects.",
        "I am a fresher but eager to learn new technologies.",
        "I have basic programming knowledge and want to grow.",
        "I have no experience but I am interested."
    ],
    "label": ["Fit", "Fit", "Moderate", "Not Fit", "Not Fit"]
})

# Preprocessing function
def clean_text(text):
    nltk.download("stopwords", quiet=True)  # Ensure stopwords are downloaded
    nltk.download("punkt", quiet=True)

    text = text.lower()
    text = re.sub(f"[{string.punctuation}]", "", text)
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words("english")]
    return " ".join(tokens)

data["cleanedCoverLetter"] = data["coverLetter"].apply(clean_text)

# Convert text to numerical data
vectorizer = TfidfVectorizer()
X_text = vectorizer.fit_transform(data["cleanedCoverLetter"])
X_score = np.array(data["score"]).reshape(-1, 1)

# Normalize score
scaler = MinMaxScaler()
X_score_scaled = scaler.fit_transform(X_score)  # Normalize between 0 and 1

X = np.hstack((X_text.toarray(), X_score_scaled))
y = data["label"]

# Train ML model
clf = RandomForestClassifier(random_state=42)  # Set random state for reproducibility
clf.fit(X, y)

# Save model
model_path = "ml_model/model.pkl"
os.makedirs(os.path.dirname(model_path), exist_ok=True)  # Ensure directory exists
joblib.dump((clf, vectorizer, scaler), model_path)

print("ML Model Trained & Saved as `ml_model/model.pkl`")
