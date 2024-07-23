import EnvironmentSettings from "./utils/EnvironmentSettings";
new EnvironmentSettings();

import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dataSource from "./config/Database";
import router from "./routes/Routes";
import morgan from "morgan";
import cors from "cors";
import errorMiddleware from "./middlewares/ErrorMiddleware";
import path from "path";

dataSource
  .initialize()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database Connection Error: ", err);
  });

const app = express();
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true,
};

app.use("/uploads", express.static("public/assets/uploads"));

app.use(cors(corsOptions));
app.use(morgan("dev"));
//Middleware to parse cookies
app.use(cookieParser());
//Middleware to parse JSON
app.use(bodyParser.json());
//Use the router
app.use(router);
//Error handling middleware
app.use(errorMiddleware);

//Default route
app.get("/", (req, res) => res.send("Express on Vercel"));

export default app;
