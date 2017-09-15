import user from '../models/user.js'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

const getUserInfo=async function(ctx){
    const id=ctx.params.id //获取url里传过来的id
    const result=await user.getUserById(id)
    ctx.body=result // 将请求的结果放到response的body里返回
}

const registerAccount=async function(ctx){
    // 用Paw调试的时候 想要访问url的参数 要用query
    // let paramsInfo=ctx.request.query
    const {account,password}=ctx.request.body
    const register=await user.insetUser(account,md5(password))
    ctx.body={
        success:true
    }
}

const loginAccount=async function(ctx){
    const {account,password}=ctx.request.body
    const result=await user.getUserByName(account)

    // 如果用户存在
    if(result!=null){
        // 如果密码错误
        if(result.password!=md5(password)){
            ctx.body={
                success:false,
                message:'密码错误'
            }
        }
        // 密码正确
        else{
            let userToken={
                name:result.user_name,
                id:result.id
            }
            const secret='todolist'
            const token=jwt.sign(userToken,secret)
            ctx.body={
                success:true,
                token:token
            }
        }
    }
    else{
        ctx.body={
            success:false,
            message:'用户不存在'
        }
    }
}

export default{
    getUserInfo,
    registerAccount,
    loginAccount
}