/* =========== 3RD PARTY MODULES =========== */
import express from "express";
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import MongoStore from "connect-mongo";

/* =========== LOCAL MODULES =========== */
import db from "./config/database.mjs";
import {
  MONGO_URI,
  ORIGIN_ALLOW,
  PORT,
  SESSION_SECRET,
  SESSION_CRYPT,
} from "./utils/constants.mjs";
import authRoute from "./routes/auth-route.mjs";
import userRoute from "./routes/user-route.mjs";
import localPassport from "./config/passport-local.mjs";

const app = express();

/* =========== MIDDLEWARES =========== */
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ORIGIN_ALLOW,
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      collectionName: "login-session",
      autoRemove: "interval",
      autoRemoveInterval: 1,
      crypto: {
        secret: "SESSION_CRYPT",
      },
    }),
    cookie: {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(localPassport.initialize());
app.use(localPassport.session());

/* =========== ROUTES =========== */
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

/* =========== Notfound Error Middleware =========== */
app.use((req, res, next) => {
  res.status(404).send({ errorMessage: "Page Not Found" });

  next();
});

/* =========== General Error Middleware =========== */
app.use((error, req, res, next) => {
  console.error(error);

  if (error.errorMessage)
    return res.status(400).send({ errorMessage: error.errorMessage });

  res.status(500).send({ errorMessage: "server error" });
});

/* =========== Connect Database =========== */
await db.connect();

app.listen(PORT, console.log(`Server running on PORT : ${PORT}`));
