import EnvironmentSettings from "./utils/EnvironmentSettings";
new EnvironmentSettings();

import "reflect-metadata";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dataSource from "./config/Database";
import router from "./routes/Routes";
import morgan from "morgan";
import cors from "cors";
import errorMiddleware from "./middlewares/ErrorMiddleware";
import fileUpload from "express-fileupload";
import { databaseInitializer } from "./middlewares/DatabaseInitializer";

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// app.use("/uploads", express.static("public/assets/uploads"));

app.use(cors(corsOptions));
app.use(morgan("dev"));
//Middleware to parse cookies
app.use(cookieParser());
//Middleware to parse JSON
app.use(bodyParser.json());
//Database initializer
app.use(databaseInitializer);
//Use the router
app.use(router);
//Error handling middleware
app.use(errorMiddleware);

//Default route
app.get("/", (req: Request, res: Response) => {
  console.log("API ACTIVE");
  res.send("API ACTIVE");
});

export default app;
