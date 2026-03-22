// ─────────────────────────────────────────────
//  Download a paper as a .txt file (demo)
//  In production: replace with real PDF URL
// ─────────────────────────────────────────────
export function triggerDownload(exam, sub, year, paper) {
  const content = `PREVIOUS YEAR QUESTION PAPER
${'='.repeat(50)}
Exam    : ${exam.full}
Paper   : ${sub.name} — ${paper.title}
Year    : ${year}
Pages   : ${paper.pages}
Subjects: ${paper.subjects.join(', ')}
${'='.repeat(50)}

[Demo file. In production, this would be the actual PDF question paper.]

SECTION A — Multiple Choice (1 mark each, -0.25 for wrong)

Q1.  Sample question from ${paper.subjects[0]}
     (A) Option A   (B) Option B   (C) Option C   (D) Option D

Q2.  Sample question from ${paper.subjects[0]}
     (A) Option A   (B) Option B   (C) Option C   (D) Option D

Q3.  Sample question from ${paper.subjects[1] || paper.subjects[0]}
     (A) Option A   (B) Option B   (C) Option C   (D) Option D

...

SECTION B — Short Answer (4 marks each)

Q31. [Short answer question from ${paper.subjects[0]}]

Q32. [Short answer question from ${paper.subjects[1] || paper.subjects[0]}]

...

SECTION C — Long Answer (8 marks each)

Q41. [Long answer question — derive / explain / prove]

...

${'='.repeat(50)}
END OF PAPER · PYQ Hub · pyqhub.in
${'='.repeat(50)}`

  const blob = new Blob([content], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `${exam.name}_${sub.name.replace(/\s/g, '_')}_${year}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// ─────────────────────────────────────────────
//  Parse Claude AI response text into React
//  renderable blocks (headings, lists, paras)
// ─────────────────────────────────────────────
export function parseAIText(text) {
  const parts = []
  let buffer  = []

  const flushBuffer = () => {
    if (buffer.length) {
      parts.push({ type: 'ul', items: [...buffer] })
      buffer = []
    }
  }

  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line) { flushBuffer(); continue }

    const isHeading = /^(\*\*[^*]+\*\*\s*$|#{1,3}\s+.+|^\d+\.\s+\*\*[^*]+\*\*)/.test(line)

    if (isHeading) {
      flushBuffer()
      const clean = line
        .replace(/^#+\s+/, '')
        .replace(/^\d+\.\s+/, '')
        .replace(/\*\*/g, '')
        .trim()
      parts.push({ type: 'h', text: clean })
    } else if (/^[-•*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      buffer.push(
        line
          .replace(/^[-•*]\s+/, '')
          .replace(/^\d+\.\s+/, '')
          .replace(/\*\*(.*?)\*\*/g, '$1')
      )
    } else {
      flushBuffer()
      parts.push({ type: 'p', text: line.replace(/\*\*(.*?)\*\*/g, '$1') })
    }
  }
  flushBuffer()
  return parts
}
