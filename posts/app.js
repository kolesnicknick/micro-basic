const express = require('express');
const app = express();
const { randomBytes } = require('crypto');

// Middleware that parses body of incoming requests
app.use(express.json());

const posts = {};


app.get('/posts', (req, res) => {
  res.send(posts)
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { title };
    res.status(201).send(posts);
});


app.listen(3001, () => {
  console.log('Listening on port 3001')
});