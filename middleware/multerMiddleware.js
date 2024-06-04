import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb is callback
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        // set the name of the uploaded file
        cb(null, fileName);
    },
});
const upload = multer({ storage });

export default upload;