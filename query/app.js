const express = require('express');
const cors = require('cors');
const app = express();
const { randomBytes } = require('crypto');

// Middleware that parses body of incoming requests
app.use(express.json());
// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80', 'http://localhost:3001', 'http://localhost:3002'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options

const posts = {};

app.get('/posts/', (req, res) => {
    res.send(posts);
});

app.post('/events/', (req, res) => {
    console.log('Event received:', req.body);
    if (req.body.type === 'PostCreated') {
        const { id, title } = req.body.data;
        posts[id] = { id, title, comments: [] };
    }
    if (req.body.type === 'CommentCreated') {
        const { id, content, postId } = req.body.data;
        const post = posts[postId];
        post.comments.push({ id, content });
    }

    res.status(201).send('SUCCESS');
});

app.listen(3003, () => {
    console.log('QUERY: Listening on port 3003')
});