import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dataSource from "./config/Database";
import router from "./routes/Routes";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

dataSource
  .initialize()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database Connection Error: ", err);
  });

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
    origin: 'http://localhost:5173',  
    credentials: true  
};

app.use('/uploads', express.static('public/assets/uploads'));

app.use(cors(corsOptions));
app.use(morgan("dev"));
//Middleware to parse cookies
app.use(cookieParser());
//Middleware to parse JSON
app.use(bodyParser.json());
//Use the router
app.use(router);

//start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
