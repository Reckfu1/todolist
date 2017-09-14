import db from '../config/db.js'
const userModel='../schema/user.js' // 引入user的表结构

const TodolistDb=db.Todolist // 引入数据库

const User=TodolistDb.import(userModel) // 用sequelize的import方法引入表结构，实例化User

const getUserById=async function(id){

    // const userInfo = User.findOne({ where: { id: 1} }); // 查询
    // console.log(userInfo); // 输出结果
    // 这里注意，像上面那种写法是不行的
    // 因为JS的特性让它的IO操作是异步的,userInfo将是返回一个Promise对象，所以用async/await，使得我们可以用同步的写法(异步的逻辑)获取异步IO操作得到的数据
    const userInfo=await User.findOne({
        where:{
            id:id
        }
    })

    return userInfo // 返回数据
}

const insetUser=async function(name,password){

    const registerInfo=await User.create({
        user_name:name,
        password:password
    })

    return true
}

export default{
    getUserById,
    insetUser
}