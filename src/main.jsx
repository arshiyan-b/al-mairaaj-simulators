import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SIMULATORS from "./simulatorRegistry";

function SimulatorRoute() {
  const { uuid } = useParams();
  const Component = SIMULATORS[uuid];
  return Component ? <Component /> : <NotFound />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:uuid" element={<SimulatorRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);