import {DataTypes } from'sequelize';
import {sequelize} from './../connection.js'
import usermodel from './user.model.js';
const blogmodel=sequelize.define('Blog',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true

    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    category:{
        type:DataTypes.STRING,
        defaultValue:"test"
    }
});
blogmodel.belongsTo(usermodel, { foreignKey: 'userid' });
usermodel.hasMany(blogmodel, { foreignKey: 'userid' });
export default blogmodel;
