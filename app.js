const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.cc = function(err,status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret: config.jwtScretKey}).unless({path: [/^\/api/]}))  //新版本要加上 algorithms:['HS256]

//注册或登录的路由
const userRouter = require('./router/user')
app.use('/api',userRouter)

//用户信息的路由
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

//文章分类的路由
const artcateRouter = require('./router/artcate')
app.use('/my/articate',artcateRouter)

//文章内容的路由
const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)

//定义错误级别的中间件
app.use((err,req,res,next)=>{
    //身份认证失败后的错误
    if(err.name === 'UnauthorizedError'){
        return res.cc('身份认证失败!')
    }
    //未知错误
    res.cc('发生未知错误!请重启系统!')
})

app.listen(80,()=>{
    console.log('服务器已启动!')
})