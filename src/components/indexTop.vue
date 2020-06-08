<template>
  <div class="indextop">
    <div class="navBar">
        <div class="topBar df aic">
          <div style="margin-left: 0px;" class="logo_icon f1"><img src="../assets/images/Doitnavbar.png" width="42px" alt="" ></div>
          <div class="navBarContent">

            <ul class='df'>
              <li><a href="">Beranda</a></li>
              <li v-for="item in urlLists">
                <a @click="a(item.path)" :class="thisClass==item.path? 'currentClass':''" v-if="item.link">{{item.name}}</a>
                <el-dropdown v-else class="el_li">
                  <span class="el-dropdown-link">{{item.name}}
                    <!--<img src="../assets/images/home_down.png" height="12" width="14" alt="" style="margin-left: 2px;">
                    <img src="../assets/images/home_up.png" height="12" width="14" alt="" style="margin-left: 2px;"> -->
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="nav_left_drop">
                    <el-dropdown-item><router-link to="/aboutUs">Tentang kami</router-link></el-dropdown-item>
                    <el-dropdown-item><router-link to="/blogList">Blog</router-link></el-dropdown-item>
                    <el-dropdown-item><router-link to="/joinus">Karir</router-link></el-dropdown-item>
                    <el-dropdown-item><router-link to="/faq">FAQ</router-link></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>

          <div class="login_state df aic">
            <div class="tkb_rate df aic">
              <span>TKB90 = {{rateY}}</span>
              <div class="tkb_rate_tips" v-if="showRateTips">Tingkat keberhasilan Penyelenggara Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi dalam memfasilitasi penyelesaian kewajiban pinjam meminjam antara Penerima Pinjaman kepada Pemberi Pinjaman dalam jangka waktu sampai dengan 90 hari terhitung sejak jatuh tempo.</div>
               <img src="../assets/images/question.png" height="16" width="16"  @mouseover="handlemouseOver()" @mouseout="handlemouseOut()">
            </div>
            <!-- <div class="login_btn" v-show="!currentUser" @click="login()">Masuk</div> -->
            <div class="df aic"  v-show="currentUser">
              <img :src="avatar" height="30" width="30" alt="" style="border-radius:50%;">
              <el-dropdown>
                <span style="color: rgba(22,66,118,1);" class="el-dropdown-link">{{userName?userName:currentUser}}<!-- <i class="el-icon-arrow-down el-icon--right"></i> --></span>
                <el-dropdown-menu slot="dropdown" class="nav_left_drop">
                  <el-dropdown-item><a  @click="pushto(1)">Pusat pribadi</a></el-dropdown-item>
                  <el-dropdown-item><a @click="pushto(2)">Keluar</a></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <img src="../assets/images/cart_icon01.png" height="22" width="24" class="cart_icon" @click="goCart">
            </div>

          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  export default {
    name: 'indexTop',
    data () {
      return {
        avatar:process.env.SHOW_IMAGE+'?path=/mnt/MyUpload/img/w/k/g/98328763f4fe45f7b7b8ae9f48dfddab.JPG&sessionId=c7e8ff5978654af1a662d2809e76ef4f',
        showRateTips: false,
        msg: 'Welcome to Your Vue.js App',
        rateY: '75.00%',
        thisClass: '',
        bannerLists:[{url:"../../static/banner1.png",text: "Do-it Untuk Masa Depan yang Lebih"},{url:"../../static/banner1.png"}],
        urlLists: [{name: 'Pendanaan',path: 'Scattered',link:true}
        //{name: 'Beranda',path: '',link:true},
        //,{name: 'Pinjaman',path: 'BorrowIntro',link:true},{name: 'Tentang kami',path: '',link:false},{name: 'Keluhan OJK',path: 'complaint',link:true},
        // {name: 'FAQ',path: 'faq'},{name: 'Blog',path: 'blogList'},{name: 'Complaint',path: 'complaint'}
        ],
        ismouseover: false,
        note: {
          backgroundImage: "url(" + require("../assets/img/alertContent.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        },
      }
    },
    methods: {
      goCart(){
        this.$router.push('/cart');
      },
      handlemouseOver(){
        this.showRateTips = true;
      },
      handlemouseOut(){
        this.showRateTips = false;
      },
      init(){
        let _this=this;
        setTimeout(function(){
          let urls=_this.$route.path;
          urls=urls.replace("/","");
          if(urls=="404"){
            urls=""
          }
          _this.thisClass=urls;
        }, 500);
          this.avatar = _this.$store.getters.headImage=='' ? "../assets/images/touxiang.png" : _this.$store.getters.headImage;
          this.$axios.post('/api-order/order/getRepayRate', {})
          .then((response)=>{
            if(response.data.code==0){
              _this.rateY=response.data.data.isExist
            }
          })
          .catch((response)=>{
          });
      },
      login(){
        this.$router.push({path:"/login"})
      },
      pushto(e){
        let _this = this;
        if(e==1){
          _this.$router.push({path: "/center"});
        }else {
          console.log('logout')
          _this.$store.dispatch("setToken",'');
          _this.$store.dispatch("setUser",false);
          _this.$store.dispatch("setLogin",false);
          _this.$store.dispatch("setHeadImage",'');
          _this.$message({
            message: 'Logout success',
            type: 'success'
          });
          _this.$router.push('/')
        }
      },
      a(e){
        this.thisClass=e;
        if(e == 'Scattered' && !this.$store.getters.isLogin){
          this.$store.dispatch("loginToBack","/"+e);
        }

        this.$router.push("/"+e)
      }
    },
    mounted(){
      this.init()
    },
    computed: mapGetters([
        "currentUser","userName","headImage"
      ])
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway');
  /*顶部栏*/
  .indextop {
    position: fixed;
    width: 100%;
    top: 0;
    /* min-width: 1200px; */
    z-index: 9999;
    background-color: rgb(255, 255, 255);
    height: 80px;
    box-shadow:0px 1px 30px rgba(8,35,63,0.5);
  }
  .navBar {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      /* min-width: 1200px; */
      margin: 0 auto;
      padding-right: 30px;
  }
  .topBar {
      box-sizing: border-box;
      width: 100%;
      color: #FFFFFF;
      height: 100%;
  }

  .logo_icon {

      height: 22px;
      /*width: 187px;*/
      margin-left: -120px;
      margin-right: 36px;
      margin-top :-60px;
  }
  .logo_icon img {
      display: block;
      height: 80px;
      width: auto;

  }
  .navBarContent {
    padding-top: 10px;
  }
  .navBarContent ul li {
      margin-right: 20px;
  }
  #app .navBarContent a{
    border-bottom: 4px solid rgba(255,255,255,0);
  }
  #app .navBarContent a:hover {
    color: #00D6C9;
    cursor: pointer;
  }
  #app .navBarContent a.currentClass{
    color: #00D6C9;
  }
  .navBarContent a{
    display: block;
    height: 50px;
    line-height: 50px;
    color: rgb(71, 71, 71);
    font-size:13px;
    font-family:Raleway;
    font-weight:500;
    letter-spacing:1px;


  }
  .navBarContent ul li span {
      display: block;
      height: 0;
      border-radius: .02rem;
  }


  .navBarContent .el-dropdown,.login_state .el-dropdown{
    display: inline-block;
    line-height: 50px;
    color: #fff;
    font-size:13px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    letter-spacing:1px;
    text-shadow:0px 1px 30px rgba(8,35,63,0.5);
    /*max-width: 100px;*/
    white-space: nowrap;
    cursor: pointer;
    /*overflow: hidden;*/
  }
  .login_state .el-dropdown{
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 20px 0 8px;
    max-width: 140px;
  }
  .nav_left_drop.el-dropdown-menu{
    z-index: 10000 !important;
    top: 70px !important;
    background: #132D4B;
    border: none;
  }
  .nav_left_drop .el-dropdown-menu__item{
    padding: 0;
  }
  .nav_left_drop a,.nav_left_drop span{
    display: inline-block;
    width: 130px;
    padding-left: 20px;
    color: #8F9DAA;
    font-size: 13px;
  }
  .nav_left_drop a:hover{
    background: #00D6C9;
    color: #fff;
  }
  .nav_left_drop a.router-link-active{
    background: #00D6C9;
    color: #fff;
  }


  .login_state {
    padding-top: 10px;
    margin-left: 30px;
  }
  .tkb_rate{
    width: 138px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    background: rgb(255, 255, 255);
    text-align: center;
    border-radius: 4px;
    margin-right: 8px;
    position: relative;
    font-family: Raleway;
    color: black;
    border-style:solid;
    border-width: 1px;
    border-radius: 5px;
    padding-left:10px;
  }

  .tkb_rate span{
    font-family: Raleway;
  }
  .tkb_rate img{
    margin: 0 8px 0 12px;
    cursor: pointer;
  }
  .tkb_rate_tips{
    width: 206px;
    background: rgb(236, 234, 234);
    color: rgb(0, 0, 0);
    font-size: 12px;
    position: absolute;
    top: 56px;
    left: -83px;
    line-height: 15px;
    text-align: left;
    padding: 18px 12px 26px;
    z-index: 20;
    border-radius:5px;
  }
  .login_btn{
    width:114px;
    height: 40px;
    line-height:40px;
    background:rgba(22,162,176,1);
    border-radius:4px;
    font-size:14px;
    font-family:Raleway;
    font-weight:500;
    letter-spacing:1px;
    cursor: pointer;
  }
  .login_btn:hover{
       background:rgb(43, 214, 230);
  }
  .cart_icon{
    cursor: pointer;
  }
</style>
