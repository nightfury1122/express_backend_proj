const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../constants/appConstants');
const jwt = require('jsonwebtoken')

// Login route
router.post('/login', async (req, res) => { // This gets executed when the user visits http://localhost:3000/users/login
    const user = users.find(user => user.name === req.body.name);
    if (user == null) {
        return res.status(404).send("Cannot find user");
    }
    try {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.send(accessToken);
        } else {
            res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.log("in catch", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
