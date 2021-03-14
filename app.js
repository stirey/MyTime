// requiring the use of express npm package that I've installed in my dependencies
let express = require('express');
// create an instance of express to fire off a top-level express() function. This allow us to create an Express app.
let app = express();
// importing the route object that I created and store in a variable called mytime
let mytime = require('./controllers/timecontroller')



// calling app.use in the first parameter to create a base URL called /mytime.
// the 2nd paramter for the use function, I pass in mytime. All routes created in timecontroller.js file will be sub-routes.
app.use('/mytime', mytime)



//will use express to start a UNIX socket and listen for connections on the given path(localhost:3000)
app.listen(3000, function(){
    console.log('App is listening on port 3000')
})