const jwt = require("jsonwebtoken");
const SECRET = "secretKey" // sarebbe meglio non salvato qui


let verifyToken = function(req, res, next) {
    // request header will be in the form: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).send("Login required.");
    jwt.verify(token, SECRET, (error, decodedUser) => {
        if (error) {
            return res.status(401).send("Invalid token.");
        }
        // this property can be used by next middleware to access the ID and username of the user
        req.user = decodedUser;
        next()
    })   
}

module.exports = verifyToken;