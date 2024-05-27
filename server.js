import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import jobRouter from './routes/jobRouter.js';



dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log('Development mode');
    //console.log(process.env.MY_SECRET);
}

app.use(express.json());

/*
* Example: Fetch API
* This is a way of fetching an API from a server
* No need to use anything extra like axios
* */
// fetch('https://www.course-api.com/react-useReducer-cart-project')
//     .then(res => res.json())
//     .then(data => console.log(data));

/*
* Example: Top level AWAIT in Node.js
* We can right away use await in the top level of the file
* whenever we need (Feature used when connecting to a DB)
* */
// try {
//     const data = await fetch('https://www.course-api.com/react-useReducer-cart-project');
//     const dataJson = await data.json();
//     console.log(dataJson);
// }catch (e) {
//     console.log(e);
// }

//Regular GET request
app.get('/', (req, res) => {
    res.send('Hello world')
});

//Regular POST request
app.post('/', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Data received', data: req.body});
});

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

//This middleware has to be the LAST ONE!
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
});

// Configuring the port
const port = process.env.PORT || 5100;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

