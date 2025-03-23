# 🚀 Skill-Based Hiring Platform

![Skill-Based Hiring](https://via.placeholder.com/1000x300?text=Skill-Based+Hiring+Platform)

## 📌 Overview

This project is a **Skill-Based Hiring Platform** designed to assess candidates based on their practical skills instead of traditional resumes. It features **job postings, applications, candidate assessments, and recruiter dashboards**.

🌐 **Website URL:** [Easy Hire Seekers](https://easy-hire-seekers.netlify.app/)  
🖥 **Backend Deployed on Render** | 🎨 **Frontend Deployed on Netlify**

---

## 🏗 Project Structure

```
📦 project-root/      # Main project directory
│── backend/          # Server-side logic
│   ├── config/       # Configuration files
│   ├── controllers/  # Backend API logic
│   ├── middleware/   # Authentication & validation
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── utils/        # Helper functions
│   ├── .env          # Environment variables
│   ├── server.js     # Main backend server
│   ├── package.json  # Backend dependencies
│   ├── render.yaml   # Render configuration for backend deployment
│
│── frontend/         # Client-side application
│   ├── public/       # Static files
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Context API for state management
│   │   ├── pages/       # Pages (Home, Login, Signup, etc.)
│   │   ├── App.jsx      # Main React component
│   │   ├── index.css    # Global styles
│   │   ├── main.jsx     # Frontend entry point
│   ├── package.json     # Frontend dependencies
│   ├── vite.config.js   # Vite configuration
│
│── README.md        # Project documentation
│── .gitignore       # Git ignored files
```

---

## ⚡ Features

✅ **User Authentication** (Signup/Login) 🔐  
✅ **Recruiter Dashboard** (Post jobs, manage applications) 📊  
✅ **Candidate Dashboard** (Browse jobs, apply) 👨‍💼  
✅ **Email Notifications** (Job status updates) 📩

---

## 🚀 Tech Stack

### 🖥️ Frontend

- ⚛ **React.js**
- 🎨 **Tailwind CSS**
- 🌍 **Context API**
- ⚡ **Vite**

### 💾 Backend

- 🟢 **Node.js, Express.js**
- 🗄 **MongoDB** (Database)
- 🔑 **JWT Authentication**
- 📧 **Nodemailer** (Emails)

---

## 🛠 Installation & Setup

### Backend

```sh
cd backend
npm install
npm start
```

### Frontend

```sh
cd frontend
npm install
npm run dev
```

---

## 📌 API Endpoints

### 🔐 Authentication

- `POST /api/auth/signup` → Register user
- `POST /api/auth/login` → User login

### 💼 Jobs

- `POST /api/jobs` → Create a job
- `GET /api/jobs` → Get job listings
- `GET /api/jobs/:id` → Get job details

### 📄 Applications

- `POST /api/jobs/:jobId/apply` → Apply for a job
- `GET /api/jobs/:jobId/applications` → View applications
- `PUT /api/applications/:id/status` → Update application status

---

## 📌 Future Enhancements

🚀 **Real-time chat** between recruiters and applicants 💬  
🚀 **Smart job recommendations** using AI 🤖

---

## 🤝 Contributing

Contributions are welcome! Fork the repo and submit a PR.

📩 **Contact:** sakshikumarizen@gmail.com | hari333333om@gmail.com

---

### 🎯 Developed by **Sakshi Kumari & Hari Om**

🚀 **Skill-Based Hiring Platform - 2025**
