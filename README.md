# StudySync

StudySync is a Firebase-backed study planner built for students who need a single place to organize tasks, generate exam prep schedules, and track progress over time.

Live demo: `https://smart-study-planner-tan.vercel.app`

## Why This Project Exists

Students usually split their planning across notes apps, chat reminders, and paper to-do lists. That works until deadlines pile up, tasks get lost, and there is no clear view of what is overdue or what should be tackled next.

StudySync solves that with:

- authenticated, per-user task storage
- a focused dashboard for daily planning
- a smart planner that turns an exam date into a study schedule
- lightweight analytics for completion, overdue work, and priority balance

## Core Features

- Email/password authentication with Firebase Auth
- Firestore-backed task persistence scoped to each user
- Create, complete, and delete study tasks
- Subject, deadline, and priority-based task management
- Streak tracking on completed tasks
- Planner page that generates study sessions from exam inputs
- Insights page for overdue tasks, upcoming deadlines, and completion rate
- Protected routes for authenticated app access
- Lazy-loaded pages for a lighter initial bundle
- Responsive UI with Tailwind CSS and Framer Motion
- Light/dark theme toggle

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- React Router
- Firebase Authentication
- Cloud Firestore
- Framer Motion
- React Icons

## App Flow

1. A user signs up or logs in.
2. The app subscribes to that user's Firestore task collection in real time.
3. The dashboard shows task stats, completion progress, and task cards.
4. The planner generates multiple study sessions and saves them in bulk.
5. The insights page highlights overdue work, upcoming deadlines, and priority distribution.

## Project Structure

```text
src/
  components/        Reusable UI and route guards
  context/           Auth and task state management
  pages/             Dashboard, Planner, Insights, Login, Signup
  services/          Firebase initialization
  utils/             Utility helpers
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Copy `.env.example` to `.env` and fill in your Firebase web app config:

```bash
cp .env.example .env
```

Required variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 3. Configure Firebase

In your Firebase project:

- create a project
- enable `Authentication > Sign-in method > Email/Password`
- create a Cloud Firestore database
- add a Firebase Web App and copy its config into `.env`

### 4. Add Firestore rules

These rules match the app's data model and ensure users only access their own tasks:

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

### 5. Start the app

```bash
npm run dev
```

Vite will print the local development URL, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates the production build
- `npm run preview` serves the built app locally for preview

## Data Model

Each authenticated user stores tasks under:

```text
users/{userId}/tasks/{taskId}
```

Task fields used by the app:

- `title`
- `subject`
- `deadline`
- `priority`
- `completed`
- `streak`
- `createdAt`
- `updatedAt`

## Deployment Notes

The project includes a `vercel.json` rewrite so client-side routes like `/planner` and `/insights` resolve correctly on refresh when deployed to Vercel.

Before deploying, make sure the same `VITE_FIREBASE_*` environment variables are configured in your hosting provider.

## Current Limitations

- Subject options are currently fixed in code
- Planner output is rule-based, not adaptive or AI-driven
- No edit-in-place flow for an existing task
- No offline-first sync strategy yet

## Future Improvements

- Pomodoro mode or focus timer
- Editable task details after creation
- Better schedule generation based on workload and exam proximity
- Calendar integrations
- Smarter recommendations from study history

## Summary

StudySync is a clean, portfolio-ready React + Firebase project that covers authentication, protected routes, Firestore persistence, derived analytics, and a practical productivity workflow for students.
