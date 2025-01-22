import { Car } from "../entities/Car";
import { NextFunction, Request, Response } from "express";
import dataSource from "../config/Database";
import { NotFoundError } from "../utils/ErrorTemplates";
import { cloudinaryUpload, deleteFromCloudinary } from "../middlewares/cloudinaryUpload";

export default class CarController {

  public async testUpload(req:any, res:Response, next:NextFunction): Promise<void> {
    try{
      console.log(req.files.image);
      res.status(200).json(req.files.image.name);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async addCar(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        model,
        year,
        rentPerDay,
        manufacture,
        capacity,
        transmission,
        withDriver,
        description,
      } = req.body;
      const image = await cloudinaryUpload(req);
      await Car.save({
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
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async getCars(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await Car.find({
        relations: ["creator", "updater", "deleter"],
      });
      res.json(cars);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async getCarById(req: any, res: Response, next: NextFunction) {
    try {
      const car = await Car.findOne({
        where: { id: req.params.id },
        relations: ["creator", "updater", "deleter"],
      });
      res.json(car);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async getSearchCars(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.query as {
        withDriver: string;
        startRent: string;
        capacity: string;
      };
      const withDriver = data.withDriver === "true" ? true : false;
      const startRent = data.startRent ? new Date(data.startRent) : new Date();
      const capacity = data.capacity ? parseInt(data.capacity) : 1;
      console.log(
        typeof data.withDriver,
        typeof data.startRent,
        typeof data.capacity
      );
      const cars = await dataSource
        .getRepository(Car)
        .createQueryBuilder("car")
        .where("car.withDriver = :withDriver", { withDriver })
        .andWhere("car.capacity >= :capacity", { capacity })
        .andWhere("car.endRent IS NULL OR car.endRent <= :startRent", {
          startRent,
        })
        .getMany();

      res.json(cars);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async updateCar(req: any, res: Response, next: NextFunction) {
    try {
      // const {model, year, price} = req.body;
      const car = await Car.findOne({
        where: { id: req.params.id },
      });
      if (car) {
        Object.keys(req.body).forEach((key) => {
          if (req.body[key]) {
            (car as any)[key] = req.body[key];
          }
        });
        if (req.files) {
          const image = await cloudinaryUpload(req);
          await deleteFromCloudinary(car.imagePublicId);
          car.imagePublicId = image.public_id;
          car.imageURL = image.secure_url;
        }
        await car.save();
        res.status(200).json({
          message: "Update success",
          car,
        });
      } else {
        throw new NotFoundError("Car not found");
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  public async deleteCar(req: Request, res: Response, next: NextFunction) {
    try {
      await Car.update(req.params.id, {
        deletedAt: new Date(),
        deleter: res.locals.userId,
      });
      res.json({ message: "Car deleted successfully!" });
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}
