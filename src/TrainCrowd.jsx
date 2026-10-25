
import { useState } from "react";
import { Users, ShieldAlert, ShieldCheck, TrainFront } from "lucide-react";
import "./TrainCrowd.css";

const initialCoaches = [
  { name: "E1", crowd: 28 },
  { name: "E2", crowd: 46 },
  { name: "E3", crowd: 72 },
  { name: "E4", crowd: 91 },
  { name: "E5", crowd: 57 },
  { name: "E6", crowd: 35 },
];

export default function TrainCrowd() {
  const [coaches, setCoaches] = useState(initialCoaches);

  function simulateCrowd() {
    setCoaches((previous) =>
      previous.map((coach) => ({
        ...coach,
        crowd: Math.max(
          5,
          Math.min(100, coach.crowd + Math.floor(Math.random() * 31) - 15)
        ),
      }))
    );
  }

 
const average = Math.round(
  coaches.reduce((total, coach) => total + coach.crowd, 0) /
    coaches.length
);

const crowdedCoaches = coaches.filter(
  (coach) => coach.crowd >= 70
).length;

const safetyRisk = Math.min(
  100,
  Math.round(average * 0.7 + crowdedCoaches * 5)
);

function getLevel(crowd) {
  if (crowd >= 70) return "high";
  if (crowd >= 40) return "medium";
  return "low";
}


  return (
    <section className="train-crowd-panel">
      <div className="crowd-heading">
        <div>
          <p className="eyebrow">WOMEN'S JOURNEY INTELLIGENCE</p>
          <h2>Train Crowd Monitor</h2>
          <p className="crowd-subtitle">
            Carriage-by-carriage crowd simulation
          </p>
        </div>
        <span className="demo-pill">DEMO SIMULATION</span>
      </div>
      
<div className="train-risk-banner">
  <div>
    <span>SIMULATED TRAIN CROWD RISK</span>
    <p>Based on estimated coach crowd levels</p>
  </div>
  <strong>
    {safetyRisk}<small>/100</small>
  </strong>
</div>


      <div className="crowd-summary">
        <div className="crowd-stat">
          <Users size={19} />
          <span>Average crowd</span>
          <strong>{average}%</strong>
        </div>
        <div className="crowd-stat">
          {crowdedCoaches > 0 ? (
            <ShieldAlert size={19} />
          ) : (
            <ShieldCheck size={19} />
          )}
          <span>High-crowd coaches</span>
          <strong>{crowdedCoaches} / {coaches.length}</strong>
        </div>
      </div>

      <div className="train-visual">
        <div className="train-label">
          <TrainFront size={20} />
          <span>TRAIN COACHES</span>
          <span className="train-direction">FRONT → REAR</span>
        </div>

        <div className="coach-track">
          {coaches.map((coach) => (
            <button
              key={coach.name}
              className={`coach coach-${getLevel(coach.crowd)}`}
              onClick={() =>
                setCoaches((previous) =>
                  previous.map((item) =>
                    item.name === coach.name
                      ? {
                          ...item,
                          crowd: Math.min(100, item.crowd + 5),
                        }
                      : item
                  )
                )
              }
              title="Select coach to simulate a small crowd increase"
            >
              <span className="coach-window">
                {Array.from({ length: 3 }).map((_, i) => (
                  <i key={i} />
                ))}
              </span>
              <strong>{coach.name}</strong>
              <span className="coach-percentage">{coach.crowd}%</span>
              <span className="coach-level">
                {getLevel(coach.crowd).toUpperCase()}
              </span>
            </button>
          ))}
        </div>
        <div className="train-rails">
          <i />
          <i />
        </div>
      </div>

      <div className="crowd-legend">
        <span><i className="legend-low" /> Lower crowd: 0–39%</span>
        <span><i className="legend-medium" /> Moderate: 40–69%</span>
        <span><i className="legend-high" /> High crowd: 70–100%</span>
      </div>

      <div className="crowd-warning">
        <ShieldAlert size={20} />
        <div>
          <strong>
            {crowdedCoaches > 0
              ? `${crowdedCoaches} coach(es) need attention`
              : "No high-crowd coaches in this simulation"}
          </strong>
          <p>
            {crowdedCoaches > 0
              ? "Consider checking a less crowded coach where safe and accessible."
              : "Continue monitoring conditions during the journey."}
          </p>
        </div>
      </div>

      <button className="simulate-button" onClick={simulateCrowd}>
        Simulate crowd update ↻
      </button>

      <p className="crowd-disclaimer">
        Illustrative data only — not connected to live train sensors or
        verified passenger counts. Crowd level alone does not establish whether
        a coach is safe.
      </p>
    </section>
  );
}
