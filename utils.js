
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    // getting the request headers
    // from the request headers we get the authorization header
    const authHeader = req.headers['authorization']

    // separating the bearer from the token fetched from the auth header
    const token = authHeader && authHeader.split(' ')[1]

    // token not sent error code 401
    if (token == null) return res.sendStatus(401)

    // jwt.verify takes in the token , the secret that we used to create the token and a callback
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // first we check if there is an error we send 403 meaning the token is no longer valid
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
module.exports = authenticateToken