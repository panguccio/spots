const jwt = require("jsonwebtoken");
const SECRET = "secretKey"


let verifyToken = function(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).send("Login required.");
    jwt.verify(token, SECRET, (error, decodedUser) => {
        if (error) {
            return res.status(401).send("Invalid token.");
        }
        req.user = decodedUser;
        next()
    })   
}

module.exports = { verifyToken, SECRET };