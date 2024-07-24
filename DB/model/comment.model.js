import {DataTypes } from'sequelize';
import {sequelize} from './../connection.js'
import usermodel from './user.model.js';
import blogmodel from './blog.model.js';
const commentmodel=sequelize.define('Comment',{
   
    commentdescription:{
        type:DataTypes.STRING,
        allowNull:true
    }
});
commentmodel.belongsTo(usermodel, { foreignKey: 'userid' });
usermodel.hasMany(commentmodel, { foreignKey: 'userid' });
commentmodel.belongsTo(blogmodel, { foreignKey: 'blogid' });
blogmodel.hasMany(commentmodel, { foreignKey: 'blogid' });
export default commentmodel;