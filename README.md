# PYQ Hub — Monorepo

One folder. Frontend + Backend together.

```
pyq-hub/
├── frontend/          React + Vite app
├── backend/           Node.js + Express + MongoDB API
└── package.json       Root — runs both with one command
```

---

## First Time Setup

### 1. Install everything (one command)
```bash
npm run install:all
```

### 2. Set up backend environment
```bash
cd backend
cp .env.example .env
```
Open `backend/.env` and fill in:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/pyqhub
JWT_SECRET=any_long_random_string_here
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=123456
CLOUDINARY_API_SECRET=abc123
ANTHROPIC_API_KEY=sk-ant-api03-...
CLIENT_URL=http://localhost:5173
```

### 3. Set up frontend environment
```bash
cd frontend
cp .env.example .env
```
`frontend/.env` should have:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the database
```bash
npm run seed
```

### 5. Start both servers
```bash
cd ..  # back to root
npm run dev
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:5000
- Health:   http://localhost:5000/api/health

---

## Individual Commands

```bash
npm run dev:frontend    # only frontend
npm run dev:backend     # only backend
npm run build           # build frontend for production
npm run seed            # seed MongoDB with exam data
```

---

## Deploy to Vercel (frontend) + Railway (backend)

Both `frontend/` and `backend/` can be deployed from the **same GitHub repo**.

**Backend on Railway:**
1. Go to railway.app → New Project → GitHub repo
2. Set **Root Directory** to `backend`
3. Add all env variables from `backend/.env`

**Frontend on Vercel:**
1. Go to vercel.com → New Project → same GitHub repo
2. Set **Root Directory** to `frontend`
3. Add env variable: `VITE_API_URL=https://your-railway-url.up.railway.app/api`

---

## Where to Get Your Keys

| Key | Where to get it |
|-----|----------------|
| MONGO_URI | mongodb.com/atlas → Free cluster → Connect → Drivers |
| CLOUDINARY_* | cloudinary.com → Dashboard |
| ANTHROPIC_API_KEY | console.anthropic.com → API Keys |
| JWT_SECRET | Any random string (e.g. type random characters) |
