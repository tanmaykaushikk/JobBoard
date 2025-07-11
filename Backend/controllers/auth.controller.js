const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    // gather data
    console.log(req.body);
    const { email, password, name , role } = req.body;
    // validate email - check email exists 
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create user 
        const newUser = await User.create({
            email, password: hashedPassword, name , role
        })

        // create token
        const token = await jwt.sign({ id: newUser._id, email , role }, process.env.JWT_SECRET, { expiresIn: "3d" });

        // send response

        res.status(201).json({ message: "User Created Successfully",token ,user:{name:user.name,email:user.email,role:user.role}});

    } catch (error) {
        console.error("Registration Error", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}


exports.login = async(req,res) => {
    //gather data
    const {email,password} = req.body;

    //validate email
    //match password
    //create token
    //send response
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Not Found"});
        }
        
        const isMathced = bcrypt.compare(password,user.password);
        if(!isMathced){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token = await jwt.sign({id: user._id , email , role:user.role}, process.env.JWT_SECRET , {expiresIn:'3d'});
        res.status(200).json({message:"Login Successful" , token , user:{name:user.name,email:user.email,role:user.role}})
    }catch(error){
        console.error("Login Error", error);
        res.status(500).json({ message: "Server error during login" });
    }

    //
}