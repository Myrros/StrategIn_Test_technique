const jwt = require("jsonwebtoken");

// This middleware is used for authentification.
// It will get the token and extracts the user ID from it as it knows the key with which the usedID was salted before being hashed into the token.
module.exports = (req, res, next) => {
    console.log("An user tries to authentificate himself:")
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'STRATEGIN');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId != userId) {
            console.log("Invalid ID:");
            console.log(req.body.userId);
            throw 'Invalid user ID';
        } else {
            console.log("User is authentificated:");
            console.log(userId);
            next();
        }
    } catch {
        console.log("Invalid request, could not authentificate.");
        res.status(401).json({
            error : new Error('Invalid request, could not authentificate.')
        });
    }
};