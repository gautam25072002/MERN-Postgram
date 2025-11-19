const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true,'Username already exists'],
    },
    name: String,
    age: Number,
    email: String,
    password: String,
    profilepic: {
        type: String,
        default: "default.webp"
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
})

module.exports = mongoose.model('user', userSchema)