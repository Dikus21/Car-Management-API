import path from "path";
import dataSource from "../config/Database";
import { Car } from "../entities/Car";
import {
  cloudinaryUpload,
  uploadToCloudinary,
} from "../middlewares/cloudinaryUpload";

export default async function carSeeder() {
  const cars = [
    {
      manufacture: "Ford",
      model: "F150",
      image: "car01.min.jpg",
      rentPerDay: 200000,
      capacity: 2,
      description:
        " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      transmission: "Automatic",
      withDriver: true,
      type: "Sedan",
      year: "2022",
    },
    {
      manufacture: "BMW",
      model: "X5",
      image: "car02.min.jpg",
      rentPerDay: 800000,
      capacity: 6,
      description:
        " Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
      transmission: "Automatic",
      withDriver: false,
      type: "Convertible",
      year: "2019",
    },
    {
      manufacture: "Lincoln",
      model: "MKZ",
      image: "car03.min.jpg",
      rentPerDay: 900000,
      capacity: 6,
      description:
        " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
      transmission: "Automanual",
      withDriver: true,
      type: "Sedan",
      year: "2021",
    },
    {
      manufacture: "BMW",
      model: "M5",
      image: "car04.min.jpg",
      rentPerDay: 900000,
      capacity: 6,
      description: ' 6.1L SRT V8 "Hemi" engine.',
      transmission: "Manual",
      withDriver: true,
      type: "Hatchback",
      year: "2018",
    },
    {
      manufacture: "Lincoln",
      model: "Navigator",
      image: "car05.min.jpg",
      rentPerDay: 200000,
      capacity: 2,
      description:
        " Body color sill extension. Torsion beam rear suspension w/stabilizer bar. Front & rear passenger folding assist grips.",
      transmission: "Automatic",
      withDriver: false,
      type: "Minivan",
      year: "2020",
    },
    {
      manufacture: "Ford",
      model: "Fiesta",
      image: "car06.min.jpg",
      rentPerDay: 900000,
      capacity: 4,
      description:
        " Tilt steering column. Carpeted cargo area. Tip start system. Leather-wrapped shift knob.",
      transmission: "Automanual",
      withDriver: true,
      type: "Hatchback",
      year: "2016",
    },
    {
      manufacture: "Honda",
      model: "Accord",
      image: "car07.min.jpg",
      rentPerDay: 900000,
      capacity: 4,
      description:
        " Silver finish interior door handles. 160-amp alternator. Tire pressure monitoring system (TPMS). Cloth covered headliner.",
      transmission: "Automatic",
      withDriver: false,
      type: "Sedan",
      year: "2020",
    },
    {
      manufacture: "Lincoln",
      model: "Navigator",
      image: "car08.min.jpg",
      rentPerDay: 300000,
      capacity: 2,
      description:
        " XM satellite radio receiver -inc: 90 day trial subscription. Dual front illuminated visor vanity mirrors.",
      transmission: "Manual",
      withDriver: true,
      type: "Regular Cab Pickup",
      year: "2014",
    },
    {
      manufacture: "Buick",
      model: "LaCrosse",
      image: "car09.min.jpg",
      rentPerDay: 1000000,
      capacity: 6,
      description:
        " Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.",
      transmission: "Automatic",
      withDriver: false,
      type: "Extended Cab Pickup",
      year: "2012",
    },
    {
      manufacture: "BMW",
      model: "X5",
      image: "car10.min.jpg",
      rentPerDay: 300000,
      capacity: 6,
      description:
        " Cargo compartment lamp. Body color fascias w/bright insert. Front/rear stabilizer bars.",
      transmission: "Manual",
      withDriver: true,
      type: "Hatchback",
      year: "2019",
    },
    {
      manufacture: "Chevy",
      model: "Malibu",
      image: "car11.min.jpg",
      rentPerDay: 700000,
      capacity: 2,
      description:
        " Cloth covered headliner. Sentry Key theft deterrent system. Air conditioning w/in-cabin microfilter.",
      transmission: "Automatic",
      withDriver: false,
      type: "Coupe",
      year: "2019",
    },
    {
      manufacture: "BMW",
      model: "X3",
      image: "car12.min.jpg",
      rentPerDay: 800000,
      capacity: 4,
      description: " Multi-reflector halogen headlamps. Speed control.",
      transmission: "Automanual",
      withDriver: true,
      type: "Passenger Van",
      year: "2018",
    },
    {
      manufacture: "Chevy",
      model: "Malibu",
      image: "car13.min.jpg",
      rentPerDay: 900000,
      capacity: 6,
      description:
        " Leather-wrapped shift knob. Dual front illuminated visor vanity mirrors. Battery saver. Driver & front passenger map pockets.",
      transmission: "CVT",
      withDriver: true,
      type: "SUV",
      year: "2017",
    },
    {
      manufacture: "Chevy",
      model: "Malibu",
      image: "car14.min.jpg",
      rentPerDay: 700000,
      capacity: 2,
      description:
        " Front/rear side curtain airbags. Front & rear side curtain airbags. Body color front license plate brow. Rear body-color spoiler.",
      transmission: "Manual",
      withDriver: false,
      type: "Regular Cab Pickup",
      year: "2020",
    },
    {
      manufacture: "Lincoln",
      model: "MKS",
      image: "car15.min.jpg",
      rentPerDay: 900000,
      capacity: 4,
      description:
        " Remote fuel lid release. Electronic parking brake. Daytime running lights (DRL). Silver finish interior door handles. Back-up camera.",
      transmission: "Automanual",
      withDriver: true,
      type: "Regular Cab Pickup",
      year: "2017",
    },
    {
      manufacture: "Chevy",
      model: "Silverado",
      image: "car16.min.jpg",
      rentPerDay: 200000,
      capacity: 6,
      description:
        " Rear window defroster. High performance suspension. 1.8L DOHC 16-valve I4 engine -inc: engine cover.",
      transmission: "Automanual",
      withDriver: true,
      type: "Convertible",
      year: "2021",
    },
    {
      manufacture: "Lincoln",
      model: "MKS",
      image: "car17.min.jpg",
      rentPerDay: 1000000,
      capacity: 2,
      description:
        " Energy absorbing steering column. 3-point ELR/ALR front passenger seat belt w/pretensioner & load limiter.",
      transmission: "Automanual",
      withDriver: false,
      type: "Regular Cab Pickup",
      year: "2015",
    },
    {
      manufacture: "Dodge",
      model: "Ram",
      image: "car18.min.jpg",
      rentPerDay: 700000,
      capacity: 6,
      description:
        " 3-point ELR/ALR front passenger seat belt w/pretensioner & load limiter. Rear passenger map pockets. Black roof molding.",
      transmission: "CVT",
      withDriver: false,
      type: "Sedan",
      year: "2014",
    },
    {
      manufacture: "Ford",
      model: "F150",
      image: "car19.min.jpg",
      rentPerDay: 600000,
      capacity: 6,
      description: "",
      transmission: "Automatic",
      withDriver: false,
      type: "Convertible",
      year: "2021",
    },
    {
      manufacture: "Audi",
      model: "A4",
      image: "car20.min.jpg",
      rentPerDay: 700000,
      capacity: 6,
      description:
        " Pwr accessory delay. Tire pressure monitoring system (TPMS). Tilt/telescoping steering column.",
      transmission: "Automatic",
      withDriver: false,
      type: "Crew Cab Pickup",
      year: "2012",
    },
    {
      manufacture: "Dodge",
      model: "Durango",
      image: "car21.min.jpg",
      rentPerDay: 400000,
      capacity: 6,
      description:
        " Floor carpeting. Electric speed-sensitive variable-assist pwr steering. Dana 44/226mm rear axle. Roof mounted antenna.",
      transmission: "Manual",
      withDriver: false,
      type: "SUV",
      year: "2013",
    },
    {
      manufacture: "Audi",
      model: "S5",
      image: "car22.min.jpg",
      rentPerDay: 300000,
      capacity: 6,
      description:
        " Pwr front vented disc/rear drum brakes. Pwr windows -inc: 1-touch open/close. Cloth covered headliner.",
      transmission: "Automatic",
      withDriver: false,
      type: "Coupe",
      year: "2020",
    },
    {
      manufacture: "Toyota",
      model: "Camry",
      image: "car23.min.jpg",
      rentPerDay: 200000,
      capacity: 6,
      description:
        " Intermittent rear wiper w/washer. Energy absorbing front/rear bumpers. Engine mounts -inc: (2) solid, (1) liquid-filled.",
      transmission: "Automatic",
      withDriver: false,
      type: "Extended Cab Pickup",
      year: "2022",
    },
    {
      manufacture: "Nissan",
      model: "Pathfiner",
      image: "car24.min.jpg",
      rentPerDay: 600000,
      capacity: 6,
      description:
        " 200mm front axle. Roof mounted antenna. Cargo compartment cover. Rear bench seat -inc: (3) adjustable headrests.",
      transmission: "Automatic",
      withDriver: false,
      type: "Sedan",
      year: "2022",
    },
    {
      manufacture: "Honda",
      model: "Civic",
      image: "car25.min.jpg",
      rentPerDay: 1000000,
      capacity: 2,
      description:
        " Electric speed-sensitive variable-assist pwr steering. Steel side-door impact beams. Dual bright exhaust tips.",
      transmission: "CVT",
      withDriver: false,
      type: "Wagon",
      year: "2015",
    },
  ];

  const carEntities = await Promise.all(
    cars.map(async (car) => {
      const filePath = path.resolve(
        __dirname,
        "../../public/assets/uploads",
        car.image
      );
      console.log(filePath);
      const result = await uploadToCloudinary(filePath);
      const newCar = new Car();
      newCar.model = car.model;
      newCar.manufacture = car.manufacture;
      newCar.year = car.year;
      newCar.capacity = car.capacity;
      newCar.transmission = car.transmission;
      newCar.withDriver = car.withDriver;
      newCar.description = car.description;
      newCar.rentPerDay = car.rentPerDay;
      newCar.imagePublicId = result.public_id;
      newCar.imageURL = result.secure_url;
      return newCar;
    })
  );

  await dataSource.manager.save(carEntities);
  console.log(`${cars.length} cars have been inserted`);
}
