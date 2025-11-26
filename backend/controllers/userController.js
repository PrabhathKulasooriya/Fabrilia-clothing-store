import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn:"7d"});
}


export const signUp = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        let check = await User.findOne({email: email});
        if(check){
            return res.status(400).json({success: false, message: "User already exists with same email!"});
        }

        let cart = {}
        for(let i=0; i<300; i++){
            cart[i] = 0;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          name: name,
          email: email,
          password: encryptedPassword,
          cartData: cart,
        });

        await user.save();

        const token = generateToken(user._id);

        return res.status(200).json({success: true, message: "User Registered Successfully!", token: token});
        
    }
    catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
}   

export const logIn = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({success: false, message: "User not found!"});
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if(!passCompare){
            return res.status(400).json({success: false, message: "Incorrect Password!"});
        }

        const token = generateToken(user._id);
        return res.status(200).json({success: true, message: "User Logged In Successfully!", token: token});

    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}