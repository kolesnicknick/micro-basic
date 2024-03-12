const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {

    const event = req.body;
    console.log(event);
    //Posts service
    axios.post('http://localhost:3001/events', event).catch((err) => {
        console.log('Posts')
        console.log(err.message);
    });

    //Comments service
    axios.post('http://localhost:3002/events', event).catch((err) => {
        console.log('Comments')
        console.log(err.message);
    });

    //Query service
    axios.post('http://localhost:3003/events', event).catch((err) => {
        console.log('Query')
        console.log(err.message);
    });

    res.send({ status: 'OK' });
});


app.listen(4005, () => {
    console.log('Listening on 4005 - Event Bus');
});

