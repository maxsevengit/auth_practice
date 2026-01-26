const user_model = require("../Models/user");
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const signup = async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await user_model.findOne({email});
        if(user){
            return res.status(409).json({message: "User already exists.", success:false});
        }
        const userModel = new user_model({name, email, password});
        userModel.password = await bcrypt.hash(password,10);
        userModel.save();
        res.status(200).json({message:"Signup successful.", success:true});
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error!",
            success:false
        })
    }
}


const login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await user_model.findOne({email});
        if(!user){
            return res.status(403).json({message: "User not registered.", success:false});
        }
        const isvalidpass =await bcrypt.compare(password,user.password);
        if(!isvalidpass){
            return res.status(403).json({message: "Either the username or password is incorrect.", success:false});
        }
        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        return res.status(200).json({
            message: "Login Successful.",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!", success: false });
    }
};


module.exports = {
    signup,
    login,
}