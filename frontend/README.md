# PYQ Hub 📚

Free previous year question papers for Indian students — JEE, NEET, UPSC, SSC, Board & Engineering exams.

## Features
- 🗂️ Organised by exam → sub-category → year
- 📥 One-click download
- 🧠 AI analysis (Claude API — important topics, weightage, study strategy)
- 📱 Fully responsive

---

## Quick Start (VS Code)

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Project Structure

```
pyq-hub/
├── index.html                  ← Entry HTML
├── vite.config.js              ← Vite config
├── package.json
└── src/
    ├── main.jsx                ← React root
    ├── App.jsx                 ← Routing / state
    ├── styles/
    │   └── main.css            ← ALL styles
    ├── data/
    │   └── exams.js            ← All exam + paper data
    ├── utils/
    │   └── helpers.js          ← Download + AI text parser
    ├── components/
    │   ├── Navbar.jsx          ← Sticky nav with breadcrumbs
    │   ├── Illustration.jsx    ← Hero SVG illustration
    │   ├── AIPanel.jsx         ← Claude AI analysis panel
    │   └── Icons.jsx           ← SVG icon components
    └── pages/
        ├── Home.jsx            ← Landing page
        ├── Category.jsx        ← Exam sub-categories + year grid
        ├── Papers.jsx          ← Paper list for a year
        └── PaperView.jsx       ← PDF viewer + AI panel
```

---

## Adding Real PDFs

Replace the mock download in `src/utils/helpers.js` with a real PDF URL:

```js
// Option A: Direct S3 / Cloudinary URL
const pdfUrl = `https://your-bucket.s3.amazonaws.com/${examId}/${subId}/${year}/${paperId}.pdf`
window.open(pdfUrl, '_blank')

// Option B: Embed in viewer with iframe
<iframe src={pdfUrl} width="100%" height="600px" />
```

---

## Adding More Exams / Papers

Edit `src/data/exams.js`:

1. Add an entry to `EXAMS` array
2. Add paper list to `PAPERS_DB` keyed by sub-category ID
3. Add sample questions to `SAMPLE_QUESTIONS` if needed

---

## AI Analysis

The AI panel calls the Claude API directly from the browser.
For production, move this to a backend API route to keep your API key secure.

```
POST https://api.anthropic.com/v1/messages
```

Set your API key in a backend `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Build for Production

```bash
npm run build
```

Outputs to `/dist` — deploy to Vercel, Netlify, or any static host.

---

## Tech Stack
- React 18 + Vite
- Plain CSS (no Tailwind)
- Google Fonts (Playfair Display + DM Sans)
- Claude API (Anthropic)
