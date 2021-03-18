module.exports = function (sequelize, DataTypes) {

    const WorkEntry = sequelize.define('workentry', {
        
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty: true}
        },
        clockin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {notEmpty: true}
        },
        clockout: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {notEmpty: true}
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty: true}
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rateofpay: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {notEmpty: true}
        },
        userId: {
            type: DataTypes.INTEGER,
        }
    })
    return WorkEntry;
}