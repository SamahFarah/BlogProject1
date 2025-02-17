import { DataTypes } from'sequelize';
import {sequelize} from './../connection.js'
const usermodel=sequelize.define('User',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    confirmemail:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:"user"
    }
});

export default usermodel;