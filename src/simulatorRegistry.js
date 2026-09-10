// Maps each simulator's UUID (from the main app's `simulators` table) to
// the component that renders it. Add one line here each time a new
// simulator is built - the UUID must match that row's `uuid` column so
// `page_path` (https://simulators.almairaaj.com/<uuid>) resolves correctly.
//
// Components are lazy-loaded so visiting one simulator never downloads
// another's code (important here since e.g. Solar System and Cell
// Structure pull in Three.js, which the others have no need for).

import { lazy } from "react";

const PeriodicTable = lazy(() => import("./pages/PeriodicTable"));
const SolarSystem = lazy(() => import("./pages/SolarSystem"));
const CellStructure = lazy(() => import("./pages/CellStructure"));
const Pendulum = lazy(() => import("./pages/Pendulum"));

const SIMULATORS = {
  "355fd863-acdc-11f1-8cc0-842afd7f38b4": PeriodicTable, // Periodic Table
  "355fda60-acdc-11f1-8cc0-842afd7f38b4": SolarSystem, // Solar System
  "b7accae3-a806-46f3-be44-99061ee4178c": CellStructure, // Cell Structure Laboratory
  "47f6a2e6-eb57-4cf4-876c-3b1428cef091": Pendulum, // Pendulum
};

export default SIMULATORS;
