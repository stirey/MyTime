// we will be interacting with the token assigned to each session so import jwt package
const jwt = require('jsonwebtoken');
//importing user model so we can communicate with database
const User = require('../db').import('../models/usermodel');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token-->', token);
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided" })
    } else {
//verify decodes token>>JWT secret so method can decrypt the token>>decode token has decoded payload if successful
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken -->', decodeToken)
            if (!err && decodeToken) {
                //findOne>>sequelize method
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {
                    console.log('user -->', user)
                    if (!user) throw err;
                    console.log('req -->', req)
                    req.user = user;
                    //next exits us out of this function
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;

// RESOURCES
// https://expressjs.com/en/guide/using-middleware.html#middleware.router