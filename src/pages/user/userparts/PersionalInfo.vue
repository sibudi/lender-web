<i18n>
  {
    "zh-cn":{
      "perinfo": "个人资料",
      "userid": "用户ID：",
      "usermobile": "用户手机号：",
      "username": "用户姓名：",
      "useridno": "用户身份证号：",
      "bankinfo": "银行卡信息",
      "untrust": "未认证",
      "addbank": "添加银行卡",

      "accountsafe": "账户安全 ",
      "realname": "实名认证",
      "realnametips": "实名认证后，可享保险极速理赔服务",
      "mobile": "手机号码",
      "mobiletips": "资金变动及敏感操作短信通知",
      "totrust": "去认证",
      "email": "更换"

    },
    "en":{
      "perinfo": "Data pribadi",
      "userid": "ID Nasabah：",
      "usermobile": "Nomor telepon Nasabah：",
      "username": "Nama Nasabah：",
      "useridno": "Nomor ID KTP Nasabah：",
      "bankinfo": "Informasi kartu bank",
      "untrust": "Belum Sertifikasi",
      "addbank": "Tambahkan Rekening bank/kartu bank",
      "accountsafe": "Keamanan akun",
      "realname": "Sertifikasi nama asli",
      "realnametips": "Setelah sertifikasi nama asli, Anda dapat menikmati layanan klaim asuransi yang cepat",
      "mobile": "Nomor ponsel",
      "mobiletips": "Perubahan dana dan pemberitahuan SMS operasi sensitif",
      "totrust": "Pergi sertifikasi",
      "email": "Ganti"
    }
  }
</i18n>

<template>
	<div class="views_perdetail" v-if="userInfo">

		  <div class="per_content">
		  	<div flex class="jcsb">
				<div>
					<p v-t="'perinfo'"  class="per_tips per_tit"></p>
					<p class="per_tips">{{$t('userid')}}{{userInfo.id}}</p>
					<p class="per_tips">{{$t('usermobile')}}{{userInfo.mobileNumber}}</p>
					<p class="per_tips">{{$t('username')}}<span v-if="userInfo.authStatus == 2 || userInfo.authStatus == 3">{{userInfo.realName}}</span><span v-if="userInfo.authStatus != 2 && userInfo.authStatus != 3">{{$t('untrust')}}</span></p>
					<p class="per_tips">{{$t('useridno')}}<span v-if="userInfo.authStatus == 2 || userInfo.authStatus == 3">{{userInfo.idCardNo}}</span><span v-if="userInfo.authStatus != 2 && userInfo.authStatus != 3">{{$t('untrust')}}</span></p>
				</div>

				<div class="bank_info_con">
					<p v-t="'bankinfo'" class="per_tips bank_tit"></p>
					<p class="bank_info" v-if="userInfo.bankCardNo">{{userInfo.bankCardNo}}</p>
					<div v-if="!userInfo.bankCardNo" @click="goBindbank">
						<p  class="add_bank">+</p>
						<p v-t="'addbank'" class="add_bank_txt"></p>
					</div>
				</div>
		  		
		  	</div>

			  <div>
			  	<div v-t="'accountsafe'" class="per_tit per_tips"></div>
			  	<div v-t="'realname'" class="per_tips"></div>
			  	<div flex class="jcsb per_tips">
			  		<p>{{$t('realnametips')}}</p>
			  		<p v-t="'totrust'" class="oper_btn" v-if="userInfo.authStatus !=1" @click="gotrust"></p>
			  	</div>
	
		  		<div  class="per_tips">{{$t('mobile')}}<span style="margin-left: 27px;">{{userInfo.mobileNumber}}</span></div>
		  		<div flex>
		  			<p>{{$t('mobiletips')}}</p>
		  			<p></p>
		  		</div>	
			  </div>
	  </div>


	</div>
</template>
<script>
	export default{
	  props: {
			userInfo: {}
	  },
		data(){
	    return {
	    	
	    }
  	},
		created(){
	  },
	  methods: {
	    gotrust(){
				this.$router.push('/authentication');
	    },
	    goBindbank(){
	    	this.$axios.post('/api-user/user/userBasicInfo', {
            
	          })
	          .then((response)=>{
	            // resolve(response.data.data);
	            let a=response.data.data;
	            if(a["authStatus"]==0||a["authStatus"]==4){
	            	setTimeout(()=>{
	            		this.$message("Nama asli tidak sesuai dengan pengguna")
	            	}, 1500);
	            	this.$router.push('/authentication');
	            }else{
	            	this.$router.push('/bindCard');
	            }
	          })
	          .catch((response)=>{
	            // console.log(response);
	          });
	    	
	    }
	  }
	}
</script>
<style lang="less">
	.views_perdetail{
  	padding: 0px 25px;
  	background: #fff;
  	border-radius: 4px;
  	font-size: 13px;
  	color: #474747;
		text-align: left;

				.per_content{

					.bank_info_con{
						width: 264px;
						text-align: left;

							.add_bank{
								width: 52px;
								height: 52px;
								box-shadow: 0px 2px 4px 0 RGBA(195, 195, 195, 0.5);
								font-size: 30px;
								text-align: center;
								line-height: 52px;
								color: #E3E6EB;
								cursor: pointer;
							}
							.add_bank_txt{
								color: #9c9c9c;
								font-size: 12px;
								margin-top: 10px;
								cursor: pointer;
							}
							.bank_info{
								width: 194px;
								height: 48px;
								background: url(~@/assets/img/new/bank_bg.png);
								background-size: 100% 100%;
								font-size: 16px;
								color: #fff;
								padding-top: 102px;
								padding-left: 70px;
							}
					}


						
						.per_tips{
							margin-bottom: 27px;
							&.per_tit{
								font-size: 18px;
								font-weight: 500;
							}
							&.bank_tit{
								font-weight: 500;
							}
						}

						.oper_btn{
							width: 122px;
							line-height: 26px;
							border-radius: 20px;
							border: 1px solid #2AD2C8;
							color: #2AD2C8;
							text-align: center;
							box-shadow: 0 4px 4px 0 #EEF6FF;
							cursor: pointer;
						}
				}
	}
</style>