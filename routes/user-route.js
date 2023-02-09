import express from "express";
import {
  adminGetUserController,
  userDeleteController,
  userForgotPasswordController,
  userGetByEmailController,
  userGetController,
  userLoginController,
  userRegisterController,
  usersController,
  userUpdateController,
} from "../controller/user-controller.js";
import { hasAccess } from "../middleware/has-access.js";
import { isLoggedIn } from "../middleware/is-logged-in.js";

const userRoute = express.Router();

userRoute.post("/login", userLoginController);
userRoute.post("/register", userRegisterController);

userRoute.get("/", isLoggedIn, usersController);

userRoute.get("/:id", isLoggedIn, hasAccess, adminGetUserController);

userRoute.get("/profile", isLoggedIn, userGetController);

userRoute.get("/get-by-email/:email",  userGetByEmailController);

userRoute.put("/", isLoggedIn, userUpdateController);

userRoute.put("/reset-password/:email", userForgotPasswordController);

userRoute.delete("/:id", userDeleteController);

export default userRoute;
