const jwt = require("jsonwebtoken")

const isLoggedIn = (req,res,next) => {
    if(!req.cookies.token || req.cookies.token === "") res.redirect("/login")
    else{
        let data = jwt.verify(req.cookies.token, process.env.SECRET)
        req.user = data
    }
    next()
}

module.exports = isLoggedIn