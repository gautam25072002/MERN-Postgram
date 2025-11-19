const userModel = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const renderIndex = (req,res) => {
    res.render("index")
}

const renderLogin = (req,res) => {
    res.render("login")
}

const login =  async (req,res) => {
    let {email,password} = req.body;
    let user = await userModel.findOne({email})
    if(!user) return res.status(500).send("Something is not working")
    
    bcrypt.compare(password, user.password, (err,result) => {
        if(result){
            let token = jwt.sign({email,userid: user._id}, process.env.SECRET);
            res.cookie("token",token)
            res.status(200).redirect("/feed")
        }
        else{
            res.send("Something is not working")
        }
    })
}

const register = async (req,res) => {
    let {username,name,age,email,password} = req.body;
    let user = await userModel.findOne({email})
    if(user) return res.status(500).send("User Already exist") 
    let hashPassword = await bcrypt.hash(password,10)
    let newUser = await userModel.create({
        username,
        name,
        age,
        email,
        password:hashPassword,
    })
    let token = jwt.sign({email,userid: newUser._id}, process.env.SECRET);
    res.cookie("token",token)
    res.redirect("/feed")    
}

const logout = (req,res) => {
    res.cookie("token", "")
    res.redirect("/login")
}

module.exports = {renderIndex,renderLogin,login,register,logout}