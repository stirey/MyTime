// importing the sequelize package
const Sequelize = require('sequelize');
// creating an instance of Sequelize for use in the module with the sequelize variable
// use the constructor to create a new sequelize object
//identify the db table to connect to
// username for the db
//password for the local db
const sequelize = new Sequelize('my-time', 'postgres', 'password', {
    host: 'localhost', // point to the local port for sequelize - port 5432
    dialect: 'postgres' // identify the QL dialect being used 
});
// use the sequelize variable to access methods then call the authenticate method which returns a promise (.then())
sequelize.authenticate().then(
    //firing a function that shows if we're connected
    function() {
        console.log('Connected to my-time postgres database');
    },
    // fire an error if there are any errors
    function(err){
        console.log(err);
    }
);
// export the module
module.exports = sequelize;

