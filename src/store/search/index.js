//search模块的小仓库
import {reqGetSearchInfo,reqGoodsInfo} from '@/api'
//state:仓库存储数据的地方
const state = {
    searchList:{},
};

//mutations:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    },

};

//action:处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    //获取search模块数据
    async getSearchList({commit},params={}){
        //当前这个函数在调用获取服务器的时候,至少传递一个空对象
        //params形参:当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit("GETSEARCHLIST",result.data);
        }
    },

};

//getters:理解为计算属性,用于简化仓库数据,让组件获取仓库数据更加方便
//可以把在组件当中需要用的数据简化[组件在获取数据的时候就方便]
const getters = {
    //当前形参state,当前仓库中的state,并非大仓库中的state
    goodsList(state){
        //如果服务器数据回来了,式一个数组
        //假如没有网络,返回空数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    }

};

//对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}