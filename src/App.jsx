import { useState } from "react";
import "./App.css";
import DelhiMap from "./DelhiMap";
import TrainSafety from "./TrainSafety";

const stationData = [
  { label: "Station Risk Score", value: "60", unit: "/100", status: "MODERATE", color: "amber" },
  { label: "Crowd Density", value: "75", unit: "%", status: "HIGH CONGESTION", color: "red" },
  { label: "CCTV Coverage", value: "50", unit: "%", status: "PARTIAL COVERAGE", color: "cyan" },
  { label: "Lighting Quality", value: "40", unit: "%", status: "NEEDS ATTENTION", color: "amber" },
];

function SOSButton() {
  const handleSOS = () => {
    if (window.confirm("EMERGENCY SOS\n\nDo you need emergency assistance? Continue to call 112?")) {
      window.location.href = "tel:112";
    }
  };

  return (
    <button
      type="button"
      onClick={handleSOS}
      aria-label="SOS Emergency Assistance"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 99999,
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        border: "3px solid white",
        background: "#e11d48",
        color: "white",
        fontSize: "17px",
        fontWeight: "800",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(225, 29, 72, 0.5)",
      }}
    >
      🆘 SOS
    </button>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [train, setTrain] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  function startJourney(e) {
    e.preventDefault();

    if (!train.trim() || !from.trim() || !to.trim()) {
      setMessage("Please enter your train number and both stations.");
      return;
    }

    setMessage("");
    setPage("dashboard");
  }

  if (page === "home") {
    return (
      <>
        <div className="landing-page">
          <header className="landing-nav">
            <a
              className="landing-brand"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage("home");
              }}
            >
              <span className="brand-icon">R</span>
              <span>
                RAILSHIELD <small>AI SAFETY INTELLIGENCE</small>
              </span>
            </a>

            <div className="landing-nav-actions">
              <button className="text-button" onClick={() => setPage("login")}>
                Login
              </button>
              <button className="small-primary" onClick={() => setPage("signup")}>
                Sign up
              </button>
            </div>
          </header>

          <main className="landing-main">
            <section className="landing-intro">
              <span className="landing-tag">✦ WOMEN'S RAILWAY SAFETY</span>
              <h1>
                Your journey.<br />
                Your safety.<br />
                <span>Your control.</span>
              </h1>
              <p>
                Understand station safety conditions, identify assistance
                points and explore safer routes before you travel.
              </p>

              <div className="landing-benefits">
                <span>✓ Station safety insights</span>
                <span>✓ CCTV and crowd zones</span>
                <span>✓ Help points and safer routes</span>
              </div>
            </section>

            <section className="journey-card">
              <div className="journey-card-heading">
                <span className="journey-icon">↗</span>
                <div>
                  <h2>Plan your journey</h2>
                  <p>Start with your train details</p>
                </div>
              </div>

              <form onSubmit={startJourney}>
                <label htmlFor="train">Train number</label>
                <input
                  id="train"
                  value={train}
                  onChange={(e) => setTrain(e.target.value)}
                  placeholder="e.g. 12301"
                />

                <label htmlFor="from">From station</label>
                <input
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="e.g. New Delhi"
                />

                <label htmlFor="to">Destination</label>
                <input
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="e.g. Guwahati"
                />

                {message && <p className="form-message">{message}</p>}

                <button className="journey-submit" type="submit">
                  Check Journey Safety <span>→</span>
                </button>
              </form>

              <p className="demo-disclaimer">
                Demo mode · Safety measurements are illustrative, not live railway data.
              </p>
            </section>
          </main>

          <footer className="landing-footer">
            RAILSHIELD AI · PREVENTIVE SAFETY INTELLIGENCE
            <span>BUILT FOR SAFER RAILWAY JOURNEYS</span>
          </footer>
        </div>
        <SOSButton />
      </>
    );
  }

  if (page === "login" || page === "signup") {
    return (
      <>
        <div className="auth-page">
          <div className="auth-card">
            <div className="brand-icon">R</div>

            <h1>{page === "login" ? "Welcome back" : "Join RailShield AI"}</h1>
            <p>Continue to your railway safety dashboard.</p>

            {page === "signup" && (
              <>
                <label htmlFor="auth-name">Your name</label>
                <input
                  id="auth-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </>
            )}

            <label htmlFor="auth-email">Email</label>
            <input id="auth-email" type="email" placeholder="you@example.com" />

            <label htmlFor="auth-password">Password</label>
            <input id="auth-password" type="password" placeholder="Enter password" />

            <p className="demo-disclaimer">
              Demo sign-in only. Real account authentication is not connected yet.
            </p>

            <button className="journey-submit" onClick={() => setPage("home")}>
              Back to journey planner
            </button>

            <button className="text-button" onClick={() => setPage("dashboard")}>
              Continue to demo dashboard →
            </button>
          </div>
        </div>
        <SOSButton />
      </>
    );
  }

  if (page === "train-safety") {
    return (
      <>
        <div>
          <div
            style={{
              padding: "12px 20px",
              background: "#080d18",
              borderBottom: "1px solid #26364a",
            }}
          >
            <button
              onClick={() => setPage("dashboard")}
              style={{
                padding: "10px 15px",
                border: "1px solid #34445a",
                borderRadius: "9px",
                background: "#111a2a",
                color: "#edf3ff",
                cursor: "pointer",
              }}
            >
              ← Back to Dashboard
            </button>
          </div>

          <TrainSafety />
        </div>
        <SOSButton />
      </>
    );
  }

  return (
    <>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-icon">R</div>
            <div>
              <h2>RAILSHIELD</h2>
              <span>SAFETY INTELLIGENCE</span>
            </div>
          </div>

          <p className="nav-heading">WORKSPACE</p>

          <nav>
            <a
              className="nav-link active"
              href="#overview"
              onClick={() => setPage("dashboard")}
            >
              ◈ Overview
            </a>

            <a className="nav-link" href="#station">⌖ Station Map</a>
            <a className="nav-link" href="#crowd">▦ Crowd Monitor</a>
            <a className="nav-link" href="#trains">⇄ Train Tracking</a>

            <button
              type="button"
              className="nav-link"
              onClick={() => setPage("train-safety")}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              ◉ Train Safety Score
            </button>

            <a className="nav-link" href="#alerts">⚠ Safety Alerts</a>
          </nav>

          <div className="sidebar-bottom">
            <div className="system-status">
              <span className="status-dot" />
              <div>
                <strong>System Online</strong>
                <p>Demo environment</p>
              </div>
            </div>

            <p className="version">RAILSHIELD AI · V0.1</p>
          </div>
        </aside>

        <main className="main-content" id="overview">
          <header className="topbar">
            <div>
              <p className="eyebrow">SAFETY OPERATIONS / INDIA</p>
              <h1>Station Intelligence</h1>
              <p className="subtitle">
                Monitor station conditions. Make safer journeys.
              </p>
            </div>

            <div className="topbar-right">
              <button className="small-primary" onClick={() => setPage("home")}>
                ← Journey planner
              </button>
              <span className="demo-badge">● DEMO MODE</span>
              <div className="avatar">RS</div>
            </div>
          </header>

          <section className="station-banner">
            <div>
              <p className="eyebrow">CURRENT MONITORING ZONE</p>
              <h2>{from || "New Delhi"} Railway Station</h2>
              <p className="muted">
                Journey: {from || "Start"} → {to || "Destination"} · Illustrative station data
              </p>
            </div>

            <div className="station-meta">
              <span>◉ INDIA</span>
              <span>◷ Demo monitoring</span>
            </div>
          </section>

          <section className="metrics-grid">
            {stationData.map((item) => (
              <article className="metric-card" key={item.label}>
                <p className="metric-label">{item.label}</p>
                <div className="metric-value">
                  <strong className={item.color}>{item.value}</strong>
                  <span>{item.unit}</span>
                </div>
                <p className={`metric-status ${item.color}`}>{item.status}</p>
                <div className="metric-track">
                  <div
                    className={`metric-fill ${item.color}`}
                    style={{ width: `${Number(item.value)}%` }}
                  />
                </div>
              </article>
            ))}
          </section>

          <section className="content-grid">
            <article className="panel map-panel" id="station">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">SIMULATED VIEW</p>
                  <h3>Station Safety Overview</h3>
                </div>
                <span className="outline-badge">MAP PREVIEW</span>
              </div>

              <DelhiMap />

              <div className="map-legend">
                <span><i className="legend-dot green-dot" /> Lower risk</span>
                <span><i className="legend-dot yellow-dot" /> Moderate risk</span>
                <span><i className="legend-dot red-dot" /> Higher risk</span>
              </div>
            </article>

            <article className="panel" id="crowd">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">CONDITIONS</p>
                  <h3>Safety Factors</h3>
                </div>
                <span className="panel-icon">⌁</span>
              </div>

              <div className="factor-list">
                <Factor label="Crowd density" value={75} color="red" />
                <Factor label="Lighting quality" value={40} color="amber" />
                <Factor label="CCTV coverage" value={50} color="cyan" />
                <Factor label="Help-point availability" value={60} color="green" />
              </div>

              <div className="info-note">
                <span>ⓘ</span>
                <p>
                  Sample values only. Real risk assessments require verified station data.
                </p>
              </div>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel train-panel" id="trains">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">JOURNEY MONITOR</p>
                  <h3>Train &amp; Platform Status</h3>
                </div>
                <span className="outline-badge">SIMULATED</span>
              </div>

              <div className="train-route">
                <div className="route-point">
                  <span className="route-dot" />
                  <div>
                    <strong>{from || "Starting station"}</strong>
                    <p>Journey origin</p>
                  </div>
                </div>

                <div className="route-line"><span /></div>

                <div className="route-point">
                  <span className="route-dot destination" />
                  <div>
                    <strong>{to || "Destination"}</strong>
                    <p>Demo destination</p>
                  </div>
                </div>
              </div>

              <div className="train-footer">
                <span>TRAIN {train || "DEMO-01"}</span>
                <span>Platform · Example</span>
              </div>
            </article>

            <article className="panel alerts-panel" id="alerts">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">ATTENTION REQUIRED</p>
                  <h3>Safety Alerts</h3>
                </div>
                <span className="alert-count">02</span>
              </div>

              <div className="alert-row">
                <span className="alert-icon amber-bg">!</span>
                <div>
                  <strong>High crowd density</strong>
                  <p>Platform · Simulated alert</p>
                </div>
              </div>

              <div className="alert-row">
                <span className="alert-icon red-bg">!</span>
                <div>
                  <strong>Lighting needs review</strong>
                  <p>Concourse · Simulated alert</p>
                </div>
              </div>
            </article>
          </section>

          <footer className="footer">
            <span>RAILSHIELD AI · PREVENTIVE SAFETY INTELLIGENCE</span>
            <span>PROTOTYPE · DATA IS SIMULATED</span>
          </footer>
        </main>
      </div>
      <SOSButton />
    </>
  );
}

function Factor({ label, value, color }) {
  return (
    <div className="factor">
      <div className="factor-heading">
        <span>{label}</span>
        <strong className={color}>{value}%</strong>
      </div>

      <div className="factor-track">
        <div
          className={`factor-fill ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default App;