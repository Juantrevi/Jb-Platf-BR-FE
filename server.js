import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log('Development mode');
    //console.log(process.env.MY_SECRET);
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Data received', data: req.body});
});


const port = process.env.PORT || 5100;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

