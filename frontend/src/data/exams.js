// ─────────────────────────────────────────────
//  EXAM CATEGORIES
// ─────────────────────────────────────────────
export const EXAMS = [
  {
    id: 'jee',
    name: 'JEE',
    full: 'Joint Entrance Examination',
    desc: 'Engineering entrance · IITs, NITs & more',
    accent: '#2563EB',
    bg: '#EFF6FF',
    emoji: '⚛',
    subs: [
      { id: 'jee-main', name: 'JEE Main',     count: 3 },
      { id: 'jee-adv',  name: 'JEE Advanced', count: 2 },
    ],
  },
  {
    id: 'neet',
    name: 'NEET',
    full: 'National Eligibility cum Entrance Test',
    desc: 'Medical entrance · MBBS, BDS & more',
    accent: '#059669',
    bg: '#ECFDF5',
    emoji: '⚕',
    subs: [
      { id: 'neet-ug', name: 'NEET UG', count: 1 },
      { id: 'neet-pg', name: 'NEET PG', count: 2 },
    ],
  },
  {
    id: 'upsc',
    name: 'UPSC',
    full: 'Union Public Service Commission',
    desc: 'Civil services & government admin exams',
    accent: '#7C3AED',
    bg: '#F5F3FF',
    emoji: '🏛',
    subs: [
      { id: 'upsc-pre',  name: 'Civil Services Prelims', count: 2 },
      { id: 'upsc-main', name: 'Civil Services Mains',   count: 5 },
      { id: 'upsc-nda',  name: 'NDA / NA',               count: 2 },
      { id: 'upsc-capf', name: 'CAPF AC',                count: 1 },
    ],
  },
  {
    id: 'ssc',
    name: 'SSC',
    full: 'Staff Selection Commission',
    desc: 'Central government recruitment exams',
    accent: '#D97706',
    bg: '#FFFBEB',
    emoji: '📋',
    subs: [
      { id: 'ssc-cgl',  name: 'SSC CGL',          count: 3 },
      { id: 'ssc-chsl', name: 'SSC CHSL',          count: 2 },
      { id: 'ssc-gd',   name: 'SSC GD Constable',  count: 1 },
      { id: 'ssc-mts',  name: 'SSC MTS',           count: 1 },
    ],
  },
  {
    id: 'board',
    name: 'Board Exams',
    full: 'HSC / SSC Board Examinations',
    desc: 'CBSE, Maharashtra Board & state boards',
    accent: '#DC2626',
    bg: '#FEF2F2',
    emoji: '📚',
    subs: [
      { id: 'cbse12', name: 'CBSE 12th',        count: 5 },
      { id: 'cbse10', name: 'CBSE 10th',        count: 5 },
      { id: 'mhhsc',  name: 'Maharashtra HSC',  count: 4 },
      { id: 'mhssc',  name: 'Maharashtra SSC',  count: 4 },
    ],
  },
  {
    id: 'eng',
    name: 'Engineering Uni',
    full: 'University Engineering Examinations',
    desc: 'Mumbai Uni, VTU, Anna Uni & more',
    accent: '#0891B2',
    bg: '#F0FDFA',
    emoji: '⚙',
    subs: [
      { id: 'mu',   name: 'Mumbai University', count: 5 },
      { id: 'vtu',  name: 'VTU Karnataka',     count: 5 },
      { id: 'anna', name: 'Anna University',   count: 4 },
      { id: 'rgpv', name: 'RGPV Bhopal',       count: 3 },
    ],
  },
]

// ─────────────────────────────────────────────
//  YEARS AVAILABLE
// ─────────────────────────────────────────────
export const YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018]

// ─────────────────────────────────────────────
//  PAPERS DATABASE (per sub-category)
// ─────────────────────────────────────────────
export const PAPERS_DB = {
  'jee-main': [
    { id: 1, title: 'January Session — Shift 1', pages: 32, subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { id: 2, title: 'January Session — Shift 2', pages: 32, subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { id: 3, title: 'April Session — Shift 1',   pages: 32, subjects: ['Physics', 'Chemistry', 'Mathematics'] },
  ],
  'jee-adv': [
    { id: 1, title: 'Paper 1 (Morning)',   pages: 40, subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { id: 2, title: 'Paper 2 (Afternoon)', pages: 40, subjects: ['Physics', 'Chemistry', 'Mathematics'] },
  ],
  'neet-ug': [
    { id: 1, title: 'NEET UG — Single Session', pages: 36, subjects: ['Physics', 'Chemistry', 'Botany', 'Zoology'] },
  ],
  'neet-pg': [
    { id: 1, title: 'NEET PG — Shift 1', pages: 44, subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Clinical'] },
    { id: 2, title: 'NEET PG — Shift 2', pages: 44, subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Clinical'] },
  ],
  'upsc-pre': [
    { id: 1, title: 'General Studies Paper I',   pages: 28, subjects: ['History', 'Geography', 'Polity', 'Economy', 'Env & Ecology'] },
    { id: 2, title: 'CSAT Paper II (Aptitude)',   pages: 24, subjects: ['Aptitude', 'Comprehension', 'Decision Making'] },
  ],
  'upsc-main': [
    { id: 1, title: 'General Studies I',                pages: 20, subjects: ['Indian History', 'World History', 'Geography', 'Society'] },
    { id: 2, title: 'General Studies II (Governance)',  pages: 20, subjects: ['Polity', 'Governance', 'IR'] },
    { id: 3, title: 'General Studies III (Economy)',    pages: 20, subjects: ['Economy', 'Technology', 'Disaster Mgmt'] },
    { id: 4, title: 'General Studies IV (Ethics)',      pages: 20, subjects: ['Ethics', 'Integrity', 'Aptitude'] },
    { id: 5, title: 'Essay Paper',                      pages: 12, subjects: ['Essay Writing'] },
  ],
  'upsc-nda': [
    { id: 1, title: 'Mathematics',                pages: 28, subjects: ['Algebra', 'Calculus', 'Trigonometry', 'Statistics'] },
    { id: 2, title: 'General Ability Test (GAT)', pages: 32, subjects: ['English', 'Physics', 'Chemistry', 'GK'] },
  ],
  'upsc-capf': [
    { id: 1, title: 'General Ability & Intelligence', pages: 28, subjects: ['GK', 'Reasoning', 'English', 'Aptitude'] },
  ],
  'ssc-cgl': [
    { id: 1, title: 'Tier 1 — Shift 1',       pages: 20, subjects: ['GK', 'English', 'Quantitative Aptitude', 'Reasoning'] },
    { id: 2, title: 'Tier 1 — Shift 2',       pages: 20, subjects: ['GK', 'English', 'Quantitative Aptitude', 'Reasoning'] },
    { id: 3, title: 'Tier 2 — Combined Paper', pages: 28, subjects: ['Quantitative', 'English & Comp', 'Statistics'] },
  ],
  'ssc-chsl': [
    { id: 1, title: 'Tier 1 — Shift 1', pages: 20, subjects: ['GK', 'English', 'Aptitude', 'Reasoning'] },
    { id: 2, title: 'Tier 1 — Shift 2', pages: 20, subjects: ['GK', 'English', 'Aptitude', 'Reasoning'] },
  ],
  'ssc-gd': [
    { id: 1, title: 'CBT Paper', pages: 16, subjects: ['GK', 'Hindi/English', 'Maths', 'Reasoning'] },
  ],
  'ssc-mts': [
    { id: 1, title: 'Paper 1', pages: 16, subjects: ['GK', 'English', 'Numerical Aptitude', 'Reasoning'] },
  ],
  'cbse12': [
    { id: 1, title: 'Mathematics',  pages: 24, subjects: ['Calculus', 'Algebra', 'Probability', 'Vectors'] },
    { id: 2, title: 'Physics',      pages: 20, subjects: ['Electromagnetism', 'Optics', 'Modern Physics'] },
    { id: 3, title: 'Chemistry',    pages: 20, subjects: ['Organic', 'Inorganic', 'Physical Chemistry'] },
    { id: 4, title: 'Biology',      pages: 20, subjects: ['Genetics', 'Ecology', 'Plant Physiology', 'Zoology'] },
    { id: 5, title: 'English Core', pages: 16, subjects: ['Reading', 'Writing', 'Literature'] },
  ],
  'cbse10': [
    { id: 1, title: 'Mathematics Standard', pages: 20, subjects: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'] },
    { id: 2, title: 'Science',              pages: 20, subjects: ['Physics', 'Chemistry', 'Biology'] },
    { id: 3, title: 'Social Science',       pages: 20, subjects: ['History', 'Geography', 'Civics', 'Economics'] },
    { id: 4, title: 'English Language',     pages: 16, subjects: ['Reading', 'Writing', 'Grammar', 'Literature'] },
    { id: 5, title: 'Hindi (Course A)',     pages: 16, subjects: ['Reading', 'Writing', 'Grammar', 'Literature'] },
  ],
  'mhhsc': [
    { id: 1, title: 'Mathematics & Statistics', pages: 16, subjects: ['Algebra', 'Calculus', 'Statistics'] },
    { id: 2, title: 'Physics',                  pages: 16, subjects: ['Mechanics', 'Optics', 'Electrostatics'] },
    { id: 3, title: 'Chemistry',                pages: 16, subjects: ['Organic', 'Inorganic', 'Physical'] },
    { id: 4, title: 'Biology',                  pages: 16, subjects: ['Botany', 'Zoology'] },
  ],
  'mhssc': [
    { id: 1, title: 'Mathematics', pages: 14, subjects: ['Algebra', 'Geometry', 'Statistics'] },
    { id: 2, title: 'Science 1',   pages: 14, subjects: ['Physics', 'Chemistry'] },
    { id: 3, title: 'Science 2',   pages: 14, subjects: ['Biology', 'Earth Science'] },
    { id: 4, title: 'History',     pages: 12, subjects: ['India & World History', 'Civics'] },
  ],
  'mu': [
    { id: 1, title: 'Engineering Mathematics III',      pages: 12, subjects: ['Laplace', 'Fourier', 'Complex Variables'] },
    { id: 2, title: 'Data Structures & Algorithms',     pages: 12, subjects: ['Arrays', 'Trees', 'Graphs', 'Sorting'] },
    { id: 3, title: 'Computer Networks',                pages: 12, subjects: ['OSI Model', 'TCP/IP', 'Routing', 'Security'] },
    { id: 4, title: 'Database Management Systems',      pages: 12, subjects: ['SQL', 'Normalization', 'Transactions'] },
    { id: 5, title: 'Operating Systems',                pages: 12, subjects: ['Scheduling', 'Memory', 'File System', 'Deadlock'] },
  ],
  'vtu': [
    { id: 1, title: 'Engineering Mathematics IV',         pages: 12, subjects: ['Numerical Methods', 'Probability', 'Linear Algebra'] },
    { id: 2, title: 'Design & Analysis of Algorithms',    pages: 12, subjects: ['Complexity', 'Greedy', 'DP', 'Graph Algorithms'] },
    { id: 3, title: 'Microprocessors & Microcontrollers', pages: 12, subjects: ['8086', '8051', 'Assembly', 'Interfacing'] },
    { id: 4, title: 'Software Engineering',               pages: 12, subjects: ['SDLC', 'Agile', 'Testing', 'Project Mgmt'] },
    { id: 5, title: 'Machine Learning',                   pages: 12, subjects: ['Supervised', 'Unsupervised', 'Neural Networks'] },
  ],
  'anna': [
    { id: 1, title: 'Engineering Mathematics II',   pages: 12, subjects: ['ODE', 'Laplace', 'Vector Calculus'] },
    { id: 2, title: 'Digital Principles & System',  pages: 12, subjects: ['Logic Gates', 'Boolean Algebra', 'Flip-flops'] },
    { id: 3, title: 'Object Oriented Programming',  pages: 12, subjects: ['C++', 'Java', 'OOP Concepts'] },
    { id: 4, title: 'Compiler Design',              pages: 12, subjects: ['Lexical Analysis', 'Parsing', 'Code Generation'] },
  ],
  'rgpv': [
    { id: 1, title: 'Engineering Physics',    pages: 12, subjects: ['Quantum Mechanics', 'Laser', 'Fiber Optics'] },
    { id: 2, title: 'Basic Electrical Engg',  pages: 12, subjects: ['DC Circuits', 'AC Circuits', 'Machines'] },
    { id: 3, title: 'Fluid Mechanics',        pages: 12, subjects: ['Fluid Properties', 'Bernoulli', 'Flow Measurement'] },
  ],
}

// ─────────────────────────────────────────────
//  SAMPLE QUESTIONS for PDF preview
// ─────────────────────────────────────────────
export const SAMPLE_QUESTIONS = {
  0: [
    'A particle of mass m is projected with velocity v₀ at angle θ with the horizontal. Find the time of flight, maximum height, and range.',
    'Two point charges +Q and -Q are placed at positions (0,0) and (d,0). Derive the electric field at a general point on the perpendicular bisector.',
    'An LC circuit has inductance L = 4 mH and capacitance C = 0.1 µF. Calculate resonant frequency and quality factor.',
  ],
  1: [
    'Explain the SN2 reaction mechanism with appropriate example. Comment on stereochemistry and rate-influencing factors.',
    'Calculate pH of a buffer containing 0.1 M CH₃COOH and 0.15 M CH₃COONa. (Ka = 1.8 × 10⁻⁵)',
    'Draw orbital overlap diagrams for ethylene. Distinguish between sigma and pi bonds with respect to energy and reactivity.',
  ],
  2: [
    'Evaluate ∫[(x²+2x+3)/(x³+x)]dx using partial fractions and verify by differentiation.',
    'Find the area enclosed between y = x² and y = √x using definite integration. Sketch the region.',
    'If z₁ and z₂ are complex numbers, prove: |z₁+z₂|² + |z₁-z₂|² = 2(|z₁|² + |z₂|²).',
  ],
}

// ─────────────────────────────────────────────
//  Helper: get papers for a sub-category
// ─────────────────────────────────────────────
export function getPapers(subId) {
  return PAPERS_DB[subId] || [
    { id: 1, title: 'Question Paper — Set A', pages: 24, subjects: ['Subject 1', 'Subject 2', 'Subject 3'] },
    { id: 2, title: 'Question Paper — Set B', pages: 24, subjects: ['Subject 1', 'Subject 2', 'Subject 3'] },
  ]
}
