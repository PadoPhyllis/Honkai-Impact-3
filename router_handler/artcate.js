const db = require('../db/index')

//获取文章分类数据的处理函数
exports.getArticle = (req,res)=>{
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(sql,(err,result)=>{
        if(err){
            return res.cc(err)
        }
        res.cc({
            status: 0,
            message: '获取文章分类数据成功!',
            data: result
        })
    })
}

//新增文章分类数据的处理函数
exports.addArticle = (req,res)=>{
    if(!req.body.name || !req.body.alias || !req.body.is_delete){
        return res.cc('数据不能为空!')
    }
    const sql = 'select * from ev_article_cate where name = ?'
    db.query(sql,[req.body.name,req.body.alias],(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.length>0){
            res.cc('文章标题已存在!')
        }
        else{
            const addsql = 'insert into ev_article_cate set ?'
            db.query(addsql,req.body,(err,result)=>{
                if(err){
                    return res.cc(err)
                }
                if(result.affectedRows !== 1){
                    return res.cc('新增文章分类失败!')
                }
                res.cc('新增文章分类成功!',0)
            })
        }
    })
}

//删除文章分类数据的处理函数
exports.deleteCateById = (req,res)=>{
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(sql,req.params.id,(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.affectedRows !== 1){
            return res.cc('删除文章分类失败!')
        }
        res.cc('删除文章分类成功!')
    })
}

//根据 id 获取文章分类的处理函数
exports.getArticleById = (req,res)=>{
    const sql = 'select * from ev_article_cate where id = ?'
    db.query(sql,req.params.id,(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.length === 0){
            return res.cc('未查询到任何数据!')
        }
        res.send({
            status: 0,
            message: '获取文章分类成功!',
            data: result
        })
    })
}

//根据 id 更新文章分类的处理函数
exports.updateCateById = (req,res)=>{
    const sql = 'select * from ev_article_cate where name = ?'
    db.query(sql,req.body.name,(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.length > 0){
            res.cc('新分类已经存在!')
        }
        else{
            const sql = 'update ev_article_cate set name = ?,alias = ? where id = ?'
            db.query(sql,[req.body.name,req.body.alias,req.body.id],(err,result)=>{
                if(err){
                    return res.cc(err)
                }
                if(result.affectedRows !== 1){
                    return res.cc('更新文章分类失败!')
                }
                res.cc('更新文章分类成功!')
            })
        }
    })
}