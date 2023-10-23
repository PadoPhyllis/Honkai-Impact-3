const db = require('../db/index')
const bcryptjs = require('bcryptjs')

//获取用户基本信息的处理函数
exports.getUserInfo = (req,res)=>{
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id = ?'
    db.query(sql,req.user.id,(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.length !== 1){
            return res.cc('获取用户信息失败!')
        }

        console.log(result);
        //获取用户信息成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: result[0]
        })
    })
}

//修改用户基本信息的处理函数
exports.updateUserInfo = (req,res)=>{
    const sql = 'update ev_users set ? where id = ?'
    db.query(sql,[req.body,req.user.id],(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.affectedRows !== 1){
            return res.cc('更新用户的基本信息失败!')
        }
        res.cc('更新用户的基本信息成功!',0)
    })
}

//重置密码的处理函数
exports.updatePassword = (req,res)=>{
    const user = req.body
    const sql = 'select password from ev_users where id = ?'
    db.query(sql,req.user.id,(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(bcryptjs.compareSync(user.newpassword,result[0].password)){
            return res.cc('新密码不能和旧密码一样!')
        }
        else{
            const updatesql = 'update ev_users set password = ? where id = ?'
            const newpassword = bcryptjs.hashSync(user.newpassword,10)
            db.query(updatesql,[newpassword,req.user.id],(err,result)=>{
                if(err){
                    return res.cc(err)
                }
                if(result.affectedRows !== 1){
                    return res.cc('重置密码失败!')
                }
                res.cc('重置密码成功!',0)
            })
        }
    })
}

//更新用户头像的处理函数
exports.updateAvatar = (req,res)=>{
    const sql = 'update ev_users set user_pic = ? where id = ?'
    db.query(sql,[req.body.avatar,req.user.id],(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.affectedRows !== 1){
            return res.cc('更换头像失败!')
        }
        res.cc('更换头像成功!',0)
    })
}