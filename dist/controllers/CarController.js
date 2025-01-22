"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = require("../entities/Car");
const Database_1 = __importDefault(require("../config/Database"));
const ErrorTemplates_1 = require("../utils/ErrorTemplates");
const cloudinaryUpload_1 = require("../middlewares/cloudinaryUpload");
class CarController {
    async testUpload(req, res, next) {
        try {
            console.log(req.files.image);
            res.status(200).json(req.files.image.name);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async addCar(req, res, next) {
        try {
            const { model, year, rentPerDay, manufacture, capacity, transmission, withDriver, description, } = req.body;
            const image = await (0, cloudinaryUpload_1.cloudinaryUpload)(req);
            await Car_1.Car.save({
                model: model,
                year: year,
                capacity: capacity,
                transmission: transmission,
                withDriver: withDriver,
                rentPerDay: rentPerDay,
                manufacture: manufacture,
                imagePublicId: image.public_id,
                imageURL: image.secure_url,
                description: description,
                creator: res.locals.userId,
            });
            res.status(200).json({ message: "Car added successfully!" });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async getCars(req, res, next) {
        try {
            const cars = await Car_1.Car.find({
                relations: ["creator", "updater", "deleter"],
            });
            res.json(cars);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async getCarById(req, res, next) {
        try {
            const car = await Car_1.Car.findOne({
                where: { id: req.params.id },
                relations: ["creator", "updater", "deleter"],
            });
            res.json(car);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async getSearchCars(req, res, next) {
        try {
            const data = req.query;
            const withDriver = data.withDriver === "true" ? true : false;
            const startRent = data.startRent ? new Date(data.startRent) : new Date();
            const capacity = data.capacity ? parseInt(data.capacity) : 1;
            console.log(typeof data.withDriver, typeof data.startRent, typeof data.capacity);
            const cars = await Database_1.default
                .getRepository(Car_1.Car)
                .createQueryBuilder("car")
                .where("car.withDriver = :withDriver", { withDriver })
                .andWhere("car.capacity >= :capacity", { capacity })
                .andWhere("car.endRent IS NULL OR car.endRent <= :startRent", {
                startRent,
            })
                .getMany();
            res.json(cars);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async updateCar(req, res, next) {
        try {
            // const {model, year, price} = req.body;
            const car = await Car_1.Car.findOne({
                where: { id: req.params.id },
            });
            if (car) {
                Object.keys(req.body).forEach((key) => {
                    if (req.body[key]) {
                        car[key] = req.body[key];
                    }
                });
                if (req.files) {
                    const image = await (0, cloudinaryUpload_1.cloudinaryUpload)(req);
                    await (0, cloudinaryUpload_1.deleteFromCloudinary)(car.imagePublicId);
                    car.imagePublicId = image.public_id;
                    car.imageURL = image.secure_url;
                }
                await car.save();
                res.status(200).json({
                    message: "Update success",
                    car,
                });
            }
            else {
                throw new ErrorTemplates_1.NotFoundError("Car not found");
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async deleteCar(req, res, next) {
        try {
            await Car_1.Car.update(req.params.id, {
                deletedAt: new Date(),
                deleter: res.locals.userId,
            });
            res.json({ message: "Car deleted successfully!" });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.default = CarController;
