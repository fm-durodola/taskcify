export const login = (req, res) => {
  res.send({ message: "user successfully login" });
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) next("unable to log user out");

    req.session.destroy((err) => {
      if (err) next("unable to destroy user session");
    });

    res.clearCookie("connect.sid", { path: "/" });

    res.send({ message: "successfully logout" });
  });
};
