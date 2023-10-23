const express = require('express')
const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')

//获取用户信息的路由
router.get('/userinfo',userinfo_handler.getUserInfo)
//修改用户信息的路由
router.post('/userinfo',userinfo_handler.updateUserInfo)
//重置密码的路由
router.post('/updatepassword',userinfo_handler.updatePassword)
//更新头像的路由
router.post('/update/avatar',userinfo_handler.updateAvatar)

module.exports = router