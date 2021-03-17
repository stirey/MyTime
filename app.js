// WELCOME TO MY OVER-COMMENTED PROJECT!!! I PLAN TO CLEAN UP ALL THE COMMENTS IN THE FUTURE, BUT FOR NOW IT HELPS ME BETTER ABSORB HOW ALL THE PIECES WORK TOGETHER :) THANK YOU FOR READING AND YOU ARE AWESOME! //

require('dotenv').config();
// requiring the use of express npm package that I've installed in my dependencies
let express = require('express');
// create an instance of express to fire off a top-level express() function. This allow us to create an Express app.
let app = express();
// this imports the db file
let sequelize = require('./db');
// importing the route object that I created and store in a variable called mytime
let mytime = require('./controllers/timecontroller')
let user = require('./controllers/usercontroller')
// this variable, .sync, will ensure that I synce all defined models to the DB
sequelize.sync();
// sequelize.sync({force: true})

// the below app.use statement must go above any routes or it won't be able to use express.json. It tells the application to use json as I process this request.
app.use(express.json());
// calling app.use in the first parameter to create a base URL called /mytime.
// the 2nd paramter for the use function, I pass in mytime. All routes created in timecontroller.js file will be sub-routes.
app.use('/mytime', mytime)
app.use('/user', user)



//will use express to start a UNIX socket and listen for connections on the given path(localhost:3000)
app.listen(3000, function(){
    console.log('App is listening on port 3000')
})