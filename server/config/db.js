import Sequelize from 'sequelize'

// 使用url连接的形式进行连接
const Todolist=new Sequelize('mysql://root:xxx@localhost/todolist',{
    define:{
        timestamps:false  // 取消Sequelzie自动给数据表加入时间戳
    }
})

export default{
    Todolist // 将Todolist暴露出接口方便Model调用
}