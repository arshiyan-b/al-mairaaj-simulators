import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb, AlertTriangle, ArrowDown } from "lucide-react";

export default function InfoPanel({ organelle, level, onClose }) {
  if (!organelle) return null;

  const levelText = level === "a-level" ? organelle.aLevel : organelle.oLevel;

  return (
    <AnimatePresence>
      <motion.div
        key={organelle.id}
        className="pointer-events-auto w-full rounded-2xl border border-slate-700 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-md sm:max-w-sm"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 flex-shrink-0 rounded-full" style={{ backgroundColor: organelle.color }} />
            <h2 className="text-lg font-bold leading-tight text-white">{organelle.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 transition hover:rotate-90 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <span
          className="mb-4 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wide"
          style={{ backgroundColor: organelle.color + "22", color: organelle.color }}
        >
          {level === "a-level" ? "A LEVEL" : "O LEVEL"}
        </span>

        <p className="mb-4 text-sm leading-relaxed text-slate-200">{levelText}</p>

        <div className="mb-4 space-y-3 border-t border-slate-800 pt-4">
          <div>
            <div className="mb-1 font-mono text-[10.5px] tracking-wide text-slate-500">STRUCTURE</div>
            <p className="text-sm leading-relaxed text-slate-300">{organelle.structure}</p>
          </div>
          <div>
            <div className="mb-1 font-mono text-[10.5px] tracking-wide text-slate-500">FUNCTION</div>
            <p className="text-sm leading-relaxed text-slate-300">{organelle.function}</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-teal-900/50 bg-teal-950/30 p-3">
          <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10.5px] tracking-wide text-teal-400">
            <ArrowDown className="h-3 w-3" /> WHY THE STRUCTURE SUITS THE FUNCTION
          </div>
          <p className="text-xs leading-relaxed text-teal-100/90">{organelle.whyStructureFunction}</p>
        </div>

        <div className="mb-3 flex items-start gap-2 rounded-xl border border-slate-700 bg-slate-800/50 p-3">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-400" />
          <div>
            <div className="mb-0.5 font-mono text-[10px] tracking-wide text-amber-400">EXAM TIP</div>
            <p className="text-xs leading-relaxed text-slate-300">{organelle.examTip}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-red-900/40 bg-red-950/20 p-3">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-400" />
          <div>
            <div className="mb-0.5 font-mono text-[10px] tracking-wide text-red-400">COMMON MISTAKE</div>
            <p className="text-xs leading-relaxed text-slate-300">{organelle.commonMistake}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
