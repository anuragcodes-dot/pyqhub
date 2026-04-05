import { useState, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider }  from './context/AuthContext.jsx'
import Navbar     from './components/Navbar.jsx'
import Home       from './pages/Home.jsx'
import Category   from './pages/Category.jsx'
import Papers     from './pages/Papers.jsx'
import PaperView  from './pages/PaperView.jsx'
import AuthPage   from './pages/Auth.jsx'
import Dashboard  from './pages/Dashboard.jsx'
import Pricing    from './pages/Pricing.jsx'

function AppInner() {
  const [page,  setPage]  = useState('home')
  const [exam,  setExam]  = useState(null)
  const [sub,   setSub]   = useState(null)
  const [year,  setYear]  = useState(null)
  const [paper, setPaper] = useState(null)
  const [history, setHistory] = useState([])

  const go = useCallback((p, opts = {}) => {
    // Handle back navigation
    if (p === 'back' && history.length > 0) {
      const newHistory = [...history]
      const prevState = newHistory.pop()
      setHistory(newHistory)
      setPage(prevState.page)
      setExam(prevState.exam)
      setSub(prevState.sub)
      setYear(prevState.year)
      setPaper(prevState.paper)
    } else if (p !== 'back') {
      // Push current state to history before navigating
      setHistory([...history, { page, exam, sub, year, paper }])
      setPage(p)
      if (opts.exam  !== undefined) setExam(opts.exam)
      if (opts.sub   !== undefined) setSub(opts.sub)
      if (opts.year  !== undefined) setYear(opts.year)
      if (opts.paper !== undefined) setPaper(opts.paper)
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
  }, [history, page, exam, sub, year, paper])

  return (
    <div className="app">
      <Navbar page={page} exam={exam} sub={sub} year={year} paper={paper} go={go} canGoBack={history.length > 0} />

      {page === 'home'      && <Home go={go} />}
      {page === 'category'  && <Category exam={exam} go={go} />}
      {page === 'papers'    && <Papers  exam={exam} sub={sub} year={year} go={go} />}
      {page === 'view'      && <PaperView exam={exam} sub={sub} year={year} paper={paper} go={go} />}
      {page === 'auth'      && <AuthPage go={go} />}
      {page === 'dashboard' && <Dashboard go={go} />}
      {page === 'pricing'   && <Pricing go={go} />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ThemeProvider>
  )
}
