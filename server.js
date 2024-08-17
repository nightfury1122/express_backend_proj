const express = require('express');
require('dotenv').config(); // import to load your environment variables 

const app = express();
app.use(express.json())

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Import the routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

// Use the cake route
app.use('/users', userRoute, authRoute);
app.use('/', postRoute)

const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});