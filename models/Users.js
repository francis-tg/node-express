const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Database")

class Users extends Model{}
    Users.init({
        username:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        fname:{
            type: DataTypes.STRING
        },
        lname:{
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        verification:{
            type: DataTypes.STRING
        },
        isVerify:{
            type:DataTypes.BOOLEAN
        }
    },{
        sequelize,
        modelName: 'users'
    })

module.exports = Users