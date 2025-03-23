# 🚀 Skill-Based Hiring Platform

## 📌 Overview

This project is a _Skill-Based Hiring Platform_ designed to assess candidates based on their practical skills instead of traditional resumes. It features _job postings, applications, candidate assessments, and AI-based hiring predictions_.

---

## 🏗 Project Structure

│── backend/ # Server-side logic
│ ├── config/ # Configuration files
│ ├── controllers/ # Backend API logic
│ ├── middleware/ # Authentication & validation
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── utils/ # Helper functions
│ ├── .env # Environment variables
│ ├── server.js # Main backend server
│ ├── package.json # Dependencies
│
│── frontend/ # Client-side application
│ ├── public/ # Static files
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Context API for state management
│ │ ├── pages/ # Pages (Home, Login, Signup, etc.)
│ │ ├── App.jsx # Main React component
│ │ ├── index.css # Global styles
│ │ ├── main.jsx # Frontend entry point
│ ├── package.json # Frontend dependencies
│ ├── vite.config.js # Vite configuration
│
│── ml-model/ # AI/ML model for hiring predictions (Future)
│── README.md # Project documentation
│── .gitignore # Git ignored files

---

## ⚡ Features

✅ _User Authentication_ (Signup/Login)  
✅ _Recruiter Dashboard_ (Post jobs, manage applications)  
✅ _Candidate Dashboard_ (Browse jobs, apply)  
✅ _AI-Powered Hiring_ (Predict job fit based on resume & skills)  
✅ _Email Notifications_ (Job status updates)

---

## 🚀 Tech Stack

### _Frontend_

- React.js
- Tailwind CSS
- Context API
- Vite

### _Backend_

- Node.js, Express.js
- MongoDB (Database)
- JWT (Authentication)
- Nodemailer (Emails)

### _Machine Learning (Future)_

- Python (NLTK, Scikit-learn)
- FastAPI/Flask

---

## 🛠 Installation & Setup

### _Backend_

1. Navigate to the backend folder:
   sh
   cd backend
2. Install dependencies:
   sh
   npm install
3. Start the server:
   sh
   npm start

### _Frontend_

1. Navigate to the frontend folder:
   sh
   cd frontend
2. Install dependencies:
   sh
   npm install
3. Start the frontend:
   sh
   npm run dev

---

## 📌 API Endpoints

### _Authentication_

- POST /api/auth/signup → Register user
- POST /api/auth/login → User login

### _Jobs_

- POST /api/jobs → Create a job
- GET /api/jobs → Get job listings
- GET /api/jobs/:id → Get job details

### _Applications_

- POST /api/jobs/:jobId/apply → Apply for a job
- GET /api/jobs/:jobId/applications → View applications
- PUT /api/applications/:id/status → Update application status

---

## 📌 Future Enhancements

🚀 AI-based candidate gamification  
🚀 Real-time chat between recruiters and applicants  
🚀 Smart job recommendations

---

## 🤝 Contributing

Contributions are welcome! Fork the repo and submit a PR.

📩 _Contact:_ sakshikumarizen@gmail.com

---

🎯 _Developed by Sakshi Kumari_  
🚀 Skill-Based Hiring Platform - 2025
