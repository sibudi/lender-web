<i18n>
  {
    "zh-cn":{
      "enterPhoneNum":"手机号码格式不正确",
      "enterImgCode":"请填写图形验证码",
      "enterPhoneNumImgCode":"请填写手机号码和图形验证码"

    },
    "en":{
      	"enterPhoneNum":"Format nomor telepon salah",
	    "enterImgCode":"Harap isi kode verifikasi grafis",
	    "enterPhoneNumImgCode":"Harap isi nomor ponsel dan kode verifikasi grafis"
  	}
  }
</i18n>

<template>
	<div class="login_con">
		<!-- 登录框 -->
			<div>
					<div class="login_title"><img src="../../assets/images/login_tit.png" height="36" width="425"></div>
					<div class="login_box">
							<div class="login_logo"><img src="../../assets/images/login_logo.png" height="60" width="60"></div>
							<div class="login_item df">
									<div class='login_hd mobile_hd'>+62</div>
						    	<input type="tel" placeholder="Silakan masukkan nomor ponsel Anda."  maxlength="15" v-model="phoneNum" class="f1" />
							</div>
							<div class="df">
						    <div class="login_item login_item01 df" style="width: 302px;">
						    		<div class='login_hd'><img src="../../assets/images/login_icon01.png" height="25" width="20"></div>
						    		<input type="text" placeholder="Masukkan Kode Verifikasi Gambar" maxlength="4" class="f1" v-model="imgCode"/>
						    </div>
					        <img :src="imgCodeShow" class="btn_code" @click="getImgCode()"/>
			        </div>
			        <div class="df">
						    <div class="login_item login_item01 df" style="width: 235px;">
						    		<div class='login_hd'><img src="../../assets/images/login_icon02.png" height="25" width="20"></div>
						        <input type="text" placeholder="Masukkan Kode Verifikasi SMS" maxlength="6"  class="f1" v-model="smsCode"/>
						        <input type="hidden" id="hdCodeID" />
						    </div>
				    		<div>
				            <!-- <a href="javascript:;"  class="btn_code" id="btnCode" @click="getSmsCode()">Dapatkan kode</a> -->
				          <div class="btn_code" id="btnCode" @click.prevent.stop='getSmsCode'>
					          <span v-if="!sendtrue">{{smscodetxt}}</span>
					          <span v-else>{{timecount}} s</span>
					        </div>
				        </div>
					  	</div>
					  	<div class="df login_tips aic" style="width: 410px;">
					  		<div><img src="../../assets/images/login_tips.png" height="12" width="12"></div>
					  		<!-- <div>我已阅读并同意<a href=""><注册协议></a></div> -->
					  		<div style="text-align:left;">Saya telah membaca dan menyetujui <router-link to="/guaranteeProtacol">Perjanjian Pinjaman</router-link>.</div>
					  	</div>
					    <div class="">
					    	<button id='signinBtn' @click="loginSubmite()"  :disabled="loading" :loading="loading">Ajukan</button>
					    </div>
					</div>
			</div>
			<!-- <input class="a" v-model="userList"></input> -->
	</div>
</template>

<script>
	import globals from '../../assets/js/main.js';
	import store from '../../store'
	export default {
		data(){
			return {
				phoneNum: '',
				imgCodeShow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
				imgCode: '',
				smsCode: '',
				userList:store.state.userList,//引入state中的对象
				imgSessionId:'',
				loading:false,
				sendtrue: false,   //是否发送验证码 true发送
        smscodetxt: 'Dapatkan kode',
        timecount: 60,  //60秒倒计时
			}
		},
		methods: {
			init(){
				let _sel=this;
				this.$axios({
				    method:"get",
				    url:"/api-user/user/getImageCapcha",
				    data:{},
				    headers:{
				        "Content-Type":"application/json;charset=UTF-8"
					}
				}).then((re)=>{
				  	if(re.data.code==0){
				  		_sel.imgSessionId=re.data.data.imgSessionId;
				    	_sel.imgCodeShow="data:image/jpeg;base64,"+re.data.data.imgBase64;
				  	}
				  })
				  .catch(function (re) {

				  });
			},
			getImgCode(){
				if(!globals.dataUtil.isMobile(this.phoneNum)){
					this.$message("Format nomor telepon salah");
				}else{
					let _sel=this;
					this.$axios({
					    method:"get",
					    url:"/api-user/user/getImageCapcha",
					    data:{},
					    headers:{
					        "Content-Type":"application/json;charset=UTF-8"
						}
					}).then(function (re) {
					  	if(re.data.code==0){
					  		_sel.imgSessionId=re.data.data.imgSessionId;
					    	_sel.imgCodeShow="data:image/jpeg;base64,"+re.data.data.imgBase64;
					  	}else {
					  		this.$message(re.data.message);
					  	}
					  })
					  .catch(function (re) {

					  });
				}
			},
			  /**
         * 验证码倒计时
         * @return {[type]} [description]
         */
        showWaitTips() {
            this.sendtrue = true;

            this.timecount = 60;

            let sv = setInterval(() => {
                if (this.timecount > 1) {
                    this.timecount--;
                } else {
                    this.smscodetxt ="Dapatkan kode";
                    this.sendtrue = false;
                    clearInterval(sv);
                }
            }, 1000);
        },
        /**
         * 获取验证码
         * @return {[type]} [description]
         */
        getSmsCode(){
            if(this.sendtrue){
              return;
            }
		      	if(this.phoneNum&&this.imgCode){
							let _this=this;
							if(globals.dataUtil.isMobile(this.phoneNum)&&globals.dataUtil.isImgNumber(this.imgCode)){
								const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
								_this.$axios.post('/api-system/system/sendSmsCode', {
								    "mobileNumber": globals.dataUtil.isMobile(_this.phoneNum),
								    "imgSessionId":_this.imgSessionId, 
								    "imgCaptch":_this.imgCode,
								    "smsType": "LOGIN"
								  }).then(function (re) {
								  	loading.close();
								  	if(re.data.code==0){
								  		_this.showWaitTips();
      					  		_this.$message({showClose: true,message: 'sms terkirim',type: 'success'});
								  	}else {
								  		_this.sendtrue = false;
								  		_this.$message(re.data.message);
								  		_this.getImgCode();
								  	}
								  }).catch(function (re) {});
							}else {
								this.$message("Harap isi nomor ponsel dan kode verifikasi grafis");
							}
						}else {
							this.$message("Harap isi nomor ponsel dan kode verifikasi grafis");
						}
        },
			loginSubmite(){
				let mb=this.$globals.dataUtil.isMobile(this.phoneNum);
				
				console.log(mb)
				if(mb&&this.$globals.dataUtil.isImgNumber(this.imgCode)&&this.smsCode){
					this.loading = true;
					this.$axios.post('/api-user/user/login', {
					    	"mobileNumber": mb,
					    	"smsCode": this.smsCode,
					    	"sessionId":"2",
					    	"type": 0
					  })
					  .then((re)=>{
					  	//登录成功，保存用户信息
					  	if(re.data.code==0){
					  		localStorage.setItem('login', true);
					  		//将用户名放入vuex
					  		this.$store.dispatch("setHeadImage",baseUrl+re.data.data.headImage);
					  		this.$store.dispatch("setUserName",re.data.data.username);
					  		this.$store.dispatch("setUserUuid",re.data.data.userId);
					  		this.$store.dispatch("setUser",re.data.data.mobileNumber);
					  		this.$store.dispatch("setToken",re.data.data.sessionId);
					  		this.$store.dispatch("setLogin",'true');
					  		this.$message({showClose: true,message: 'login success',type: 'success'});
					  		setTimeout(()=>{
					  			if(this.$store.getters.loginToBack){
					  				this.$router.push({path: this.$store.getters.loginToBack})
					  				this.$store.dispatch("loginToBack","");//保存该标的信息
					  			}else{
						  			this.$router.push({path:"/"})
					  			}
					  		},1000);
					  	}else {
					  		this.$message(re.data.message);
					  		this.loading = false
					  	}
					  })
					  .catch((re)=>{
					    // console.log(re);
					    this.loading = false
					  });

				}else {
					this.$message("Harap isi nomor ponsel dan kode verifikasi grafis");
				}
			},
		},
		mounted(){
			this.init();
		}
	}
</script>
<style>
		.login_con{
			width: 100%;
			height: 696px;
			background: url('../../assets/images/login_bg.png') no-repeat;
			background-size: 100% 100%;
		}
		.login_title{
			height:38px;
			font-size:38px;
			font-family:DFPShaoNvW5;
			color:rgba(255,255,255,1);
			line-height:38px;
			text-align: center;
			padding: 105px 0 40px;
		}
		.login_box{
			width: 361px;
			margin:0 auto;
		}
		.login_logo{
			margin-bottom: 30px;
		}
		.login_item{
		    width:361px;
				height:46px;
				background:rgba(255,255,255,0.6);
				border-radius:4px;
				margin-bottom: 19px;
				overflow: hidden;
		}
		.login_item.login_item01{
			width: 230px;
			margin-right: 6px;
		}
		.login_item input{
			color: #fff;
			font-size: 12px;
			background: transparent;
			padding-left: 10px;
			/*letter-spacing: 1px;*/
		}

		.login_item input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #fff;
    }

    .login_item input:-moz-placeholder, textarea:-moz-placeholder {
        color: #fff;
    }

    .login_item input::-moz-placeholder, textarea::-moz-placeholder {
        color: #fff;
    }

    .login_item input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #fff;
    }
		.login_hd{
			width:50px;
			height:46px;
			background:rgba(255,255,255,0.6);
			border-radius:4px 0px 0px 4px;
		}
		.mobile_hd{
			color: #2AD2C8;
			font-size: 14px;
			line-height: 50px;
		}
		.login_hd img{
			margin-top: 9px;
		}

        .btn_code {
        	display: block;
        	width:123px;
					height:46px;
					background:rgba(42,210,200,1);
					border-radius:5px;
					line-height: 46px;
					cursor: pointer;
        }
        #btnCode {
					font-size:14px;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(255,255,255,1);
        }
/*        #btnCode:hover {
        	color: #eee;
        }*/
        .login_tips{
        	margin: 0 auto 9px;
					font-size:14px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(212,219,225,1);
        }
        .login_tips img{
        	margin: 0 10px 0 4px;
        }
        .login_tips a{
        	color: #00D6C9;
        }
       	#signinBtn {
        	width:361px;
					height:46px;
					background:rgba(42,210,200,1);
					border-radius:5px;

					font-size:16px;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(255,255,255,1);

        }
</style>
