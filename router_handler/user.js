//导入数据库操作模块
const db = require('../db/index')
//导入 bcryptjs 这个包
const bcryptjs = require('bcryptjs')
//导入生成 Token 的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')

exports.register = (req,res)=>{
    //获取客服端提交到服务器的用户信息
    const userinfo = req.body
    //对表单中的数据，进行合法性的校验
    if(!userinfo.username || !userinfo.password){
        return res.cc('用户名或密码不合法!')
    }

    //定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr,[userinfo.username],(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.length>0){
            return res.cc('用户名已被占用,请更换其他用户名!')
        }
        //调用 bcrypt.hashSync 对密码进行加密
        userinfo.password = bcryptjs.hashSync(userinfo.password,10)
        const sql = 'insert into ev_users set ?'
        db.query(sql,{username: userinfo.username,password: userinfo.password},(err,result)=>{
            if(err){
                return res.cc(err)
            }
            if(result.affectedRows !== 1){
                return res.cc('注册用户失败，请您稍后再试!')
            }
            //注册用户成功
            res.cc('注册成功!',0)
        })
    })
}

exports.login = (req,res)=>{
    const userinfo = req.body
    const sql = 'select * from ev_users where username = ?'
    //SQL查询
    db.query(sql,[userinfo.username],(err,result)=>{
        if(err){
            return res.cc(err)
        }
        //获取到的数据条数不等于1
        if(result.length !== 1){
            return res.cc('登录失败!')
        }
        //判断密码正不正确
        if(!bcryptjs.compareSync(userinfo.password,result[0].password)){  //数组
            return res.cc('用户名或密码错误!')
        }
        
        //在服务端生成 Token 的字符串
        const user = {...result[0],password: '',usre_pic: ''}
        //对用户的信息进行加密,生成 Token 字符串
        const tokenStr = jwt.sign(user,config.jwtScretKey,{expiresIn: config.expiresIn})
        //调用 res.send() 将 Token 响应给客服端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr  //一定要加上空格
        })
    })
}