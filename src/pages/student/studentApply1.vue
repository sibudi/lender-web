<i18n>
  {
    "zh-cn":{
      	"advantage": "我们平台优势",
     	"fast": "快",      
    	"userName":"Nama lengkap(Sesuai KTP):",
    	"idCard":"NIK:",
     	"sex":"Jenis kelamin:",
     	"age": "Usia:",
     	"religion": "Agama/Kepercayaan:",
        "idprovince":"Alamat(sesuai KTP):",
        "iddetailed":"Alamat lengkap:",
        "liveprovince":"Alamat domisili:",
        "livedetailed":"Alamat lengkap:",
	    "email":"Email:",
	    "mobileNumber":"Nomor HP:",
	    "familyYearSalary":"Pendapatan tahunan keluarga:",
	    "familyMember":"Jumlah anggota keluarga:",
	    "bankName":"Nama Bank:",
	    "bankNo":"Nomor Rekening Bank Anda:",
	    "loanAble": "Apakah ada pembayaran angsuran::",
	    "loanAmount":"Jumlah cicilan per bulan:",
	    "idCardUrl":"Foto KTP:",
	    "familyCardUrl":"Foto Kartu Keluarga:",
	    "studentCardUrl":"Foto Kartu Tanda Siswa/Kartu Tanda Mahasiswa yang masih berlaku:",
	    "idCardInHandUrl":"Foto diri Anda dengan memegang KTP:",
	    "collageStudentUrl":"Foto bukti mahasiswa di universitas:",
      	"submiteNow": "submiteNow"
    },
    "en":{
    	"advantage": "Keuntungan platform kami",
      	"fast": "Cepat",
    	"userName":"Nama lengkap(Sesuai KTP):",
    	"idCard":"NIK:",
     	"sex":"Jenis kelamin:",
     	"age": "Usia:",
     	"religion": "Agama/Kepercayaan:",
        "idprovince":"Alamat(sesuai KTP):",
        "iddetailed":"Alamat lengkap:",
        "liveprovince":"Alamat domisili:",
        "livedetailed":"Alamat lengkap:",
	    "email":"Email:",
	    "mobileNumber":"Nomor HP:",
	    "familyYearSalary":"Pendapatan tahunan keluarga:",
	    "familyMember":"Jumlah anggota keluarga:",
	    "bankName":"Nama Bank:",
	    "bankNo":"Nomor Rekening Bank Anda:",
	    "loanAble": "Apakah mempunyai cicilan pembayaran?",
	    "loanAmount":"Jumlah cicilan per bulan:",
	    "idCardUrl":"Foto KTP:",
	    "familyCardUrl":"Foto Kartu Keluarga:",
	    "studentCardUrl":"Foto Kartu Tanda Siswa/Kartu Tanda Mahasiswa yang masih berlaku:",
	    "idCardInHandUrl":"Foto diri Anda dengan memegang KTP:",
	    "collageStudentUrl":"Foto bukti mahasiswa terdaftar di Universtas:",
      	"submiteNow": "Langkah selanjutnya"
    }
  }
</i18n>
<template>
	<div id="saBody">
		<div id="saContent">
			<div id="formTitle1">
				<div id="formTitle1Sub1"><img src="../../assets/img/studentIcon1.png" alt="">Identitas Diri</div>
				<div class="studentLine">
					<div class="lineContent">						
						<img src="../../assets/img/line.png" alt="">
						<img src="../../assets/img/line.png" alt="">
					</div>
				</div>
				<div><img src="../../assets/img/studentIcon2.png" alt="">Informasi Universitas</div>
				<div class="studentLine">
					<div class="lineContent">						
						<img src="../../assets/img/line.png" alt="">
						<img src="../../assets/img/line.png" alt="">
					</div>
				</div>
				<div><img src="../../assets/img/studentIcon3.png" alt="">Informasi Penjamin</div>
				<div class="studentLine">
					<div class="lineContent">						
						<img src="../../assets/img/line.png" alt="">
						<img src="../../assets/img/line.png" alt="">
					</div>
				</div>
				<div><img src="../../assets/img/studentIcon4.png" alt="">Kontak Darurat</div>
			</div>
			<div id="formContent">
				<el-form ref="form" :model="searchForm" :rules="rules" label-width="250px" style="width: 900px">	
					<!-- code邀请码 -->
					<el-form-item label= 'kode referral' prop="inviteCode" >
					    <el-input v-model="searchForm.inviteCode"  maxlength="12"></el-input>
					</el-form-item>	
					<!-- 姓名 -->
					<el-form-item :label= '$t("userName")' prop="userName" >
					    <el-input v-model="searchForm.userName"  maxlength="50"></el-input>
					</el-form-item>	
					<!-- 身份证号码 -->
					<el-form-item :label= '$t("idCard")' prop="idCard" >
					    <el-input v-model="searchForm.idCard"  maxlength="16"></el-input>
					</el-form-item>
					<!-- 性别sex -->
					<el-form-item :label= '$t("sex")' prop="sex" >
					    <el-select v-model="searchForm.sex" style="width: 100%">
						    <el-option
						      key="LAKI-LAKI"
						      label="LAKI-LAKI"
						      value="1">
						    </el-option>
						    <el-option
						      key="PEREMPUAN"
						      label="PEREMPUAN"
						      value="2">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- 年龄age -->
					<el-form-item :label= '$t("age")' prop="age" >
					    <el-input v-model="searchForm.age" maxlength="3"></el-input>
					</el-form-item>
					<!-- 宗教religion -->
					<el-form-item :label= '$t("religion")' prop="religion" >
					    <el-select v-model="searchForm.religion" style="width: 100%">
						    <el-option
						      key="Islam"
						      label="Islam"
						      value="Islam">
						    </el-option>
						    <el-option
						      key="Kristen Protestan"
						      label="Kristen Protestan"
						      value="Kristen Protestan">
						    </el-option>
						    <el-option
						      key="Kristen Katolik"
						      label="Kristen Katolik"
						      value="Kristen Katolik">
						    </el-option>
						    <el-option
						      key="Hindu"
						      label="Hindu"
						      value="Hindu">
						    </el-option>
						    <el-option
						      key="Buddha"
						      label="Buddha"
						      value="Buddha">
						    </el-option>
						    <el-option
						      key="Konghucu"
						      label="Konghucu"
						      value="Konghucu">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- 身份证住址 -->
					<el-form-item :label= '$t("idprovince")' prop="idAddressRo" >
					    <el-select v-model="address1[0]" style="width: 24.5%" @change="getaddress1(1)">
						    <el-option
						      v-for="item in addressData1[0]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address1[1]" style="width: 24.5%" @change="getaddress1(2)">
						    <el-option
						      v-for="item in addressData1[1]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address1[2]" style="width: 24.5%" @change="getaddress1(3)">
						    <el-option
						      v-for="item in addressData1[2]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address1[3]" style="width: 24.5%" @change="getaddress1(4)">
						    <el-option
						      v-for="item in addressData1[3]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- iddetailed -->
					<el-form-item :label= '$t("iddetailed")' prop="idAddressRo" >
					    <el-input v-model="searchForm.idAddressRo['detailed']"  maxlength="50"></el-input>
					</el-form-item>	
					<!-- 现居住地址 -->
					<el-form-item :label= '$t("liveprovince")' prop="liveAddressRo" >
					    <el-select v-model="address2[0]" style="width: 24.5%" @change="getaddress2(1)">
						    <el-option
						      v-for="item in addressData2[0]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address2[1]" style="width: 24.5%" @change="getaddress2(2)">
						    <el-option
						      v-for="item in addressData2[1]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address2[2]" style="width: 24.5%" @change="getaddress2(3)">
						    <el-option
						      v-for="item in addressData2[2]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address2[3]" style="width: 24.5%" @change="getaddress2(4)">
						    <el-option
						      v-for="item in addressData2[3]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- livedetailed -->
					<el-form-item :label= '$t("livedetailed")' prop="liveAddressRo" >
					    <el-input v-model="searchForm.liveAddressRo['detailed']"  maxlength="50"></el-input>
					</el-form-item>	
					<!-- email -->
					<el-form-item :label= '$t("email")' prop="email" >
					    <el-input v-model="searchForm.email"  maxlength="22"></el-input>
					</el-form-item>	
					<!-- mobileNumber -->
					<el-form-item :label= '$t("mobileNumber")' prop="mobileNumber" >
					    <el-input v-model="searchForm.mobileNumber"  maxlength="16"></el-input>
					</el-form-item>	
					<!-- familyYearSalary -->
					<el-form-item :label= '$t("familyYearSalary")' prop="familyYearSalary" >
					    <el-input v-model="searchForm.familyYearSalary"  maxlength="12"></el-input>
					</el-form-item>	
					<!-- familyMember -->
					<el-form-item :label= '$t("familyMember")' prop="familyMember" >
					    <el-input v-model="searchForm.familyMember"  maxlength="12"></el-input>
					</el-form-item>	
					<!-- bankName -->
				<!-- if -->
					<el-form-item :label= '$t("bankName")' prop="bankName" >
					    <el-select v-model="searchForm.bankName" style="width: 100%">
						    <el-option
						      v-for="item in bankList"
						      :key="item.bankCode"
						      :label="item.registerName"
						      :value="item.bankCode">
						    </el-option>
						</el-select>
					</el-form-item>	
					<!-- bankNo -->
					<el-form-item :label= '$t("bankNo")' prop="bankNo" >
					    <el-input v-model="searchForm.bankNo"  maxlength="22"></el-input>
					</el-form-item>	
					<!-- loanAble -->
					<el-form-item :label= '$t("loanAble")' prop="loanAble">
					    <el-select v-model="searchForm.loanAble" style="width: 100%">
						    <el-option
						      key="Ya"
						      label="Ya"
						      value="1">
						    </el-option>						    
						    <el-option
						      key="Tidak"
						      label="Tidak"
						      value="0">
						    </el-option>
						</el-select>
					</el-form-item>	
					<!-- loanAmount -->
					<el-form-item :label= '$t("loanAmount")' prop="loanAmount" v-if="isFenqi">
					    <el-input v-model="searchForm.loanAmount"  maxlength="12"></el-input>
					</el-form-item>	
					<!-- idCardUrl -->
					<el-form-item :label= '$t("idCardUrl")' prop="idCardUrl" >
				      	<div class="uploadImg">
							<el-upload
							  :action="UPLOAD_IMAGE"
							  list-type="picture-card"
							  :limit='1'
							  :data="upLoadData"
							  @click.native = 'getUploadName("idCardUrl")'
							  :on-success='handleAvatarSuccess'
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-plus">
							  </i>
							</el-upload>
							<span class="iconText">Foto KTP</span>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
				      	</div>
					</el-form-item>
					<!-- familyCardUrl -->
					<el-form-item :label= '$t("familyCardUrl")' prop="familyCardUrl" >
				      	<div class="uploadImg">
							<el-upload
							  :action="UPLOAD_IMAGE"
							  list-type="picture-card"
							  :limit='1'
							  :data="upLoadData"
							  @click.native = 'getUploadName1("familyCardUrl")'
							  :on-success='handleAvatarSuccess1'
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-plus">
							  </i>
							</el-upload>
							<span class="iconText">Foto Kartu Keluarga</span>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
				      	</div>
					</el-form-item>
					<!-- studentCardUrl -->
					<el-form-item :label= '$t("studentCardUrl")' prop="studentCardUrl" >
				      	<div class="uploadImg">
							<el-upload
							  :action="UPLOAD_IMAGE"
							  list-type="picture-card"
							  :limit='1'
							  :data="upLoadData"
							  @click.native = 'getUploadName2("studentCardUrl")'
							  :on-success='handleAvatarSuccess2'
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-plus">
							  </i>
							</el-upload>
							<span class="iconText">Foto Kartu Tanda Siswa/Kartu Tanda Mahasiswa yang masih berlaku</span>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
				      	</div>
					</el-form-item>
					<!-- idCardInHandUrl -->
					<el-form-item :label= '$t("idCardInHandUrl")' prop="idCardInHandUrl" >
				      	<div class="uploadImg">
							<el-upload
							  :action="UPLOAD_IMAGE"
							  list-type="picture-card"
							  :limit='1'
							  :data="upLoadData"
							  @click.native = 'getUploadName3("idCardInHandUrl")'
							  :on-success='handleAvatarSuccess3'
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-plus">
							  </i>
							</el-upload>
							<span class="iconText">Foto diri Anda dengan memegang KTP</span>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
				      	</div>
					</el-form-item>
					<!-- collageStudentUrl -->
					<el-form-item :label= '$t("collageStudentUrl")' prop="collageStudentUrl" >
				      	<div class="uploadImg">
				      		
							<el-upload
							  :action="UPLOAD_IMAGE"
							  list-type="picture-card"
							  :limit='1'
							  :data="upLoadData"
							  @click.native = 'getUploadName4("collageStudentUrl")'
							  :on-success='handleAvatarSuccess4'
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-plus">
							  </i>
							</el-upload>
							<span class="iconText">Foto surat terdaftar di Universitas atau screenshot dari website resmi universitas yang menunjukkan status aktif mahasiswa</span>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
				      	</div>
					</el-form-item>

						<el-button type="primary" @click="onSubmit" style="margin: 40px auto;width:650px;border-radius:20px; background-color: #2AD2C8;border:#2AD2C8">{{$t('submiteNow')}}
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

		        if (!/^[0-9]{16}$/i.test(value)) {
		        	this.canPass=false;
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
	                value=value.substr(3)
	            }
	            if(value.substring(0,1)=="0"){
	                value=value.substr(1)
	            }
		        if (!/^[8][0-9]{8,10}$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
		    var isfamilyYearSalary = (rule, value, callback) => {
		        if (!/^\+?[1-9][0-9]*$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		        // this.searchForm.familyYearSalary=this.searchForm.familyYearSalary+"Rp"
		    };
		    var isfamilyMember = (rule, value, callback) => {
		        if (!/^\+?[1-9][0-9]*$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
		    var isRequired = (rule, value, callback) => {
		        if (!(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
		    var isloanAmount = (rule, value, callback) => {
		        if (!/^\+?[1-9][0-9]*$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
		    var isFenqic = (rule, value, callback) => {
		        if (this.searchForm['loanAble']=="1") {
		          this.isFenqi=true
		        }else{
		        	this.isFenqi=false
		        }
		    };

			return{
				canPass: true,
				UPLOAD_IMAGE:'',
				uploadImgs: [{name:'diyige',url:'http:www.baidu.com'}],
				uploadName: '',
				uploadName1: '',
				uploadName2: '',
				uploadName3: '',
				uploadName4: '',
				limit: 1,
				imageUrl:[],
				activeName: '1',
				contentData: [],
				itemTitleIndex: '',
				iddetailed: '',
				upLoadData: {"fileType": "img","sessionId": ""},
				fileList: [{name: '', url: ''}],
				livedetailed:'',
				searchForm: {
					'inviteCode':'',
				    "userName":"",      //姓名
				    "idCard":"",          //身份证号
				    "sex":"",      //性别，0:未知，1:男，2:女
				    "age":"",     //年龄
				    "religion":"",    //宗教
				    "idAddressRo":{     //身份证地址
				        "province":"",
				        "city":"",
				        "bigDirect":"",
				        "smallDirect":"",
				        "detailed":""
				    },
				    "liveAddressRo":{   //现居地地址
				        "province":"",
				        "city":"",
				        "bigDirect":"",
				        "smallDirect":"",
				        "detailed":""
				    },
				    "email":"",   //邮箱
				    "mobileNumber":"",     //手机号
				    "familyYearSalary":"",      //家庭年收入
				    "familyMember":"",         //家庭成员数量
				    "bankName":"",           //银行名称
				    "bankNo":"",      //银行卡号
				    "loanAble": '',               //是否有分期贷款(0无,1有)
				    "loanAmount":"",       //每月分期付款金额
				    "idCardUrl":"",     //身份证照片url
				    "familyCardUrl":"",     //家庭卡照片url
				    "studentCardUrl":"",        //学生证照片
				    "idCardInHandUrl":"",       //手持身份证自拍照url
				    "collageStudentUrl":""      //大学学生证明照片
				},
				addressData1:[],
				address1:[],
				addressValue1:[],
				addressData2:[],
				address2:[],
				addressValue2:[],
				bankList: [],
		        dialogImageUrl: '',
		        dialogVisible: false,
		        isFenqi:false,
		        rules: {
		          userName: [
		            { validator: isuserName, required: true,trigger: 'blur' }
		          ],
		          idCard: [
		            { validator: isidCard, required: true, trigger: 'blur' }
		          ],
		          sex: [
		            { required: true,trigger: 'change' }
		          ],
		          age: [
		            { validator: isage,required: true,trigger: 'blur' }
		          ],
		          religion: [
		            {required: true,trigger: 'change' }
		          ],
		          email: [
		            { validator: isemail, required: true,trigger: 'blur' }
		          ],
		          mobileNumber: [
		            { validator: ismobileNumber, required: true,trigger: 'blur' }
		          ],
		          familyYearSalary: [
		            { validator: isfamilyYearSalary, required: true,trigger: 'blur' }
		          ],
		          liveAddressRo: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],
		          idAddressRo: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],
		          bankName: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],
		          bankNo: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],		          
		          idCardUrl: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],
		          familyCardUrl: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],
		          bankNo: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],		          
		          studentCardUrl: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],
		          collageStudentUrl: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],
		          idCardInHandUrl: [
		          	{required: true,message:"Tidak boleh kosong",trigger: 'blur' }
		          ],
		          familyMember: [
		            { validator: isfamilyMember, required: true,trigger: 'blur' }
		          ],
		          loanAble: [
		            { validator: isFenqic, required: true,trigger: 'change' }
		          ],		          
		          loanAmount: [
		            { validator: isloanAmount, required: true,trigger: 'blur' }
		          ]
		        }
			}
		},
		methods:{
			init(){
				this.UPLOAD_IMAGE=process.env.UPLOAD_IMAGE;
				this.getaddress1(0);
				this.getaddress2(0);
				this.upLoadData['sessionId']=this.$store.getters.token;
				this.$axios.post('/api-user/user/studentStepOneInfo', {}).then((response)=>{
					if(response.data.code==0){
						this.searchForm=response.data.data;
						for(let e in this.searchForm){
							if(!this.searchForm[e]){
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
							this.addressData1[0]=value
							this.addressData1=this.addressData1.splice(0,1);
						})
						break;
					case 1:
						this.address1=this.address1.splice(0,1);
						i=fn(this.address1[0],this.addressData1[0]);
						this.getAddress(3,i).then((value)=>{
							this.addressData1[1]=value
							this.addressData1=this.addressData1.splice(0,2);
						})
						break;
					case 2: 
						this.address1=this.address1.splice(0,2);
						i=fn(this.address1[1],this.addressData1[1]);
						this.getAddress(4,i).then((value)=>{
							this.addressData1[2]=value
							this.addressData1=this.addressData1.splice(0,3);
						})
						break;
					case 3: 
						this.address1=this.address1.splice(0,3);
						i=fn(this.address1[2],this.addressData1[2]);
						this.getAddress(5,i).then((value)=>{
							this.addressData1[3]=value
							this.addressData1=this.addressData1.splice(0,4);
						})
						break;
					case 4: 
						let c={};
						c.province=this.address1[0];
						c.city=this.address1[1];
						c.bigDirect=this.address1[2];
						c.smallDirect=this.address1[3];
						this.searchForm.idAddressRo=c;
				}
			},
			getaddress2(e){

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
							this.addressData2[0]=value
							this.addressData2=this.addressData2.splice(0,1);
						})
						break;
					case 1:
						this.address2=this.address2.splice(0,1);
						i=fn(this.address2[0],this.addressData2[0]);
						this.getAddress(3,i).then((value)=>{
							this.addressData2[1]=value
							this.addressData2=this.addressData2.splice(0,2);
						})
						break;
					case 2: 
						this.address2=this.address2.splice(0,2);
						i=fn(this.address2[1],this.addressData2[1]);
						this.getAddress(4,i).then((value)=>{
							this.addressData2[2]=value
							this.addressData2=this.addressData2.splice(0,3);
						})
						break;
					case 3: 
						this.address2=this.address2.splice(0,3);
						i=fn(this.address2[2],this.addressData2[2]);
						this.getAddress(5,i).then((value)=>{
							this.addressData2[3]=value
							this.addressData2=this.addressData2.splice(0,4);
						})
						break;
					case 4: 
						let a={};
						a.province=this.address2[0];
						a.city=this.address2[1];
						a.bigDirect=this.address2[2];
						a.smallDirect=this.address2[3];
						this.searchForm.liveAddressRo=a;
				}
			},
			getAddress(h,g){
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
					});

					
				})
				return p; // 返回p实例对象
			},
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    handleAvatarSuccess(response, file) {
		    	// this.searchForm[this.uploadName]= URL.createObjectURL(file.raw);
		    	this.searchForm[this.uploadName]= response.data['filePath'];
		    },
		    handleAvatarSuccess1(response, file) {
		    	// this.searchForm[this.uploadName]= URL.createObjectURL(file.raw);
		    	this.searchForm[this.uploadName1]= response.data['filePath'];
		    },
		    handleAvatarSuccess2(response, file) {
		    	// this.searchForm[this.uploadName]= URL.createObjectURL(file.raw);
		    	this.searchForm[this.uploadName2]= response.data['filePath'];
		    },
		    handleAvatarSuccess3(response, file) {
		    	// this.searchForm[this.uploadName]= URL.createObjectURL(file.raw);
		    	this.searchForm[this.uploadName3]= response.data['filePath'];
		    },
		    handleAvatarSuccess4(response, file) {
		    	// this.searchForm[this.uploadName]= URL.createObjectURL(file.raw);
		    	this.searchForm[this.uploadName4]= response.data['filePath'];
		    },
		    getUploadName(e){
		    	this.uploadName=e;
		    	
		    },
		    getUploadName1(e){
		    	this.uploadName1=e;
		    	
		    },
		    getUploadName2(e){
		    	this.uploadName2=e;
		    	
		    },
		    getUploadName3(e){
		    	this.uploadName3=e;
		    	
		    },
		    getUploadName4(e){
		    	this.uploadName4=e;
		    	
		    },
			onSubmit(){
				console.log(this.searchForm)
				delete this.searchForm['userUuid'];
				if(!this.isFenqi){
					delete this.searchForm['loanAmount']
				}
				if(!this.searchForm['inviteCode']){
					delete this.searchForm['inviteCode']
				}
				for(let i in this.searchForm){
					if(this.searchForm[i]==""||this.searchForm[i]==null||this.searchForm[i]==undefined||!this.searchForm.idAddressRo["smallDirect"]||!this.searchForm.liveAddressRo["smallDirect"]){
							this.$message({
				            type: 'warnning',
				            message: 'Tidak boleh kosong'
				          });
						return;
					}
				}
				let _data=Object.assign({},this.searchForm);
				if(this.canPass){
					this.$axios.post('/api-user/user/studentStepOneAdd', _data)
					  .then((re)=>{
					    let _this=this;
					    if(re.data.code==0){
					        this.$message({
					            type: 'success',
					            message: 'success!'
					          });
					          setTimeout(()=>{
					          	_this.$router.push("./studentApply2")
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
	#formContent {
		width: 900px;
		margin: 0 auto;
	}
	#formTitle1 {
		display: flex;
		margin: 40px;

	}
	#formTitle1>div {
		flex: 1;
		overflow: hidden;
	}
	#formTitle1 {
		line-height: 40px;
		font-size: 16px;
	}
	#formTitle1Sub1 {
		color: #007BCE;
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
	  	position: relative;
	  }

</style>