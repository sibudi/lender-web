<template>
  <div id="app">
    <indextop></indextop>
    <div id="contentttt"><router-view/></div>
    <Loading v-show="showLoading">{{showLoading}}</Loading>
    <index-bottom v-if="!noFooter" ></index-bottom>
  </div>
</template>

<script>
  import indextop from "./components/indexTop.vue"
  import indexBottom from "./components/indexBottom.vue"
  import globals from './assets/js/main.js'
  import Loading from './components/Loading.vue'
  import store from './store'
  import {mapGetters} from "vuex"
  export default {
    data(){
      return {
        
      }
    },
    name: 'app',
    components: {
      indextop,
      indexBottom,
      Loading
    },
    computed: {
      ...mapGetters(['showLoading']),
      noFooter(){
        if (this.$route.meta && this.$route.meta.noFooter){
          return true
        }
        return false
      }
    },
    // computed: mapGetters([
    //   "showLoading"
    // ])
  }
</script>

<style lang="less">
  body {
    background-color: #F8F8F8;
  }
  #app {
    font-family: PingFangSC-Regular, sans-serif;
    // font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #fafafa;
  };
  #contentttt {
    width: 100%;
    min-width: 1200px;
  }
</style>

