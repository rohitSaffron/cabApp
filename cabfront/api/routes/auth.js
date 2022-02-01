const express = require('express')
const router = express.Router()


const AuthController =require('../controller/Auth.controller')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/verify/:id', AuthController.verifyOtp)
router.delete('/user/:id', AuthController.deleteuser)
router.patch('/forgot/:id',  AuthController.changepsd)
router.patch('/forgotpass/:id',  AuthController.forgotpassword)














module.exports=router