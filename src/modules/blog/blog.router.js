import {Router} from 'express';

import blogmodel from '../../../DB/model/blog.model.js';
import usermodel from '../../../DB/model/user.model.js';
const app = Router();

app.get('/', async(req,res)=>{
    try{
    const blogs= await blogmodel.findAll();
    
    return res.status(200).json({message:"success",blogs})
}catch(error){
return res.status(500).json({message:"catch error"});
}
})




app.post('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        
        const user = await usermodel.findOne({
            where: { id: id },
            attributes: ['id','role'] 
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'admin') {
            return res.status(400).json({ message: "User not authorized to add blog" });
        }

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        await blogmodel.create({ title, description,userid:user.id });

        return res.status(201).json({ message: "Blog added successfully" });
    } catch (error) {
        return res.status(400).json({ message: "An error occurred while adding the blog" });
    }
});




app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        
        const user = await usermodel.findOne({
            where: { id: id },
            attributes: ['id', 'role']
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'admin') {
            return res.status(400).json({ message: "User not authorized to delete blog" });
        }

          
        const blog = await blogmodel.findOne({
            where: { title: title }
        });

        if (!blog) {
            return res.status(400).json({ message: "Blog not found" });
        }

         
        await blog.destroy();

        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        
        return res.status(400).json({ message: "An error occurred while deleting the blog" });
    }
});


app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
  
        const user = await usermodel.findOne({
            where: { id:id },
            attributes: ['id', 'role']
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'admin') {
            return res.status(400).json({ message: "User not authorized to update blog" });
        }

        
        const blog = await blogmodel.findOne({
            where: { title: title },
            attributes: ['id']

        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        
        await blogmodel.update(
            { description: description },
            {
                where: {
                    id: blog.id     
                }
            }
        );

        return res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        return res.status(400).json({ message: "An error occurred while updating the blog" });
    }
});


export default app;