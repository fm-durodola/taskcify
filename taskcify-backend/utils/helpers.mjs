import bcrypt from "bcrypt";

import { HASH_SALT } from "./constants.mjs";

export const encryptPassword = async (password) => {
  if (!password) {
    console.error(
      "Password is missing in the encryptPassword(password : string)"
    );
  }
  try {
    return await bcrypt.hash(password, parseInt(HASH_SALT));
  } catch (error) {
    console.error(error);
    return false;
  }
};
