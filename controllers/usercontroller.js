// import the express framework and access the router() method, assigning it to the variable called router.
const router = require('express').Router();
// impor the user model through our db.js and store it in User variable.
const User = require('../db').import('../models/usermodel');

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
        password: req.body.user.password,
    })
    .then(
        res.send("User created successfully!")
    );
 })

// export the module for usage outside of the file
module.exports = router;