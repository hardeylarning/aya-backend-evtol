import express from "express";
import { availableEvtolController, checkEvtolBatteryLevelController, evtolLoadedMedicinesController, loadEvtolController, registerEvtolController } from "../controller/dispatch-controller.js";

import { hasAccess } from "../middleware/has-access.js";
import { isLoggedIn } from "../middleware/is-logged-in.js";

const dispatchRoute = express.Router();

dispatchRoute.post("/", isLoggedIn, hasAccess, registerEvtolController);

dispatchRoute.get("loading/:evtolId/:medicineId", isLoggedIn, loadEvtolController);

dispatchRoute.get("loaded/:evtolId", isLoggedIn, evtolLoadedMedicinesController);

dispatchRoute.get("/available", isLoggedIn, availableEvtolController);

dispatchRoute.get("check-battery/:id", isLoggedIn, checkEvtolBatteryLevelController);

export default dispatchRoute;
