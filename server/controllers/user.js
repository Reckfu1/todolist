import user from '../models/user.js'
import md5 from 'md5'

const getUserInfo=async function(ctx){
    let id=ctx.params.id //获取url里传过来的id
    const result=await user.getUserById(id)
    ctx.body=result // 将请求的结果放到response的body里返回
}

const registerAccount=async function(ctx){
    // 用Paw调试的时候 想要访问url的参数 要用query
    // let paramsInfo=ctx.request.query
    let paramsInfo=ctx.request.body
    let register=await user.insetUser(paramsInfo.account,md5(paramsInfo.password))
    ctx.body={
        success:true
    }
}

export default{
    getUserInfo,
    registerAccount
}