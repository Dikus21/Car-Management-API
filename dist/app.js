"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Database_1 = __importDefault(require("./config/Database"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
Database_1.default
    .initialize()
    .then(() => {
    console.log("Database Connected");
})
    .catch((err) => {
    console.error("Database Connection Error: ", err);
});
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use('/uploads', express_1.default.static('public/assets/uploads'));
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("dev"));
//Middleware to parse cookies
app.use((0, cookie_parser_1.default)());
//Middleware to parse JSON
app.use(body_parser_1.default.json());
//Use the router
app.use(Routes_1.default);
//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
