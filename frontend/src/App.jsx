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

  const go = useCallback((p, opts = {}) => {
    setPage(p)
    if (opts.exam  !== undefined) setExam(opts.exam)
    if (opts.sub   !== undefined) setSub(opts.sub)
    if (opts.year  !== undefined) setYear(opts.year)
    if (opts.paper !== undefined) setPaper(opts.paper)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
  }, [])

  return (
    <div className="app">
      <Navbar page={page} exam={exam} sub={sub} year={year} paper={paper} go={go} />

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
