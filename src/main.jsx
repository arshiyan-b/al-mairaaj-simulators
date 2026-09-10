import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SIMULATORS from "./simulatorRegistry";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 font-mono text-sm text-slate-400">
      Loading simulator&hellip;
    </div>
  );
}

function SimulatorRoute() {
  const { uuid } = useParams();
  const Component = SIMULATORS[uuid];
  return Component ? <Component /> : <NotFound />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:uuid" element={<SimulatorRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);