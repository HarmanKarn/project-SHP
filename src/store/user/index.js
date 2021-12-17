import {
    reqGetCode, 
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogOut
} from '@/api'

import {setToken,getToken,removeToken} from '@/utils/token'
//登录与注册的模块
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
};
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清除本地数据
    CLEAR(state){
        //帮仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储清空
        removeToken();
    }
};
const actions = {
    //获取验证码
    async getCode({commit},phone){
        //获取验证码的接口,把验证码返回,正常情况,后台把验证码发送到用户手机上[省钱]
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        //服务器下发token,用户唯一标识符(uuid)
        //将来经常通过带token找服务器要用户信息进行展示
        if(result.code == 200){
            //用户已经登录成功且获取到token
            commit("USERLOGIN",result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
       let result = await reqUserInfo();
       if(result.code == 200){
           commit('GETUSERINFO',result.data);
           return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogout({commit}){
        //向服务器发请求,通知服务器清除token
        let result = await reqLogOut();
        //action不能操作state,提交mutations去修改state
        if(result.code == 200){
            commit("CLEAR");
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {};
export default {
    state,mutations,actions,getters
}