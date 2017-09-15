import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Index from '../views/index'
import Login from '../views/login'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Index',
//       component: Index
//     }
//   ]
// })

const routes=[
    {
        path:'*',
        redirect:'/'
    },
    {
        path:'/',
        component:Login
    },
    {
        path:'/todolist',
        component:Index
    }
]

const router=new Router({
    mode: 'history',  // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。（不过还需要后端配合）
    routes
})

// 用户成功登陆后跳转到todolist页面，但是有个bug，如果直接填入todolist页面的url一样可以访问todolist
// 所以，在路由这里做一下验证
router.beforeEach((to,from,next) => {
    const token=sessionStorage.getItem('token')
    //若是访问登陆页面
    if(to.path=='/'){
        // 如果有token存在
        if(token!=null&&token!='null'){
            console.log(token)
            next({
                path:'/todolist'
            })
        }
        //否则直接跳转到首页
        else{
            next()
        }
    }   
    // 如果访问其他路由
    else{
        if(token!=null&&token!='null'){
            next()
        }
        else{
            next({
                path:'/'
            })
        }
    }
})

export default router
