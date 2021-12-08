//当前这个模块：API进行统一管理
import request from './request';
// http://39.98.123.211
//三级联动接口
// /api/product/getBaseCategoryList get 无参

// export const reqCategoryList = ()=>{
//     //发请求:axios发请求返回结果Promise对象
//     return request({
//         url:'/product/getBaseCategoryList',
//         method:'get'
//     });
// }

//发请求:axios发请求返回结果Promise对象
export const reqCategoryList = ()=>request({url:'product/getBaseCategoryList',method:'GET'});
