from flask import Flask, render_template, request, jsonify
import os
import pdfplumber
import docx
import nltk
import json
from collections import Counter
import re

nltk.download('punkt')
from nltk.tokenize import sent_tokenize

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def clean_text(text):
    """Removes unwanted characters from extracted text."""
    return re.sub(r"[^a-zA-Z0-9\s?]", "", text)

def extract_text_docx(file_path):
    """Extracts text from a DOCX file."""
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs]).strip()

def extract_text_pdf(file_path):
    """Extracts text from a PDF file, handling empty pages."""
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

def analyze_questions(text):
    """Finds and counts frequently asked questions."""
    sentences = sent_tokenize(text)
    cleaned_sentences = [clean_text(s.replace("\n", " ").strip()) for s in sentences]
    questions = [s for s in cleaned_sentences if s.endswith("?")]
    frequency = Counter(questions)
    sorted_questions = sorted(frequency.items(), key=lambda x: x[1], reverse=True)
    return [{"question": q, "frequency": f} for q, f in sorted_questions]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_file():
    """Handles file uploads and extracts frequent questions."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    if file.filename.endswith(".pdf"):
        text = extract_text_pdf(file_path)
    elif file.filename.endswith(".docx"):
        text = extract_text_docx(file_path)
    else:
        return jsonify({"error": "Unsupported file format"}), 400

    question_frequency = analyze_questions(text)

    return jsonify({"questions": question_frequency}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5002)