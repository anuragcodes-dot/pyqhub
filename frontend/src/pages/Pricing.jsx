import { useAuth } from '../context/AuthContext.jsx'

const FREE_FEATURES = [
  '✅ Access all previous year papers',
  '✅ Download PDFs for free',
  '✅ AI paper analysis (basic)',
  '✅ Browse all exam categories',
  '✅ Year-wise paper selection',
  '❌ Personal guidance session',
  '❌ 1-on-1 expert doubt solving',
  '❌ Custom study plan',
]

const PAID_FEATURES = [
  '✅ Everything in Free plan',
  '✅ 1 personal guidance session',
  '✅ 1-on-1 expert doubt solving',
  '✅ Custom study plan for your exam',
  '✅ Topic-wise important questions',
  '✅ Priority AI analysis',
  '✅ WhatsApp support during session',
  '✅ Session recording shared after call',
]

export default function Pricing({ go }) {
  const { isLoggedIn, user } = useAuth()

  const handleBookSession = () => {
    if (!isLoggedIn) {
      go('auth')
      return
    }
    // In production: integrate Razorpay here
    window.open('https://razorpay.com', '_blank')
  }

  return (
    <div className="wrap" style={{ paddingTop: 48, paddingBottom: 64 }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="section-label" style={{ marginBottom: 10 }}>Pricing</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700,
          letterSpacing: '-0.5px',
          marginBottom: 14
        }}>
          Simple, Transparent <span style={{ color: 'var(--acc)' }}>Pricing</span>
        </h2>
        <p style={{ color: 'var(--ink-light)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
          All question papers are free forever. Pay only when you need personal expert guidance.
        </p>
      </div>

      {/* Plans */}
      <div className="pricing-grid">

        {/* Free Plan */}
        <div className="pricing-card">
          <div className="pricing-badge free-badge">Free</div>
          <div className="pricing-price">
            <span className="price-amount">₹0</span>
            <span className="price-period">/ forever</span>
          </div>
          <p className="pricing-desc">Everything you need for self-study and paper practice.</p>
          <div className="pricing-divider" />
          <ul className="pricing-features">
            {FREE_FEATURES.map((f, i) => (
              <li key={i} className={f.startsWith('❌') ? 'disabled' : ''}>{f}</li>
            ))}
          </ul>
          <button
            className="btn btn-outline btn-full"
            style={{ marginTop: 24 }}
            onClick={() => go('home')}
          >
            Browse Papers →
          </button>
        </div>

        {/* Guidance Plan */}
        <div className="pricing-card featured">
          <div className="pricing-popular">Most Popular</div>
          <div className="pricing-badge paid-badge">Guidance Session</div>
          <div className="pricing-price">
            <span className="price-amount">₹49</span>
            <span className="price-period">/ session</span>
          </div>
          <p className="pricing-desc">One personal session with an expert to clear doubts and build strategy.</p>
          <div className="pricing-divider" />
          <ul className="pricing-features">
            {PAID_FEATURES.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <button
            className="btn btn-accent btn-full btn-lg"
            style={{ marginTop: 24 }}
            onClick={handleBookSession}
          >
            {isLoggedIn ? 'Book Session for ₹49' : 'Login to Book Session'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-faint)', marginTop: 10 }}>
            Secure payment via Razorpay · No auto-renewal
          </p>
        </div>

      </div>

      {/* FAQ */}
      <div style={{ marginTop: 64 }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 32
        }}>
          Frequently Asked Questions
        </h3>
        <div className="faq-list">
          {[
            ['What is a guidance session?', 'A 45–60 minute 1-on-1 video/audio call with an exam expert. You can ask doubts, get a study plan, and get topic-wise important question tips.'],
            ['Is the free plan really free forever?', 'Yes! All question paper downloads and basic AI analysis are completely free. We charge only for personal sessions.'],
            ['How do I book a session after payment?', 'After payment you will receive a WhatsApp message from our team to schedule your session at a convenient time.'],
            ['Which exams are covered in guidance sessions?', 'JEE, NEET, UPSC, SSC, Board Exams, and Engineering University exams (Mumbai University, VTU, Anna University).'],
            ['Can I get a refund?', 'Yes, if you cancel at least 24 hours before the scheduled session, you get a full refund.'],
          ].map(([q, a], i) => (
            <div key={i} className="faq-item">
              <div className="faq-q">{q}</div>
              <div className="faq-a">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
