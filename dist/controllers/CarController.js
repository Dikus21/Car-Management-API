"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = require("../entities/Car");
class CarController {
    async addCar(req, res) {
        try {
            const { model, year, price } = req.body;
            const image = req.file ? req.file.filename : null;
            await Car_1.Car.save({
                model: model,
                year: year,
                price: price,
                image: image,
                creator: req.userId,
            });
            return res.json({ message: "Car added successfully!" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
    async getCars(req, res) {
        try {
            const cars = await Car_1.Car.find({
                relations: ["creator", "updater", "deleter"],
            });
            const carsWithImageUrls = cars.map((car) => (Object.assign(Object.assign({}, car), { imageUrl: `http://localhost:${process.env.PORT}/uploads/${car.image}` })));
            return res.json(carsWithImageUrls);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
    async getCarById(req, res) {
        try {
            const car = await Car_1.Car.findOne({
                where: { id: req.params.id },
                relations: ["creator", "updater", "deleter"],
            });
            return res.json(car);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
    async updateCar(req, res) {
        try {
            // const {model, year, price} = req.body;
            const image = req.file ? req.file.filename : null;
            const car = await Car_1.Car.findOne({
                where: { id: req.params.id },
            });
            if (car) {
                Object.keys(req.body).forEach((key) => {
                    if (req.body[key]) {
                        car[key] = req.body[key];
                    }
                });
                if (image)
                    car.image = image;
                await car.save();
                res.status(200).json({
                    message: "Update success",
                    car,
                });
            }
            else {
                res.status(404).json({ message: "Car not found!" });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
    async deleteCar(req, res) {
        try {
            await Car_1.Car.update(req.params.id, {
                deletedAt: new Date(),
                deleter: req.userId,
            });
            return res.json({ message: "Car deleted successfully!" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
}
exports.default = CarController;
