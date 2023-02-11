import express from "express";
import multer from "multer";
import storage from "../config/cloudinary.js";
import { 
  deleteMedicineController, 
  getMedicineController, 
  medicineImageUploadController, 
  medicinesController, 
  newMedicineController, 
  updateMedicineController 
} from "../controller/medicine-controller.js";

import { hasAccess } from "../middleware/has-access.js";
import { isLoggedIn } from "../middleware/is-logged-in.js";

const medicineRoute = express.Router();

const upload = multer({storage})

medicineRoute.post("/", isLoggedIn, upload.single("imageUrl"), newMedicineController);

medicineRoute.get("/", isLoggedIn, medicinesController);

medicineRoute.get("/:id", isLoggedIn, getMedicineController);

medicineRoute.put("/:id", isLoggedIn, updateMedicineController);

medicineRoute.delete("/:id", isLoggedIn, deleteMedicineController);

medicineRoute.put("/image/:id", isLoggedIn, upload.single("imageUrl"), medicineImageUploadController);

export default medicineRoute;
