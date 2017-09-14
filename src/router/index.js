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

export default router
