//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
export default [
    {
        path:"/home",
        component:Home,
        meta:{show:true}
    },
    {
        path:"/pay",
        component:Pay,
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:'search',
        //路由组件能不能传递props数据
        //布尔值写法 params
        // props:true,
        //对象写法:额外的给路由组件传递一些props
        // props:{a:1,b:2}
        //函数写法:可以params参数,query参数,通过props传递给路由组件
        props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/detail/:skuid",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{isShow:true}
    },
    {
        path:"/shopcart",
        component:ShopCart,
        meta:{isShow:true}
    },
    {
        path:"/trade",
        component:Trade,
        meta:{isShow:true}
    },
    //重定向,在项目启动的时候,访问/,立马定向到首页
    {
        path:"*",
        redirect:"home"
    }
]