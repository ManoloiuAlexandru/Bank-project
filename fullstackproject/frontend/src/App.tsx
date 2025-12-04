import React from 'react'

const App: React.FC = () => {
  return (
    <div className="sc-root">
      {/* Header */}
      <header className="sc-header">
        <div className="sc-container sc-header-inner">
          <div className="sc-brand">
            <img src={Logo} alt="SnekkCredit logo" className="sc-logo" />
            <div className="sc-brand-text">
              <span className="sc-brand-name">SnekkCredit</span>
              <span className="sc-brand-tag">Modern Digital Banking</span>
            </div>
          </div>
          <nav className="sc-nav">
            <span className="sc-nav-item">Personal</span>
            <span className="sc-nav-item">Business</span>
            <span className="sc-nav-item">Cards</span>
            <span className="sc-nav-item">Security</span>
            <span className="sc-nav-item">Support</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="sc-hero">
        <div className="sc-container sc-hero-inner">
          <div className="sc-hero-copy">
            <h1 className="sc-hero-title">Banking that feels effortless.</h1>
            <p className="sc-hero-sub">
              Simple accounts, transparent rates, and industry-grade security —
              thoughtfully designed for everyday finance.
            </p>
            <div className="sc-hero-highlights">
              <div className="sc-chip">0.00€ monthly account fee*</div>
              <div className="sc-chip">Instant transfers</div>
              <div className="sc-chip">24/7 fraud monitoring</div>
              <div className="sc-chip">FDIC-like coverage**</div>
            </div>
            <div className="sc-footnote">
              <span>*Pricing may vary by region. **Coverage subject to local regulation.</span>
            </div>
          </div>

          <div className="sc-hero-card">
            <div className="sc-card-glass">
              <div className="sc-card-number">•••• •••• •••• 8421</div>
              <div className="sc-card-row">
                <div>
                  <div className="sc-card-label">CARD HOLDER</div>
                  <div className="sc-card-value">ALEXANDRU M.</div>
                </div>
                <div>
                  <div className="sc-card-label">VALID THRU</div>
                  <div className="sc-card-value">12/27</div>
                </div>
              </div>
              <div className="sc-card-brand">SnekkCredit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="sc-trust">
        <div className="sc-container sc-trust-inner">
          <div className="sc-trust-grid">
            <div className="sc-trust-item">
              <div className="sc-trust-title">Secure by design</div>
              <div className="sc-trust-desc">TLS 1.3, tokenized payments, hardware-backed keys.</div>
            </div>
            <div className="sc-trust-item">
              <div className="sc-trust-title">Transparent rates</div>
              <div className="sc-trust-desc">No hidden fees. What you see is what you pay.</div>
            </div>
            <div className="sc-trust-item">
              <div className="sc-trust-title">Anytime support</div>
              <div className="sc-trust-desc">Human help, 24/7, wherever you are.</div>
            </div>
            <div className="sc-trust-item">
              <div className="sc-trust-title">Global reach</div>
              <div className="sc-trust-desc">Use your card in 200+ countries and territories.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="sc-features">
        <div className="sc-container">
          <div className="sc-section-head">
            <h2>Everything you need. Nothing you don’t.</h2>
            <p>Clean accounts, fast payments, and insights that keep you in control.</p>
          </div>

          <div className="sc-feature-grid">
            <article className="sc-feature">
              <div className="sc-feature-icon" aria-hidden="true">💳</div>
              <h3>Smart Cards</h3>
              <p>Dynamic virtual numbers and merchant-locked rules to curb fraud.</p>
            </article>

            <article className="sc-feature">
              <div className="sc-feature-icon" aria-hidden="true">📈</div>
              <h3>Insights</h3>
              <p>Real-time spend categorization and budgets with gentle nudges.</p>
            </article>

            <article className="sc-feature">
              <div className="sc-feature-icon" aria-hidden="true">🔒</div>
              <h3>Security</h3>
              <p>Biometric approvals and device binding for high-risk actions.</p>
            </article>

            <article className="sc-feature">
              <div className="sc-feature-icon" aria-hidden="true">⚡</div>
              <h3>Instant</h3>
              <p>Transfers clear in seconds, not days — even on weekends.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="sc-rates">
        <div className="sc-container sc-rates-inner">
          <div>
            <div className="sc-rate-kicker">Rates</div>
            <div className="sc-rate-title">Clear, competitive, and fair.</div>
            <div className="sc-rate-sub">Variable APRs with no surprise markup. View full schedule in app.</div>
          </div>

          <div className="sc-rate-pill">
            <div className="sc-rate-value">2.49%–8.90%</div>
            <div className="sc-rate-note">Typical APR range</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sc-footer">
        <div className="sc-container sc-footer-inner">
          <div className="sc-footer-brand">SnekkCredit</div>

          <div className="sc-footer-cols">
            <div className="sc-footer-col">
              <div className="sc-footer-title">Legal</div>
              <p>Terms • Privacy • Cookies • Licenses</p>
            </div>
            <div className="sc-footer-col">
              <div className="sc-footer-title">Security</div>
              <p>Responsible disclosure • Status • Controls</p>
            </div>
            <div className="sc-footer-col">
              <div className="sc-footer-title">Company</div>
              <p>About • Careers • Press • Contact</p>
            </div>
          </div>

          <div className="sc-footer-fine">
            © {new Date().getFullYear()} SnekkCredit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
