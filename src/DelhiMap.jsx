import { useState } from "react";
import "./DelhiMap.css";

const platforms = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  y: 95 + i * 31,
}));

const facilities = [
  { id: "c1", x: 390, y: 145, type: "cctv", label: "Demo CCTV" },
  { id: "l1", x: 610, y: 205, type: "light", label: "Demo lighting" },
  { id: "h1", x: 535, y: 330, type: "help", label: "Demo help point" },
  { id: "r1", x: 320, y: 460, type: "rpf", label: "Demo RPF point" },
  { id: "c2", x: 740, y: 410, type: "cctv", label: "Demo CCTV" },
  { id: "w1", x: 680, y: 290, type: "crowd", label: "Demo crowd caution" },
];

const startOptions = [
  { value: "entrance", label: "Main entrance", x: 145, y: 350 },
  { value: "p1", label: "Platform 1", x: 350, y: 119 },
  { value: "p4", label: "Platform 4", x: 350, y: 212 },
  { value: "p8", label: "Platform 8", x: 350, y: 336 },
  { value: "p12", label: "Platform 12", x: 350, y: 460 },
  { value: "p16", label: "Platform 16", x: 350, y: 584 },
];

const COLORS = {
  cctv: "#b59aff",
  light: "#ffd166",
  help: "#b59aff",
  rpf: "#b59aff",
  crowd: "#ff5c69",
};

export default function DelhiMap() {
  const [start, setStart] = useState("entrance");
  const [destination, setDestination] = useState("p8");

  const [showCctv, setShowCctv] = useState(true);
  const [showLighting, setShowLighting] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  const [showCrowd, setShowCrowd] = useState(true);
  const [showTrains, setShowTrains] = useState(true);
  const [showRoute, setShowRoute] = useState(true);

  const [notice, setNotice] = useState(
    "Select a platform to draw a route across the station plan."
  );

  const destinationNumber = Number(destination.replace("p", ""));

  const dest = platforms.find((p) => p.id === destinationNumber);

  const startPoint = startOptions.find((p) => p.value === start);

  const routeInstructions = [
    {
      title: `Start at ${startPoint.label}`,
      detail: "Begin at your selected starting point.",
      icon: "📍",
    },
    {
      title: "Continue through the connecting walkway",
      detail: "Follow the highlighted green demo route.",
      icon: "➡️",
    },
    {
      title: "Proceed toward the platform access",
      detail: "Continue toward your selected platform area.",
      icon: "↗️",
    },
    {
      title: `Arrive at Platform ${destinationNumber}`,
      detail: "You have reached your selected demo destination.",
      icon: "🏁",
    },
  ];

  // Illustrative route only, not surveyed indoor navigation.
  const routePoints =
    start === "entrance"
      ? `145,350 240,350 285,350 320,350 350,${dest.y} 860,${dest.y - 20}`
      : `${startPoint.x},${startPoint.y} 285,${startPoint.y} 320,${startPoint.y} 350,${dest.y} 860,${dest.y - 20}`;

  const visibleFacilities = facilities.filter((f) => {
    if (f.type === "cctv") return showCctv;
    if (f.type === "light") return showLighting;
    if (f.type === "help" || f.type === "rpf") return showHelp;
    if (f.type === "crowd") return showCrowd;
    return true;
  });

  function requestLocation() {
    if (!navigator.geolocation) {
      setNotice("GPS is unavailable. Choose a starting point manually.");
      return;
    }

    setNotice("Requesting location permission…");

    navigator.geolocation.getCurrentPosition(
      () => {
        setNotice(
          "GPS received. Select your platform manually; outdoor GPS cannot reliably identify your indoor platform."
        );
      },
      () => {
        setNotice(
          "Location unavailable or permission denied. Select your starting point manually."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  function selectPlatform(id) {
    setDestination(`p${id}`);
    setShowRoute(true);

    setNotice(
      `Platform ${id} selected. The green line shows an illustrative route on the station plan.`
    );
  }

  function buildRoute() {
    setShowRoute(true);

    setNotice(
      `Showing demo route from ${startPoint.label} to Platform ${destinationNumber}.`
    );
  }

  return (
    <section className="rs-station-card">
      <header className="rs-station-header">
        <div>
          <div className="rs-station-eyebrow">
            RAILSHIELD AI / ARCHITECTURAL SAFETY MAP
          </div>

          <h2>New Delhi Railway Station</h2>

          <p>NDLS · Interactive station-plan prototype</p>
        </div>

        <button
          type="button"
          className="rs-location-button"
          onClick={requestLocation}
        >
          ◎ Locate me
        </button>
      </header>

      <div className="rs-demo-warning">
        <strong>Illustrative layout:</strong> This is a schematic concept,
        not a verified New Delhi station floor plan. Safety markers and
        routes are demo data.
      </div>

      <div className="rs-station-controls">
        <label>
          Starting point

          <select
            value={start}
            onChange={(e) => setStart(e.target.value)}
          >
            {startOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Destination

          <select
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowRoute(true);
            }}
          >
            {platforms.map((p) => (
              <option key={p.id} value={`p${p.id}`}>
                Platform {p.id}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="rs-route-button"
          onClick={buildRoute}
        >
          Show route
        </button>
      </div>

      <div className="rs-layer-panel">
        {[
          ["CCTV", showCctv, setShowCctv, "#b59aff"],
          ["Lighting", showLighting, setShowLighting, "#ffd166"],
          ["Help / RPF", showHelp, setShowHelp, "#b59aff"],
          ["Crowd risk", showCrowd, setShowCrowd, "#ff5c69"],
          ["Trains", showTrains, setShowTrains, "#38a9ff"],
          ["Route", showRoute, setShowRoute, "#19d39a"],
        ].map(([label, checked, setter, color]) => (
          <label className="rs-layer-chip" key={label}>
            <span
              className="rs-layer-dot"
              style={{ background: color }}
            />

            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setter(e.target.checked)}
            />

            {label}
          </label>
        ))}
      </div>

      <div className="rs-schematic-wrap">
        <svg
          className="rs-station-svg rs-architecture"
          viewBox="0 0 1000 700"
          role="img"
          aria-label="Interactive architectural-style railway station schematic"
        >
          <defs>
            <pattern
              id="rsGroundGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 0H0V20"
                fill="none"
                stroke="#293b4d"
                strokeWidth=".6"
              />
            </pattern>

            <pattern
              id="rsBuildingFloor"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 12L12 0"
                stroke="#465b70"
                strokeWidth=".7"
              />
            </pattern>

            <marker
              id="rsRouteArrow"
              markerWidth="8"
              markerHeight="8"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#19d39a" />
            </marker>
          </defs>

          <rect width="1000" height="700" rx="12" fill="#101b29" />

          <rect
            width="1000"
            height="700"
            fill="url(#rsGroundGrid)"
          />

          <text x="25" y="28" className="rs-svg-small">
            RAILSHIELD / STATION PLAN
          </text>

          {/* Main station building */}
          <rect
            x="35"
            y="65"
            width="235"
            height="565"
            rx="8"
            fill="#22364a"
            stroke="#8ba0b5"
            strokeWidth="2"
          />

          <rect
            x="48"
            y="78"
            width="209"
            height="539"
            rx="5"
            fill="url(#rsBuildingFloor)"
            stroke="#526a81"
          />

          <rect
            x="65"
            y="100"
            width="175"
            height="75"
            rx="4"
            fill="#304b61"
            stroke="#91a6ba"
          />

          <text
            x="152"
            y="126"
            textAnchor="middle"
            className="rs-svg-label"
          >
            TICKET / ENTRY
          </text>

          <text
            x="152"
            y="145"
            textAnchor="middle"
            className="rs-svg-small"
          >
            MAIN HALL
          </text>

          <path d="M83 157H222" stroke="#8297aa" strokeWidth="2" />

          <rect
            x="65"
            y="194"
            width="175"
            height="215"
            rx="4"
            fill="#1a2b3c"
            stroke="#688096"
          />

          <text
            x="152"
            y="220"
            textAnchor="middle"
            className="rs-svg-label"
          >
            CENTRAL CONCOURSE
          </text>

          {/* Concourse floor divisions */}
          {[0, 1, 2, 3, 4].map((n) => (
            <path
              key={n}
              d={`M78 ${242 + n * 27}H227`}
              stroke="#40586d"
              strokeWidth="1"
            />
          ))}

          <rect
            x="82"
            y="257"
            width="48"
            height="54"
            rx="3"
            fill="#314a60"
            stroke="#8196a9"
          />

          <text
            x="106"
            y="280"
            textAnchor="middle"
            className="rs-svg-small"
          >
            INFO
          </text>

          <text
            x="106"
            y="294"
            textAnchor="middle"
            className="rs-svg-small"
          >
            DESK
          </text>

          <rect
            x="145"
            y="257"
            width="77"
            height="54"
            rx="3"
            fill="#314a60"
            stroke="#8196a9"
          />

          <text
            x="183"
            y="280"
            textAnchor="middle"
            className="rs-svg-small"
          >
            WAITING
          </text>

          <text
            x="183"
            y="294"
            textAnchor="middle"
            className="rs-svg-small"
          >
            AREA
          </text>

          <rect
            x="82"
            y="330"
            width="140"
            height="50"
            rx="3"
            fill="#314a60"
            stroke="#8196a9"
          />

          <text
            x="152"
            y="351"
            textAnchor="middle"
            className="rs-svg-small"
          >
            PASSENGER
          </text>

          <text
            x="152"
            y="365"
            textAnchor="middle"
            className="rs-svg-small"
          >
            CIRCULATION
          </text>

          <rect
            x="65"
            y="430"
            width="175"
            height="75"
            rx="4"
            fill="#304b61"
            stroke="#91a6ba"
          />

          <text
            x="152"
            y="458"
            textAnchor="middle"
            className="rs-svg-label"
          >
            EXIT / DROP-OFF
          </text>

          <text
            x="152"
            y="477"
            textAnchor="middle"
            className="rs-svg-small"
          >
            STATION FORECOURT
          </text>

          <rect
            x="65"
            y="527"
            width="175"
            height="70"
            rx="4"
            fill="#1b2b3b"
            stroke="#617a91"
          />

          <text
            x="152"
            y="552"
            textAnchor="middle"
            className="rs-svg-small"
          >
            CONNECTING
          </text>

          <text
            x="152"
            y="568"
            textAnchor="middle"
            className="rs-svg-small"
          >
            WALKWAY
          </text>

          {/* Walkway from concourse to platforms */}
          <path
            d="M240 350 L320 350"
            stroke="#627d92"
            strokeWidth="24"
          />

          <path
            d="M240 350 L320 350"
            stroke="#b4c4d2"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          <text
            x="280"
            y="331"
            textAnchor="middle"
            className="rs-svg-small"
          >
            WALKWAY
          </text>

          {/* Platforms and tracks */}
          {platforms.map((p) => {
            const y = p.y;
            const selected = p.id === destinationNumber;

            return (
              <g
                key={p.id}
                className="rs-platform-group"
                onClick={() => selectPlatform(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectPlatform(p.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select Platform ${p.id}`}
                style={{ cursor: "pointer" }}
              >
                {/* Track bed */}
                <polygon
                  points={`315,${y + 15} 865,${y - 25} 887,${y - 12} 337,${y + 28}`}
                  fill="#172330"
                  stroke="#506174"
                  strokeWidth="1"
                />

                {/* Rails */}
                <path
                  d={`M320 ${y + 19} L876 ${y - 21}`}
                  stroke="#8b9aa8"
                  strokeWidth="2"
                />

                <path
                  d={`M324 ${y + 25} L880 ${y - 15}`}
                  stroke="#53677a"
                  strokeWidth="2"
                />

                {/* Platform island */}
                <polygon
                  points={`315,${y - 5} 845,${y - 43} 865,${y - 25} 335,${y + 13}`}
                  fill={selected ? "#245b4d" : "#2b3d4f"}
                  stroke={selected ? "#19d39a" : "#71859a"}
                  strokeWidth={selected ? "2.5" : "1.2"}
                />

                {/* Platform safety edge */}
                <path
                  d={`M319 ${y - 2} L849 ${y - 40}`}
                  stroke="#ffd166"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />

                {/* Platform number */}
                <g transform={`translate(345 ${y - 10})`}>
                  <rect
                    x="-16"
                    y="-12"
                    width="32"
                    height="23"
                    rx="3"
                    fill={selected ? "#19d39a" : "#dce7f0"}
                  />

                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="900"
                    fill="#102030"
                  >
                    {p.id}
                  </text>
                </g>

                <text
                  x="375"
                  y={y - 12}
                  className="rs-platform-name"
                >
                  PLATFORM {p.id}
                </text>

                {selected && (
                  <polygon
                    points={`315,${y - 5} 845,${y - 43} 865,${y - 25} 335,${y + 13}`}
                    fill="#19d39a"
                    opacity=".10"
                    pointerEvents="none"
                  />
                )}
              </g>
            );
          })}

          {/* Passenger footbridge */}
          <polygon
            points="475,65 515,62 557,620 517,623"
            fill="#344e65"
            stroke="#b0c2d1"
            strokeWidth="2"
          />

          <path
            d="M492 70 L534 615"
            stroke="#c3d0dc"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          <text
            x="518"
            y="65"
            transform="rotate(85 518 65)"
            className="rs-svg-small"
          >
            PASSENGER FOOTBRIDGE
          </text>

          {/* Footbridge stair access */}
          {platforms.map((p) => (
            <g key={`stairs-${p.id}`}>
              <path
                d={`M${490 + (p.y - 95) * 0.075} ${p.y - 4}
                    l17 -8 l4 8 l-17 8 z`}
                fill="#9aafc1"
                stroke="#d0dbe4"
                strokeWidth="1"
              />

              <path
                d={`M${494 + (p.y - 95) * 0.075} ${p.y - 4} l8 -4
                    M${497 + (p.y - 95) * 0.075} ${p.y - 1} l8 -4`}
                stroke="#243647"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Demo trains */}
          {showTrains &&
            [2, 5, 8, 11, 14].map((id) => {
              const p = platforms.find((x) => x.id === id);
              const y = p.y - 18;

              return (
                <g
                  key={`train-${id}`}
                  transform={`translate(610 ${y}) rotate(-4)`}
                >
                  <rect
                    x="0"
                    y="-7"
                    width="205"
                    height="14"
                    rx="4"
                    fill="#1878b9"
                    stroke="#8bd6ff"
                    strokeWidth="1.3"
                  />

                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                    <rect
                      key={n}
                      x={12 + n * 26}
                      y="-4"
                      width="17"
                      height="6"
                      rx="1"
                      fill="#c2edff"
                    />
                  ))}

                  <rect
                    x="192"
                    y="-5"
                    width="7"
                    height="10"
                    rx="1"
                    fill="#ffd166"
                  />
                </g>
              );
            })}

          {/* Demo route */}
          {showRoute && (
            <g className="rs-route-drawing">
              <polyline
                points={routePoints}
                fill="none"
                stroke="#0c302b"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <polyline
                points={routePoints}
                fill="none"
                stroke="#19d39a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="12 8"
                markerMid="url(#rsRouteArrow)"
                markerEnd="url(#rsRouteArrow)"
              />

              <circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="10"
                fill="#38a9ff"
                stroke="#fff"
                strokeWidth="3"
              />

              <text
                x={startPoint.x + 14}
                y={startPoint.y - 14}
                className="rs-svg-label"
              >
                START
              </text>

              <circle
                cx="850"
                cy={dest.y - 26}
                r="10"
                fill="#19d39a"
                stroke="#fff"
                strokeWidth="3"
              />

              <text
                x="845"
                y={dest.y - 47}
                textAnchor="end"
                className="rs-svg-label"
              >
                PLATFORM {destinationNumber}
              </text>
            </g>
          )}

          {/* Toggleable demo safety markers */}
          {visibleFacilities.map((f) => (
            <g key={f.id} className="rs-facility-marker">
              <circle
                cx={f.x}
                cy={f.y}
                r="13"
                fill={COLORS[f.type]}
                stroke="#fff"
                strokeWidth="2"
              />

              <text
                x={f.x}
                y={f.y + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill="#101b29"
              >
                {{
                  cctv: "C",
                  light: "L",
                  help: "H",
                  rpf: "R",
                  crowd: "!",
                }[f.type]}
              </text>

              <title>{f.label} — illustrative demo marker</title>
            </g>
          ))}

          <text x="35" y="665" className="rs-svg-small">
            ENTRANCE / CONCOURSE SIDE
          </text>

          <text
            x="965"
            y="665"
            textAnchor="end"
            className="rs-svg-small"
          >
            PLATFORM END
          </text>
        </svg>
      </div>

      {/* Map legend */}
      <div className="rs-map-legend">
        <span>
          <i
            className="rs-legend-dot"
            style={{ background: "#19d39a" }}
          />
          Demo route
        </span>

        <span>
          <i
            className="rs-legend-dot"
            style={{ background: "#38a9ff" }}
          />
          Starting point
        </span>

        <span>
          <i
            className="rs-legend-dot"
            style={{ background: "#b59aff" }}
          />
          CCTV / help / RPF
        </span>

        <span>
          <i
            className="rs-legend-dot"
            style={{ background: "#ffd166" }}
          />
          Platform edge / caution
        </span>

        <span>
          <i
            className="rs-legend-dot"
            style={{ background: "#ff5c69" }}
          />
          Crowd-risk demo
        </span>
      </div>

      {/* Route directions */}
      <div className="rs-directions">
        <div className="rs-directions-heading">
          <div>
            <p>YOUR ROUTE</p>

            <h3>
              {startPoint.label} → Platform {destinationNumber}
            </h3>
          </div>

          <span className="rs-route-badge">DEMO ROUTE</span>
        </div>

        <div className="rs-route-summary">
          <span>🟢 Route generated</span>
          <span>📍 {routeInstructions.length} steps</span>
          <span>🛡️ Demo safety markers</span>
        </div>

        <div className="rs-turn-list">
          {routeInstructions.map((step, index) => (
            <div className="rs-turn-step" key={step.title}>
              <div className="rs-turn-icon">{step.icon}</div>

              <div className="rs-turn-content">
                <span className="rs-turn-number">
                  STEP {index + 1}
                </span>

                <h4>{step.title}</h4>

                <p>{step.detail}</p>
              </div>

              {index < routeInstructions.length - 1 && (
                <span
                  className="rs-turn-connector"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <p className="rs-route-status">{notice}</p>

        <p className="rs-route-disclaimer">
          Demo navigation only. Directions and safety markers are
          illustrative, not verified indoor station navigation.
        </p>
      </div>
    </section>
  );
}