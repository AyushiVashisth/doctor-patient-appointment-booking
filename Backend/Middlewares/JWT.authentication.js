
const jwt = require("jsonwebtoken")
require('dotenv').config()
const Auth = (req, res, next) => {
    const token = req.headers.authorization
    console.log("Received token:", token);

    let tok = token.split(" ")[1]
    if (tok) {
        jwt.verify(tok,process.env.secretKey, function (err, decoded) {
            if (decoded) {
                // req.body.userID = decoded.userId
                console.log("decode",decoded)
                next()
            } else {
                res.status(400).send({ "err": err })
            }
        });
    }
}
module.exports = Auth