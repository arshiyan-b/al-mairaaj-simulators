import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Dog, GraduationCap, Compass, BookOpen, ListChecks } from "lucide-react";

import Cell3DScene from "../simulators/cellStructure/Cell3DScene";
import InfoPanel from "../simulators/cellStructure/InfoPanel";
import LearnMode from "../simulators/cellStructure/LearnMode";
import QuizMode from "../simulators/cellStructure/QuizMode";
import ReferencePanel from "../simulators/cellStructure/ReferencePanel";
import { getOrganellesForCell } from "../simulators/cellStructure/data";

const MODES = [
  { id: "explore", label: "Explore", icon: Compass },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "test", label: "Test", icon: ListChecks },
];

function CanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center font-mono text-xs text-slate-500">
      Loading 3D cell model&hellip;
    </div>
  );
}

export default function CellStructure() {
  const [cellType, setCellType] = useState("plant");
  const [level, setLevel] = useState("o-level");
  const [mode, setMode] = useState("explore");
  const [selectedId, setSelectedId] = useState(null);

  const organelles = getOrganellesForCell(cellType, level);
  const selectedOrganelle = organelles.find((o) => o.id === selectedId) || null;

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleModeChange = (m) => {
    setMode(m);
    setSelectedId(null);
  };

  const handleCellTypeChange = (t) => {
    setCellType(t);
    setSelectedId(null);
  };

  const handleLevelChange = (l) => {
    setLevel(l);
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top navigation */}
      <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] tracking-wide text-teal-400">AL MAIRAAJ &middot; SIMULATORS</div>
            <h1 className="text-lg font-bold text-white sm:text-xl">Cell Structure Laboratory</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Cell type toggle */}
            <div className="flex rounded-lg border border-slate-700 bg-slate-800 p-1">
              <button
                onClick={() => handleCellTypeChange("plant")}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition ${
                  cellType === "plant" ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Sprout className="h-3.5 w-3.5" /> Plant
              </button>
              <button
                onClick={() => handleCellTypeChange("animal")}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition ${
                  cellType === "animal" ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Dog className="h-3.5 w-3.5" /> Animal
              </button>
            </div>

            {/* Level toggle */}
            <div className="flex rounded-lg border border-slate-700 bg-slate-800 p-1">
              <button
                onClick={() => handleLevelChange("o-level")}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition ${
                  level === "o-level" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" /> O Level
              </button>
              <button
                onClick={() => handleLevelChange("a-level")}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition ${
                  level === "a-level" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" /> A Level
              </button>
            </div>

            {/* Mode toggle */}
            <div className="flex rounded-lg border border-slate-700 bg-slate-800 p-1">
              {MODES.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleModeChange(m.id)}
                    className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition ${
                      mode === m.id ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" /> {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        {/* Main lab area: 3D model + contextual panel */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row">
          <div className="relative h-[420px] flex-1 overflow-hidden rounded-2xl border border-slate-800 sm:h-[520px]">
            <Suspense fallback={<CanvasFallback />}>
              <Cell3DScene cellType={cellType} level={level} selectedId={selectedId} onSelect={handleSelect} />
            </Suspense>

            {!selectedId && mode === "explore" && (
              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1.5 font-mono text-[10.5px] text-slate-400 backdrop-blur-sm">
                Drag to rotate &middot; scroll to zoom &middot; click an organelle
              </div>
            )}
          </div>

          {/* Contextual side panel */}
          <div className="flex w-full flex-col gap-3 lg:w-[380px]">
            {mode === "explore" && (
              <>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <div className="mb-2.5 font-mono text-[10.5px] tracking-wide text-slate-500">
                    {cellType === "plant" ? "PLANT" : "ANIMAL"} CELL STRUCTURES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {organelles
                      .filter((o) => o.id !== "membrane" && o.id !== "wall" && o.id !== "cytoplasm")
                      .map((o) => (
                        <button
                          key={o.id}
                          onClick={() => handleSelect(o.id)}
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                            selectedId === o.id
                              ? "border-teal-600 bg-teal-950/40 text-teal-200"
                              : "border-slate-700 text-slate-300 hover:border-slate-500"
                          }`}
                        >
                          {o.name}
                        </button>
                      ))}
                    <button
                      onClick={() => handleSelect("membrane")}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                        selectedId === "membrane"
                          ? "border-teal-600 bg-teal-950/40 text-teal-200"
                          : "border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      Cell Membrane
                    </button>
                    {cellType === "plant" && (
                      <button
                        onClick={() => handleSelect("wall")}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                          selectedId === "wall"
                            ? "border-teal-600 bg-teal-950/40 text-teal-200"
                            : "border-slate-700 text-slate-300 hover:border-slate-500"
                        }`}
                      >
                        Cell Wall
                      </button>
                    )}
                    <button
                      onClick={() => handleSelect("cytoplasm")}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                        selectedId === "cytoplasm"
                          ? "border-teal-600 bg-teal-950/40 text-teal-200"
                          : "border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      Cytoplasm
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedOrganelle ? (
                    <InfoPanel organelle={selectedOrganelle} level={level} onClose={() => setSelectedId(null)} />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-2xl border border-dashed border-slate-700 p-6 text-center text-xs text-slate-500"
                    >
                      Select a structure from the model or the list above to see its details.
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {mode === "learn" && (
              <LearnMode cellType={cellType} level={level} selectedId={selectedId} onSelectRequest={setSelectedId} />
            )}

            {mode === "test" && <QuizMode level={level} />}
          </div>
        </div>

        {/* Reference panel: comparison + glossary */}
        <ReferencePanel
          level={level}
          onFocusOrganelle={(o) => {
            setMode("explore");
            if (!o.cellTypes.includes(cellType)) {
              setCellType(o.cellTypes[0]);
            }
            handleSelect(o.id);
          }}
        />
      </div>
    </div>
  );
}
