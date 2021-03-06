
// importing the Express framework and store it inside the variable express. This becomes the gateway to using Express methods.
let express = require('express');
// we are using the express variable from above to access the Router() method. This will return a router object. 
//https://expressjs.com/en/4x/api.html#router
let router = express.Router();
const WorkEntry = require('../db').import('../models/timemodel');

// using the router object by using the router variable to get access into the Router() object methods.
// .get is one of the methods in the object and I call it here. This method allows me to complete an HTTP GET request.
//two arguments are passed into the .get method. /practice is the path. The second is a callback function(handler function)
// the callback function gets called when the application receives a request to the specified route and HTTP method. The app listens for requests that match the specified route(s) and method(s) and calls the specified callback function when it detects a match. 
router.get('/practice', function(req, res) {
    // .send is an express method that can be called on the res object. The response parameter is a simple string.
    res.send('This is a practice route')
})

/*******************
 *WORKENTRY CREATE*
 *******************/

router.post('/create', (req, res) => {
    const work = {
        date: req.body.workentry.date,
        clockin: req.body.workentry.clockin,
        clockout: req.body.workentry.clockout,
        task: req.body.workentry.task,
        description: req.body.workentry.description,
        rateofpay: req.body.workentry.rateofpay,
        userId: req.user.id
    }
    WorkEntry.create(work)
        .then(workentry => res.status(200).json(workentry))
        .catch(err => res.status(500).json({ error: err}))
})


/*******************
 *WORKENTRY VIEW*
 *******************/
 router.get('/', (req, res) => {
    WorkEntry.findAll()
    //look up orderquery on sequelize...findall look at docs.
    .then(workentry => res.status(200).json(workentry))
    .catch(err => res.status(500).json({ error: err }))
});




 /****************************
 *WORKENTRY UPDATE BY ENTRY ID*
 ******************************/
// this is working
router.put('/update/:entryId', (req, res) => {
    const updateWorkEntry = {
        date: req.body.workentry.date,
        clockin: req.body.workentry.clockin,
        clockout: req.body.workentry.clockout,
        task: req.body.workentry.task,
        description: req.body.workentry.description,
        rateofpay: req.body.workentry.rateofpay,
        userId: req.user.id
    }
    
    const query = { where: { id: req.params.entryId, userId: req.user.id }};

    WorkEntry.update(updateWorkEntry, query)
    .then((workentry) => res.status(200).json(workentry))
    .catch(err => res.status(500).json({ error: err}))
})


 /*******************
 *WORKENTRY DELETE*
 *******************/
// this is working
router.delete('/delete/:entryId',(req, res) => {
 
    const query = { where: { id: req.params.entryId, userId: req.user.id }};

    WorkEntry.destroy(query)
    .then(() => res.status(200).json({ message: "Work entry removed"}))
    .catch((err) => res.status(500).json({ error: err}));
});
// exporting the module for usage outside the file. 
module.exports = router