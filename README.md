**Project: Question Paper Analysis**

📌 Overview

This project is a Question Paper Analysis System that allows users to upload past exam papers in PDF or DOCX format. The system then extracts questions, analyzes their frequency, and categorizes them into Most Frequent, Medium Frequent, and Least Frequent sections.

🚀 Features

✅ File Upload & Drag-and-Drop – Supports PDF, DOCX formats
✅ Automatic Question Extraction – Uses Natural Language Processing (NLP) to identify questions
✅ Question Frequency Analysis – Categorizes questions based on their occurrence
✅ Clean & Interactive UI – Drag & drop functionality with an elegant design

🛠️ Technologies Used
	•	Frontend: HTML, CSS, JavaScript
	•	Backend: Flask (Python)
	•	Libraries: pdfplumber, python-docx, nltk

📂 Folder Structure

/Question-Paper-Analysis
│── /static
│   ├── styles.css   # Styling for the website  
│   ├── script.js    # JavaScript for frontend interactions  
│── /templates
│   ├── index.html   # Main UI page  
│── app.py           # Flask backend  
│── requirements.txt # Project dependencies  
│── README.md        # Project description  

💡 How It Works?

1️⃣ User uploads a PDF/DOCX file via drag & drop or browse.
2️⃣ The backend extracts text and identifies questions.
3️⃣ The system counts question occurrences and categorizes them.
4️⃣ The categorized questions appear under Most, Medium, and Least Frequent sections.

🚀 How to Run the Project?
	1.	Clone the repository

git clone https://github.com/yourusername/question-paper-analysis.git
cd question-paper-analysis


	2.	Install dependencies

pip install -r requirements.txt


	3.	Run the Flask app

python app.py


	4.	Open the browser and visit http://127.0.0.1:5002

This repository is great for students, teachers, and researchers who want to analyze question patterns in exam papers! 🎯 Let me know if you want any modifications. 🚀
