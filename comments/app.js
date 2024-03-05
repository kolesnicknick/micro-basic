const express = require('express');
const app = express();
const { randomBytes } = require('crypto');

// Middleware that parses body of incoming requests
app.use(express.json());

const commentsByPostId = {};


app.get('/posts/:id/comments/', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments/', (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    const { comment } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, comment });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});


app.listen(3002, () => {
    console.log('Listening on port 3002')
});