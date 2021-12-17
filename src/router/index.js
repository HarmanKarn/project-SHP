//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter)


//引入store
import store from '@/store'

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
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to,from,savePosition){
        //y:代表滚动条的y轴
        return {y:0}
    }
});

//全局守卫:前置守卫(路由跳转之前进行判断)
router.beforeEach(async(to,from,next)=>{
    //to:可以获取到要跳转到哪个路由的信息
    //from:可以获取到从哪个路由而来的信息
    //next:放行函数 next()放行  next('path')放行到指定路由  next(false)
    next();
    //用户登录了,才会有token,未登录一定不会有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name;
    //用户已登录
    if(token){
        //禁止用户跳转进login[停留在首页]
        if(to.path=="/login"){
            next('/home');
        }else{
            //登录了,去的不是login[home|search|detail|shopcart]
            //如果用户名已有
            if(name){
                next();
            }else{
                //没有用户信息,派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效了获取不到用户信息,重新登录
                    //清除token
                   await store.dispatch('userLogout')
                   next('/login');
                }
            }
        }
    }else{
        //未登录
        next();
    }
});
export default router;