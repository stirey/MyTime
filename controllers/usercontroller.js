

// import the express framework and access the router() method, assigning it to the variable called router.
const router = require('express').Router();
// impor the user model through our db.js and store it in User variable.
const User = require('../db').import('../models/usermodel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

/*********************
 **** USER SIGNUP ****
 *********************/

 router.post('/create', function (req, res) {
    // .create is a sequlize method that allows us to create an instance of the User model and send it off to the database as long as datatypes match the model.
    User.create({
        // req.body is middleware provided by Express
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        occupation: req.body.user.occupation,
        email: req.body.user.email,
        // hashsync is a brcrypt function that hashes the password. It will salt it (salt is an algorithm) x 13
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function createSuccess(user) {
            // this variable creates and stores the token
            let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'});
            // res.json will create a json object with the response
            res.json({
                // left user is name of object, right user is the parameter from our createSuccess() function.
                user: user,
                message: 'User successfully created!',
                sessionToken: token
            });
        }      
    )
    // if a promise gets rejected .catch method captures error and sends a 500 error with jsonified message
    .catch(err => res.status(500).json({ error: err }))
 });


 /*********************
 **** USER LOGIN ****
 *********************/
// router >> method(.post) >> path(/login)
router.post('/login', function(req, res) {
    // findOne is a sequelize method finds something within the database >> data retrieval
    User.findOne({
        // where is an object within sequelize tells database to look for something matching its props
        where: {
            email: req.body.user.email
        }
    }) .then(function loginSuccess(user) {

        if (user) {
        // data to compare,>>data to be compared to,>>callback receiving error>> otherwise the result
            bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                if(matches) {
                   let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'}) 
                  
                   res.status(200).json({
                    user: user,
                    message: "User successfully logged in! ",
                    sessionToken: token
                    })   
                } else {
                    res.status(502).send({ error: "Login failed"});//capture & add on client side
                }
            });          
        } else {
            res.status(500).json({ error: 'User does not exist'})
        }      
    })
    .catch(err => res.status(500).json({ error: err}))
});

// export the module for usage outside of the file
module.exports = router;

// RESOURCES
// https://www.npmjs.com/package/bcryptjs#compares-hash-callback-progresscallback