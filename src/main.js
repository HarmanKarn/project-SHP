import Vue from 'vue'
import App from './App.vue'

//引入路由相关文件
import router from '@/router'

//引入vuex仓库
import store from '@/store'

//定义全局组件:在入口文件注册一次之后,在任何组件当中都可以使用
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//第一个参数:全局组件名,第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

//引入MockServe.js----mock数据(虚拟)
import '@/mock/mockServe'

//引入swiper样式
import "swiper/css/swiper.css"

Vue.config.productionTip = false

//统一接收api文件夹里面全部请求函数
//统一引入
import * as API from '@/api'

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由:简写键值对router:router
  //注册路由信息:当这里书写的router的时候,组件身上都拥有$route,$router属性
  router,
  //注册仓库:组件实例的身上会多一个属性$store属性
  store,
}).$mount('#app')
