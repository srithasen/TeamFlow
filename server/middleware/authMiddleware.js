const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: "Access denied. No token provided"
        });

    }

    // EXPECTS: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Invalid token format"
        });

    }

    try {

        const verified = jwt.verify(
            token,
            "teamflow_secret_key"
        );

        req.user = verified;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};


module.exports = authMiddleware;