import express from "express";
import { 
  deleteMedicineController, 
  getMedicineController, 
  medicinesController, 
  newMedicineController, 
  updateMedicineController 
} from "../controller/medicine-controller.js";

import { hasAccess } from "../middleware/has-access.js";
import { isLoggedIn } from "../middleware/is-logged-in.js";

const medicineRoute = express.Router();

medicineRoute.post("/", isLoggedIn, newMedicineController);

medicineRoute.get("/", isLoggedIn, medicinesController);

medicineRoute.get("/:id", isLoggedIn, getMedicineController);

medicineRoute.put("/:id", isLoggedIn, updateMedicineController);

medicineRoute.delete("/:id", isLoggedIn, deleteMedicineController);

export default medicineRoute;
