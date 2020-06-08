<i18n>
{
  "zh-cn":{
  }
}
</i18n>
<template>
<section>
  <div class="center_bread">
    <div class="bread_bar">
      <el-breadcrumb separator="/">
<!--         <el-breadcrumb-item :to="{ path: '/Scattered' }">我的账户</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Scattered' }">个人资料</el-breadcrumb-item>
        <el-breadcrumb-item>重置密码</el-breadcrumb-item> -->
<!--             <el-breadcrumb-item v-for="(item,index) in routes" :key="index" :to="item.path">
              {{ item.name}}
            </el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
  </div>
  <div class="center_con df jcsb">
    <nav class="center_nav_box">
      <ul>
        <router-link tag="li"  to="/center/setting" @mouseenter.native="handleenter" @mouseleave.native="handleleave">Data pribadi</router-link>
        <router-link tag="li"  to="/center/assets" >Aset saya</router-link>
        <router-link tag="li"  to="/center/records" >Riwayat Pembelian</router-link>
        <!-- <router-link tag="li"  to="/message" >Pemberitahuan</router-link> -->
      </ul>
    </nav>
    <div class="center_content f1">
      <transition name="fade" mode="out-in">
          <keep-alive exclude="AssetsDetail">
            <router-view/>
          </keep-alive>

      </transition>
    </div>
  </div>
</section>
</template>
<script>
export default {
  data(){
    return{
      routes:[]
    }
  },
  components: {},
  watch: {
  },
  mounted() {
    this.routes = this.$route.matched;
    if(this.$route.matched[1].path.split('/')[2] == 'reset'){
      this.routes.push({'name':'基本配置','path':'/center/setting'});
    }
    // console.log(this.routes)
  },
  methods:{
    handleenter(event){
      // console.log(event)
    },
    handleleave(){
      // console.log('2')
    }
  },
  computed: {
  }
}
</script>
<style>
.center_bread{
  width: 1200px;
  margin: 0 auto;
}
.center_con{
  width: 1200px;
  min-height: 871px;
  margin: 14px auto 62px;
  font-family:PingFangSC-Medium;
}
.center_nav_box{
  width:246px;
  height:861px;
  /*min-height: 861px;*/
  padding-top: 10px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  font-size:18px;
  font-weight:500;
  color:rgba(174,187,199,1);
  margin-right: 30px;
}
.center_nav_box li{
  width: 246px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}
/*.center_nav_box li:hover{
  cursor: pointer;
  background-color: #00d6c9;
  color: #fff;
}*/
.center_nav_box li.router-link-active{
  background: #00D6C9;
  color: #fff;
}
.center_content{
  /*width:1004px;*/
  min-height: 861px;
  padding: 10px 10px 0px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
}
  .center_tit{
    /*width:982px;*/
    height:48px;
    line-height: 50px;
    background:rgba(239,243,245,1);
    border:1px solid rgba(212,219,225,1);
    font-size:18px;
    font-weight:500;
    color:rgba(22,66,118,1);
    text-align: left;
    padding-left: 20px;
  }

</style>
