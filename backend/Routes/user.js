const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");


//Api for registering the user
router.post("/signup", async (req,res)=>{
    try{
        let check = await User.findOne({email: req.body.email});
        if(check){
           return res.status(400).json({
            success: false,
            message: "User already exists with same email!"
           })
        }else{
            let cart = {};
            for(let i=0; i<300; i++){
               cart[i]=0;
            } 
            const user = new User({
                name:req.body.username,
                email: req.body.email,
                password: req.body.password,
                cartData: cart,
            });
            await user.save();
            const data = {
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'secret_ecom');
            res.json({
                success: true,
                token: token
            })
        }    
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
})

//API endpoint for user login
router.post("/login", async (req, res)=>{
    let user = await User.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'secret_ecom');
            res.json({
                success: true,
                token: token
            });
        }else{
            res.json({
                success: false,
                message: "Incorrect Password!"
            });
        }
    } else{
        res.json({
            success: false,
            message: "User not found!"
        });
    }
})



module.exports = router;