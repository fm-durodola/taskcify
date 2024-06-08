import { checkSchema, checkExact, param } from "express-validator";

import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo-controller.mjs";
import {
  createTodoValidatorSchema,
  updateTodoValidatorSchema,
} from "../validator/todos-validator-schema.mjs";
import { checkAuthenticate } from "../middlewares/authenticate-middleware.mjs";

const router = Router();

router.get(
  "/:todoId",
  checkAuthenticate,
  param("todoId").trim().escape().isMongoId().withMessage("require valid id"),
  getTodo
);

router.get("/", checkAuthenticate, getTodos);

router.post(
  "/",
  checkAuthenticate,
  checkExact(checkSchema(createTodoValidatorSchema)),
  createTodo
);

router.put(
  "/:todoId",
  checkAuthenticate,
  checkExact(checkSchema(updateTodoValidatorSchema)),
  updateTodo
);

router.delete(
  "/:todoId",
  checkAuthenticate,
  param("todoId").trim().escape().isMongoId().withMessage("require valid id"),
  deleteTodo
);

export default router;
