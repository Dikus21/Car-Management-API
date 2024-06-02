import {Car} from "../entities/Car";
import {Request, Response } from 'express';

export default class CarController {
    public async addCar(req: any, res: any) {
        try {
            const {model, year, price} = req.body;
            const image = req.file ? req.file.filename : null;
            await Car.save({
                model: model,
                year: year,
                price: price,
                image: image,
                creator: req.userId
            });
            return res.json({message: "Car added successfully!"});
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error});
        }
    }

    public async getCars(req: Request, res: Response) {
        try {
            const cars = await Car.find({
                withDeleted: true,
                relations: ['creator', 'updater', 'deleter']
            });
            return res.json(cars);
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error});
        }
    }

    public async getCarById(req: any, res: Response) {
        try {
            const car = await Car.findOne({where:{id:req.params.id}, relations: ['creator', 'updater', 'deleter']});
            return res.json(car);
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error});
        }
    }

    public async updateCar(req: any, res: any) {
        try {
            // const {model, year, price} = req.body;
            const image = req.file ? req.file.filename : null;
            const car = await Car.findOne({
                where: {id: req.params.id}
            });
            if (car) {
                Object.keys(req.body).forEach(key => {
                    if (req.body[key]) {
                        (car as any)[key] = req.body[key];
                    }
                });
                if (image) car.image = image;
                await car.save();
                res.status(200).json({
                    message:"Update success",
                    car
                });
            } else {
                res.status(404).json({message:"Car not found!"});
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error});
        }
    }

    public async deleteCar(req: any, res: any) {
        try {
            await Car.update(req.params.id, {
                deletedAt: new Date(),
                deleter: req.userId
            });
            return res.json({message: "Car deleted successfully!"});
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error});
        }
    }
}