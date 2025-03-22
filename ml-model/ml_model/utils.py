import re
import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Ensure necessary NLTK resources are downloaded
nltk.download("stopwords", quiet=True)
nltk.download("punkt", quiet=True)

def clean_text(text):
    """Preprocess cover letter text by removing punctuation and stopwords."""
    text = text.lower()
    text = re.sub(f"[{string.punctuation}]", "", text)
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words("english")]
    return " ".join(tokens)
