import { useState } from "react";
import "./TrainSafety.css";
import TrainCrowd from "./TrainCrowd";

const demoTrains = {
  "12301": {
    name: "Howrah Rajdhani Express",
    from: "Howrah Junction",
    to: "New Delhi",
    stops: ["Howrah", "Dhanbad", "Gaya", "DDU", "New Delhi"],
    departure: "16:50",
    arrival: "10:00",
    coaches: [
      { name: "A1", type: "AC 2 Tier", crowd: 42 },
      { name: "A2", type: "AC 2 Tier", crowd: 65 },
      { name: "B1", type: "AC 3 Tier", crowd: 78 },
      { name: "B2", type: "AC 3 Tier", crowd: 54 },
      { name: "S1", type: "Sleeper", crowd: 86 },
      { name: "C1", type: "Chair Car", crowd: 35 },
    ],
    score: 82,
  },
  "12002": {
    name: "Bhopal Shatabdi Express",
    from: "New Delhi",
    to: "Rani Kamalapati",
    stops: ["New Delhi", "Agra Cantt", "Gwalior", "Jhansi", "Rani Kamalapati"],
    departure: "06:00",
    arrival: "14:00",
    coaches: [
      { name: "C1", type: "Chair Car", crowd: 38 },
      { name: "C2", type: "Chair Car", crowd: 56 },
      { name: "C3", type: "Chair Car", crowd: 71 },
      { name: "E1", type: "Executive Chair", crowd: 24 },
      { name: "C4", type: "Chair Car", crowd: 47 },
      { name: "C5", type: "Chair Car", crowd: 62 },
    ],
    score: 88,
  },
};

function getCrowdLabel(value) {
  if (value < 40) return "Low";
  if (value < 70) return "Moderate";
  return "High";
}

function getCrowdClass(value) {
  if (value < 40) return "low";
  if (value < 70) return "moderate";
  return "high";
}

export default function TrainSafety() {
  const [trainNumber, setTrainNumber] = useState("");
  const [train, setTrain] = useState(null);
  const [searchedNumber, setSearchedNumber] = useState("");
  const [error, setError] = useState("");

  function analyzeTrain(event) {
    event.preventDefault();

    const number = trainNumber.trim();

    if (!/^\d{5}$/.test(number)) {
      setTrain(null);
      setError("Enter a valid five-digit train number.");
      return;
    }

    const result = demoTrains[number];

    if (!result) {
      setTrain(null);
      setError(
        "This train is not in the demo dataset. Try 12301 or 12002."
      );
      return;
    }

    setTrain(result);
    setSearchedNumber(number);
    setError("");
  }

  return (
    <main className="ts-page">
      <header className="ts-header">
        <div className="ts-brand">
          <div className="ts-brand-icon">R</div>
          <div>
            <h2>
              RAILSHIELD <span>AI</span>
            </h2>
            <p>WOMEN'S RAILWAY SAFETY INTELLIGENCE</p>
          </div>
        </div>

        <div className="ts-demo-pill">
          <span /> PROTOTYPE MODE
        </div>
      </header>

      <section className="ts-intro">
        <p className="ts-eyebrow">TRAIN INTELLIGENCE / 01</p>

        <h1>
          Know your journey.
          <br />
          <span>Travel more prepared.</span>
        </h1>

        <p className="ts-subtitle">
          Explore train crowd indicators, journey details and
          safety information in one place.
        </p>

        <form className="ts-search" onSubmit={analyzeTrain}>
          <div className="ts-search-input">
            <label htmlFor="train-number">TRAIN NUMBER</label>
            <input
              id="train-number"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="Enter 5-digit train number"
              value={trainNumber}
              onChange={(event) =>
                setTrainNumber(event.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <button type="submit">
            Analyze Train <span>→</span>
          </button>
        </form>

        <p className="ts-hint">
          Try demo trains:{" "}
          <button
            type="button"
            onClick={() => setTrainNumber("12301")}
          >
            12301
          </button>
          {" · "}
          <button
            type="button"
            onClick={() => setTrainNumber("12002")}
          >
            12002
          </button>
        </p>

        {error && (
          <div className="ts-error" role="alert">
            {error}
          </div>
        )}
      </section>

      {!train && (
        <section className="ts-empty">
          <div className="ts-empty-icon">↗</div>

          <h2>Your train. Your safety overview.</h2>

          <p>
            Enter one of the demo train numbers above to explore
            the train intelligence dashboard.
          </p>

          <div className="ts-empty-grid">
            <div>
              <span>01</span>
              <p>Train crowd indicators</p>
            </div>
            <div>
              <span>02</span>
              <p>Journey overview</p>
            </div>
            <div>
              <span>03</span>
              <p>Safety information</p>
            </div>
          </div>
        </section>
      )}

      {train && (
        <section className="ts-results">
          <div className="ts-result-heading">
            <div>
              <p className="ts-eyebrow">
                ANALYSIS REPORT / {searchedNumber}
              </p>

              <h2>{train.name}</h2>

              <p className="ts-muted">
                {train.from} <span>→</span> {train.to}
              </p>
            </div>

            <button
              className="ts-reset"
              type="button"
              onClick={() => {
                setTrain(null);
                setTrainNumber("");
                setSearchedNumber("");
                setError("");
              }}
            >
              New search ↗
            </button>
          </div>

          <div className="ts-data-notice">
            DEMO DATA — scores and crowd percentages are illustrative,
            not live railway information.
          </div>

          <div className="ts-overview-grid">
            <article className="ts-card ts-score-card">
              <p className="ts-card-label">
                ILLUSTRATIVE SAFETY INDEX
              </p>

              <div className="ts-score-line">
                <strong>{train.score}</strong>
                <span>/100</span>
              </div>

              <div className="ts-score-track">
                <div style={{ width: `${train.score}%` }} />
              </div>

              <p className="ts-score-caption">
                Demo score only · Not a verified safety assessment
              </p>
            </article>

            <article className="ts-card">
              <p className="ts-card-label">JOURNEY</p>

              <div className="ts-route">
                <div className="ts-route-dot" />
                <div>
                  <strong>{train.from}</strong>
                  <small>Departure · {train.departure}</small>
                </div>
              </div>

              <div className="ts-route-line">
                {train.stops.length} listed stations
              </div>

              <div className="ts-route">
                <div className="ts-route-dot destination" />
                <div>
                  <strong>{train.to}</strong>
                  <small>Arrival · {train.arrival}</small>
                </div>
              </div>
            </article>
          </div>

          <div className="ts-section-heading">
            <div>
              <p className="ts-eyebrow">ONBOARD OVERVIEW</p>
              <h2>Coach crowd indicators</h2>
            </div>

            <span className="ts-count">
              {train.coaches.length} sample coaches
            </span>
          </div>

          <div className="ts-coach-grid">
            {train.coaches.map((coach) => (
              <article
                className="ts-card ts-coach-card"
                key={coach.name}
              >
                <div className="ts-coach-top">
                  <div className="ts-coach-icon">▤</div>

                  <span
                    className={`ts-crowd-tag ${getCrowdClass(
                      coach.crowd
                    )}`}
                  >
                    {getCrowdLabel(coach.crowd)}
                  </span>
                </div>

                <h3>{coach.name}</h3>
                <p className="ts-muted">{coach.type}</p>

                <div className="ts-crowd-track">
                  <div
                    className={getCrowdClass(coach.crowd)}
                    style={{ width: `${coach.crowd}%` }}
                  />
                </div>

                <div className="ts-crowd-bottom">
                  <span>Sample crowd indicator</span>
                  <strong>{coach.crowd}%</strong>
                </div>
              </article>
            ))}
          </div>

          <section className="ts-crowd-section">
            <div className="ts-section-heading">
              <div>
                <p className="ts-eyebrow">ONBOARD MONITORING</p>
                <h2>Live Train Crowd Monitor</h2>
              </div>

              <span className="ts-count">Prototype</span>
            </div>

            <p className="ts-muted">
              Explore the train crowd visualization below. Any
              displayed crowd readings are simulated unless connected
              to a verified live data source.
            </p>

            <TrainCrowd />
          </section>

          <div className="ts-section-heading">
            <div>
              <p className="ts-eyebrow">WOMEN'S SAFETY</p>
              <h2>Travel preparedness</h2>
            </div>
          </div>

          <div className="ts-safety-grid">
            <article className="ts-card ts-safety-card">
              <div className="ts-safety-icon">◎</div>

              <div>
                <h3>Railway assistance</h3>
                <p>
                  Check official railway assistance options and
                  confirm the current emergency contact details.
                </p>
              </div>

              <span className="ts-status">Verify locally</span>
            </article>

            <article className="ts-card ts-safety-card">
              <div className="ts-safety-icon">⌖</div>

              <div>
                <h3>Station safety</h3>
                <p>
                  Check available help points, staffed areas and
                  station facilities before boarding.
                </p>
              </div>

              <span className="ts-status">Data not connected</span>
            </article>

            <article className="ts-card ts-safety-card">
              <div className="ts-safety-icon">◷</div>

              <div>
                <h3>Crowd awareness</h3>
                <p>
                  Use verified crowd information when available.
                  The coach indicators shown here are sample values.
                </p>
              </div>

              <span className="ts-status">Simulated</span>
            </article>
          </div>

          <footer className="ts-footer">
            RAILSHIELD AI · SAFETY INFORMATION, NOT A GUARANTEE OF SAFETY
          </footer>
        </section>
      )}

      {!train && (
        <section className="ts-crowd-section">
          <div className="ts-section-heading">
            <div>
              <p className="ts-eyebrow">ONBOARD MONITORING</p>
              <h2>Train Crowd Monitor</h2>
            </div>

            <span className="ts-count">Prototype</span>
          </div>

          <p className="ts-muted">
            Explore the crowd monitor while you choose a train.
            Its readings are illustrative unless connected to verified
            live data.
          </p>

          <TrainCrowd />
        </section>
      )}
    </main>
  );
}