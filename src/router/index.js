//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
/*
编程式路由跳转到当前路由(参数不变),
多次执行会抛出NavigationDuplicated的警告错误
*/
//先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// console.log(originPush)

//重写push|replace
//第一个参数:告诉原来push方法,往哪里跳转(传递哪些参数)
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject) {
        //call||apply区别
        //相同点,都可以调用函数一次,都可以篡改函数的上下问一次
        //不同点:call与apply传递参数:call传递参数用逗号隔开,apply方法执行,传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject) {
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    routes:[
        {
            path:"/home",
            component:Home,
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
        //重定向,在项目启动的时候,访问/,立马定向到首页
        {
            path:"*",
            redirect:"home"
        }
    ]
})