
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import "./Station3D.css";

const platforms = [-3.4, 0, 3.4];
const tracks = [-1.7, 1.7];

function MapLabel({ position, children, color = "#eaf4ff" }) {
  return (
    <Html position={position} center distanceFactor={13} sprite>
      <div style={{
        color,
        background: "rgba(8,19,32,0.94)",
        border: "1px solid #38546d",
        padding: "5px 9px",
        borderRadius: 5,
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        boxShadow: "0 3px 12px #0008"
      }}>
        {children}
      </div>
    </Html>
  );
}

function Track({ z }) {
  return (
    <group position={[0, 0, z]}>
      {[ -0.25, 0.25 ].map((offset) => (
        <mesh key={offset} position={[0, 0.035, offset]}>
          <boxGeometry args={[18, 0.07, 0.09]} />
          <meshStandardMaterial
            color="#8998a8"
            metalness={0.8}
            roughness={0.28}
          />
        </mesh>
      ))}

      {Array.from({ length: 55 }, (_, i) => (
        <mesh key={i} position={[-8.7 + i * 0.32, 0, 0]}>
          <boxGeometry args={[0.12, 0.06, 0.85]} />
          <meshStandardMaterial color="#536476" />
        </mesh>
      ))}
    </group>
  );
}

function Platform({ z, number }) {
  return (
    <group position={[0, 0, z]}>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[18, 0.24, 1.35]} />
        <meshStandardMaterial color="#34495c" roughness={0.9} />
      </mesh>

      {/* Yellow tactile safety strip */}
      <mesh position={[0, 0.25, 0.55]}>
        <boxGeometry args={[17.7, 0.025, 0.09]} />
        <meshStandardMaterial color="#e6bd56" />
      </mesh>

      {/* Platform edge markings */}
      {Array.from({ length: 35 }, (_, i) => (
        <mesh key={i} position={[-8.5 + i * 0.5, 0.267, 0.55]}>
          <boxGeometry args={[0.22, 0.012, 0.055]} />
          <meshStandardMaterial color="#fff0b3" />
        </mesh>
      ))}

      <MapLabel position={[-7, 0.8, 0]}>
        PLATFORM {number}
      </MapLabel>

      {/* Canopy roof and supporting columns */}
      {[-4, 0, 4].map((x) => (
        <group key={x} position={[x, 0, -0.12]}>
          <mesh position={[0, 2.05, 0]}>
            <boxGeometry args={[3.1, 0.12, 1.05]} />
            <meshStandardMaterial color="#607b91" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.05, 0]}>
            <boxGeometry args={[0.09, 2.05, 0.09]} />
            <meshStandardMaterial color="#9aabba" metalness={0.45} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.28, 0.06, 0.28]} />
            <meshStandardMaterial color="#788c9f" />
          </mesh>
        </group>
      ))}

      {/* Benches */}
      {[-5, 1, 6].map((x) => (
        <group key={x} position={[x, 0.42, -0.43]}>
          <mesh>
            <boxGeometry args={[0.8, 0.08, 0.25]} />
            <meshStandardMaterial color="#91a6b5" metalness={0.25} />
          </mesh>
          <mesh position={[0, -0.17, 0]}>
            <boxGeometry args={[0.65, 0.32, 0.07]} />
            <meshStandardMaterial color="#526a7d" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Train({ z, x, color = "#19b8ae" }) {
  return (
    <group position={[x, 0.47, z]}>
      {[-2.5, -0.8, 0.9, 2.6].map((offset, i) => (
        <group key={offset} position={[offset, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.55, 0.67, 0.83]} />
            <meshStandardMaterial color={color} metalness={0.22} roughness={0.4} />
          </mesh>

          <mesh position={[0, 0.08, 0.424]}>
            <boxGeometry args={[0.72, 0.25, 0.025]} />
            <meshStandardMaterial color="#bceaff" metalness={0.2} />
          </mesh>

          <mesh position={[0, -0.16, 0]}>
            <boxGeometry args={[1.1, 0.06, 0.88]} />
            <meshStandardMaterial color="#263746" />
          </mesh>

          {[ -0.45, 0.45 ].map((wheel) => (
            <mesh key={wheel} position={[wheel, -0.36, 0.39]}>
              <cylinderGeometry args={[0.13, 0.13, 0.08, 12]} />
              <meshStandardMaterial color="#283746" metalness={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      <MapLabel position={[0, 0.9, 0]}>
        TRAIN · DEMO
      </MapLabel>
    </group>
  );
}

function RiskZone({ position, color, label }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.29, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} depthWrite={false} />
      </mesh>

      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
        />
      </mesh>

      <MapLabel position={[0, 0.95, 0]} color={color}>
        {label}
      </MapLabel>
    </group>
  );
}

function CCTV({ position }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color="#9bafc1" />
      </mesh>
      <mesh position={[0.1, 0.35, 0]}>
        <boxGeometry args={[0.28, 0.13, 0.16]} />
        <meshStandardMaterial color="#27d9ce" metalness={0.5} />
      </mesh>
      <mesh position={[0.25, 0.35, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#d8faff" emissive="#20c9e8" />
      </mesh>
    </group>
  );
}

function StationScene() {
  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 12, 6]} intensity={2.2} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <planeGeometry args={[23, 13]} />
        <meshStandardMaterial color="#172431" roughness={1} />
      </mesh>

      {/* Main station concourse */}
      <mesh position={[-9.3, 0.7, 0]}>
        <boxGeometry args={[2.3, 1.5, 10.5]} />
        <meshStandardMaterial color="#52697d" roughness={0.7} />
      </mesh>

      <mesh position={[-9.3, 1.5, 0]}>
        <boxGeometry args={[2.5, 0.15, 10.7]} />
        <meshStandardMaterial color="#8da0b2" metalness={0.3} />
      </mesh>

      {/* Concourse windows */}
      {[-3.5, -1.2, 1.2, 3.5].map((z) => (
        <mesh key={z} position={[-8.12, 0.85, z]}>
          <boxGeometry args={[0.025, 0.65, 1.2]} />
          <meshStandardMaterial color="#9fe8f2" metalness={0.4} />
        </mesh>
      ))}

      <MapLabel position={[-9.2, 2.1, 0]}>
        STATION CONCOURSE
      </MapLabel>

      {/* Platform islands */}
      {platforms.map((z, i) => (
        <Platform key={z} z={z} number={i + 1} />
      ))}

      {/* Three railway tracks */}
      {[-1.7, 1.7].map((z) => (
        <Track key={z} z={z} />
      ))}

      {/* Train on a track */}
      <Train z={1.7} x={1.5} />

      {/* Simulated crowd and safety heat zones */}
      <RiskZone
        position={[-4, 0, 0]}
        color="#ffb547"
        label="CROWD · MEDIUM"
      />
      <RiskZone
        position={[5, 0, -3.4]}
        color="#ff526f"
        label="RISK · HIGH"
      />
      <RiskZone
        position={[5, 0, 3.4]}
        color="#25d6a0"
        label="HELP POINT"
      />

      {/* CCTV monitoring locations */}
      <CCTV position={[-2, 0.8, -3.4]} />
      <CCTV position={[3, 0.8, 3.4]} />

      <MapLabel position={[-1, 0.9, -4.5]} color="#44e6d1">
        CCTV
      </MapLabel>

      <MapLabel position={[3, 0.9, 4.2]} color="#44e6d1">
        CCTV
      </MapLabel>
    </>
  );
}

export default function Station3D() {
  return (
    <section className="station3d-panel">
      <div className="station3d-heading">
        <div>
          <p className="eyebrow">SPATIAL SAFETY INTELLIGENCE</p>
          <h2>3D Railway Station Map</h2>
          <p>Platforms · Tracks · Train · Safety zones</p>
        </div>
        <span className="demo-pill">3D DEMO</span>
      </div>

      <div className="station3d-canvas">
        <Canvas
          camera={{ position: [0, 17, 13], fov: 42 }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#0b1522"]} />
          <StationScene />
          <OrbitControls
            target={[0, 0.5, 0]}
            enablePan
            enableZoom
            minDistance={9}
            maxDistance={26}
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>
      </div>

      <div className="station3d-legend">
        <span><i className="legend-low" /> Help point / lower simulated risk</span>
        <span><i className="legend-high" /> Higher simulated risk</span>
      </div>

      <p className="crowd-disclaimer">
        Concept station layout. Crowd zones, CCTV positions and risk indicators
        are illustrative, not verified live station data.
      </p>
    </section>
  );
}
