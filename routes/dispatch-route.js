import express from "express";
import { 
  availableEvtolController, 
  checkEvtolBatteryLevelController, 
  evtolController, 
  evtolLoadedMedicinesController, 
  evtolsController, 
  loadEvtolController, 
  registerEvtolController 
} from "../controller/dispatch-controller.js";

import { hasAccess } from "../middleware/has-access.js";
import { isLoggedIn } from "../middleware/is-logged-in.js";

const dispatchRoute = express.Router();

dispatchRoute.post("/", isLoggedIn, hasAccess, registerEvtolController);

dispatchRoute.put("/loading/:id", isLoggedIn, loadEvtolController);

dispatchRoute.get("/:id", isLoggedIn, evtolController);

dispatchRoute.get("/", isLoggedIn, evtolsController);

dispatchRoute.get("/loaded/:evtolId", isLoggedIn, evtolLoadedMedicinesController);

dispatchRoute.get("/available/all", isLoggedIn, availableEvtolController);

dispatchRoute.get("/check-battery/:id", isLoggedIn, checkEvtolBatteryLevelController);

export default dispatchRoute;
