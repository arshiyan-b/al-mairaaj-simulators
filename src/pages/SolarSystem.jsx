import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Ring, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pause, Play, RotateCcw } from "lucide-react";
import * as THREE from "three";

// Distances and sizes are stylized (not to true astronomical scale - at
// real scale the planets would be invisible specks kilometers apart) but
// keep the correct relative order and rough proportions.
const PLANETS = [
  {
    name: "Mercury",
    color: "#9c9c9c",
    size: 0.38,
    distance: 4,
    speed: 4.15,
    tilt: 0.03,
    fact: "The smallest planet and closest to the Sun. A year on Mercury is just 88 Earth days.",
  },
  {
    name: "Venus",
    color: "#e8c39e",
    size: 0.7,
    distance: 5.6,
    speed: 1.62,
    tilt: 3.1,
    fact: "The hottest planet due to a runaway greenhouse effect, even hotter than Mercury.",
  },
  {
    name: "Earth",
    color: "#2a6fdb",
    size: 0.75,
    distance: 7.2,
    speed: 1,
    tilt: 0.41,
    fact: "The only known planet with life, thanks to liquid water and a protective atmosphere.",
  },
  {
    name: "Mars",
    color: "#c1440e",
    size: 0.5,
    distance: 9,
    speed: 0.53,
    tilt: 0.44,
    fact: "The Red Planet, named for its iron oxide dust. Home to the largest volcano in the solar system.",
  },
  {
    name: "Jupiter",
    color: "#d8a35c",
    size: 1.9,
    distance: 12.5,
    speed: 0.084,
    tilt: 0.05,
    fact: "The largest planet - a gas giant more massive than all other planets combined.",
  },
  {
    name: "Saturn",
    color: "#e3c07b",
    size: 1.65,
    distance: 16,
    speed: 0.034,
    tilt: 0.47,
    fact: "Famous for its spectacular ring system, made mostly of ice and rock particles.",
    hasRings: true,
  },
  {
    name: "Uranus",
    color: "#a6e3e0",
    size: 1.1,
    distance: 19,
    speed: 0.012,
    tilt: 1.71,
    fact: "Rotates on its side, likely from a massive collision early in its history.",
  },
  {
    name: "Neptune",
    color: "#3454c4",
    size: 1.05,
    distance: 22,
    speed: 0.006,
    tilt: 0.49,
    fact: "The windiest planet, with storms reaching over 2,000 km/h. Takes 165 years to orbit the Sun.",
  },
];

function Sun() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshBasicMaterial color="#ffd166" />
      </mesh>
      <pointLight color="#fff4d6" intensity={3.5} distance={80} decay={1.2} />
    </group>
  );
}

function OrbitLine({ radius }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#2a3a42" transparent opacity={0.5} />
    </line>
  );
}

function Planet({ planet, speedMultiplier, paused, onSelect, isSelected }) {
  const orbitRef = useRef();
  const spinRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (paused) return;
    angleRef.current += delta * planet.speed * speedMultiplier;
    if (orbitRef.current) {
      orbitRef.current.position.x = Math.cos(angleRef.current) * planet.distance;
      orbitRef.current.position.z = Math.sin(angleRef.current) * planet.distance;
    }
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={spinRef}
        rotation={[planet.tilt, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(planet);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={isSelected ? planet.color : "#000000"}
          emissiveIntensity={isSelected ? 0.4 : 0}
          roughness={0.7}
        />

        {planet.hasRings && (
          <Ring args={[planet.size * 1.4, planet.size * 2.2, 64]} rotation={[Math.PI / 2.1, 0, 0]}>
            <meshBasicMaterial color="#cbb38a" side={THREE.DoubleSide} transparent opacity={0.7} />
          </Ring>
        )}

        {isSelected && (
          <mesh>
            <ringGeometry args={[planet.size * 1.6, planet.size * 1.75, 48]} />
            <meshBasicMaterial color="#14b8a6" side={THREE.DoubleSide} transparent opacity={0.85} />
          </mesh>
        )}
      </mesh>

      <Html distanceFactor={22} position={[0, planet.size + 0.6, 0]} occlude={false}>
        <div className="pointer-events-none select-none whitespace-nowrap font-mono text-[10px] tracking-wide text-white/70">
          {planet.name}
        </div>
      </Html>
    </group>
  );
}

function Scene({ speedMultiplier, paused, selected, onSelect }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Stars radius={120} depth={50} count={3500} factor={3} saturation={0} fade speed={0.5} />
      <Sun />
      {PLANETS.map((planet) => (
        <React.Fragment key={planet.name}>
          <OrbitLine radius={planet.distance} />
          <Planet
            planet={planet}
            speedMultiplier={speedMultiplier}
            paused={paused}
            onSelect={onSelect}
            isSelected={selected?.name === planet.name}
          />
        </React.Fragment>
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={60}
        autoRotate={false}
        makeDefault
      />
    </>
  );
}

function DetailPanel({ planet, onClose }) {
  if (!planet) return null;

  return (
    <motion.div
      className="absolute right-4 top-4 z-20 w-72 rounded-2xl border border-slate-700 bg-slate-900/90 p-5 backdrop-blur-md sm:right-6 sm:top-6"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-slate-400 transition hover:rotate-90 hover:text-white"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="mb-3 flex items-center gap-3">
        <span className="h-4 w-4 flex-shrink-0 rounded-full" style={{ backgroundColor: planet.color }} />
        <h2 className="text-lg font-bold text-white">{planet.name}</h2>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{planet.fact}</p>
    </motion.div>
  );
}

export default function SolarSystem() {
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="pointer-events-none absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <div className="font-mono text-xs tracking-wide text-teal-400">AL MAIRAAJ &middot; SIMULATORS</div>
        <h1 className="mt-1 text-xl font-bold text-white">Solar System</h1>
        <p className="mt-1 max-w-xs text-xs text-slate-400">
          Drag to orbit &middot; scroll to zoom &middot; click a planet for details
        </p>
      </div>

      <div className="absolute bottom-5 left-4 z-20 flex items-center gap-2 sm:left-6">
        <button
          onClick={() => setPaused((p) => !p)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-slate-800"
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {paused ? "Play" : "Pause"}
        </button>

        <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 backdrop-blur-md">
          {[0.25, 1, 4].map((mult) => (
            <button
              key={mult}
              onClick={() => setSpeedMultiplier(mult)}
              className={`rounded px-2 py-0.5 font-mono text-[11px] transition ${
                speedMultiplier === mult ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {mult}x
            </button>
          ))}
        </div>
      </div>

      <Canvas camera={{ position: [0, 14, 26], fov: 50 }}>
        <Scene speedMultiplier={speedMultiplier} paused={paused} selected={selected} onSelect={setSelected} />
      </Canvas>

      <AnimatePresence>
        {selected && <DetailPanel planet={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}