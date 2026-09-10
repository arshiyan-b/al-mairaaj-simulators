import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";
import { getLearnSteps, ORGANELLES } from "./data";

export default function LearnMode({ cellType, level, selectedId, onSelectRequest }) {
  const steps = getLearnSteps(cellType, level);
  const [stepIndex, setStepIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  useEffect(() => {
    setStepIndex(0);
    setSolved(false);
  }, [cellType, level]);

  const step = steps[stepIndex];
  const organelle = step ? ORGANELLES.find((o) => o.id === step.organelleId) : null;

  useEffect(() => {
    if (!step || !selectedId) return;
    if (selectedId === step.organelleId) {
      setSolved(true);
      setWrongFlash(false);
    } else if (!solved) {
      setWrongFlash(true);
      const t = setTimeout(() => setWrongFlash(false), 900);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setSolved(false);
      onSelectRequest(null);
    }
  };

  const restart = () => {
    setStepIndex(0);
    setSolved(false);
    onSelectRequest(null);
  };

  if (!step) return null;

  const isDone = stepIndex === steps.length - 1 && solved;

  return (
    <div className="pointer-events-auto w-full rounded-2xl border border-slate-700 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-md sm:max-w-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-mono text-[10.5px] tracking-wide text-teal-400">
          STEP {stepIndex + 1} OF {steps.length}
        </div>
        <button onClick={restart} className="text-slate-400 transition hover:text-white" aria-label="Restart">
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className="h-full bg-teal-500"
          animate={{ width: `${((stepIndex + (solved ? 1 : 0)) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          <h3 className="mb-2 text-base font-semibold text-white">{step.prompt}</h3>

          <motion.p
            className={`mb-3 text-xs ${wrongFlash ? "text-red-400" : "text-slate-400"}`}
            animate={wrongFlash ? { x: [0, -4, 4, -4, 0] } : {}}
          >
            {wrongFlash ? "Not quite - try another structure." : "Click the organelle in the 3D model."}
          </motion.p>

          {solved && organelle && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-3 rounded-xl border border-teal-900/50 bg-teal-950/30 p-3"
            >
              <div className="mb-1 flex items-center gap-1.5 font-mono text-[11px] text-teal-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Correct - {organelle.name}
              </div>
              <p className="text-xs leading-relaxed text-teal-100/90">
                {level === "a-level" ? organelle.aLevel : organelle.oLevel}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {isDone ? (
        <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3 text-center text-sm font-medium text-amber-300">
          You've worked through every structure for this cell. Try Quiz mode next.
        </div>
      ) : (
        <button
          onClick={next}
          disabled={!solved}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
