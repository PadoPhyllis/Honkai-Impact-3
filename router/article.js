const express = require('express')
const router = express.Router()

const article_handler = require('../router_handler/article')

//发布文章的路由
router.post('/add',article_handler.addArticle)

module.exports = router