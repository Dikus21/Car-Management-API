import { NextFunction, Request, Response } from "express";
import dataSource from "../config/Database";
import { InternalServerError } from "../utils/ErrorTemplates";

export const databaseInitializer = async (req: Request, res:Response, next:NextFunction) => {
    try {
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
            console.log("Database initialized for request: ", req.path);
        }
        next();
    } catch (error) {
        console.error("Database initialization error: ", error);
        throw new InternalServerError("Database connection failed");
    }
}