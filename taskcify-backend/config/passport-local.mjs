import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

import UserModel from "../models/UserModel.mjs";

export default passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const user = await UserModel.findOne({ email });

      if (!user)
        return done(null, false, { errorMessage: "user does not exist" });

      const matchedPassword = await bcrypt.compare(password, user.password);

      if (!matchedPassword)
        return done(null, false, { errorMessage: "invalid password" });

      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  done(null, { userId });
});
