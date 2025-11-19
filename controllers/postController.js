const postModel = require('../models/post')
const userModel = require('../models/user');


const renderProfileUploadPage = (req,res) => {
    res.render("profileupload")
}

const uploadPost = async (req,res) => {
   try {
        let user = await userModel.findOne({email:req.user.email})
        user.profilepic = req.file.filename
        await user.save()
        res.redirect(`/profile/${user._id}`)
   } catch (error) {
        console.log("Upload error: ", error)
        res.status(500).send("Server error")
   }
}

const getProfile =  async (req,res) => {
    let user = await userModel.findOne({_id:req.params.id}).populate("posts")
    let currentUser = await userModel.findOne({_id: req.user.userid})
    res.render("profile",{user,currentUser})
}

const likeFeature = async (req,res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user")

    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid)
    } else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    await post.save()
    if(post.user._id.toString() !== req.user.userid.toString()){
        res.redirect("/feed")
    }
    res.redirect(`/profile/${req.user.userid}`)
}

const getEditPage =  async (req,res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user")
    res.render("edit",{post})
}

const updatePost = async (req,res) => {
    await postModel.findOneAndUpdate({_id: req.params.id},{content: req.body.content})
    res.redirect(`/profile/${req.user.userid}`)
}

const deletePost =  async (req,res) => {
    let postId = req.params.id;
    await postModel.findByIdAndDelete(postId)
    res.redirect(`/profile/${req.user.userid}`)
}

const createPost =  async (req,res) => {
    let user = await userModel.findOne({_id: req.user.userid})
    if(req.body.content.trim() === ""){
        res.redirect(`/profile/${user._id}`)
        return
    }   
    let post = await postModel.create({
        user: user._id,
        content: req.body.content,
    })
    user.posts.push(post._id);
    await user.save()
    res.redirect(`/profile/${user._id}`)
}

const renderFeed = async (req,res) => {
    let posts = await postModel.find().populate("user").sort({createdAt: -1})
    let user = await userModel.findOne({_id: req.user.userid})
    res.render("feed",{posts, user})
}

module.exports = {renderProfileUploadPage,uploadPost,getProfile,likeFeature,getEditPage,updatePost,deletePost,createPost,renderFeed}