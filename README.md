# StudySync 🚀

## 📌 Smart Study Planner for Students

StudySync helps students manage their daily study tasks, deadlines, and productivity efficiently.

## 🌐 Live Demo
`https://smart-study-planner-tan.vercel.app`
---

## ✨ Features

* 📋 Add and manage study tasks
* 🎯 Priority-based task system
* 📊 Progress tracking dashboard
* 🔥 Streak tracking (per task)
* 🗓️ Smart plan generator (exam date → study sessions)
* 📈 Insights (overdue + upcoming + priority mix)
* 🎨 Modern responsive UI
* 🔐 Firebase Authentication (Login/Signup)
* ☁️ Firestore database (per-user task persistence)
* 🧭 Protected routes + lazy-loaded pages

---

## 🛠 Tech Stack

* React (Vite)
* Tailwind CSS
* Context API
* React Router
* Firebase (Auth + Firestore)

---

## ✅ Problem Statement

Students often manage study plans in scattered notes and apps that don’t persist reliably across devices. StudySync solves this by providing a clean dashboard to create prioritized study tasks with deadlines, track completion and streaks, and persist everything securely per user account.

## 🚀 Getting Started

### 1) Install

```bash
npm install
npm run dev
```

### 2) Firebase setup (required)

- Create a Firebase project
- Enable **Authentication → Email/Password**
- Create a Firestore database
- Copy your Firebase web app config into a local `.env` file (see `.env.example`)

### 3) Firestore security (required)

Create rules so users can only access their own tasks:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🌟 Future Improvements

* AI-based study suggestions
* Pomodoro timer

---

