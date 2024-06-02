import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/assets/uploads');
    },
    filename: (req, file, cb) => {
        const newFilename = `${Date.now()}-${file.originalname}`;
        cb(null, newFilename);
        req.body.image = newFilename;
    }
});

const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        const ext = file.originalname.split('.').pop();
        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
            return cb(new Error('Only images are allowed'));
        }
        cb(null, true);
    }
});

export default upload;