const express = require('express')
const router = express.Router()

const articate_handler = require('../router_handler/artcate')

//获取文章分类数据的路由
router.get('/cates',articate_handler.getArticle)
//新增文章分类数据的路由
router.post('/addcates',articate_handler.addArticle)
//根据 id 删除文章分类数据的路由
router.get('/deletecate/:id',articate_handler.deleteCateById)
//根据 id 获取文章分类的路由
router.get('/cates/:id',articate_handler.getArticleById)
//根据 id 更新文章分类的路由
router.post('/updatecate',articate_handler.updateCateById)

module.exports = router