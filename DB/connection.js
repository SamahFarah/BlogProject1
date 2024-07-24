import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('freedb_blogproj2', 'freedb_samahfarah', 'Z7W#KkEsnhrqV2y', {
    host: 'sql.freedb.tech',
    dialect: 'mysql',
    port:3306
   
  });


  export const connectDB= async()=>{
    try{
    return await sequelize.sync({alter:true});

  }catch(error){
    console.log("error to connect DB",error)
  }

  }

  export default connectDB;