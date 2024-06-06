import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";

import {
  MONGO_URI,
  ORIGIN_ALLOW,
  PORT,
  SESSION_SECRET,
} from "./utils/constants.mjs";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ORIGIN_ALLOW,
    credentials: true,
  })
);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
  })
);

// Notfound Error Middleware
app.use((req, res, next) => {
  res.status(404).send({ errorMessage: "Page Not Found" });

  next();
});

// General Error Middleware
app.use((error, req, res, next) => {
  res.status(500).send({ errorMessage: "Server error" });
});

app.listen(PORT, console.log(`Server running on PORT : ${PORT}`));
