import passport from "passport";

export function authenticate(req, res, next) {
  passport.authenticate("local", (error, user, info) => {
    if (error) return res.status(400).send(info);

    if (!user) return res.send({ errorMessage: info.errorMessage });

    req.login(user, (error) => {
      if (error) next(error);

      next();
    });
  })(req, res, next);
}

export function checkAuthenticate(req, res, next) {
  if (!req.isAuthenticated())
    return res.status(401).send({ errorMessage: "Please login" });

  next();
}
