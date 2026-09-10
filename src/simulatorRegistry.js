// Maps each simulator's UUID (from the main app's `simulators` table) to
// the component that renders it. Add one line here each time a new
// simulator is built - the UUID must match that row's `uuid` column so
// `page_path` (https://simulators.almairaaj.com/<uuid>) resolves correctly.
//
// Components are lazy-loaded so visiting one simulator never downloads
// another's code (important here since e.g. Solar System pulls in
// Three.js, which Periodic Table has no need for).

import { lazy } from "react";

const PeriodicTable = lazy(() => import("./pages/PeriodicTable"));
const SolarSystem = lazy(() => import("./pages/SolarSystem"));

const SIMULATORS = {
  "355fd863-acdc-11f1-8cc0-842afd7f38b4": PeriodicTable, // Periodic Table
  "355fda60-acdc-11f1-8cc0-842afd7f38b4": SolarSystem, // Solar System

  // "355fd9a3-acdc-11f1-8cc0-842afd7f38b4": HumanAnatomy, // Human Anatomy - not built yet
};

export default SIMULATORS;