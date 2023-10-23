const express = require('express')
const router = express.Router()

const user_handler = require('../router_handler/user')

//注册的路由
router.post('/register',user_handler.register)
//登录的路由
router.post('/login',user_handler.login)

module.exports = router