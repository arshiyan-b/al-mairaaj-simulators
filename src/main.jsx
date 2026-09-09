import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import PeriodicTable from "./pages/PeriodicTable";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/periodic-table" element={<PeriodicTable />} />
        {/* Future simulators go here, e.g.: */}
        {/* <Route path="/human-anatomy" element={<HumanAnatomy />} /> */}
        {/* <Route path="/solar-system" element={<SolarSystem />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
