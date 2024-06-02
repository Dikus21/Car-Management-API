import 'reflect-metadata'
import express from 'express'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import dataSource from "./config/Database";
import router from "./routes/Routes";
import dotenv from 'dotenv';
dotenv.config();

dataSource.initialize().then(() => {
    console.log("Database Connected");
}).catch(err => {
    console.error("Database Connection Error: ", err);
})

const app = express();
const PORT = process.env.PORT;

//Middleware to parse cookies
app.use(cookieParser());
//Middleware to parse JSON
app.use(bodyParser.json());
//Use the router
app.use(router);

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})