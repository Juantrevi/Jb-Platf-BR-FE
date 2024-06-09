import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from './routes/jobRouter.js';
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRouter.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from 'cloudinary';


/*
* Considerations:
* In this project the libraries used are:
* - http-status-codes (res.status(200).json({ jobs }); -> res.status(StatusCodes.OK).json({ jobs });)
* - express-async-errors
* - 404 is handled in a custom class
* - express-validator
* - Bcrypt for password hashing (npm i bcryptjs)
* - dotenv for environment variables
* - mongoose for MongoDB
* - JWT for authentication (npm i jsonwebtoken) (HTTP cookies -> a very way to secure communication back and forth)
* - package to allow us to access the cookie parser (npm i cookie-parser)
* - concurrently to run the server and the client at the same time (npm i concurrently) in package.json
* - axios for fetching data from an API (npm i axios)
* - toasts for notifications (npm i react-toastify)
* - dayjs for date formatting (npm i dayjs) There are some default and custom formats
* - multer for file uploads (npm i multer)
* - cloudinary for image uploads (npm i cloudinary)
* - mockaroo for generating fake data (https://www.mockaroo.com/)
* - mongoDb aggregation pipeline: Is a way to process data from a collection and return computed results inside mongodb (https://docs.mongodb.com/manual/aggregation/)
* - recharts for data visualization (npm i recharts)
* - queryparams for search, URL params. Used to pass info to a web server through the URL (npm i query-string)
* - react query for data fetching npm i @tanstack/react-query @tanstack/react-query-devtools IMPORTANT: react-query is a library that allows you to fetch, cache and update data in your React application. It is a way to manage the state of your application in a way that is easy to use and understand.
*
 */

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log('Development mode');
    //console.log(process.env.MY_SECRET);
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// This is a way to get the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// Special middleware available with express to serve static files
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cookieParser());
app.use(express.json());


app.use('/api/v1/jobs',authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

// For production
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

// Configuring the port
const port = process.env.PORT || 5100;

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
});

//Connecting to the DB
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}




