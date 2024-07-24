import {Router} from 'express';
import usermodel from '../../../DB/model/user.model.js';
import blogmodel from '../../../DB/model/blog.model.js';
import commentmodel from '../../../DB/model/comment.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const app = Router();

app.post('/', async (req,res)=>{

    const{name,email,password,role}=req.body;
    var passwordHashed = bcrypt.hashSync(password,8);
    await usermodel.create({name, email,password:passwordHashed,role} );
    return res.status(201).json({message:"success"});
})

app.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    const user= await usermodel.findOne({
        where:{
            email:email
        }
    });
    if(!user){
        return res.status(400).json({message:"email not found"})
    }
    const check = await bcrypt.compare(password,user.password);
    if(!check){
        return res.status(400).json({message:"invalid password"})
    }


 const token = jwt.sign({id:user.id,username:user.name,role:user.role},'soso');


    return res.status(200).json({message:"success",token})
});




export default app;