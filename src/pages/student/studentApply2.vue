
<template>
	<div id="saBody">
		<div id="saContent">
			<div id="formTitle2">
				<div id="fts1"><img src="../../assets/img/studentIcon1.png" alt="">Identitas Diri</div>
				<div class="studentLine">
					<div class="lineContent">						
						<img src="../../assets/img/line2.png" alt="">
						<img src="../../assets/img/line2.png" alt="">
					</div>
				</div>
				<div id="fts2"><img src="../../assets/img/studentIcon22.png" alt="">Informasi Universitas</div>
				<div class="studentLine">
					<div class="lineContent">						
						<img src="../../assets/img/line.png" alt="">
						<img src="../../assets/img/line.png" alt="">
					</div>
				</div>
				<div id="fts3"><img src="../../assets/img/studentIcon3.png" alt="">Informasi Penjamin</div>
				<div class="studentLine">
					<div class="lineContent">						
						<img src="../../assets/img/line.png" alt="">
						<img src="../../assets/img/line.png" alt="">
					</div>
				</div>
				<div id="fts4"><img src="../../assets/img/studentIcon4.png" alt="">Kontak Darurat</div>
			</div>
			<div id="formContent2">
				<el-form ref="form" :model="searchForm" :rules="rules" label-width="250px" style="width: 900px">	
					<!-- schoolName -->
					<el-form-item label="Nama Lembaga Institusi Pendidikan (Universitas):" prop="schoolName" >
					    <el-input v-model="searchForm.schoolName" maxlength="50"></el-input>
					</el-form-item>	
					
					<!-- schoolAddressRo -->
					<el-form-item label= 'Alamat Lembaga Institusi Pendidikan (Universitas):' prop="schoolAddressRo" >
					    <el-select v-model="address1[0]" style="width: 24.5%" @change="getaddress1(1)">
						    <el-option
						      v-for="item in addressData1[0]"
						      :key="item.values"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address1[1]" style="width: 24.5%" @change="getaddress1(2)">
						    <el-option
						      v-for="item in addressData1[1]"
						      :key="item.values"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address1[2]" style="width: 24.5%" @change="getaddress1(3)">
						    <el-option
						      v-for="item in addressData1[2]"
						      :key="item.values"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address1[3]" style="width: 24.5%" @change="getaddress1(4)">
						    <el-option
						      v-for="item in addressData1[3]"
						      :key="item.values"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- detailed -->
					<el-form-item label= 'Alamat lengkap:' prop="schoolAddressRo" >
					    <el-input v-model="searchForm.schoolAddressRo.detailed"  maxlength="50"></el-input>
					</el-form-item>	
					<!-- schoolMobile -->
					<el-form-item label="Nomor Telepon Lembaga Institusi Pendidikan (Universitas):" prop="schoolMobile" >
					    <el-input v-model="searchForm.schoolMobile"  maxlength="16"></el-input>
					</el-form-item>
					<!-- eductionlevel -->
					<el-form-item label= ' Program Pendidikan:' prop="level" >
					    <el-select v-model="searchForm.level" style="width: 100%">
						    <el-option
						      key="D3 (Diploma)"
						      label="D3 (Diploma)"
						      value="D3 (Diploma)">
						    </el-option>
						    <el-option
						      key="S1 (Sarjana)"
						      label="S1 (Sarjana)"
						      value="S1 (Sarjana)">
						    </el-option>
						    <el-option
						      key="S2 (Pasca Sarjana/Master)"
						      label="S2 (Pasca Sarjana/Master)"
						      value="S2 (Pasca Sarjana/Master)">
						    </el-option>
						    <el-option
						      key="S3 (Doctoral)"
						      label="S3 (Doctoral)"
						      value="S3 (Doctoral)">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- enterYear -->
					<el-form-item label= 'Angkatan:' prop="enterYear" >
				        <el-date-picker
				        	style="width: 100%"
					      	v-model="searchForm.enterYear"
					      	type="year"
					      	value-format="yyyy"
					      	placeholder="">
					    </el-date-picker>
					</el-form-item>
					<!-- subject -->
					<el-form-item label= 'Fakultas dan Jurusan:' prop="subject" >
					    <el-input v-model="searchForm.subject"  maxlength="50"></el-input>
					</el-form-item>
					<!-- studentId -->
					<el-form-item label= 'Nomor induk mahasiswa atau nomor pokok mahasiswa:' prop="studentId" >
					    <el-input v-model="searchForm.studentId"  maxlength="50"></el-input>
					</el-form-item>
					<!-- averageBasePoint -->
					<el-form-item label= 'IPK:' prop="averageBasePoint" >
					    <el-input v-model="searchForm.averageBasePoint"  maxlength="50"></el-input>
					</el-form-item>
					<!-- schoolFee -->
					<el-form-item label= 'Nominal Uang semester:' prop="schoolFee" >
					    <el-input v-model="searchForm.schoolFee" maxlength="12"></el-input>
					</el-form-item>
					<!-- schoolFeeTerm -->
					<el-form-item label= 'Periode pembayaran uang semester:' prop="schoolFeeTerm" >
					    <el-input v-model="searchForm.schoolFeeTerm" maxlength="50"></el-input>
					</el-form-item>
					<!-- schoolFeePayWay -->
					<el-form-item label= 'Cara Pembayaran Uang Semester:' prop="schoolFeePayWay" >
					    <el-select v-model="searchForm.schoolFeePayWay" style="width: 100%">
						    <el-option
						      key="1"
						      label="Transfer Via ATM"
						      value="Transfer Via ATM">
						    </el-option>
						    <el-option
						      key="2"
						      label="Bayar melalui Teller Bank"
						      value="Bayar melalui Teller Bank">
						    </el-option>

						</el-select>
					</el-form-item>					
					<!-- schoolFeePayBank -->
					<el-form-item v-if="isBankPay" label= 'Nama Bank:' prop="schoolFeePayBank" >
					    <el-select v-model="searchForm.schoolFeePayBank" style="width: 100%">
						    <el-option
						      v-for="item in bankList"
						      :key="item.bankCode"
						      :label="item.registerName"
						      :value="item.bankCode">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- schoolFeePayBankNo -->
					<el-form-item v-if="isBankPay" label= 'Nomor Rekening:' prop="schoolFeePayBankNo" >
					    <el-input v-model="searchForm.schoolFeePayBankNo"  maxlength="50"></el-input>
					</el-form-item>
					<!-- schoolFeePayDetail -->
					<el-form-item v-if="isBankPay" label= 'Mohon jelaskan cara pembayaran yang Anda pilih:' prop="schoolFeePayDetail" >
					    <el-input type="textarea" placeholder="Apakah memakai virtual account atau tidak" v-model="searchForm.schoolFeePayDetail"  maxlength="200"></el-input>
					</el-form-item>

						<el-button type="primary" @click="onSubmit" style="margin: 40px auto;width:650px;border-radius:20px; background-color: #2AD2C8;border:#2AD2C8">Langkah selanjutnya
						</el-button>

				</el-form>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data(){
		    var isuserName = (rule, value, callback) => {
		        if (!/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
		    var isidCard = (rule, value, callback) => {
		    	this.canPass=false;
		        if (!/^[0-9]{16}$/i.test(value)) {
		          return callback(new Error('Format salah'));
		        }
		    };
		    var isage = (rule, value, callback) => {
		        if (!/^\+?[1-9][0-9]*$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
		    var isemail = (rule, value, callback) => {
		        if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
		    var ismobileNumber = (rule, value, callback) => {
	            if(value.substring(0,3)=="+62"){
	            	this.canPass=false;
	                value=value.substr(3)
	            }
	            if(value.substring(0,2)=="62"){
	            	this.canPass=false;
	                value=value.substr(2)
	            }
	            if(value.substring(0,1)=="0"){
	            	this.canPass=false;
	                value=value.substr(1)
	            }
		        if (!/^[8][0-9]{8,11}$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
		    var isfamilyYearSalary = (rule, value, callback) => {
		        if (!/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		        this.searchForm.familyYearSalary=this.searchForm.familyYearSalary+"Rp"
		    };
		    var isfamilyMember = (rule, value, callback) => {
		        if (!/^\+?[1-9][0-9]*$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };		    
		    var isBankPay = (rule, value, callback) => {
		        if (this.searchForm['schoolFeePayWay']=="Transfer Via ATM") {
		          this.isBankPay=true
		        }else{
		        	this.isBankPay=false
		        }
		    };
		    var isloanAmount = (rule, value, callback) => {
		        if (!/^\+?[1-9][0-9]*$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
			return{
				canPass:true,
				BASE_URL:'',
				uploadImgs: [{name:'diyige',url:'http:www.baidu.com'}],
				uploadName: '',
				limit: 1,
				imageUrl:[],
				activeName: '1',
				isBankPay: false,
				contentData: [],
				bankList:[],
				itemTitleIndex: '',
				searchForm: {
				    "schoolName":"",     //学校名称
				    "schoolAddressRo":{             //学生学校地址
				        "province":"",
				        "city":"",
				        "bigDirect":"",
				        "smallDirect":"",
				        "detailed":""
				    },
				    "schoolMobile":"",           //学校电话
				    "level":"",              //教育程度
				    "enterYear":"",             //入学年份
				    "subject":"",                 //学院和专业
				    "studentId":"",              //学号
				    "averageBasePoint":"",       //averageBasePoint
				    "schoolFee":"",           //学费
				    "schoolFeeTerm":"",           //学费支付期
				    "schoolFeePayWay":"",        //学费支付方式
				    "schoolFeePayBank": '',       //支付学费银行名称
				    "schoolFeePayBankNo":"",     //支付学费银行卡号
				    "schoolFeePayDetail":""          //学费支付描述详情
				},
				addressData1:[],
				address1:[],
				addressValue1:[],
		        dialogImageUrl: '',
		        dialogVisible: false,
		        rules: {
		          schoolName: [
		            { validator: isuserName, required: true,  trigger: 'blur' }
		          ],
		          schoolAddressRo: [
		            {required: true, message:'Tidak boleh kosong',trigger: 'blur' }
		          ],		          
		          subject: [
		            {required: true, message:'Tidak boleh kosong',trigger: 'blur' }
		          ],
		          schoolMobile: [

		            {required: true, message:'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          level: [
		            {required: true, message:'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          enterYear: [
		            {required: true, message:'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          studentId: [
		            {required: true, message:'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          averageBasePoint: [
		            {required: true, message:'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          schoolFee: [
		            {required: true, message:'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          schoolFeeTerm: [
		            {required: true, message:'Tidak boleh kosong', trigger: 'blur' }
		          ],		          
		          schoolFeePayWay: [
		            { validator: isBankPay,required: true, message:'Tidak boleh kosong', trigger: 'change' }
		          ],
		        }
			}
		},
		methods:{
			init(){
				this.getaddress1(0);
				this.$axios.post('/api-user/user/studentStepTwoInfo', {}).then((response)=>{
					if(response.data.code==0){
						this.searchForm=response.data.data;
						console.log(this.searchForm)
						for(let e in this.searchForm){
							if(!this.searchForm[e]){
								console.log(e)
								this.searchForm[e]=''
							}
						}
					}
			   	}).catch(function (re) {
			   		console.log(re);
				});

				this.$axios.post('/api-system/system/bankList', {

				  })
				  .then((re)=>{
				    this.bankList=re.data.data;

				  })
				  .catch(function (re) {
				    console.log(re);
				  });
			},
			getaddress1(e){

				let i=1;//获取地址id，用户获取下一级的数据列表
				function fn(s,k){
					for(let j in k){
						if(s==k[j].value){
							return k[j].values;
						}
					}
				}
				switch(e){
					case 0:
						this.getAddress(2,i).then((value)=>{
							console.log(value)
							this.addressData1[0]=value
							this.addressData1=this.addressData1.splice(0,1);
						})
						break;
					case 1:
						this.address1=this.address1.splice(0,1);
						i=fn(this.address1[0],this.addressData1[0]);
						console.log(i)
						this.getAddress(3,i).then((value)=>{
							this.addressData1[1]=value
							this.addressData1=this.addressData1.splice(0,2);
						})
						break;
					case 2: 
						this.address1=this.address1.splice(0,2);
						i=fn(this.address1[1],this.addressData1[1]);
						console.log(i)
						this.getAddress(4,i).then((value)=>{
							this.addressData1[2]=value
							this.addressData1=this.addressData1.splice(0,3);
						})
						break;
					case 3: 
						this.address1=this.address1.splice(0,3);
						i=fn(this.address1[2],this.addressData1[2]);
						console.log(i)
						this.getAddress(5,i).then((value)=>{
							this.addressData1[3]=value
							this.addressData1=this.addressData1.splice(0,4);
						})
						break;
					case 4: 
						let a={};
						a.province=this.address1[0];
						a.city=this.address1[1];
						a.bigDirect=this.address1[2];
						a.smallDirect=this.address1[3];
						this.searchForm.schoolAddressRo=a;
				}
			},
			getAddress(h,g){
				let _this=this;
				var p=new Promise(function(resolve,reject){
					_this.$axios.post('/api-system/system/getSysDict', {
						"distLevel" : h,
						"parentCode": g,
					}).then((response)=>{
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
					});
				})
				return p.then((value)=>{return value}); // 返回p实例对象
			},
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    handleAvatarSuccess(response, file) {
		    	this.searchForm[this.uploadName]= response.data['filePath'];
		    },
		    getUploadName(e){
		    	this.uploadName=e;
		    },
			onSubmit(){
				this.searchForm['userUuid']=11;
				if(this.searchForm['schoolFeePayWay']!="Transfer Via ATM"){
					delete this.searchForm['schoolFeePayBank'];
					delete this.searchForm['schoolFeePayBankNo'];
					delete this.searchForm['schoolFeePayDetail'];
				}
				console.log(this.searchForm)
				for(let i in this.searchForm){
					if(this.searchForm[i]==""||this.searchForm[i]==null||this.searchForm[i]==undefined||!this.searchForm.schoolAddressRo["detailed"]){
				        this.$message({
				            type: 'warnning',
				            message: 'Tidak boleh kosong'
				          });
						return;
					}
				}
				let _data=Object.assign({},this.searchForm);
				if(this.canPass){

					this.$axios.post('/api-user/user/studentStepTwoAdd', _data)
					  .then((re)=>{
					    let _this=this;
					    if(re.data.code==0){
					        this.$message({
					            type: 'success',
					            message: 'success!'
					          });
					          setTimeout(()=>{
					          	_this.$router.push("./studentApply3")
					          }, 1000);
					    }else {
					        this.$message({
					            type: 'success',
					            message: re.data.message
					          });
					    }
					  })
					  .catch((re)=>{
					    console.log(re);
					  });	
					
				}else{
					this.$message("Format salah");
				}
			},
		},
		mounted(){
			this.init();
		}
	}
</script>

<style scoped>
	img {
	    width: 80%;
	    margin: 0 auto;
	}
	#saBody {
		overflow: hidden;
		margin: 20px auto;
		padding: 20px;
		width: 1440px;
		background-color: white;
	}
	#saContent {
		margin: 0 auto;
		width: 1200px;
		/*overflow: hidden;*/
	}
	#formContent2 {
		width: 900px;
		margin: 0 auto;
	}
	#formTitle2 {
		display: flex;
		margin: 40px;
		line-height: 40px;
		font-size: 16px;
	}
	#formTitle2>div {
		flex: 1;
		overflow: hidden;
	}
	#fts1 {
		color: #007BCE;
	}
	#fts2 {
		color: #5CAF00;
	}
	.studentLine {
		
	}
	.lineContent {
		width: 50%;
		height: 100%;
		margin: 25% auto;
		overflow: hidden;
	}
	.studentLine img {
		width: 50%;
		float: left;
		display: block;
	}

	  .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
	  .iconText {
	  	font-size: 12px;
	  }
	  .uploadImg {
	  	border-radius: 3px;
	  	padding: 20px;
	  	border: 1px solid #d9d9d9;
	  }
</style>