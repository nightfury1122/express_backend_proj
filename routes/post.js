const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils')

const posts = [
    {
        name: "nightfury",
        post: "post 1",
    },
    {
        name: "hassan",
        post: "post 2",
    }
]

// Define the post route
router.get('/fetchPosts', authenticateToken,(req, res) => {
    res.json(posts.filter(post=> post.name === req.body.name))
});

module.exports = router;