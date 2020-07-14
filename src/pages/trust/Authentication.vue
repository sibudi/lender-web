<i18n>
  {
    "zh-cn":{
			"realName":"姓名",
			"idCardNo":"ID卡号",
			"birthAddressRo":"出生地址",
			"companyName":"Nama Perusahaan",
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
			"isInsurance":"Asuransi",
			"workTime": "工龄",
			"otherSalaryFrom": "其他收入渠道",
			"submiteNow":"立即提交",
			"ResultFail":"认证失败",
			"ResultFailContent":"请填写其它信息完成认证",
			"ResultSuccess":"认证成功",
			"ResultSuccessContent":"请填写其它信息完成认证",
			"upSK":"Surat Kuasa"
    },
    "en":{
			"realName": "Nama lengkap",
			"idCardNo": "Nomor Identitas",
			"birthAddressRo": "Tempat Lahir",
			"companyName":"Nama Perusahaan",
			"birthDate": "Tanggal Lahir",
			"age": "Umur",
			"sex": "Jenis Kelamin",
			"education": "Pendidikan",
			"job": "Pekerjaan",
			"workField": "Industri",
			"liveAddressRo": "Alamat",
			"liveDetailed": "Alamat Lengkap",
			"religion": "Agama",
			"npwpNo": "NPWP No.",
			"yearSalary": "Pendapatan Tahunan",
			"salaryHomeValue": "Domisili Pajak Indonesia",
			"isInsurance":"Asuransi",
			"workTime": "Lama Bekerja",
			"otherSalaryFrom": "Sumber Aset Lainnya",
			"submiteNow": "Daftar",
			"upImg": "Foto KTP",
			"upSK":"Surat Kuasa",
			"bank":"Bank",
			"bankId":"Nomor Rekening",
			"payPwd":"Password",
			"repayPwd":"Konfirmasi Password "
  	}
  }
</i18n>

<template>
	<div class="auth_con">
		<div class="form_con ele_check">
			<div class="form_tit">Silahkan isi informasi identitas berikut</div>
			<el-form ref="searchForm" :model="searchForm" label-width="200px" class="form_main">
				<!-- //姓名 -->
				<el-form-item :label='$t("realName")' prop="realName" :rules="[{ required: true, message: 'Mohon isi Nama lengkap'}]" >
				    <el-input v-model="searchForm.realName" maxlength="32" auto-complete="off"></el-input>
				</el-form-item>
					<el-form-item :label='$t("companyName")'  >
				    <el-input v-model="searchForm.companyName" maxlength="32" auto-complete="off"></el-input>
				</el-form-item>
				<!-- 身份证号码 -->
				<el-form-item :label='$t("idCardNo")' prop="idCardNo" :rules="[{ required: true, message: 'Mohon isi Nomor Identitas'},{min:16,max:16,message:'Kartu Identitas Tidak Valid'}]" >
				    <el-input v-model="searchForm.idCardNo"  maxlength="16"></el-input>
				</el-form-item>
				<!-- 出生地址 " -->
				<el-form-item :label='$t("birthAddressRo")' prop="birthAddressRo" :rules="[{ required: true, message: 'Monhon isi Tempat Lahir'}]" >
					<el-cascader :options="birthAddressOptions" v-model="searchForm.birthAddressRo" class="form_item_wd form_select" @active-item-change="getBirthAddressList"></el-cascader>
				</el-form-item>
				<!-- 出生日期		 -->
				<el-form-item :label='$t("birthDate")' prop="birthDate" 
				:rules="[
					{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Mohon pilih Tanggal Lahir ');
					} else{
						var _date = value.split('-')
						var _dob = new Date (_date[0],_date[1]-1,_date[2]);
						var diff_ms = Date.now() - _dob.getTime();
						var age_dt = new Date(diff_ms).getUTCFullYear() - 1970; 
						this.searchForm.age = age_dt
						if(age_dt<17)
						{
							return callback('Harus berusia diatas 17 tahun');
						} else{
							callback()
						}
					}
				}, trigger: 'change' }]" >
				    <el-date-picker v-model="searchForm.birthDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="form_item_wd form_select" style="width: 748px;"></el-date-picker>
				</el-form-item>
				<!-- 年龄 -->
				<el-form-item :label='$t("age")' prop="age" 
				:rules="[{ required: true, message: 'Mohon pilih tanggal lahir'}, 
					{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Mohon pilih tanggal lahir');
					} else if  (value < 17) {
							callback('Harus berusia diatas 17 tahun');
						} else {
							callback();
						}
				}, trigger: 'blur' }]"
			 >
					<el-input v-model="searchForm.age"  maxlength="3" disabled></el-input>
				</el-form-item>
				<!-- 性别-->
				<el-form-item :label='$t("sex")' prop="sex" :rules="[{ required: true, message: 'Mohon pilih jenis kelamin'}]" >
				  <el-select v-model="searchForm.sex" class="form_item_wd form_select">
				    <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
				  </el-select>
				</el-form-item>
				<!-- 受教育程度 -->
				<el-form-item :label='$t("education")' prop="education" :rules="[{ required: true, message: 'Mohon pilih pendidikan'}]" >
				  <el-select v-model="searchForm.education" class="form_item_wd form_select">
				    <el-option v-for="item in authenticationLists['_education']" :key="item.value" :label="item.label" :value="item.label"></el-option>
				  </el-select>
				</el-form-item>
				<!-- 工作职位			 -->
				<el-form-item :label='$t("job")' prop="job" :rules="[{ required: true, message: 'Mohon pilih pekerjaan'}]" >
				  <el-select v-model="searchForm.job" class="form_item_wd form_select">
				    <el-option v-for="item in authenticationLists['_position']" :key="item.label" :label="item.label" :value="item.label"></el-option>
				  </el-select>
				</el-form-item>
				<!-- 行业 -->
				<el-form-item :label='$t("workField")' prop="workField" :rules="[{ required: true, message: 'Mohon pilih industri'}]" >
				  <el-select v-model="searchForm.workField" class="form_item_wd form_select">
				    <el-option v-for="item in authenticationLists['_industry']" :key="item.value" :label="item.label" :value="item.label">
				    </el-option>
				  </el-select>
				</el-form-item>
	
				<!-- 住址 -->
				<el-form-item :label='$t("liveAddressRo")' prop="liveAddressRo" :rules="[{ required: true, message: 'Mohon pilih Tempat tinggal'}]" >
					<el-cascader :options="livingAddressOptions" v-model="searchForm.liveAddressRo" class="form_item_wd form_select" @active-item-change="getLiveAddressList"
					></el-cascader>
				</el-form-item>
				<!-- 详细地址 -->
				<el-form-item :label='$t("liveDetailed")' prop="liveDetailed" :rules="[{ required: true, message: 'Mohon isi alamat lengkap'}]" >
				    <el-input v-model="searchForm.liveDetailed"  maxlength="50"></el-input>
				</el-form-item>
				<!-- 宗教 -->
				<el-form-item :label='$t("religion")' prop="religion" :rules="[{ required: true, message: 'Mohon pilih agama'}]" >
				  <el-select v-model="searchForm.religion" class="form_item_wd form_select">
				    <el-option v-for="item in authenticationLists['_religion']" :key="item.value" :label="item.label" :value="item.label"></el-option>
				  </el-select>
				</el-form-item>
				<!-- npwpNo -->
				<el-form-item :label='$t("npwpNo")' prop="npwpNo" :rules="[{ required: true, message: 'Mohon isi NPWP No.'},{min:15,max:15,message:'NPWP Tidak Valid'}]" >
				    <el-input v-model="searchForm.npwpNo"  maxlength="15"></el-input>
				</el-form-item>
				<!-- 年收入 -->
				<el-form-item :label='$t("yearSalary")' prop="yearSalary" :rules="[{ required: true, message: 'Mohon pilih pendapatan tahunan'}]" >
				  <el-select v-model="searchForm.yearSalary" class="form_item_wd form_select">
				    <el-option v-for="item in yearMoney" :key="item.value" :label="item.label" :value="item.label"></el-option>
				  </el-select>
				</el-form-item>
				<!-- 税务所登记 -->
				<!-- <el-form-item :label='$t("salaryHomeValue")' prop="salaryHomeValue" 
				:rules="[	{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Wajib diisi');
					}	else {
							callback();
						}
				}, trigger: ['blur','change'] }]"
				 style="text-align:left;">
					<el-switch	class="switchStyle"	v-model="searchForm.salaryHomeValue"	:active-value="1" :inactive-value="0" active-color="#2AD2C8" 	inactive-color="#eee"></el-switch>
					Domisili pajak Indonesia
				</el-form-item> -->
				<el-form-item :label='$t("isInsurance")' prop="isInsurance"  style="text-align:left;">
					<el-switch	class="switchStyle"	v-model="searchForm.isInsurance" 	:active-value="1" :inactive-value="0"	active-color="#2AD2C8" 	inactive-color="#eee">Asuransi</el-switch>
					Asuransi
				</el-form-item>
				<!-- 工作时间 -->
				<el-form-item :label='$t("workTime")' prop="workTime" :rules="[{ required: true, message: 'Mohon pilih lama bekerja'}]" >
				  <el-select v-model="searchForm.workTime" class="form_item_wd form_select">
				    <el-option v-for="item in workFieldList" :key="item.value" :label="item.label" :value="item.label"> </el-option>
				  </el-select>
				</el-form-item>

				<el-form-item :label='$t("otherSalaryFrom")' prop="otherSalaryFrom" :rules="[{ required: true, message: 'Mohon pilih sumber aset lainya'}]">
					<el-checkbox-group text-color="#b44029" fill="#b44029" v-model="searchForm.otherSalaryFrom" style="text-align:left;">
				        <el-checkbox label="Dari warisan" name="otherSalaryFrom"></el-checkbox>
				        <el-checkbox label="Dari hadiah" name="otherSalaryFrom"></el-checkbox>
				        <el-checkbox label="Dari aset" name="otherSalaryFrom"></el-checkbox>
				        <el-checkbox label="Lain-lain" name="otherSalaryFrom"></el-checkbox>
				    </el-checkbox-group>
				</el-form-item>
	
					<el-form-item :label='$t("upImg")' prop="idCardImage" :rules="[
					{
						validator: (rule, value, callback) => {
							if (!this.searchForm.idCardImage) {
								 callback('wajib upload foto KTP');
							}	else {
									callback();
							}
						}, trigger: ['change'] 
					} ]" >
				    <div class="uploadImg" style="text-align:left;">
							<el-upload accept="image/*" v-model="searchForm.idCardImage" 	:headers="HEADER_CONFIG" :action="UPLOAD_IMAGE" :limit='1' :data="upload_ktp" :on-success='handleAvatarSuccess' :on-preview="handlePictureCardPreview">
							  <el-button size="small" type="primary"><i class="el-icon-upload"></i>Unggah file</el-button>
							</el-upload>
							<el-dialog :visible.sync="dialogImageVisible">
							  <img width="300px" height="auto" v-bind:src="dialogImageUrl" alt="">
								
							
							</el-dialog>
				      	</div>
					</el-form-item>
						<!-- :rules="[
							{
							validator: (rule, value, callback) => {
								if (!this.searchForm.suratKuasaImage) {
										callback('wajib upload surat kuasa');
								}	else {
										callback();
								}
							}, 
							trigger: ['blur','change'] 
						}
						]" -->
						

					<el-form-item :label='$t("upSK")' prop="suratKuasaImage" 
						 >
				    <div class="uploadImg" style="text-align:left;">
							<el-upload  v-model="searchForm.suratKuasaImage"
							:headers="HEADER_CONFIG"
							 accept=".doc, .docx, application/pdf" :action="UPLOAD_FILE" :limit='1' :data="upload_sk" :on-success='handleAvatarSuccess2' 	:on-preview="handlePictureCardPreview2"
							>
							  <el-button size="small" type="primary"><i class="el-icon-upload"></i>Unggah file</el-button>
							</el-upload>
						
							<el-dialog :visible.sync="dialogFileVisible">
							 	 <a :href="dialogFileUrl" target="_blank" > download {{dialogFileName}}</a>
							</el-dialog>
				      	</div>
					</el-form-item>

			</el-form>
		</div>
			<el-form ref="bankForm" :model="bankForm" label-width="200px" >
		<div class="form_con">
			<div class="form_tit">Silahkan isi informasi bank</div>
			<div class="form_main">
				<el-form-item :label='$t("bank")' prop="bankCode" >
				  <el-select v-model="bankForm.bankCode" class="form_item_wd form_select"  clearable>
				    <el-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item :label='$t("bankId")' prop="bankNumberNo"  >
					<el-input v-model="bankForm.bankNumberNo" maxlength="32" auto-complete="off" placeholder="Harap masukkan nomor rekening"></el-input>
				</el-form-item>
				 <!-- /^([a-zA-Z0-9@*#]{8,15})$/.test() -->
			
				<!-- <div class="form_tips">Harap diperhatikan <br/>Agar bisa menerima dana yang ditarik,mohon pastikan anda memliki rekening bank yang terdaftar dengan nama anda sendiri sesuai dengan kartu identitas(KTP)</div> -->
			</div>
			
		</div>
		<div class="form_con">
				<div class="form_tit">Silahkan isi Password Transaksi</div>
					<div class="form_main">
				<el-form-item :label='$t("payPwd")' prop="payPwd" :rules="[{ required: true, message: 'Mohon isi password'},
					{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Password Wajib diisi');
					} else{
					var uniquePass =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(value);
						if(!uniquePass)
						{
							return callback('Password mengandung 8-15 karakter, terdiri huruf besar & kecil, dan digit');
						} else{
							callback()
						}
					}
				}, trigger: ['change','blur'] }
				]" >
					<el-input v-model="bankForm.payPwd" placeholder="" auto-complete="off"  show-password></el-input>
				</el-form-item>
				<el-form-item :label='$t("repayPwd")' prop="repayPwd" :rules="[{ required: true, message: 'Mohon isi konfirmasi Password'},
						{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Konfirmasi Password Wajib diisi');
					} else{
				
						if(value != this.bankForm.payPwd)
						{
							return callback('Konfirmasi Password harus sama dengan Password');
						} else{
							callback()
						}
					}
				}, trigger: ['change','blur'] }
				
				]" >
					<el-input v-model="bankForm.repayPwd" placeholder="" auto-complete="off"  show-password></el-input>
				</el-form-item>
					</div>
		</div>
		</el-form>
		<div>
			<el-button type="primary" @click="onSubmit" class="form_sub_btn">{{$t('submiteNow')}}</el-button>
		</div>
		 <el-dialog
      :visible.sync="logoutDialogVisible"
      v-model="logoutDialogVisible"
      size="small"
			:close-on-click-modal="false"
			:show-close ="false"
    >
			{{logoutDialogMessage}}
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="logoutDialogSubmit"
        >OK</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
	import '../../assets/css/element.css';
	import authenticationLists from '../../assets/json/authenticationLists.json';
	export default {
		data(){
			return {
				HEADER_CONFIG:{},
				logoutDialogVisible:false,
				logoutDialogMessage:'',
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
				dialogImageVisible:false,
				dialogImageUrl:'',
				dialogFileVisible:false,
				dialogFileUrl:'',
				dialogFileName:'',
				upload_ktp:{"fileType": "img","sessionId": ""},
				upload_sk:{"fileType": "surat_kuasa","sessionId": ""},
				UPLOAD_IMAGE:'',
				UPLOAD_FILE:'',
				isBindCard: 0,
				authenticationLists:{},
				phoneNum: '',
				fatherArr: [],//获取当前点击省市大区小区时候的index，用于设置第几个children
				fatherCode: '',
				fatherIndex: [],

				livingfatherArr: [],//获取当前点击省市大区小区时候的index，用于设置第几个children
				livingfatherCode: '',
				livingfatherIndex: [],
				searchForm: {
					realName: '',
					companyName:'',
					idCardNo: '',
					birthAddressRo:['', ''],
					idCardImage:'',
					birthDate: '',
					sex: '',
					age: '',
					education: '',
					job: '',
					workField: '',
					liveAddressRo: ['', ''],
					liveDetailed: '',
					religion: '',
					npwpNo: '',
					yearSalary: '',
					// salaryHomeValue: false,
					isInsurance:false,
					otherSalaryFrom: [],
					workTime: ''
				},
				birthAddressOptions: [],
				livingAddressOptions: [],
		
				educationList: [],
				jobList: [],
				sexList: 
				[{
					value: '1',
					label: 'Laki-laki'
				},
				{
					value: '2',
					label: 'Perempuan'
				}],
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
				this.dialogImageUrl = process.env.SHOW_IMAGE+'?path='+this.searchForm.idCardImage+'&sessionId='+this.$store.getters.token;
        this.dialogImageVisible = true;
	    },
			handleAvatarSuccess(response, file) {
				if(response.code == 0){
					this.searchForm.idCardImage= response.data['filePath'];
				}
			},
			handlePictureCardPreview2(file) {
				this.dialogFileName = file.name
				this.dialogFileUrl = process.env.DOWNLOAD_ATTACHMENT+'?path='+this.searchForm.suratKuasaImage+'&sessionId='+this.$store.getters.token;
        this.dialogFileVisible = true;
	    },
			handleAvatarSuccess2(response, file) {
				if(response.code == 0){
					this.searchForm.suratKuasaImage= response.data['filePath'];
				}
			},
			pushto(e){
				this.$router.push({path: e});
			},
			init(){
				this.HEADER_CONFIG={
					"Authorization":process.env.AUTHORIZATION_API
				};
				this.UPLOAD_IMAGE=process.env.UPLOAD_IMAGE;
				this.UPLOAD_FILE=process.env.UPLOAD_FILE;
				this.upload_ktp['sessionId']=this.$store.getters.token;
				this.upload_sk['sessionId']=this.$store.getters.token;

				for(let e in authenticationLists){
					this.authenticationLists[e]=this.changeRule(authenticationLists[e]);
				}

				let _this=this;
				_this.getAddressList(2,1).then(function(value) {
					var _temp = JSON.stringify(value);
					_this.fatherArr=JSON.parse(_temp);
					_this.livingfatherArr=JSON.parse(_temp);
					_this.birthAddressOptions=JSON.parse(_temp);
					_this.livingAddressOptions=JSON.parse(_temp);
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
				return p; 
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
				this.$refs.searchForm.validate(valid=>{
					if(!valid){
						for(let i in this.searchForm){
							if(this.searchForm[i]
							||!this.searchForm.birthAddressRo[1]
							||!this.searchForm.liveAddressRo[1]
							||(i=='isInsurance'&&!this.searchForm[i])
							||(i=='companyName'&&!this.searchForm[i])
							||(i=='suratKuasaImage'&&!this.searchForm[i])
							){
							} else {
								this.$message(
									{
										type: 'warning',
										message: `${this.$t(i)} tidak boleh kosong`
									});
									return;
							}
						}
						if(isNaN(this.searchForm.idCardNo.toString()) || this.searchForm.idCardNo.toString().length<16){
							this.$message({
											type: 'error',
											message: 'Kartu Identitas Tidak Valid'
										});
							return;
						}

						if(isNaN(this.searchForm.npwpNo.toString())  || this.searchForm.npwpNo.toString().length<15){
							this.$message({
											type: 'error',
											message: 'NPWP Tidak Valid'
										});
							return;
						}

						if(isNaN(this.searchForm.age.toString())){
							this.$message({
											type: 'error',
											message: 'Umur Tidak Valid'
										});
							return;
						}
					}else{

						this.$refs.bankForm.validate((valid)=>{
						if(!valid){
							for(let i in this.bankForm){
								if(this.bankForm[i]||(!this.bankForm[i] && i=="bankNumberNo")||(!this.bankForm[i] && i=="bankCode")){

								}
								else {
									this.$message({
													type: 'warning',
													message: `${this.$t(i)}tidak boleh kosong`
												});
									return;
								}
							}
							if(isNaN(this.bankForm.bankNumberNo.toString())){
								this.$message({
												type: 'error',
												message: 'No Rekening Tidak Valid'
											});
								return;
							}
							var uniquePass =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(this.bankForm.payPwd);
							if(uniquePass)
							{
								this.$message({
												type: 'error',
												message: 'Password mengandung 8-15 karakter, terdiri huruf besar & kecil, dan digit'
											});
								return;
							}

							if(this.bankForm.payPwd != this.bankForm.repayPwd){
								this.$message({
									type: 'warning',
									message: 'Password tidak sama, silahkan masukkan kembali'
								});
								return;
							}
						}else{
						let _data=Object.assign({},this.searchForm),birth={},lives={};
						_data.salaryHomeValue= 0
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
	
						_data ={..._data,...this.bankForm}
						_data.bankCode = this.bankForm.bankNumberNo && this.bankForm.bankCode? this.bankForm.bankCode:"";
						 _data.bankNumberNo = this.bankForm.bankNumberNo && this.bankForm.bankCode? this.bankForm.bankNumberNo:"";
						_data.bankHolderName = _data.realName;

						this.fullscreenLoading = this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
						this.submitPerInfo(_data);
						}
						})
					}
					})
			},
			submitPerInfo: async function(_data){
				let _this = this;

				_this.$axios.post('/api-user/user/userAdvanceVerify', _data).then((re)=>{
			    if(re.data.code==0){
						this.fullscreenLoading.close();
						this.$message({type: 'success',message: 'Berhasil dikirim'});
						this.logoutDialogMessage = "Registrasi berhasil.\n Team kami akan segera menghubungi Anda dalam 2 hari kerja.\n Terima kasih telah melakukan registrasi"
						this.logoutDialogVisible = true
						// _this.submitBankInfo(_data1)
						}else if(re.data.code==5027||re.data.code==5029){
						setTimeout(()=>{this.fullscreenLoading.close();}, 1000);
						this.logoutDialogMessage = re.data.message
						this.logoutDialogVisible = true
					} else {
			    	this.$message({type: 'danger',message: re.data.message});
			    	setTimeout(()=>{this.fullscreenLoading.close();}, 1000);
					}
			

			  }).catch((re)=>{console.log(re);setTimeout(()=>{_this.fullscreenLoading.close();}, 1000);});
			},
			// ,
			// submitBankInfo: async function(_data){
			// 	this.$axios.post('/api-user/user/bindBankCard', _data).then((re)=>{
			//     if(re.data.code==0){
			//     	this.fullscreenLoading.close();
			// 			this.$message({type: 'success',message: 'Berhasil dikirim'});
			// 			this.$router.push('/Scattered');
			// 	  }else if(re.data.code==5027||re.data.code==5029){
			// 			setTimeout(()=>{this.fullscreenLoading.close();}, 1000);
			// 			this.logoutDialogMessage = re.data.message
			// 			this.logoutDialogVisible = true
			// 		}else {
			//     	this.$message({type: 'danger',message: re.data.message});
			//     	setTimeout(()=>{this.fullscreenLoading.close();}, 1000);
			//     }
			//   }).catch((re)=>{console.log(re);setTimeout(()=>{this.fullscreenLoading.close();}, 1000);});
			// },
			fetchData(){
				let _this = this;
				this.$axios.post('/api-user/user/userBasicInfo', {'userId':this.$store.getters.userUuid}).then(function (re) {
	        if(re.data.code==0){
	          _this.searchForm.realName = re.data.data.realName;
	          _this.searchForm.idCardNo = re.data.data.idCardNo;
	          // _this.searchForm.idCardImage = re.data.data.idCardImage;
						_this.searchForm.birthDate = re.data.data.birthDate;
						_this.searchForm.sex = re.data.data.sex;
						_this.searchForm.companyName = re.data.data.companyName;
	          _this.searchForm.age = re.data.data.age;
	          _this.searchForm.education = re.data.data.education;
	          _this.searchForm.job = re.data.data.job;
	          _this.searchForm.workField = re.data.data.workField;
	          _this.searchForm.religion = re.data.data.religion;
	          _this.searchForm.npwpNo = re.data.data.npwpNo;
	          _this.searchForm.yearSalary = re.data.data.yearSalary;
	          // _this.searchForm.salaryHomeValue = re.data.data.salaryHomeValue;
	          _this.searchForm.workTime = re.data.data.workTime;
	        }else {
	          this.$message(re.data.message);
	        }
	      }).catch(function (re) {});
			},
			logoutDialogSubmit(){
			
				this.$store.dispatch("setToken",'');
				this.$store.dispatch("setUser",false);
				this.$store.dispatch("setLogin",false);
				this.$store.dispatch("setHeadImage",'');
				this.logoutDialogVisible = false
				this.$router.push('/')

			}

		},

		mounted(){
			this.init();
		}
		,
		updated(){
      // console.log(this.birfatherArr)
      // console.log(this.fatherCode)
      // console.log(this.fatherIndex)
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
