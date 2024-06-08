/* =========== 3RD PARTY MODULES =========== */
import express from "express";
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

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
import todoRoute from "./routes/todo-route.mjs";
import localPassport from "./config/passport-local.mjs";

const app = express();

/* =========== RATE LIMITING CONFIGURATION =========== */
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

/* =========== CONNECT MONGO CONFIGURATION =========== */
const store = MongoStore.create({
  mongoUrl: MONGO_URI,
  collectionName: "login-session",
  autoRemove: "interval",
  autoRemoveInterval: 1,
  crypto: {
    secret: "SESSION_CRYPT",
  },
});

/* ### =========== MIDDLEWARES START =========== ### */
app.use(express.json());
app.use(helmet());

/* =========== CORS MIDDLEWARES =========== */
app.use(
  cors({
    origin: ORIGIN_ALLOW,
    credentials: true,
  })
);
app.set("trust proxy", 1);

/* =========== SESSION MIDDLEWARE =========== */
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store,
    cookie: {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60,
    },
  })
);

/* PASSPORT MIDDLEWARE */
app.use(localPassport.initialize());
app.use(localPassport.session());

/* =========== LOGGING MIDDLEWARE =========== */
app.use(
  morgan("combined")
);

// Rate Limiting
app.use(limiter);

/* =========== ROUTES =========== */
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/todos", todoRoute);

/* =========== NOTFOUND ERROR MIDDLEWARE =========== */
app.use((req, res, next) => {
  res.status(404).send({ errorMessage: "Page Not Found" });

  next();
});

/* =========== GENERAL ERROR MIDDLEWARE =========== */
app.use((error, req, res, next) => {
  console.error(error);

  if (error.errorMessage)
    return res.status(400).send({ errorMessage: error.errorMessage });

  res.status(500).send({ errorMessage: "server error" });
});

/* =========== CONNECT DATABASE =========== */
await db.connect();

app.listen(PORT, console.log(`Server running on PORT : ${PORT}`));
