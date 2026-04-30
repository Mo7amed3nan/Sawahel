<h1 align="center">
  <img src="./frontend/public/icon.svg" width="45" style="vertical-align: middle; margin-right: 8px;" />
  Sawahel (سواحل)
</h1>

<p align="center">
  <strong>A modern, service-based platform connecting users with verified healthcare professionals and services.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a>
</p>

---

## 🌐 Live Demo

Check out the live version of **Sawahel**:
👉 **[https://sawahel.vercel.app](https://sawahel.vercel.app)**

---

## ✨ Features

Sawahel is built to provide a seamless experience for both regular users and healthcare professionals.

### 👤 For Users
- **Browse Healthcare Professionals**: Find verified doctors, pharmacies, and nurses (organized by categories).
- **Search & Filter**: Easily search for doctors in the directory.
- **Detailed Profiles**: View comprehensive information about doctors and their practices.
- **Secure Authentication**: Register, login, and verify email with a secure JWT-based system. Includes "Forgot/Reset Password" flows with styled email templates.
- **User Profiles**: Manage personal information securely.
- **Modern UI/UX**: Enjoy a fast, responsive, and beautifully designed interface with Dark/Light mode support.

### 👨‍⚕️ For Doctors & Professionals
- **Professional Applications**: Apply to be listed on the platform as a doctor.
- **Doctor Dashboard**: Manage professional information, clinic details, and WhatsApp contact info.
- **Profile Updates**: Keep your professional directory listing up to date.

### 🛡️ For Administrators
- **Admin Dashboard**: Oversee platform activities and manage users.
- **Application Review**: Approve or reject applications from doctors wanting to join the platform.
- **Role-Based Access Control (RBAC)**: Secure routes and actions based on user roles (Admin, Doctor, User).

---

## 💻 Tech Stack

Sawahel uses a modern, scalable, and type-safe architecture:

### Frontend
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), & [Base UI](https://base-ui.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Analytics**: [PostHog](https://posthog.com/)
- **Theming**: `next-themes` for Dark/Light mode

### Backend
- **Framework**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) in HTTP-only cookies & `bcryptjs`
- **Email Service**: [Nodemailer](https://nodemailer.com/) (for verification & password resets)
- **Rate Limiting & Caching**: [Upstash Redis](https://upstash.com/) & `@upstash/ratelimit`

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)
- Upstash Redis account (for rate limiting)
- SMTP Server details (for Nodemailer)

### 1. Clone the repository
```bash
git clone https://github.com/Mo7amed3nan/Sawahel.git
cd Sawahel
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Email Configuration
EMAIL_HOST=your_smtp_host
EMAIL_PORT=your_smtp_port
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@sawahel.com

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Start the backend development server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

---

## 📂 Project Structure

```text
Sawahel/
├── backend/                  # Express.js API Server
│   ├── src/
│   │   ├── controllers/      # Route logic handlers
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API endpoints (auth, doctors, admin, etc.)
│   │   └── server.js         # Entry point
│   └── package.json
│
└── frontend/                 # React & Vite Application
    ├── public/               # Static assets
    ├── src/
    │   ├── app/              # Core app setup, routes, and layouts
    │   ├── components/       # Reusable UI components (Shadcn, common)
    │   ├── features/         # Feature-based modules (auth, doctors, admin)
    │   ├── lib/              # Utility functions and configurations
    │   └── main.jsx          # React entry point
    └── package.json
```

---

## 🛠️ Development & Future Plans

The platform is actively being developed to include:
- **New Service Sectors**: Expansion into new domains such as **Delivery Services** and **Transportation Services**.
- **Enhanced Directory Features**: Advanced filtering and booking capabilities.
- **Analytics & Insights**: More comprehensive dashboards for professionals.

