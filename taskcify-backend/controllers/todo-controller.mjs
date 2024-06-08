import { matchedData, validationResult } from "express-validator";

import TodoModel from "../models/TodoModel.mjs";

export const getTodo = async (req, res, next) => {
  const { todoId } = matchedData(req);

  const validatorError = validationResult(req);

  if (!validatorError.isEmpty())
    return res.status(400).send(validatorError.array());

  let todo = null;

  try {
    todo = await TodoModel.findById(todoId);

    if (!todo)
      return res.status(404).status({
        errorMessage: "todo with specified ID does not not exist",
      });

    if (todo?.userId?.toString() !== req.user.userId)
      return res
        .status(401)
        .send({ errorMessage: "stop to manipulate the system" });
  } catch (error) {
    return next({ errorMessage: "invalid todo ID" });
  }

  res.send(todo);
};

export const getTodos = async (req, res, next) => {
  const { userId } = req.user;

  const todos = await TodoModel.find({ userId });

  res.send(todos);
};

export const createTodo = async (req, res, next) => {
  const { userId } = req.user;
  const { task } = matchedData(req);

  const validatorError = validationResult(req);

  if (!validatorError.isEmpty())
    return res.status(400).send(validatorError.array());

  const todo = await TodoModel({ task, userId });

  await todo.save();

  {
    const { task, completed } = todo;

    res.status(201).send(todo);
  }
};

export const updateTodo = async (req, res, next) => {
  const { todoId, task, completed } = matchedData(req);

  const validatorError = validationResult(req);

  if (!validatorError.isEmpty())
    return res.status(400).send(validatorError.array());

  let todo = null;

  try {
    todo = await TodoModel.findById(todoId);

    if (!todo)
      return res.status(404).send({
        errorMessage: "todo with specified ID does not not exist",
      });

    if (todo?.userId?.toString() !== req.user.userId)
      return res
        .status(401)
        .send({ errorMessage: "stop to manipulate the system" });
  } catch (error) {
    return next({ errorMessage: "invalid todo id" });
  }

  if (!task && !completed) return res.status(204);

  const dataToUpdate = {
    task: task ? task : todo.task,
    completed: completed ? completed : todo.completed,
  };

  try {
    await todo.updateOne(dataToUpdate);
  } catch (error) {
    return next(error);
  }

  res.send({ message: "updated successfully" });
};

export const deleteTodo = async (req, res, next) => {
  const { todoId } = matchedData(req);

  const validatorError = validationResult(req);

  if (!validatorError.isEmpty())
    return res.status(400).send(validatorError.array());

  let todo = null;

  try {
    todo = await TodoModel.findById(todoId);

    if (!todo)
      return res.status(404).send({
        errorMessage: "todo with specified ID does not not exist",
      });

    if (todo?.userId?.toString() !== req.user.userId)
      return res
        .status(401)
        .send({ errorMessage: "stop to manipulate the system" });
  } catch (error) {
    return next({ errorMessage: "invalid todo id" });
  }

  try {
    await todo.deleteOne();
  } catch (error) {
    return next(error);
  }

  res.status(204);
};
