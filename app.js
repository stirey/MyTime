// requiring the use of express npm package that I've installed in my dependencies
let express = require('express');
// create an instance of express to fire off a top-level express() function. This allow us to create an Express app.
let app = express();

//will use express to start a UNIX socket and listen for connections on the given path(localhost:3000)
app.listen(3000, function(){
    console.log('App is listening on port 3000')
})