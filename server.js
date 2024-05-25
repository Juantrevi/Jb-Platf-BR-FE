import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.listen(5100, () => {
    console.log('Server is running on http://localhost:5100');
});

