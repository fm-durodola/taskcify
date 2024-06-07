import { matchedData, validationResult } from "express-validator";

import { encryptPassword } from "../utils/helpers.mjs";
import UserModel from "../models/UserModel.mjs";

/* =========== REGISTER USER HANDLER =========== */
export const registerUser = async (req, res, next) => {
  const { name, email, password } = matchedData(req);

  const validatorError = validationResult(req);

  if (!validatorError.isEmpty())
    return res.status(400).send(validatorError?.array());

  const hashedPassword = await encryptPassword(password);

  try {
    const userExist = await UserModel.findOne({ email });

    if (userExist)
      return res.status(400).send({ errorMessage: "user already exist" });
  } catch (error) {
    next(error.message);
  }

  if (!hashedPassword)
    next({ errorMessage: "server error, could not hash password" });

  try {
    const user = await UserModel({ name, email, password: hashedPassword });

    if (!user) next("could not create user, please try again");

    await user.save();
  } catch (error) {
    next(error.message);
  }

  res.status(201).send({ message: "user successfully registered" });
};

/* =========== UPDATE USER HANDLER =========== */
export const updateUser = async (req, res) => {
  const { userId } = req.user;
  const { password } = matchedData(req);

  const validatorError = validationResult(req);

  if (!validatorError.isEmpty())
    return res.status(400).send(validatorError.array());

  const hashedPassword = await encryptPassword(password);

  await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

  res.send({ message: "password update successfully" });
};

/* =========== DELETE USER HANDLER =========== */
export const deleteUser = async (req, res, next) => {
  const { userId } = req.user;

  try {
    await UserModel.findByIdAndDelete({ _id: userId });

    req.logout((error) => {
      if (error) next(error);

      req.session.destroy((error) => error && next(error));

      res.clearCookie("connect.sid", { path: "/" });

      res.status(204);
    });
  } catch (error) {
    next(error);
  }
};
