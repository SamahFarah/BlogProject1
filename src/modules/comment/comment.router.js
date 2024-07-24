import {Router} from 'express';

import blogmodel from '../../../DB/model/blog.model.js';
import usermodel from '../../../DB/model/user.model.js';
import commentmodel from '../../../DB/model/comment.model.js';
const app = Router();

app.get('/', async(req,res)=>{
    try{
    const comment=await commentmodel.findAll();
    
    return res.status(200).json({message:"success",comment})
}catch(error){
return res.status(500).json({message:"catch error"});
}
})

app.post('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await usermodel.findOne({
        where: { id: id },
        attributes:['name']
    });

    if (!user) {
        return res.status(400).json({ message:"this user not found" });
    }

    const { title, commentdescription } = req.body;


    const blog = await blogmodel.findOne({
        where: { title: title },
        attributes:['id']

    });

    if (!blog) {
        return res.status(400).json({ message: "this blog not found"});
    }

  await commentmodel.create({
        commentdescription: commentdescription,
        userid: id,
        blogid:blog.id  
       
    });
    

    return res.status(201).json({ message: "comment descreption  added by:" ,name:user.name });
});







app.delete('/:id', async (req, res) => {
    const {id } = req.params;

    try {
        
        const comment = await commentmodel.findOne({
            where: { id: id }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

      
        await comment.destroy();

        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        
        return res.status(500).json({ message: "An error occurred while deleting the comment" });
    }
});


export default app;