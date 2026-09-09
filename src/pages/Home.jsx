import React from "react";
import { FlaskConical } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-900 px-6 text-center text-white">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600/15 text-teal-400">
        <FlaskConical className="h-6 w-6" />
      </div>
      <div className="font-mono text-xs tracking-wide text-teal-400">AL MAIRAAJ &middot; SIMULATORS</div>
      <h1 className="text-xl font-semibold">Interactive science simulators</h1>
      <p className="max-w-sm text-sm text-slate-400">
        Open a simulator from Al Mairaaj to get started - there's nothing to browse here directly yet.
      </p>
    </div>
  );
}
