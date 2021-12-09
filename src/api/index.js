//当前这个模块：API进行统一管理
//引入二次封装的axios(带有请求,响应的拦截器)
import request from './ajax';
import mockRequest from './mockAjax'

// http://39.98.123.211

// export const reqCategoryList = ()=>{
//     //发请求:axios发请求返回结果Promise对象
//     return request({
//         url:'/product/getBaseCategoryList',
//         method:'get'
//     });
// }

//对外暴露一个函数,只要外部调用这个函数,就向服务器发起AJAX请求,获取三级菜单数据
export const reqCategoryList = ()=>request.get(`product/getBaseCategoryList`);
//切记:当前函数执行需要把服务器返回结果返回

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = ()=>mockRequest.get('/banner');

