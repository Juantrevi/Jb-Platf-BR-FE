// import multer from 'multer';
//
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // cb is callback
//         cb(null, 'public/uploads');
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname;
//         // set the name of the uploaded file
//         cb(null, fileName);
//     },
// });
// const upload = multer({ storage });
//
// export default upload;

// Importing the necessary modules
import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

// Setting up multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Creating a new DataParser instance
const parser = new DataParser();

// Function to format the image file into a data URI
export const formatImage = (file) => {
    // Get the file extension
    const fileExtension = path.extname(file.originalname).toString();
    // Format the file into a data URI and return the content
    return parser.format(fileExtension, file.buffer).content;
};

// Export the multer upload middleware
export default upload;