const express = require('express')
const router = express.Router()
const userData = require('../Model/userData')
const jwt = require('jsonwebtoken')

router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.post('/adduser',async(req,res)=>{
    try{
        const user = req.body
        const data = await userData(user).save()
        res.status(200).send({message:"user added ",users:data})
    }catch(error){
        console.error(error)
        res.status(500).send('Failed to add user')
    }
})

router.post("/login",async (req,res)=>{
    const user=await userData.findOne({email:req.body.email})
    if(!user){
            return res.sendStatus(404).send({message:"user not found"})

        }
    try{
        
    if(user.password==req.body.password){
        const payload = {userName:req.body.userName,password:req.body.password}
        const token = jwt.sign(payload,"secret")
        res.status(200).send({message:"Login Succesfull",userToken:token})

    }
    else{
        res.status(401).send({message:"Invalid credentials!"})
    }
}
    catch(error){
        console.error(error)
        res.status(500).send({message:"error in server"})

    }
})

module.exports = router