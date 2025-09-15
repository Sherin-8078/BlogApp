const express = require('express')
const router = express.Router()
const posts = require('../Model/blogData')
router.use(express.json())
router.use(express.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    let token = req.headers.token
    try{
        if(!token) throw "Unauthorised Access"
        let payload = jwt.verify(token,"secret")
        if(!payload) throw "Unauthorised Access"
        next()

    }catch (err){
        res.json({message:err})
    }
}

router.get('/',async(req,res)=>{
    try{
        const data = await posts.find()
        res.status(200).send(data)
    }catch(error){
        console.error(error)
        res.status(500).send(' Data not found')
    }
})

router.post('/add',verifyToken,async(req,res)=>{
    try{
        const post = req.body
        const data = await posts(post).save()
        
        res.status(200).send({ message:"Blog added",blogs:data})
    }catch(error){
        console.error(error)
        res.status(500).send('Failed to add blog')
    }
})

router.delete('/delete/:id', verifyToken,async(req,res)=>{
    try{
        const id = req.params.id;
        await posts.findByIdAndDelete(id);
        res.status(200).send({ message:"Blog removed"})
    }catch(error){
        console.error(error)
        res.status(500).send('Failed to remove blog')
    }
})

router.put("/update/:id", verifyToken,async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPost = await posts.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPost) {
            return res.status(404).send({ message: "blog not found" });
        }

        res.status(200).send({ message: "blog updated", data: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update the blog");
    }

}
);
router.get("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await posts.findById(id)
        res.status(200).send(data)
    }catch (error){
        console.error(error)
        res.status(500).send(' Data not found')
    }
})
module.exports = router