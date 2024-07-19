import {IsNotEmpty, IsNumberString} from "class-validator";

export default class CarRegister {
    @IsNotEmpty({message:"Model Name Is Required"})
    model?: string;
    @IsNotEmpty({message:"Year Is Required"})
    year?:string;
    @IsNotEmpty({message: "Price Is Required"})
    @IsNumberString({}, {message: "Price must be a valid number"})
    rentPerDay?:string;
    @IsNotEmpty({message:"Manufacture Is Required"})
    manufacture?:string;
    @IsNotEmpty({message:"Capacity Is Required"})
    @IsNumberString({}, {message: "Capacity must be a valid number"})
    capacity?:string;
    @IsNotEmpty({message:"Transmission Is Required"})
    transmission?:string;
    @IsNotEmpty({message:"With Driver Is Required"})
    withDriver?:boolean;
    @IsNotEmpty({message:"Image Is Required"})
    image?:string;
    description?:string;
}