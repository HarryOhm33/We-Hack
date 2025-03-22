import re
import joblib
import string
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
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

X = np.hstack((X_text.toarray(), X_score))
y = data["label"]

# Train ML model
clf = RandomForestClassifier()
clf.fit(X, y)

# Save model
joblib.dump((clf, vectorizer), "ml_model/model.pkl")

print("✅ ML Model Trained & Saved as `ml_model/model.pkl`")
