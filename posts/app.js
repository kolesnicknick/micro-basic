const express = require('express');
const app = express();
const cors = require('cors');
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
    res.status(201).send(posts);
});


app.listen(3001, () => {
  console.log('Listening on port 3001')
});