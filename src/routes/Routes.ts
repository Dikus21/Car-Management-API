import {Router} from "express";
import UserController from "../controllers/UserController";
import CarController from "../controllers/CarController";
import RefreshToken from "../controllers/RefreshToken";
import verifyToken from "../middlewares/VerfyToken";
import upload from "../middlewares/Upload";
import validateDTO from "../middlewares/DTOValidator";
import UserRegister from "../dtos/UserRegister";
import CarRegister from "../dtos/CarRegister";


const router = Router();
const userController = new UserController();
const carController = new CarController();


// User routes
router.post('/user', validateDTO(UserRegister),userController.registerUser);
router.post('/user/login', userController.loginUser);
router.post('/user/logout', verifyToken('PUBLIC'),userController.logoutUser);
router.get('/user/list', verifyToken('ADMIN', 'SUPER_ADMIN'), userController.getAllUsers);
router.get('/user/profile', verifyToken('PUBLIC'), userController.getUserProfile);
router.delete('/user/delete', verifyToken('USER', 'ADMIN'), userController.deleteUser);

//refreshToken
router.get('/refresh-token', RefreshToken.refreshToken);

// Car routes
router.post('/car', verifyToken('ADMIN', 'SUPER_ADMIN'),  upload.single("image"), validateDTO(CarRegister),carController.addCar);
router.get('/car/list', verifyToken('PUBLIC'), carController.getCars);
router.get('/car/:id', verifyToken('PUBLIC'), carController.getCarById);
router.put('/car/:id', verifyToken('ADMIN', 'SUPER_ADMIN'), upload.single("image"), carController.updateCar);
router.delete('/car/:id', verifyToken('ADMIN', 'SUPER_ADMIN'), carController.deleteCar);


export default router;