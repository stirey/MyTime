

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
        function createSuccess(user) {
            // res.json will create a json object with the response
            res.json({
                // left user is name of object, right user is the parameter from our createSuccess() function.
                user: user
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
            email: req.body.user.email,
            password: req.body.user.password
        }
    }) .then(function loginSuccess(user) {

        if (user) {
             res.status(200).json({
            user: user
        })
        } else {
            res.status(500).json({ error: 'User does not exist'})
        }      
    })
    .catch(err => res.status(500).json({ error: err}))
});

// export the module for usage outside of the file
module.exports = router;