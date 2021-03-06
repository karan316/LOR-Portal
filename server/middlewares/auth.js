const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied");

    try {
        const decoded = jwt.verify(token, config.get("SECRET_KEY"));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}

module.exports = auth;
