const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
});

const { randomBytes } = require('crypto');

// Middleware that parses body of incoming requests
app.use(express.json());

const posts = {};

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80', 'http://localhost:3001', 'http://localhost:3002'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options


app.get('/posts', (req, res) => {
  res.send(posts)
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };

    // Emit an event to the event bus
    axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: { id, title }
    }).catch((err) => {
        console.log(err.message);
    });

    res.status(201).send(posts);
});


app.post('/events', (req, res) => {
    console.log('Event received:', req.body.type);
    res.send({});
});

app.listen(3001, () => {
  console.log('Listening on port 3001')
});