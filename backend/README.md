# PYQ Hub — Backend API

Node.js + Express + MongoDB REST API for PYQ Hub.

---

## Quick Start

### 1. Install
```bash
cd pyq-hub-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Now open .env and fill in your values (MongoDB URI, Cloudinary, Anthropic key)
```

### 3. Seed the database
```bash
npm run seed
```

### 4. Start dev server
```bash
npm run dev
# API runs at http://localhost:5000
```

---

## Project Structure

```
pyq-hub-backend/
├── server.js                   ← Entry point
├── .env.example                ← Environment template
├── config/
│   ├── db.js                   ← MongoDB connection
│   └── cloudinary.js           ← Cloudinary + Multer setup
├── models/
│   ├── Exam.js                 ← Exam category schema
│   ├── Paper.js                ← Question paper schema
│   └── User.js                 ← User schema (auth + history)
├── controllers/
│   ├── authController.js       ← Register, login, save papers
│   ├── examController.js       ← CRUD for exam categories
│   ├── paperController.js      ← CRUD for papers + download
│   ├── aiController.js         ← Claude AI analysis (with caching)
│   └── uploadController.js     ← PDF upload to Cloudinary
├── routes/
│   ├── authRoutes.js
│   ├── examRoutes.js
│   ├── paperRoutes.js
│   ├── aiRoutes.js
│   └── uploadRoutes.js
├── middleware/
│   ├── auth.js                 ← JWT protect + adminOnly
│   └── rateLimit.js            ← Rate limiters per route
└── utils/
    └── seed.js                 ← Seed MongoDB with initial data
```

---

## API Reference

### Auth
| Method | Endpoint              | Access  | Description           |
|--------|-----------------------|---------|-----------------------|
| POST   | /api/auth/register    | Public  | Create account        |
| POST   | /api/auth/login       | Public  | Login, get JWT        |
| GET    | /api/auth/me          | Private | Get current user      |
| PUT    | /api/auth/save/:id    | Private | Toggle save a paper   |

### Exams
| Method | Endpoint                       | Access | Description            |
|--------|--------------------------------|--------|------------------------|
| GET    | /api/exams                     | Public | All exam categories    |
| GET    | /api/exams/:id                 | Public | Single exam            |
| GET    | /api/exams/:examId/:subId/years| Public | Available years        |
| POST   | /api/exams                     | Admin  | Create exam            |
| PUT    | /api/exams/:id                 | Admin  | Update exam            |
| DELETE | /api/exams/:id                 | Admin  | Remove exam            |

### Papers
| Method | Endpoint                  | Access  | Description              |
|--------|---------------------------|---------|--------------------------|
| GET    | /api/papers               | Public  | List with filters        |
| GET    | /api/papers/search?q=...  | Public  | Search papers            |
| GET    | /api/papers/:id           | Public  | Single paper             |
| GET    | /api/papers/:id/download  | Private | Get PDF URL              |
| POST   | /api/papers               | Admin   | Create paper record      |
| PUT    | /api/papers/:id           | Admin   | Update paper             |
| DELETE | /api/papers/:id           | Admin   | Remove paper             |

### AI
| Method | Endpoint                     | Access | Description              |
|--------|------------------------------|--------|--------------------------|
| POST   | /api/ai/analyse/:paperId     | Public | Analyse a DB paper       |
| POST   | /api/ai/analyse-custom       | Public | Analyse without DB record|
| DELETE | /api/ai/cache/:paperId       | Admin  | Clear cached analysis    |

### Upload
| Method | Endpoint         | Access | Description          |
|--------|------------------|--------|----------------------|
| POST   | /api/upload/pdf  | Admin  | Upload single PDF    |
| POST   | /api/upload/bulk | Admin  | Upload multiple PDFs |

---

## Getting Your Keys

### MongoDB Atlas (free)
1. Go to mongodb.com/atlas → Create free account
2. Create a cluster → Connect → Drivers → Copy URI
3. Paste in .env as MONGO_URI

### Cloudinary (free)
1. Go to cloudinary.com → Sign up
2. Dashboard → Copy Cloud Name, API Key, API Secret

### Anthropic API
1. Go to console.anthropic.com
2. API Keys → Create key
3. Paste as ANTHROPIC_API_KEY

---

## Deploying to Production

**Backend → Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
```
Add all .env variables in Railway dashboard.

**Frontend → Vercel**
```bash
cd pyq-hub
npm run build
npx vercel --prod
```
Set VITE_API_URL to your Railway backend URL in Vercel environment variables.
