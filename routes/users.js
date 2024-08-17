const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const users = require('../constants/appConstants')

// Define the cake route
router.get('/fetchUsers', (req, res) => {
    res.send(users); // This gets executed when the user visits http://localhost:3000/users
});

//User creation route

router.post('/createUsers', async (req, res) => {
    try {
        // generating a salt to use in the hash
        const salt = await bcrypt.genSalt()
        //hashing the password
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // using the hashed password in the request body 
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send("user created")
    }
    catch {
        res.status(500).send()
    }

})

module.exports = router;