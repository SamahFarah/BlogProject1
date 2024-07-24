import {Router} from 'express';
import usermodel from '../../../DB/model/user.model.js';
import blogmodel from '../../../DB/model/blog.model.js';
import commentmodel from '../../../DB/model/comment.model.js';

import jwt from 'jsonwebtoken';

const app = Router();

app.get('/', async(req,res)=>{
    try{
   
    const users = await usermodel.findAll({
        attributes:['name','email']
    });
    return res.status(200).json({message:"success",users:users})
}catch(error){
return res.status(500).json({message:"catch error",error});
}
})




app.delete('/:id',async(req,res)=>{
   
    const {id}=req.params;
    const user = await usermodel.destroy({
        where:{
            id:id
        }
    });
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
return res.status(200).json({message:"success"})
});

app.put('/:id',async(req,res)=>{
   
    const {id} =req.params;
    const {name}= req.body;
    const user =await usermodel.update(
        {name:name},{
            where:{
                id:id
            }
        }
    );
    if(!user[0]){

      return res.status(404).json({message:"user not found"})
    }
return res.status(200).json({message:"success"})
});


export default app;