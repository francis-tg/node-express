const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Database")

class Cours extends Model{
    static associate(models){
        Cours.belongsTo(models.Users, {
           foreignKey: "userId",
           onDelete: "CASCADE"
       })
    }
}
    Cours.init({
        name:{
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.STRING
        },
        dispo:{
            type: DataTypes.BOOLEAN
        }
    },{
        sequelize,
        modelName: 'cours'
    })

module.exports = Cours