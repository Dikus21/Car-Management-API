"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnvironmentSettings_1 = __importDefault(require("./utils/EnvironmentSettings"));
new EnvironmentSettings_1.default();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Database_1 = __importDefault(require("./config/Database"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const ErrorMiddleware_1 = __importDefault(require("./middlewares/ErrorMiddleware"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
Database_1.default
    .initialize()
    .then(() => {
    console.log("Database Connected");
})
    .catch((err) => {
    console.error("Database Connection Error: ", err);
});
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
// app.use("/uploads", express.static("public/assets/uploads"));
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("dev"));
//Middleware to parse cookies
app.use((0, cookie_parser_1.default)());
//Middleware to parse JSON
app.use(body_parser_1.default.json());
//Use the router
app.use(Routes_1.default);
//Error handling middleware
app.use(ErrorMiddleware_1.default);
//Default route
app.get("/", (req, res) => {
    console.log("Route on index accessed");
    res.send("Express on vercel");
});
exports.default = app;
