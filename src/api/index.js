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

//获取floor数据
export const reqFloorList = ()=>mockRequest.get('/floor');

//获取搜索模块数据 地址:/api/list 请求方式:POST 参数:需要带参数
/**
 {
     "category3ID" : "61",
     "categoryName" : "手机",
     "keyword" : "小米",
     "order" : "1:desc",
     "pageNo" : 1,
     "pageSize" : 10,
     "props" : ["1:1700-2799:价格","2:6.65-674英寸:屏幕尺寸"],
     "trademark" : "4:小米"
 }
 */
//当前这个函数需不需要接收外部传递参数
//当前这个接口(获取搜索模块的数据),给服务器传递一个默认参数params[至少是一个空对象]
export const reqGetSearchInfo = (params)=>request({url:"/list",method:"post",data:params})

//获取产品详情信息的接口
export const reqGoodsInfo = (skuId)=>request({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车中(获取更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表数据接口
export const reqCartList = ()=>request({url:`/cart/cartList`,method:'get'})

//删除购物产品的接口
export const reqDeleteCartById = (skuId)=>request({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const reqGetCode = (phone)=>request({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册
export const reqUserRegister = (data)=>request({url:`/user/passport/register`,data,method:"post"})

//登录
export const reqUserLogin = (data)=>request({url:'user/passport/login',data,method:'post'})

//获取用户信息[需要带着用户的token向服务器要用户信息]
export const reqUserInfo = ()=>request({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogOut = ()=>request({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
export const reqAddressInfo = ()=>request({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取订单交易页信息
export const reqOrderInfo = ()=>request({url:'/order/auth/trade',method:'get'})

//
export const reqSubmitOrder = (tradeNo,data)=>request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})