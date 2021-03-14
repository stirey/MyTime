module.exports = function (sequelize, DataTypes) {

    const User = sequelize.define('user', {

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
        },
        customerinfo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {notEmpty: true}
        }
    })
    return User;
}