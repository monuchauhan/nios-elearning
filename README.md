# nios-elearning
repository for nios-elearning website
# ExamPrep Pro - E-Learning Platform

A full-featured e-learning website for exam preparation with chapters, videos, PDFs, quizzes, and payment integration.

## Features

- 📚 Course chapters with video lessons
- 📄 Downloadable PDF study materials
- ❓ Interactive quizzes with immediate feedback
- 🔐 User authentication (signup/login)
- 💳 Payment integration with coupon support
- 📊 Progress tracking
- 🔒 Paywall (Chapter 1 free, rest locked)

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite (Turso for cloud)
- **Authentication:** JWT
- **Hosting:** Vercel

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nios-elearning.git
   cd nios-elearning
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open http://localhost:3000

## Deploy to Vercel

### Step 1: Set Up Turso Database (Free)

1. Go to [https://turso.tech](https://turso.tech) and create a free account

2. Install Turso CLI:
   ```bash
   # Windows (PowerShell)
   irm get.tur.so/install.ps1 | iex
   
   # Mac/Linux
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

3. Login and create database:
   ```bash
   turso auth login
   turso db create nios-elearning
   ```

4. Get your credentials:
   ```bash
   # Get database URL
   turso db show nios-elearning --url
   
   # Create auth token
   turso db tokens create nios-elearning
   ```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nios-elearning.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub

2. Click **"Add New Project"**

3. Import your GitHub repository

4. Add Environment Variables:
   | Name | Value |
   |------|-------|
   | `JWT_SECRET` | (generate a 32+ char random string) |
   | `TURSO_DATABASE_URL` | `libsql://your-db.turso.io` |
   | `TURSO_AUTH_TOKEN` | (from turso db tokens create) |

5. Click **"Deploy"**

Your site will be live at `https://your-project.vercel.app`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT tokens (32+ chars) | Yes |
| `TURSO_DATABASE_URL` | Turso database URL | Yes (production) |
| `TURSO_AUTH_TOKEN` | Turso authentication token | Yes (production) |
| `STRIPE_SECRET_KEY` | Stripe secret key | No (for payments) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | No (for payments) |

## Project Structure

```
nios_website/
├── api/
│   └── index.js          # Vercel serverless API
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── api.js
│   │   └── auth.js
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── course.html
│   ├── chapter.html
│   └── payment.html
├── server/
│   ├── data.js           # Course/quiz data
│   ├── database.js       # Local SQLite (sql.js)
│   ├── database-turso.js # Cloud SQLite (Turso)
│   ├── middleware.js
│   └── index.js          # Local dev server
├── vercel.json           # Vercel configuration
├── package.json
└── .env.example
```

## Coupon Codes (Demo)

- `LAUNCH50` - 50% off
- `FLAT100` - ₹100 off
- `STUDENT20` - 20% off

## License

MIT
