import React from "react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-slate-900 text-white">
      <div className="font-mono text-xs tracking-wide text-teal-400">AL MAIRAAJ &middot; SIMULATORS</div>
      <h1 className="text-xl font-semibold">Simulator not found</h1>
      <p className="text-sm text-slate-400">Check the link and try again.</p>
    </div>
  );
}
