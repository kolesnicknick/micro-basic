const express = require('express');
const cors = require('cors');
const app = express();
const { randomBytes } = require('crypto');
const axios = require("axios");

// Middleware that parses body of incoming requests
app.use(express.json());
// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80', 'http://localhost:3001', 'http://localhost:3002'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options


const commentsByPostId = {};

app.post('/events', (req, res) => {
    console.log('Event received:', req.body.type);
    res.send({});
});

app.get('/posts/:id/comments/', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments/', (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: { id: commentId, content, postId: req.params.id }
    }).catch((err) => {
        console.log(err.message);
    });

    res.status(201).send(comments);
});


app.listen(3002, () => {
    console.log('Listening on port 3002')
});