<i18n>
  {
    "zh-cn":{
      "bank":"银行列表",
      "bankId":"ID卡号",
      "registerName":"注册姓名",
      "submiteNow":"立即提交",
      "":""
    },
    "en":{
      "bank":"Bank",
      "bankId":"Nomor rekening",
      "registerName":"Nama pemilik rekening",
    	"submiteNow": "submiteNow",
    	"":""
  	}
  }
</i18n>

<template>
	<div class="bodyContents">
		<!-- 登录框 -->
		<div id="formTitle">
			Akun saya>Kartu bank pengikat
		</div>
		<div class="formContent">
			<el-form ref="form" :model="searchForm" label-width="170px" style="width: 530px">
				<el-form-item :label= '$t("bank")' prop="bank" :rules="[
			      { required: true, message: $t('message.notNullOption')}]" >
				  <el-select v-model="searchForm.bank" class="formItemWidth">
				    <el-option
				      v-for="item in bankList"
				      :key="item.bankCode"
				      :label="item.registerName"
				      :value="item.bankCode">
				    </el-option>
				  </el-select>
				</el-form-item>					
				<el-form-item :label= '$t("bankId")' prop="bankId" :rules="[
			      { required: true, message: $t('message.notNullOption')}]" >
					<el-input v-model="searchForm.bankId" maxlength="32" auto-complete="off" placeholder="Harap masukkan nomor rekening"></el-input>
				</el-form-item>	
				<el-form-item :label= '$t("registerName")' prop="registerName" :rules="[
			      { required: true, message: $t('message.notNullOption')}]" >
					<el-input v-model="searchForm.registerName" maxlength="50" placeholder="Isi nama sesuai yang didaftarkan" auto-complete="off"></el-input>
				</el-form-item>	
				<el-form-item>
					<el-button type="primary" @click="onSubmit" style="width:500px;background-color: #2AD2C8;border:#2AD2C8">{{$t('submiteNow')}}</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	// import globals from '../assets/js/main.js';
	export default {
		data(){
			return {
				searchForm: {
					"bank":'',
					"bankId":'',
					"registerName":''
				},
				bankList: [{
		            "id": 1,
		            "registerName": "Bank Central Asia (BCA)",　//银行名称
		            "bankCode": "BCA",  //银行code
		            "isUsed": 0,
		            "protectStartTime": null,
		            "protectEndTime": null,
		            "singleLimit": 0,
		            "oneDayLimit": 0
				        }]
			}
		},
		methods: {
			getImgCode(){
				if(!this.phoneNum){
					this.$message({
			            type: 'warnning',
			            message: 'Tidak boleh kosong'
			          });
					return;
				}else{
				this.$axios.post('/web/credit/submitCompletion', {

				  })
				  .then(function (re) {
				    this.imgCodeShowimgCodeShow=re.data.imgBase64;
				  })
				  .catch(function (re) {
				    console.log(re);
				  });
				}
			},
			onSubmit(){
				let _this=this;
				const loading = this.$loading({
				          lock: true,
				          text: 'Loading',
				          spinner: 'el-icon-loading',
				          background: 'rgba(0, 0, 0, 0.7)'
				        });
				this.$axios.post('/api-user/user/bindBankCard', {
				    "bankHolderName": _this.searchForm.registerName, //持卡人姓名
				    "bankCode": _this.searchForm.bank,　//银行卡code
				    "bankNumberNo": _this.searchForm.bankId  //银行卡号
				  })
				  .then( (re)=>{
				  		loading.close();
				    	if(re.data.code==0){
				    		_this.$message(_this.$t("message.submiteSuccess"));
						    setTimeout(()=>{
						      this.$router.push("./investment")
						    }, 1500);
				    	}else if(re.data.code=="-5"){
					    	_this.$message({
						          showClose: true,
						          message: _this.$t("message.missLogin"),
						          type: 'error'
						        })
						    setTimeout(()=>{
						      this.$router.push("./login");
						    }, 1500);
						    return;
						 }else {
					    	_this.$message({
						          showClose: true,
						          message: re.data.message,
						          type: 'error'
						        })
						 }
				  })
				  .catch((re)=>{
				    console.log(re);
				  });
			}

		},

		mounted(){
			// this.$axios.post('/api-system/system/bankList', {

			//   })
			//   .then((re)=>{
			//     this.bankList=re.data.data;
			//     console.log(this.bankList)
			//   })
			//   .catch(function (re) {
			//     console.log(re);
			//   });
		}
	}
</script>
<style>
	.formContent {
		width: 600px;
		margin: 0px auto;
		padding: 50px;
	}
	.formItemWidth {
		width: 360px;
	}
	#formTitle {
		width: 1000px;
		margin: 0 auto;
		margin-top: 60px;
		text-align: left;
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		padding: 40px 0;
		box-sizing: border-box;
		border-bottom: 2px solid #eee
	}
</style>