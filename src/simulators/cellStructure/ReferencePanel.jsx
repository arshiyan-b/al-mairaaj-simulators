import React, { useState } from "react";
import { Check, Minus } from "lucide-react";
import { ORGANELLES, GLOSSARY } from "./data";

const COMPARISON_IDS = [
  "membrane", "wall", "cytoplasm", "nucleus", "mitochondria", "ribosomes",
  "chloroplast", "vacuole", "golgi", "roughER", "smoothER", "lysosome", "centriole",
];

export default function ReferencePanel({ level, onFocusOrganelle }) {
  const [tab, setTab] = useState("compare");

  const rows = COMPARISON_IDS
    .map((id) => ORGANELLES.find((o) => o.id === id))
    .filter((o) => o && (level === "a-level" || o.level === "core"));

  const terms = GLOSSARY.filter((g) => level === "a-level" || g.level === "core");

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5">
      <div className="mb-4 flex gap-1 rounded-lg border border-slate-700 bg-slate-800 p-1 w-fit">
        {[
          { id: "compare", label: "Plant vs Animal" },
          { id: "glossary", label: "Glossary" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded px-3 py-1.5 text-xs font-medium transition ${
              tab === t.id ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "compare" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="py-2 pr-4 font-mono font-normal">STRUCTURE</th>
                <th className="py-2 pr-4 text-center font-mono font-normal">ANIMAL</th>
                <th className="py-2 font-mono font-normal text-center">PLANT</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => onFocusOrganelle(o)}
                  className="cursor-pointer border-b border-slate-900 transition hover:bg-slate-900/60"
                >
                  <td className="py-2.5 pr-4 font-medium text-slate-200">{o.name}</td>
                  <td className="py-2.5 pr-4 text-center">
                    {o.cellTypes.includes("animal") ? (
                      <Check className="mx-auto h-3.5 w-3.5 text-teal-400" />
                    ) : (
                      <Minus className="mx-auto h-3.5 w-3.5 text-slate-700" />
                    )}
                  </td>
                  <td className="py-2.5 text-center">
                    {o.cellTypes.includes("plant") ? (
                      <Check className="mx-auto h-3.5 w-3.5 text-teal-400" />
                    ) : (
                      <Minus className="mx-auto h-3.5 w-3.5 text-slate-700" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[10.5px] text-slate-500">Click a row to focus that structure in the 3D model.</p>
        </div>
      )}

      {tab === "glossary" && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {terms.map((g) => (
            <div key={g.term}>
              <div className="text-xs font-semibold text-slate-200">{g.term}</div>
              <div className="text-xs leading-relaxed text-slate-400">{g.definition}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
