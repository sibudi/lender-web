// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import config from '../config'
// import * as _ from '../util/tool'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/main.css';
import globals from './assets/js/main.js';//引入main.js公用方法
import store from './store'
import vuex from 'vuex'
import locale from 'element-ui/lib/locale/lang/id'
Vue.prototype.$globals = globals;//全局引入main.js公用方法

Vue.use(vuex)
Vue.use(ElementUI,{locale});

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',  // 设置默认使用语言
  messages: {
    'zh': require('./i18n/zh-cn'),
    'en': require('./i18n/en')
  }
})

Vue.config.productionTip = false

Vue.prototype.$axios = axios
//ahalim: Change URL into the same lender url
// // axios.defaults.baseURL = 'http://stb.www.do-it.co.id/'; //测试环境
// axios.defaults.baseURL = 'https://www.do-it.id/';  //线上环境
// // axios.defaults.baseURL = 'http://172.17.59.215:8888/';
// // axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL =  process.env.BASE_URL;  //线上环境
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(router.currentRoute.fullPath)
  if(store.getters.token){
    Object.assign(config.data,{"sessionId":store.getters.token});

  }else {
    Object.assign(config.data,{"sessionId":'123'});
  }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if(response && response.data && response.data.code=="-5"){
      store.dispatch("setToken",'');
      store.dispatch("setUser",false);
      store.dispatch("setLogin",false);
      // this.$message(response.data.message)
      router.push('/')
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
        let _response = error
        let _message = null
        // clearTimeout(_timer)
        // popRequest(_random)
        switch (_response.status) {
          case 404:
            _message = '404,erro'
            break
          case 401:
            router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
            _message = 'Tidak sah'
            break
          case 403:
            _message = 'Dilarang mengakses'
            break
          case 408:
            _message = 'Meminta waktu tunggu lebih'
            break
          case 500:
            _message = 'Kesalahan internal server'
            break
          case 501:
            _message = 'Fungsi tidak diimplementasikan'
            break
          case 503:
            _message = 'Layanan tidak tersedia'
            break
          case 504:
            _message = 'Kesalahan Gateway'
            break
          default:
            _message = 'Kesalahan tidak dikenal'
        }

    return Promise.reject(_message);
  });

function isLogin(){
  if(store.getters.token){
    store.dispatch("setLogin",true)
  }else {
    store.dispatch("setLogin",false)
    // console.log(store.getters.token)
    // store.commit("userStatus",null)
  }
  return store.getters.isLogin;
}
router.beforeEach((to, from, next) => {

    // console.log(to,"to")

    if(to.meta.auth) { //是否验证
        if(isLogin()) { //是否登录
            next()
        } else { //未登录则跳转到登录页面
            // console.log(to.path)
            // this.$store.dispatch("loginToBack",to.path);//保存该标的信息
            next({
                path: '/login',
                // query: {
                //     redirect: to.fullPath
                // }
            })
        }
    } else {
        next()
    }
})
router.afterEach((to,from,next) => {
  (function smoothscroll(){
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
           window.requestAnimationFrame(smoothscroll);
           window.scrollTo (0,currentScroll - (currentScroll/5));
      }
  })();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>',

})
