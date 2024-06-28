"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../config/Database"));
const Car_1 = require("../entities/Car");
async function carSeeder() {
    const cars = [
        {
            model: "Avanza",
            year: "2014",
            price: "300000",
            image: "seeder.jpg",
            createdAt: new Date()
        },
        {
            model: "Xenia",
            year: "2016",
            price: "320000",
            image: "seeder.jpg",
            createdAt: new Date()
        },
        {
            model: "Terios",
            year: "2012",
            price: "200000",
            image: "seeder.jpg",
            createdAt: new Date()
        },
        {
            model: "Innova",
            year: "2018",
            price: "400000",
            image: "seeder.jpg",
            createdAt: new Date()
        }
    ].map(car => {
        const newCar = new Car_1.Car();
        newCar.model = car.model;
        newCar.year = car.year;
        newCar.price = car.price;
        newCar.image = car.image;
        newCar.createdAt = car.createdAt;
        return newCar;
    });
    await Database_1.default.manager.save(cars);
    console.log(`${cars.length} cars have been inserted`);
}
exports.default = carSeeder;
