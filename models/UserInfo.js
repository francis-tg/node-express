const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Database")

class UserInfo extends Model{
   static associate(models){
       UserInfo.belongsTo(models.Users, {
           foreignKey: "userId",
           onDelete: "CASCADE"
       })
       UserInfo.hasMany(models.Cours,{
           foreignKey:"coursId"
       })
   }
}
    UserInfo.init({
        level:{
            type: DataTypes.STRING
        },
        cours:{
            type: DataTypes.STRING
        },
        payed:{
            type: DataTypes.BOOLEAN
        }
    },{
        sequelize,
        modelName: 'usersinfo'
    })

module.exports = UserInfo