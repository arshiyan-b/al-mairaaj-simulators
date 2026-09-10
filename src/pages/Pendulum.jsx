import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const GRAVITY_PRESETS = [
  { label: "Earth", value: 9.8 },
  { label: "Moon", value: 1.6 },
  { label: "Mars", value: 3.7 },
];

const PIVOT = { x: 250, y: 40 };
const PX_PER_METER = 90;
const DAMPING = 0.06;

export default function Pendulum() {
  const [length, setLength] = useState(1.5); // meters
  const [gravity, setGravity] = useState(9.8);
  const [startAngleDeg, setStartAngleDeg] = useState(35);
  const [running, setRunning] = useState(false);

  // Live simulation state, kept in a ref so the animation loop doesn't
  // fight with React's render cycle - only committed to state for display
  // a few times a second.
  const sim = useRef({ theta: (35 * Math.PI) / 180, omega: 0 });
  const [display, setDisplay] = useState({ theta: sim.current.theta, omega: 0, time: 0, swings: 0 });
  const frameRef = useRef();
  const lastSwingSign = useRef(0);
  const swingCountRef = useRef(0);
  const timeRef = useRef(0);

  const reset = useCallback(() => {
    setRunning(false);
    cancelAnimationFrame(frameRef.current);
    sim.current = { theta: (startAngleDeg * Math.PI) / 180, omega: 0 };
    timeRef.current = 0;
    swingCountRef.current = 0;
    lastSwingSign.current = Math.sign(sim.current.theta) || 1;
    setDisplay({ theta: sim.current.theta, omega: 0, time: 0, swings: 0 });
  }, [startAngleDeg]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAngleDeg, length, gravity]);

  useEffect(() => {
    if (!running) return;

    let last = performance.now();

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;

      // Semi-implicit Euler integration of the real pendulum equation
      // theta'' = -(g/L) sin(theta) - damping * theta'
      const { theta, omega } = sim.current;
      const angularAccel = -(gravity / length) * Math.sin(theta) - DAMPING * omega;
      const newOmega = omega + angularAccel * dt;
      const newTheta = theta + newOmega * dt;

      sim.current = { theta: newTheta, omega: newOmega };
      timeRef.current += dt;

      const sign = Math.sign(newTheta);
      if (sign !== 0 && sign !== lastSwingSign.current) {
        swingCountRef.current += 1;
        lastSwingSign.current = sign;
      }

      setDisplay({ theta: newTheta, omega: newOmega, time: timeRef.current, swings: swingCountRef.current });

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, gravity, length]);

  const bobX = PIVOT.x + Math.sin(display.theta) * length * PX_PER_METER;
  const bobY = PIVOT.y + Math.cos(display.theta) * length * PX_PER_METER;
  const theoreticalPeriod = 2 * Math.PI * Math.sqrt(length / gravity);

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-slate-900 px-4 py-6 sm:px-8">
      <div className="mb-2 w-full max-w-3xl">
        <div className="font-mono text-xs tracking-wide text-teal-400">AL MAIRAAJ &middot; SIMULATORS</div>
        <h1 className="mt-1 text-2xl font-bold text-white">Pendulum</h1>
        <p className="mt-1 text-xs text-slate-400">
          Adjust length and gravity, then watch a real physics simulation of the swing
        </p>
      </div>

      <div className="grid w-full max-w-3xl flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        {/* Visualization */}
        <div className="flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
          <svg viewBox="0 0 500 380" className="h-full w-full max-w-lg">
            {/* ceiling mount */}
            <rect x={PIVOT.x - 40} y={PIVOT.y - 14} width="80" height="14" fill="#2a343b" rx="2" />
            <circle cx={PIVOT.x} cy={PIVOT.y} r="5" fill="#8fa1a8" />

            {/* arc guide showing max swing range */}
            <path
              d={`M ${PIVOT.x - Math.sin((startAngleDeg * Math.PI) / 180) * length * PX_PER_METER} ${
                PIVOT.y + Math.cos((startAngleDeg * Math.PI) / 180) * length * PX_PER_METER
              } A ${length * PX_PER_METER} ${length * PX_PER_METER} 0 0 1 ${
                PIVOT.x + Math.sin((startAngleDeg * Math.PI) / 180) * length * PX_PER_METER
              } ${PIVOT.y + Math.cos((startAngleDeg * Math.PI) / 180) * length * PX_PER_METER}`}
              fill="none"
              stroke="#2a343b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* string */}
            <line x1={PIVOT.x} y1={PIVOT.y} x2={bobX} y2={bobY} stroke="#8fa1a8" strokeWidth="2" />

            {/* bob */}
            <circle cx={bobX} cy={bobY} r="18" fill="#14b8a6" />
            <circle cx={bobX} cy={bobY} r="18" fill="none" stroke="#5eead4" strokeWidth="2" opacity="0.5" />
          </svg>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
          <div>
            <div className="mb-1 flex justify-between font-mono text-[11px] text-slate-400">
              <span>LENGTH</span>
              <span>{length.toFixed(2)} m</span>
            </div>
            <input
              type="range" min="0.5" max="2.5" step="0.05"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="w-full accent-teal-500"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between font-mono text-[11px] text-slate-400">
              <span>GRAVITY</span>
              <span>{gravity.toFixed(1)} m/s&sup2;</span>
            </div>
            <input
              type="range" min="1" max="25" step="0.1"
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              className="w-full accent-teal-500"
            />
            <div className="mt-2 flex gap-1.5">
              {GRAVITY_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setGravity(p.value)}
                  className={`flex-1 rounded px-2 py-1 font-mono text-[10px] transition ${
                    Math.abs(gravity - p.value) < 0.05
                      ? "bg-teal-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between font-mono text-[11px] text-slate-400">
              <span>START ANGLE</span>
              <span>{startAngleDeg}&deg;</span>
            </div>
            <input
              type="range" min="5" max="80" step="1"
              value={startAngleDeg}
              disabled={running}
              onChange={(e) => setStartAngleDeg(parseFloat(e.target.value))}
              className="w-full accent-teal-500 disabled:opacity-40"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setRunning((r) => !r)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-500"
            >
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={reset}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-1 space-y-1.5 border-t border-slate-800 pt-3 font-mono text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Theoretical period</span>
              <span className="text-white">{theoreticalPeriod.toFixed(2)} s</span>
            </div>
            <div className="flex justify-between">
              <span>Elapsed time</span>
              <span className="text-white">{display.time.toFixed(1)} s</span>
            </div>
            <div className="flex justify-between">
              <span>Full swings</span>
              <span className="text-white">{Math.floor(display.swings / 2)}</span>
            </div>
          </div>

          <p className="text-[10.5px] leading-relaxed text-slate-500">
            Theoretical period uses T = 2&pi;&radic;(L/g), accurate for small angles. At larger
            starting angles the real swing (shown) takes measurably longer per swing.
          </p>
        </div>
      </div>
    </div>
  );
}
