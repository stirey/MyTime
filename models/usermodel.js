// the model is exported to allow sequelize to create the users table with the appropriate columns listed below
// annonynomous function is ran with two parameters , sequelize and datatypes. The function will return the value of what is created by sequelize.define()
module.exports = function (sequelize, DataTypes) {
    // use the sequelize object to call the define method. .define will map model properties in the server file to a table in postgres. learn more here: https://sequelize.org/master/manual/model-basics.html
    // 'user' will become a table called users in postgres
    const User = sequelize.define('user', {
        // the arguments below are objects. The key/value pairs in the following objects will become columns of the table.
        // datatypes is a paramter in the function brought in through sequelize. 
        //sequelize datatype here>> https://sequelize.org/master/manual/model-basics.html#data-types
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {notEmpty: true}
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {notEmpty: true}
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {notEmpty: true}
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {notEmpty: true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty: true}
        }
        
    })
    return User;
}