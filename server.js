import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
    { id: nanoid(), company: 'facebook', position: 'full-stack' },
    { id: nanoid(), company: 'amazon', position: 'devops' },
    { id: nanoid(), company: 'microsoft', position: 'data scientist' },
];

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

//GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
    res.status(200).json({ jobs });
});

//CREATE A JOB
app.post('/api/v1/jobs', (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ msg: 'Please provide company and position'});
    }
    const id = nanoid(10);
    const job = { id, company, position };
    jobs.push(job);
    res.status(201).json({ job });
});

//GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;
    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `Job not found with id: ${id}`});
    }
    res.status(200).json({ job });
});

// EDIT JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ msg: 'please provide company and position' });
    }
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }

    job.company = company;
    job.position = position;
    res.status(200).json({ msg: 'job modified', job });
});

// DELETE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }
    const newJobs = jobs.filter((job) => job.id !== id);
    jobs = newJobs;

    res.status(200).json({ msg: 'job deleted' });
});

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

