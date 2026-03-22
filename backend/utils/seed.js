require('dotenv').config()
const mongoose = require('mongoose')
const Exam     = require('../models/Exam')
const Paper    = require('../models/Paper')

// ─────────────────────────────────────────────
//  Seed data
// ─────────────────────────────────────────────
const EXAMS = [
  {
    id: 'jee', name: 'JEE', full: 'Joint Entrance Examination',
    desc: 'Engineering entrance · IITs, NITs & more',
    emoji: '⚛', accent: '#2563EB', bg: '#EFF6FF',
    subs: [
      { id: 'jee-main', name: 'JEE Main',     count: 3 },
      { id: 'jee-adv',  name: 'JEE Advanced', count: 2 },
    ],
  },
  {
    id: 'neet', name: 'NEET', full: 'National Eligibility cum Entrance Test',
    desc: 'Medical entrance · MBBS, BDS & more',
    emoji: '⚕', accent: '#059669', bg: '#ECFDF5',
    subs: [
      { id: 'neet-ug', name: 'NEET UG', count: 1 },
      { id: 'neet-pg', name: 'NEET PG', count: 2 },
    ],
  },
  {
    id: 'upsc', name: 'UPSC', full: 'Union Public Service Commission',
    desc: 'Civil services & government admin exams',
    emoji: '🏛', accent: '#7C3AED', bg: '#F5F3FF',
    subs: [
      { id: 'upsc-pre',  name: 'Civil Services Prelims', count: 2 },
      { id: 'upsc-main', name: 'Civil Services Mains',   count: 5 },
      { id: 'upsc-nda',  name: 'NDA / NA',               count: 2 },
      { id: 'upsc-capf', name: 'CAPF AC',                count: 1 },
    ],
  },
  {
    id: 'ssc', name: 'SSC', full: 'Staff Selection Commission',
    desc: 'Central government recruitment exams',
    emoji: '📋', accent: '#D97706', bg: '#FFFBEB',
    subs: [
      { id: 'ssc-cgl',  name: 'SSC CGL',         count: 3 },
      { id: 'ssc-chsl', name: 'SSC CHSL',         count: 2 },
      { id: 'ssc-gd',   name: 'SSC GD Constable', count: 1 },
      { id: 'ssc-mts',  name: 'SSC MTS',          count: 1 },
    ],
  },
  {
    id: 'board', name: 'Board Exams', full: 'HSC / SSC Board Examinations',
    desc: 'CBSE, Maharashtra Board & state boards',
    emoji: '📚', accent: '#DC2626', bg: '#FEF2F2',
    subs: [
      { id: 'cbse12', name: 'CBSE 12th',       count: 5 },
      { id: 'cbse10', name: 'CBSE 10th',       count: 5 },
      { id: 'mhhsc',  name: 'Maharashtra HSC', count: 4 },
      { id: 'mhssc',  name: 'Maharashtra SSC', count: 4 },
    ],
  },
  {
    id: 'eng', name: 'Engineering Uni', full: 'University Engineering Examinations',
    desc: 'Mumbai Uni, VTU, Anna Uni & more',
    emoji: '⚙', accent: '#0891B2', bg: '#F0FDFA',
    subs: [
      { id: 'mu',   name: 'Mumbai University', count: 5 },
      { id: 'vtu',  name: 'VTU Karnataka',     count: 5 },
      { id: 'anna', name: 'Anna University',   count: 4 },
      { id: 'rgpv', name: 'RGPV Bhopal',       count: 3 },
    ],
  },
]

// Sample papers for JEE Main 2024
const SAMPLE_PAPERS = [
  {
    examId: 'jee', subId: 'jee-main', year: 2024,
    title: 'January Session — Shift 1', pages: 32,
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    pdfUrl: '', // add real URL after uploading
  },
  {
    examId: 'jee', subId: 'jee-main', year: 2024,
    title: 'January Session — Shift 2', pages: 32,
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    pdfUrl: '',
  },
  {
    examId: 'jee', subId: 'jee-adv', year: 2024,
    title: 'Paper 1 (Morning)', pages: 40,
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    pdfUrl: '',
  },
  {
    examId: 'neet', subId: 'neet-ug', year: 2024,
    title: 'NEET UG — Single Session', pages: 36,
    subjects: ['Physics', 'Chemistry', 'Botany', 'Zoology'],
    pdfUrl: '',
  },
  {
    examId: 'upsc', subId: 'upsc-pre', year: 2024,
    title: 'General Studies Paper I', pages: 28,
    subjects: ['History', 'Geography', 'Polity', 'Economy'],
    pdfUrl: '',
  },
  {
    examId: 'board', subId: 'cbse12', year: 2024,
    title: 'Mathematics', pages: 24,
    subjects: ['Calculus', 'Algebra', 'Probability', 'Vectors'],
    pdfUrl: '',
  },
  {
    examId: 'board', subId: 'cbse12', year: 2024,
    title: 'Physics', pages: 20,
    subjects: ['Electromagnetism', 'Optics', 'Modern Physics'],
    pdfUrl: '',
  },
  {
    examId: 'eng', subId: 'mu', year: 2024,
    title: 'Data Structures & Algorithms', pages: 12,
    subjects: ['Arrays', 'Trees', 'Graphs', 'Sorting'],
    pdfUrl: '',
  },
]

// ─────────────────────────────────────────────
//  Run seed
// ─────────────────────────────────────────────
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing
    await Exam.deleteMany({})
    await Paper.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Insert exams
    await Exam.insertMany(EXAMS)
    console.log(`📚 Inserted ${EXAMS.length} exams`)

    // Insert sample papers
    await Paper.insertMany(SAMPLE_PAPERS)
    console.log(`📄 Inserted ${SAMPLE_PAPERS.length} sample papers`)

    console.log('\n✅ Seed complete! Run: npm run dev\n')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
