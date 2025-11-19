const express = require('express')
const router = express.Router()
const isLoggedIn = require("../middlewares/logger")
const upload = require("../config/multer")
const { renderProfileUploadPage,uploadPost,getProfile,likeFeature,getEditPage,updatePost,deletePost,createPost,renderFeed } = require('../controllers/postController')


router.get('/profile/upload',isLoggedIn, renderProfileUploadPage)

router.get('/feed',isLoggedIn,renderFeed)

router.post('/upload',upload.single("image"),isLoggedIn,uploadPost)

router.get('/profile/:id',isLoggedIn, getProfile)

router.get('/like/:id',isLoggedIn, likeFeature)

router.get('/edit/:id',isLoggedIn, getEditPage)

router.post('/edit/:id',isLoggedIn, updatePost)
 
router.post('/delete/:id',isLoggedIn, deletePost)

router.post('/post',isLoggedIn, createPost)

module.exports = router