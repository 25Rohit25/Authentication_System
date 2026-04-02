const jwt = require("jsonwebtoken");
const User = require("../models/User");
const user = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async(req, res) =>{
    try{
        const{email,password} = req.body;
      
        const userExits = await User.findOne({email});
        if(userExits) return res.status(400).json({msg : "user already exits"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        res.json({msg : "User registered succesfully"});
    } catch (err){
        res.status(500).json({error : err.message});
    }
};

//LOGIN 
exports.login = async (req, res) => {
    try{
        const {email,password} = req.body;

        const user  = await User.findOne({email});
        if(!user) return res.status(400).json({msg : "Invalid credentails"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        res.json({token});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};