import { Router } from "express";
import { login, logout } from "../controllers/auth-controller.mjs";
import {
  authenticate,
  checkAuthenticate,
} from "../middlewares/authenticate-middleware.mjs";

const router = Router();

router.post("/login", authenticate, login);
router.post("/logout", checkAuthenticate, logout);

export default router;
