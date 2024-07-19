import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  Matches,
  Min,
} from "class-validator";

export default class CarSearch {
  @IsNotEmpty({ message: "withDriver Is Required" })
  @Matches(/^(true|false)$/, {
    message: "withDriver must be a true or false",
  })
  withDriver?: string;
  @IsNotEmpty({ message: "Start Date Is Required" })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "startRent must be in the format yyyy-mm-dd",
  })
  startRent?: string;
  @IsNotEmpty({ message: "Capacity Is Required" })
  @IsNumberString(
    { no_symbols: true },
    { message: "Capacity must be a valid number and no symbols" }
  )
  capacity?: string;
}
