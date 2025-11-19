const express = require('express')
const router = express.Router()
const { renderIndex,renderLogin,login,register,logout } = require('../controllers/userController')


router.get('/', renderIndex)

router.get('/login', renderLogin)

router.post('/login', login)

router.post('/register', register)
    
router.get('/logout', logout)


module.exports = router