import dataSource from "../config/Database";
import {Car} from "../entities/Car";


export default async function carSeeder() {
    const cars = [
        {
            model:"Avanza",
            year: "2014",
            price:"300000",
            image:"seeder.jpg",
            createdAt: new Date()
        },
        {
            model:"Xenia",
            year: "2016",
            price:"320000",
            image:"seeder.jpg",
            createdAt: new Date()
        },
        {
            model:"Terios",
            year: "2012",
            price:"200000",
            image:"seeder.jpg",
            createdAt: new Date()
        },
        {
            model:"Innova",
            year: "2018",
            price:"400000",
            image:"seeder.jpg",
            createdAt: new Date()
        }
    ].map(car => {
        const newCar = new Car();
        newCar.model = car.model;
        newCar.year = car.year;
        newCar.price = car.price;
        newCar.image = car.image;
        newCar.createdAt = car.createdAt;
        return newCar;

    });

    await dataSource.manager.save(cars);
    console.log(`${cars.length} cars have been inserted`);
}