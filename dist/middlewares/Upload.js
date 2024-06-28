"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/assets/uploads');
    },
    filename: (req, file, cb) => {
        const newFilename = `${Date.now()}-${file.originalname}`;
        cb(null, newFilename);
        req.body.image = newFilename;
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter(req, file, cb) {
        const ext = file.originalname.split('.').pop();
        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
            return cb(new Error('Only images are allowed'));
        }
        cb(null, true);
    }
});
exports.default = upload;
