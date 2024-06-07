import { Router } from "express";
import { checkExact, checkSchema } from "express-validator";

import {
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/user-controller.mjs";
import {
  registerUserValidatorSchema,
  updateUserValidatorSchema,
} from "../validator/user-validator-schema.mjs";
import { checkAuthenticate } from "../middlewares/authenticate-middleware.mjs";

const router = Router();

router.post(
  "/register",
  checkExact(checkSchema(registerUserValidatorSchema), {
    message: "careful, you are sending more than required data",
  }),
  registerUser
);

router.put(
  "/edit",
  checkExact(checkSchema(updateUserValidatorSchema), {
    message: "careful, you are sending more than required data",
  }),
  checkAuthenticate,
  updateUser
);

router.delete("/delete", checkAuthenticate, deleteUser);

export default router;
