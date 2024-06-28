"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const CarController_1 = __importDefault(require("../controllers/CarController"));
const RefreshToken_1 = __importDefault(require("../controllers/RefreshToken"));
const VerfyToken_1 = __importDefault(require("../middlewares/VerfyToken"));
const Upload_1 = __importDefault(require("../middlewares/Upload"));
const DTOValidator_1 = __importDefault(require("../middlewares/DTOValidator"));
const UserRegister_1 = __importDefault(require("../dtos/UserRegister"));
const CarRegister_1 = __importDefault(require("../dtos/CarRegister"));
const router = (0, express_1.Router)();
const userController = new UserController_1.default();
const carController = new CarController_1.default();
// User routes
router.post('/user', (0, DTOValidator_1.default)(UserRegister_1.default), userController.registerUser);
router.post('/user/login', userController.loginUser);
router.post('/user/logout', (0, VerfyToken_1.default)('PUBLIC'), userController.logoutUser);
router.get('/user/list', (0, VerfyToken_1.default)('ADMIN', 'SUPER_ADMIN'), userController.getAllUsers);
router.get('/user/profile', (0, VerfyToken_1.default)('PUBLIC'), userController.getUserProfile);
router.delete('/user/delete', (0, VerfyToken_1.default)('USER', 'ADMIN'), userController.deleteUser);
//refreshToken
router.get('/refresh-token', RefreshToken_1.default.refreshToken);
// Car routes
router.post('/car', (0, VerfyToken_1.default)('ADMIN', 'SUPER_ADMIN'), Upload_1.default.single("image"), (0, DTOValidator_1.default)(CarRegister_1.default), carController.addCar);
router.get('/car/list', (0, VerfyToken_1.default)('PUBLIC'), carController.getCars);
router.get('/car/:id', (0, VerfyToken_1.default)('PUBLIC'), carController.getCarById);
router.put('/car/:id', (0, VerfyToken_1.default)('ADMIN', 'SUPER_ADMIN'), Upload_1.default.single("image"), carController.updateCar);
router.delete('/car/:id', (0, VerfyToken_1.default)('ADMIN', 'SUPER_ADMIN'), carController.deleteCar);
exports.default = router;
