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
	    "email":"Email (Opsional):",
	    "mobileNumber":"Nomor HP:",
	    "familyYearSalary":"Pendapatan tahunan keluarga:",
	    "familyMember":"Jumlah anggota keluarga:",
	    "bankName":"Nama Bank:",
	    "bankNo":"Nomor Rekening Bank Anda:",
	    "loanAble": "是否有分期付款:",
	    "loanAmount":"Jumlah cicilan per bulan:",
	    "idCardUrl":"Foto KTP:",
	    "payDetailUrl":"Slip gaji (bila ada):",
	    "aggrementUrl":" Foto surat pernyataan penjamin yang telah ditandatangani:",
	    "aggrementInHandUrl":"Foto Penjamin memegang surat pernyataan (kualitas harus baik):",
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
	    "email":"Email (Opsional):",
	    "mobileNumber":"Nomor HP:",
	    "familyYearSalary":"Pendapatan tahunan keluarga:",
	    "familyMember":"Jumlah anggota keluarga:",
	    "bankName":"Nama Bank:",
	    "bankNo":"Nomor Rekening Bank Anda:",
	    "loanAble": "是否有分期付款:",
	    "loanAmount":"Jumlah cicilan per bulan:",
	    "idCardUrl":"Foto KTP:",
	    "payDetailUrl":"Slip gaji / Surat Keterangan Penghasilan:",
	    "aggrementUrl":" Foto surat pernyataan penjamin yang telah ditandatangani:",
	    "aggrementInHandUrl":"Foto Penjamin memegang surat pernyataan (kualitas harus baik):",
      	"submiteNow": "Langkah selanjutnya"
    }
  }
</i18n>
<template>
	<div id="saBody">
		<div id="saContent">
			<div id="formTitle3">
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
						<img src="../../assets/img/line3.png" alt="">
						<img src="../../assets/img/line3.png" alt="">
					</div>
				</div>
				<div id="fts3"><img src="../../assets/img/studentIcon32.png" alt="">Informasi Penjamin</div>
				<div class="studentLine">
					<div class="lineContent">						
						<img src="../../assets/img/line.png" alt="">
						<img src="../../assets/img/line.png" alt="">
					</div>
				</div>
				<div id="fts4"><img src="../../assets/img/studentIcon4.png" alt="">Kontak Darurat</div>
			</div>
			<div id="formContent3">
				<el-form ref="form" :model="searchForm" :rules="rules" label-width="250px" style="width: 900px">	
					<!-- 姓名 -->
					<el-form-item :label= '$t("userName")' prop="userName" >
					    <el-input v-model="searchForm.userName"  maxlength="50"></el-input>
					</el-form-item>	
					<!-- 身份证号码 -->
					<el-form-item :label= '$t("idCard")' prop="idCardNo" >
					    <el-input v-model="searchForm.idCardNo"  maxlength="16"></el-input>
					</el-form-item>
					<!-- 与借款人关系 -->
					<el-form-item label= 'Hubungan dengan peminjam:' prop="relationship" >
					    <el-select v-model="searchForm.relationship" style="width: 100%">
						    <el-option
						      key="Ayah/Ibu"
						      label="Ayah/Ibu"
						      value="Ayah/Ibu">
						    </el-option>
						    <el-option
						      key="Saudara Laki-laki/Saudara Perempuan"
						      label="Saudara Laki-laki/Saudara Perempuan"
						      value="Saudara Laki-laki/Saudara Perempuan">
						    </el-option>
						    <el-option
						      key="Anggota Keluarga Lainnya  "
						      label="Anggota Keluarga Lainnya  "
						      value="Anggota Keluarga Lainnya  ">
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
					    <el-input v-model="searchForm.idAddressRo.detailed"  maxlength="50"></el-input>
					</el-form-item>	
					<!-- 现居住地址 -->
					<el-form-item :label= '$t("liveprovince")' prop="liveCompanyAddressRo" >
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
					<el-form-item :label= '$t("livedetailed")' prop="liveCompanyAddressRo" >
					    <el-input v-model="searchForm.liveAddressRo.detailed"  maxlength="50"></el-input>
					</el-form-item>	
					<!-- NPWP (Opsional): -->
					<el-form-item label= 'NPWP (Opsional):' prop="taxCardNo" >
					    <el-input v-model="searchForm.taxCardNo"  maxlength="22"></el-input>
					</el-form-item>	
					<!-- email -->
					<el-form-item :label= '$t("email")' prop="email" >
					    <el-input v-model="searchForm.email"  maxlength="22"></el-input>
					</el-form-item>	
					<!-- mobileNumber -->
					<el-form-item :label= '$t("mobileNumber")' prop="mobileNumber" >
					    <el-input v-model="searchForm.mobileNumber"  maxlength="22"></el-input>
					</el-form-item>	
					<!-- companyName -->
					<el-form-item label= 'Nama Perusahaan:' prop="companyName" >
					    <el-input v-model="searchForm.companyName"  maxlength="32"></el-input>
					</el-form-item>	
					<!-- companyMobile -->
					<el-form-item label= 'Nomor telepon perusahaan:' prop="companyMobile" >
					    <el-input v-model="searchForm.companyMobile"  maxlength="12"></el-input>
					</el-form-item>

					<!-- 公司住址 -->
					<el-form-item label= ' Lokasi perusahaan:' prop="liveCompanyAddressRo" >
					    <el-select v-model="address3[0]" style="width: 24.5%" @change="getaddress3(1)">
						    <el-option
						      v-for="item in addressData3[0]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address3[1]" style="width: 24.5%" @change="getaddress3(2)">
						    <el-option
						      v-for="item in addressData3[1]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address3[2]" style="width: 24.5%" @change="getaddress3(3)">
						    <el-option
						      v-for="item in addressData3[2]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					    <el-select v-model="address3[3]" style="width: 24.5%" @change="getaddress3(4)">
						    <el-option
						      v-for="item in addressData3[3]"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- iddetailed -->
					<el-form-item :label= '$t("iddetailed")' prop="liveCompanyAddressRo" >
					    <el-input v-model="searchForm.liveCompanyAddressRo.detailed"  maxlength="50"></el-input>
					</el-form-item>	

					<!-- position -->
					<el-form-item v-if="" label= 'Posisi atau Jabatan:' prop="position" >
					    <el-select v-model="searchForm.position" style="width: 100%">
						    <el-option
						      key="Supervisor"
						      label="Supervisor"
						      value="Supervisor">
						    </el-option>						    
						    <el-option
						      key="Sekretaris"
						      label="Sekretaris"
						      value="Sekretaris">
						    </el-option>
						    <el-option
						      key="Staff"
						      label="Staff"
						      value="Staff">
						    </el-option>						    
						    <el-option
						      key="Lainnya"
						      label="Lainnya"
						      value="Lainnya">
						    </el-option>
						</el-select>
					</el-form-item>	
					<!-- income -->
					<el-form-item label= 'Pendapatan/bulan:' prop="income" >
					    <el-input v-model="searchForm.income"  maxlength="12"></el-input>
					</el-form-item>	

					<!-- doitLoan -->
					<el-form-item v-if="" label= 'Apakah Anda pernah meminjam di Do-It sebelumnya:' prop="doitLoan">
					    <el-select v-model="searchForm.doitLoan" style="width: 100%">
						    <el-option
						      key="1"
						      label="Ya"
						      value="1">
						    </el-option>						    
						    <el-option
						      key="0"
						      label="Tidak"
						      value="0">
						    </el-option>
						</el-select>
					</el-form-item>	
					<!-- idCardUrl -->
					<el-form-item :label= '$t("idCardUrl")' prop="idCardUrl" >
				      	<div class="uploadImg">
							<el-upload
							  :action="BASE_URL"
							  :data="upLoadData"
							  list-type="picture-card"
							  :limit='1'
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
					<!-- payDetailUrl -->
					<el-form-item :label= '$t("payDetailUrl")' prop="payDetailUrl" >
				      	<div class="uploadImg">
							<el-upload
							  :action="BASE_URL"
							  :data="upLoadData"
							  list-type="picture-card"
							  :limit='1'
							  @click.native = 'getUploadName1("payDetailUrl")'
							  :on-success='handleAvatarSuccess1'
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-plus">
							  </i>
							</el-upload>
							<span class="iconText">Slip gaji / Surat Keterangan Penghasilan</span>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
				      	</div>
					</el-form-item>
					<!-- aggrementUrl -->
					<el-form-item :label= '$t("aggrementUrl")' prop="aggrementUrl" >
				      	<div class="uploadImg">
				      		<a id="aaa" :href="downloadFileUrl">< Download disini ></a>
							<el-upload
							  :action="BASE_URL"
							  :data="upLoadData"
							  list-type="picture-card"
							  :limit='1'
							  @click.native = 'getUploadName2("aggrementUrl")'
							  :on-success='handleAvatarSuccess2'
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-plus">
							  </i>
							</el-upload>
							<span class="iconText">Foto surat pernyataan penjamin yang telah ditandatangani</span>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
				      	</div>
					</el-form-item>
					<!-- aggrementInHandUrl -->
					<el-form-item :label= '$t("aggrementInHandUrl")' prop="aggrementInHandUrl" >
				      	<div class="uploadImg">
							<el-upload
							  :action="BASE_URL"
							  :data="upLoadData"
							  list-type="picture-card"
							  :limit='1'
							  @click.native = 'getUploadName3("aggrementInHandUrl")'
							  :on-success='handleAvatarSuccess3'
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-plus">
							  </i>
							</el-upload>
							<span class="iconText">Foto penjamin memegang surat pernyataan</span>
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
		    var isloanAmount = (rule, value, callback) => {
		        if (!/^\+?[1-9][0-9]*$/i.test(value)) {
		        	this.canPass=false;
		          return callback(new Error('Format salah'));
		        }
		    };
			return{
				canPass: true,
				BASE_URL:'',
				uploadImgs: [{name:'',url:''}],
				uploadName: '',
				uploadName1: '',
				uploadName2: '',
				uploadName3: '',
				limit: 1,
				imageUrl:[],
				activeName: '1',
				contentData: [],
				itemTitleIndex: '',
				upLoadData: {"fileType": "img","sessionId": ""},
				searchForm: {     
				    "userName":"",             //担保人姓名
				    "idCardNo":"",          //担保人身份证号
				    "relationship":"",            //担保人与借款人关系
				    "idAddressRo":{                 //担保人身份证地址
				        "province":"",
				        "city":"",
				        "bigDirect":"",
				        "smallDirect":"",
				        "detailed":""
				    },
				    "liveAddressRo":{               //担保人现居地地址
				        "province":"",
				        "city":"",
				        "bigDirect":"",
				        "smallDirect":"",
				        "detailed":""
				    },
				    "taxCardNo":"",         //担保人税卡号
				    "email":"",     //担保人邮箱
				    "mobileNumber":"",      //担保人手机号
				    "companyName":"",          //担保人公司名称
				    "companyMobile":"",      //担保人公司联系方式
				    "liveCompanyAddressRo":{            //担保人公司地址
				        "province":"",
				        "city":"",
				        "bigDirect":"",
				        "smallDirect":"",
				        "detailed":""
				    },
				    "position":"",                   //职位
				    "income":"",                  //担保人月收入
				    "doitLoan": '',                   //是否在doit借过款(0否,1是)
				    "idCardUrl":"",     //身份证照片url
				    "payDetailUrl":"",      //工资单url
				    "aggrementUrl":"",      //担保人声明照片url
				    "aggrementInHandUrl":""     //担保人持有声明照片

				},
				addressData1:[],
				address1:[],
				addressData2:[],
				address2:[],
				addressData3:[],
				address3:[],
		        dialogImageUrl: '',
		        // downloadFileUrl: require("../../assets/img/joinus.png"),
		        downloadFileUrl: "../../static/agreement.docx",
		        dialogVisible: false,
		        rules: {
		          userName: [
		            { validator: isuserName, required: true,  trigger: 'blur' }
		          ],
		          idCardNo: [
		            { validator: isidCard, required: true, trigger: 'blur' }
		          ],
		          relationship: [
		            { required: true, message: 'Tidak boleh kosong', trigger: 'change' }
		          ],
		          idAddressRo: [
		            { required: true, message: 'Tidak boleh kosong', trigger: 'blur' }
		          ],		          
		          liveCompanyAddressRo: [
		            { required: true, message: 'Tidak boleh kosong', trigger: 'blur' }
		          ],		          
		          religion: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'change' }
		          ],
		          mobileNumber: [
		            { validator: ismobileNumber, required: true, trigger: 'blur' }
		          ],		          
		          companyName: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'blur' }
		          ],		          
		          companyMobile: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          position: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'change' }
		          ],
		          income: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          doitLoan: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'change' }
		          ],
		          idCardUrl: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'change' }
		          ],
		          aggrementUrl: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'change' }
		          ],
		          aggrementInHandUrl: [
		            {required: true, message: 'Tidak boleh kosong', trigger: 'change' }
		          ],
		          familyYearSalary: [
		            { validator: isfamilyYearSalary, required: true, message: 'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          familyMember: [
		            { validator: isfamilyMember, required: true, message: 'Tidak boleh kosong', trigger: 'blur' }
		          ],
		          loanAmount: [
		            { validator: isloanAmount, required: true, message: 'Tidak boleh kosong', trigger: 'blur' }
		          ]
		        }
			}
		},
		methods:{
			init(){
				this.BASE_URL=baseUrl+"api-upload/upload/image";
				this.upLoadData['sessionId']=this.$store.getters.token;
				this.getaddress1(0);
				this.getaddress2(0);
				this.getaddress3(0);
				this.$axios.post('/api-user/user/studentStepThreeInfo', {}).then((response)=>{
					if(response.data.code==0){
						this.searchForm=response.data.data;
						for(let e in this.searchForm){
							if(!this.searchForm[e]){
								this.searchForm[e]=''
							}
						}
						// this.searchForm['doitLoan']=''
					}
			   	}).catch((re)=>{
			   		console.log(re);
				});
			},
			donwloadFile(){
				window.open(this.downloadFileUrl,'_blank')
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
						let a={};
						a.province=this.address1[0];
						a.city=this.address1[1];
						a.bigDirect=this.address1[2];
						a.smallDirect=this.address1[3];
						this.searchForm.idAddressRo=a;
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
							console.log(value)
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
			getaddress3(e){

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
							this.addressData3[0]=value
							this.addressData3=this.addressData3.splice(0,1);
						})
						break;
					case 1:
						this.address3=this.address3.splice(0,1);
						i=fn(this.address3[0],this.addressData3[0]);
						
						this.getAddress(3,i).then((value)=>{
							this.addressData3[1]=value
							this.addressData3=this.addressData3.splice(0,2);
						})
						break;
					case 2: 
						this.address3=this.address3.splice(0,2);
						i=fn(this.address3[1],this.addressData3[1]);
						
						this.getAddress(4,i).then((value)=>{
							this.addressData3[2]=value
							this.addressData3=this.addressData3.splice(0,3);
						})
						break;
					case 3: 
						this.address3=this.address3.splice(0,3);
						i=fn(this.address3[2],this.addressData3[2]);
						
						this.getAddress(5,i).then((value)=>{
							this.addressData3[3]=value
							this.addressData3=this.addressData3.splice(0,4);
						})
						break;
					case 4: 
						let a={};
						a.province=this.address3[0];
						a.city=this.address3[1];
						a.bigDirect=this.address3[2];
						a.smallDirect=this.address3[3];
						this.searchForm.liveCompanyAddressRo=a;
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
				   	}).catch((re)=>{
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
		    	this.searchForm[this.uploadName]= response.data['filePath'];
		    },
		    getUploadName(e){
		    	this.uploadName=e;
		    },
		    handleAvatarSuccess1(response, file) {
		    	this.searchForm[this.uploadName1]= response.data['filePath'];
		    },
		    getUploadName1(e){
		    	this.uploadName1=e;
		    },
		    handleAvatarSuccess2(response, file) {
		    	this.searchForm[this.uploadName2]= response.data['filePath'];
		    },
		    getUploadName2(e){
		    	this.uploadName2=e;
		    },
		    handleAvatarSuccess3(response, file) {
		    	this.searchForm[this.uploadName3]= response.data['filePath'];
		    },
		    getUploadName3(e){
		    	this.uploadName3=e;
		    },
			onSubmit(){
				this.searchForm['userUuid']=11;
				if(!this.searchForm['taxCardNo']){
					delete this.searchForm['taxCardNo']
				}
				if(!this.searchForm['email']){
					delete this.searchForm['email']
				}
				if(!this.searchForm['payDetailUrl']){
					delete this.searchForm['payDetailUrl']
				}
				for(let i in this.searchForm){
					if(this.searchForm[i]==""||this.searchForm[i]==null||this.searchForm[i]==undefined||!this.searchForm.idAddressRo["detailed"]||!this.searchForm.liveCompanyAddressRo["detailed"]||!this.searchForm.liveAddressRo["detailed"]){
				        this.$message({
				            type: 'warnning',
				            message: 'Tidak boleh kosong'
				          });
						return;
					}
				}
				let _data=Object.assign({},this.searchForm);
				if(this.canPass){
					this.$axios.post('/api-user/user/studentStepThreeAdd', _data)
					  .then((re)=>{
					    let _this=this;
					    if(re.data.code==0){
					        this.$message({
					            type: 'success',
					            message: 'success!'
					          });
					          setTimeout(()=>{
					          	_this.$router.push("./studentApply4")
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
	#formContent3 {
		width: 900px;
		margin: 0 auto;
	}
	#formTitle3 {
		display: flex;
		margin: 40px;
		line-height: 40px;
		font-size: 16px;
	}
	#formTitle3>div {
		flex: 1;
		overflow: hidden;
	}
	#fts1 {
		color: #007BCE;
	}
	#fts2 {
		color: #5CAF00;
	}
	#fts3 {
		color: #EDA500;
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
	 #aaa {
	 	display: block;
	 	position: absolute;
	 	top: 100px;
	 	left: -210px;
	 	color: #2AD2C8;
	 	width: 200px;
	 	height: 40px;
	 	line-height: 40px;
	 }
	 #aaa:hover {
	 	cursor: pointer;
	 }
</style>