<i18n>
  {
    "zh-cn":{
        "realName":"姓名",
        "idCardNo":"ID卡号",
        "birthAddressRo":"出生地址",
		"birthDate": "出生日期",
		"age": "年龄",
		"sex": "性别",
		"education": "教育学历",
		"job": "工作",
		"workField": "行业",
		"liveAddressRo": "现居住地",
		"liveDetailed": "详细地址",
		"religion": "宗教",
		"npwpNo": "NPWP No.",
		"yearSalary": "年收入",
		"salaryHomeValue": "家庭收入",
		"workTime": "工龄",
		"otherSalaryFrom": "其他收入渠道",
      	"submiteNow":"立即提交",
     	"ResultFail":"认证失败",
     	"ResultFailContent":"请填写其它信息完成认证",
     	"ResultSuccess":"认证成功",
     	"ResultSuccessContent":"请填写其它信息完成认证"
    },
    "en":{
    	"realName": "Nama lengkap",
    	"idCardNo": "Nomor identitas",
    	"birthAddressRo": "Tempat lahir",
		"birthDate": "Tanggal lahir",
		"age": "Umur",
		"sex": "Jenis kelamin",
		"education": "Pendidikan",
		"job": "Pekerjaan",
		"workField": "Industri",
		"liveAddressRo": "Alamat tempat tinggal",
		"liveDetailed": "Alamat terinci",
		"religion": "Agama",
		"npwpNo": "NPWP No.",
		"yearSalary": "Pendapatan tahunan",
		"salaryHomeValue": "Domisili pajak Indonesia",
		"workTime": "Lama bekerja",
		"otherSalaryFrom": "Sumber aset lainnya",
		"submiteNow": "Ajukan",
		"upImg": "Foto KTP",

		"bank":"Kartu Bank",
		"bankId":"Nomor Rekening",
		"payPwd":"Password Transaksi ",
		"repayPwd":"Masukan Password Transaksi sekali lagi "
  	}
  }
</i18n>

<template>
	<div class="auth_con">
		<div class="form_con ele_check">
			<div class="form_tit">Silakan isi informasi identitas berikuts</div>
			<el-form ref="form" :model="searchForm" label-width="200px" class="form_main">
				<!-- //姓名 -->
				<el-form-item :label='$t("realName")' prop="realName" type='number' :rules="[{ required: true, message: 'Nama lengkap'}]" >
				    <el-input v-model="searchForm.realName" maxlength="32" auto-complete="off"></el-input>
				</el-form-item>		
				<!-- 身份证号码 -->
				<el-form-item :label= '$t("idCardNo")' prop="idCardNo" :rules="[{ required: true, message: ''}]" >
				    <el-input v-model="searchForm.idCardNo"  maxlength="22"></el-input>
				</el-form-item>
				<!-- 出生地址 " -->
				<el-form-item :label= '$t("birthAddressRo")' prop="birthAddressRo" :rules="[{ required: true, message: ''}]" >
					<el-cascader :options="birthAddressOptions" v-model="searchForm.birthAddressRo" class="form_item_wd form_select" @active-item-change="getBirthAddressList"></el-cascader>
				</el-form-item>		
				<!-- 出生日期		 -->
				<el-form-item :label= '$t("birthDate")' prop="birthDate" :rules="[{ required: true, message: ''}]" >
				    <el-date-picker v-model="searchForm.birthDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="form_item_wd form_select" style="width: 748px;"></el-date-picker>
				</el-form-item>
				<!-- 年龄 -->
				<el-form-item :label= '$t("age")' prop="age" :rules="[{ required: true, message: ''}]" >
					<el-input v-model="searchForm.age"  maxlength="3"></el-input>
				</el-form-item>	
				<!-- 性别-->
				<el-form-item :label= '$t("sex")' prop="sex" :rules="[{ required: true, message: ''}]" >
				  <el-select v-model="searchForm.sex" class="form_item_wd form_select">
				    <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
				  </el-select>
				</el-form-item>
				<!-- 受教育程度 -->
				<el-form-item :label= '$t("education")' prop="education" :rules="[{ required: true, message: ''}]" >
				  <el-select v-model="searchForm.education" class="form_item_wd form_select">
				    <el-option v-for="item in authenticationLists['_education']" :key="item.value" :label="item.label" :value="item.label"></el-option>
				  </el-select>
				</el-form-item>	
				<!-- 工作职位			 -->
				<el-form-item :label= '$t("job")' prop="job" :rules="[{ required: true, message: ''}]" >
				  <el-select v-model="searchForm.job" class="form_item_wd form_select">
				    <el-option v-for="item in authenticationLists['_position']" :key="item.label" :label="item.label" :value="item.label"></el-option>
				  </el-select>
				</el-form-item>
				<!-- 行业 -->
				<el-form-item :label= '$t("workField")' prop="workField" :rules="[{ required: true, message: ''}]" >
				  <el-select v-model="searchForm.workField" class="form_item_wd form_select">
				    <el-option v-for="item in authenticationLists['_industry']" :key="item.value" :label="item.label" :value="item.label">
				    </el-option>
				  </el-select>
				</el-form-item>

				<!-- 住址 -->
				<el-form-item :label= '$t("liveAddressRo")' prop="liveAddressRo" :rules="[{ required: true, message: ''}]" >
					<el-cascader :options="livingAddressOptions" v-model="searchForm.liveAddressRo" class="form_item_wd form_select" @active-item-change="getLiveAddressList"
					></el-cascader>
				</el-form-item>	
				<!-- 详细地址 -->
				<el-form-item :label= '$t("liveDetailed")' prop="liveDetailed" :rules="[{ required: true, message: ''}]" >
				    <el-input v-model="searchForm.liveDetailed"  maxlength="50"></el-input>
				</el-form-item>	
				<!-- 宗教 -->
				<el-form-item :label= '$t("religion")' prop="religion" :rules="[{ required: true, message: ''}]" >
				  <el-select v-model="searchForm.religion" class="form_item_wd form_select">
				    <el-option v-for="item in authenticationLists['_religion']" :key="item.value" :label="item.label" :value="item.label"></el-option>
				  </el-select>
				</el-form-item>
				<!-- npwpNo -->
				<el-form-item :label= '$t("npwpNo")' prop="npwpNo" :rules="[{ required: true, message: ''}]" >
				    <el-input v-model="searchForm.npwpNo"  maxlength="22"></el-input>
				</el-form-item>	
				<!-- 年收入 -->
				<el-form-item :label= '$t("yearSalary")' prop="yearSalary" :rules="[{ required: true, message: ''}]" >
				  <el-select v-model="searchForm.yearSalary" class="form_item_wd form_select">
				    <el-option v-for="item in yearMoney" :key="item.value" :label="item.label" :value="item.label"></el-option>
				  </el-select>
				</el-form-item>
				<!-- 税务所登记 -->
				<el-form-item :label= '$t("salaryHomeValue")' prop="salaryHomeValue" :rules="[{ required: true, message: ''}]" style="text-align:left;">
					<el-switch	class="switchStyle"	v-model="searchForm.salaryHomeValue"	active-color="#2AD2C8" 	inactive-color="#eee">Domisili pajak indonesia</el-switch>
					Domisili pajak indonesia 
				</el-form-item>				
				<!-- 工作时间 -->
				<el-form-item :label= '$t("workTime")' prop="workTime" :rules="[{ required: true, message: ''}]" >
				  <el-select v-model="searchForm.workTime" class="form_item_wd form_select">
				    <el-option v-for="item in workFieldList" :key="item.value" :label="item.label" :value="item.label"> </el-option>
				  </el-select>
				</el-form-item>

				<el-form-item :label= '$t("otherSalaryFrom")' prop="otherSalaryFrom" :rules="[{ required: true, message: ''}]">
					<el-checkbox-group text-color="#b44029" fill="#b44029" v-model="searchForm.otherSalaryFrom" style="text-align:left;">
				        <el-checkbox label="Dari warisan" name="otherSalaryFrom"></el-checkbox>
				        <el-checkbox label="Dari hadiah" name="otherSalaryFrom"></el-checkbox>
				        <el-checkbox label="Dari aset" name="otherSalaryFrom"></el-checkbox>
				        <el-checkbox label="Lain-lain" name="otherSalaryFrom"></el-checkbox>
				    </el-checkbox-group>
				</el-form-item>

					<!-- s上传文件 -->
					<el-form-item :label= '$t("upImg")' prop="familyCardUrl" >
				    <div class="uploadImg" style="text-align:left;">
							<el-upload :action="BASE_URL" :limit='1' :data="upLoadData" :on-success='handleAvatarSuccess' :on-preview="handlePictureCardPreview">
							  <el-button size="small" type="primary"><i class="el-icon-upload"></i>Unggah file</el-button>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
				      	</div>
					</el-form-item>
			</el-form>
		</div>

		<div class="form_con">
			<div class="form_tit">Silakan isi informasi kartu bank saya</div>
			<el-form ref="forms" :model="bankForm" label-width="200px" class="form_main">
				<el-form-item :label= '$t("bank")' prop="bankCode" :rules="[{ required: true, message: ''}]" >
				  <el-select v-model="bankForm.bankCode" class="form_item_wd form_select">
				    <el-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode"></el-option>
				  </el-select>
				</el-form-item>					
				<el-form-item :label= '$t("bankId")' prop="bankNumberNo" :rules="[{ required: true, message: ''}]" >
					<el-input v-model="bankForm.bankNumberNo" maxlength="32" auto-complete="off" placeholder="Harap masukkan nomor rekening"></el-input>
				</el-form-item>	
				<el-form-item :label= '$t("payPwd")' prop="payPwd" :rules="[{ required: true, message: ''}]" >
					<el-input v-model="bankForm.payPwd" placeholder="" auto-complete="off"  show-password></el-input>
				</el-form-item>	
				<el-form-item :label= '$t("repayPwd")' prop="repayPwd" :rules="[{ required: true, message: ''}]" >
					<el-input v-model="bankForm.repayPwd" placeholder="" auto-complete="off"  show-password></el-input>
				</el-form-item>
				<div class="form_tips">Harap diperhatikan <br/>Agar bisa menerima dana yang ditarik,mohon pastikan anda memliki rekening bank yang terdaftar dengan nama anda sendiri sesuai dengan kartu identitas(KTP)</div>
			</el-form>
		</div>

		<div>
			<el-button type="primary" @click="onSubmit" class="form_sub_btn">{{$t('submiteNow')}}</el-button>
		</div>
	</div>
</template>

<script>
	import '../../assets/css/element.css';
	import authenticationLists from '../../assets/json/authenticationLists.json';
	export default {
		data(){
			return {
				fullscreenLoading: '',
				// bankinfo
				bankForm: {
					"bankCode":'',
					"bankNumberNo":'',
					"payPwd":'',
					"repayPwd":''
				},
				bankList: [{
          "id": 1,
          "bankCode": "BCA",  //银行code
        },{
          "id": 2,
          "bankCode": "BNI",  //银行code
        },{
          "id": 3,
          "bankCode": "CIMB",  //银行code
        }],
				// upload
				dialogVisible:false,
				dialogImageUrl:'',
				upLoadData:{"fileType": "img","sessionId": ""},
				BASE_URL:'',
				isBindCard: 0,
				authenticationLists:{},
				phoneNum: '',
				fatherArr: [],//获取当前点击省市大区小区时候的index，用于设置第几个children
				birfatherArr:[],
				fatherCode: '',
				fatherIndex: [],	

				livingfatherArr: [],//获取当前点击省市大区小区时候的index，用于设置第几个children
				livingfatherCode: '',
				livingfatherIndex: [],
				searchForm: {
					realName: '',
					idCardNo: '',
					birthAddressRo:['', ''],
					idCardImage:'',
					// birthAddressRo: {
					// 		"birthProvince": 'dddd',
					// 		"birthCity": '',
					// 		"birthBigDirect": '',
					// 		"birthSmallDirect": ''
					// },
					birthDate: '',
					sex: '',
					age: '',
					education: '',
					job: '',
					workField: '',
					liveAddressRo: ['', ''],
					liveDetailed: '',
					religion: '',
					// companyBusinessCode: '',
					// companyType: '',
					// registeredLegalName: '',
					// organizerCode: '',
					npwpNo: '',
					yearSalary: '',
					salaryHomeValue: false,
					otherSalaryFrom: [],
					workTime: ''
				},
				birthAddressOptions: [],
				livingAddressOptions: [],
				sexList: [{
				          value: '1',
				          label: 'Laki-laki'
				        },{
				          value: '2',
				          label: 'Perempuan'
				        }],
				educationList: [],  				
				jobList: [],  				
				workFieldList: [{
					value:"0",label:'Kurang dari 1 tahun'
				},{
					value:"1",label:'1 tahun'
				},{
					value:"2",label:'2 tahun'
				},{
					value:"3",label:'3 tahun'
				},{
					value:"4",label:'4 tahun'
				},{
					value:"5",label:'5 tahun'
				},{
					value:"6",label:'6 tahun'
				},{
					value:"7",label:'7 tahun'
				},{
					value:"8",label:'Diatas 7 tahun'
				}],  
				yearMoney: [{
					value:"0",label:'Di bawah 100 juta'
				},{
					value:"1",label:'100-250 juta'
				},{
					value:"2",label:'251-500 juta'
				},{
					value:"3",label:'501 juta-2 miliar'
				},{
					value:"4",label:'2 miliar-10 miliar'
				},{
					value:"5",label:'Di atas 10miliar'
				}]   
			}
		},
		methods: {
	    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
	    },
			handleAvatarSuccess(response, file) {
				if(response.code == 0){
					this.searchForm.idCardImage= response.data['filePath'];
				}
	    },
			init(){
				this.BASE_URL=upLoadbaseUrl + "/api-upload/upload/image";
				this.upLoadData['sessionId']=this.$store.getters.token;


				for(let e in authenticationLists){
					this.authenticationLists[e]=this.changeRule(authenticationLists[e]);
				}

				let _this=this;
				_this.getAddressList(2,1).then(function(value) { 
					_this.fatherArr=value;
					_this.livingfatherArr=value;
					_this.birfatherArr = value;
					_this.birthAddressOptions=value;
					_this.livingAddressOptions=value;
				});
		          this.$axios.post('/api-user/user/userAuthBankInfoBySession', {})
		          .then((response)=>{
		            this.isBindCard=response.data.data.bankStatus;
		          })
		          .catch((response)=>{
		            // console.log(response);
		          });
		          _this.fetchData();
			},
			getAddressList(h,g){
				let _this=this;
				var p=new Promise(function(resolve,reject){
					_this.$axios.post('/api-system/system/getSysDict', {
						"distLevel" : h,
						"parentCode": g,
					}).then(function (response) {

						let re=[],res=response.data.data;
						res.forEach((i)=>{  
							let obj={};
							obj["values"]=i.distCode;
							obj["value"]=i.distName;
							obj["label"]=i.distName;
							obj["children"]=[];
							re.push(obj)
						});
						resolve(re);
				   	}).catch(function (re) {
				   		console.log(re);
					});;

					
				})
				return p; // 返回p实例对象

			},
			changeRule(e){
				let data=[];
				for(var i in e){
					let a={};
					a.value=e[i].id;
					a.label=e[i].dicItemName;
					a.children={};
					data.push(a);
				}
				return data;
			},

			getBirthAddressList(e){
				let _this=this;
        // _this.searchForm.birthAddressRo = ['', '']
        for(let x in _this.birthAddressOptions){
          _this.birthAddressOptions[x].children = [];
        }
    		for(let f in _this.fatherArr){
					if(_this.fatherArr[f].value==e[0]){
						_this.fatherCode=_this.fatherArr[f].values;
						_this.fatherIndex[0]=f;
					}
				}
				// 获取第二级list
        _this.getAddressList(3,_this.fatherCode).then(function(e) { 
          for(let f in e){
            e[f].children="";
          }
          _this.birthAddressOptions[_this.fatherIndex[0]].children=e;
          // _this.birfatherArr=e;
        });
        return;
			},			
    getLiveAddressList(e){
        let _this=this;
        // _this.searchForm.liveAddressRo = ['', '']
        // 找到当前点击的code
        for(let x in _this.livingAddressOptions){
          _this.livingAddressOptions[x].children = [];
        }
        
        for(let f in _this.fatherArr){
          if(_this.fatherArr[f].value==e[0]){
            _this.livingfatherCode=_this.fatherArr[f].values;
            _this.livingfatherIndex[0]=f;
          }
        }
        // 获取第二级list
        _this.getAddressList(3,_this.livingfatherCode).then(function(e) { 
          for(let f in e){
            e[f].children="";
          }
          _this.livingAddressOptions[_this.livingfatherIndex[0]].children=e;
          // _this.livingfatherArr=e;
        });
        return;
 
    },
			onSubmit(){
				// 个人信息
				let salaryHomeValue=this.searchForm['salaryHomeValue'];
				this.searchForm['salaryHomeValue']=1;
				console.log(this.searchForm)
				for(let i in this.searchForm){
					if(this.searchForm[i]==""||this.searchForm[i]==null||this.searchForm[i]==undefined||!this.searchForm.birthAddressRo[1]||!this.searchForm.liveAddressRo[1]){
						console.log("chuwentideshi",i)
						this.$message({
				            type: 'warnning',
				            message: 'Tidak boleh kosong'
				          });
						return;
					}
				}
				this.searchForm['salaryHomeValue']=salaryHomeValue;
				let _data=Object.assign({},this.searchForm),birth={},lives={};
				birth.birthProvince=_data.birthAddressRo[0];
				birth.birthCity=_data.birthAddressRo[1];
				// birth.birthBigDirect=_data.birthAddressRo[2];
				// birth.birthSmallDirect=_data.birthAddressRo[3];
				lives.liveProvince=_data.liveAddressRo[0];
				lives.liveCity=_data.liveAddressRo[1];
				// lives.liveBigDirect=_data.liveAddressRo[2];
				// lives.liveSmallDirect=_data.liveAddressRo[3];
				lives.liveDetailed=_data.liveDetailed;
				_data.liveAddressRo=lives;
				_data.birthAddressRo=birth;
				_data.mobileNumber=this.$store.getters.currentUser;
				_data.otherSalaryFrom=_data.otherSalaryFrom.join(",");
				console.log(_data)
				//银行卡信息
				for(let i in this.bankForm){
					if(this.bankForm[i]==""||this.bankForm[i]==null||this.bankForm[i]==undefined){
						this.$message({
				            type: 'warnning',
				            message: 'Tidak boleh kosong'
				          });
						return;
					}
				}
				if(this.bankForm.payPwd != this.bankForm.repayPwd){
					this.$message({
            type: 'warnning',
            message: 'Password tidak sama, silakan masukkan kembali'
          });
          return;
				}
				let _data1=Object.assign({},this.bankForm);
				_data1.bankHolderName = _data.realName;

				this.fullscreenLoading = this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
				this.submitPerInfo(_data,_data1);
			},
			submitPerInfo: async function(_data,_data1){
				let _this = this;
				
				_this.$axios.post('/api-user/user/userAdvanceVerify', _data).then((re)=>{
			    if(re.data.code==0){	
						_this.submitBankInfo(_data1)
				  }else {
			    	_this.$message({type: 'danger',message: re.data.message});
						setTimeout(()=>{_this.fullscreenLoading.close();}, 1000);
			    }
			  }).catch((re)=>{console.log(re);setTimeout(()=>{_this.fullscreenLoading.close();}, 1000);});	
			},
			submitBankInfo: async function(_data){
				this.$axios.post('/api-user/user/bindBankCard', _data).then((re)=>{
			    if(re.data.code==0){	
			    	this.fullscreenLoading.close();
						this.$message({type: 'success',message: 'Berhasil dikirim'});
						this.$router.push('/Scattered');
				  }else {
			    	this.$message({type: 'danger',message: re.data.message});
			    	setTimeout(()=>{this.fullscreenLoading.close();}, 1000);
			    }
			  }).catch((re)=>{console.log(re);setTimeout(()=>{this.fullscreenLoading.close();}, 1000);});	
			},
			fetchData(){
				this.$axios.post('/api-user/user/userBasicInfo', {'userId':this.$store.getters.userUuid}).then(function (re) {
	        if(re.data.code==0){
	          this.searchForm = re.data.data;
	        }else {
	          this.$message(re.data.message);
	        }
	      }).catch(function (re) {});
			}

		},

		mounted(){
			this.init();
		}
	}
</script>
<style>
.auth_con{
	width: 1100px;
	margin: 50px auto 0;
	
}
.form_con{
	width:1100px;
	/*height:1073px;*/
	background:rgba(255,255,255,1);
	border:1px solid rgba(212,219,225,1);
	padding-bottom: 40px;
	margin-bottom: 20px;
}
.form_tit{
	width:1008px;
	height:50px;
	padding-left: 16px;
	line-height: 50px;
	background:rgba(239,243,245,1);
	border:1px solid rgba(212,219,225,1);
	margin: 26px auto 39px;
	font-size:18px;
	font-family:PingFangSC-Medium;
	font-weight:500;
	color:rgba(19,45,75,1);
	text-align: left;
}
.form_item_wd{
	width: 748px;
}
.form_main{
	padding-right: 120px;
	padding-left: 32px;
}

.form_main .el-form-item__label{
	padding: 0 30px 0 0;
}



  .form_select .el-icon-date:before{
  	color: #00D6C9;
  }

  .form_tips{
  	width:698px;
  	padding: 13px 23px;
		background:rgba(255,255,255,1);
		border-radius:2px;
		border:1px solid rgba(42,210,200,1);
		font-size:14px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,210,200,1);
		line-height:20px;
		text-align: left;
		margin-left: 200px;
  }
  .form_sub_btn{
  	width:240px;
		height:40px;
		background:rgba(42,210,200,1);
		box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
		border-radius:5px;
		margin: 39px auto 70px;
  }

	.switchStyle {
		margin: 10px;
		float: left;
	}
	.uploadImg .el-button--primary{
		height: 40px;
		font-size: 16px;
		margin: 0;
	}
</style>