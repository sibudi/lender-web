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
        "iddetailed":"详细地址:",
        "liveprovince":"Alamat domisili:",
        "livedetailed":"详细地址:",
	    "email":"Email:",
	    "mobileNumber":"Nomor HP:",
	    "familyYearSalary":"Pendapatan tahunan keluarga:",
	    "familyMember":"Jumlah anggota keluarga:",
	    "bankName":"Nama Bank:",
	    "bankNo":"Nomor Rekening Bank Anda:",
	    "loanAble": "Apakah ada pembayaran angsuran:",
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
        "iddetailed":"详细地址:",
        "liveprovince":"Alamat domisili:",
        "livedetailed":"详细地址:",
	    "email":"Email:",
	    "mobileNumber":"Nomor HP:",
	    "familyYearSalary":"Pendapatan tahunan keluarga:",
	    "familyMember":"Jumlah anggota keluarga:",
	    "bankName":"Nama Bank:",
	    "bankNo":"Nomor Rekening Bank Anda:",
	    "loanAble": "Apakah ada pembayaran angsuran:",
	    "loanAmount":"Jumlah cicilan per bulan:",
	    "idCardUrl":"Foto KTP:",
	    "familyCardUrl":"Foto Kartu Keluarga:",
	    "studentCardUrl":"Foto Kartu Tanda Siswa/Kartu Tanda Mahasiswa yang masih berlaku:",
	    "idCardInHandUrl":"Foto diri Anda dengan memegang KTP:",
	    "collageStudentUrl":"Foto bukti mahasiswa di universitas:",
      	"submiteNow": "Langkah selanjutnya"
    }
  }
</i18n>
<template>
	<div id="saBody">
		<div id="saContent">
			<div id="formTitle4">
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
						<img src="../../assets/img/line4.png" alt="">
						<img src="../../assets/img/line4.png" alt="">
					</div>
				</div>
				<div id="fts4"><img src="../../assets/img/studentIcon42.png" alt="">Kontak Darurat</div>
			</div>
			<div id="formContent3">
				<el-form ref="form" :model="searchForm" :rules="rules" label-width="250px" style="width: 900px">	
					<!-- 姓名 -->
					<el-form-item label= 'Nama lengkap (Sesuai KTP):' prop="username" >
					    <el-input v-model="searchForm.username"  maxlength="50"></el-input>
					</el-form-item>	
					<!-- 关系-->
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
						      key="Kerabat lainnya"
						      label="Kerabat lainnya"
						      value="Kerabat lainnya">
						    </el-option>
						    <el-option
						      key="Teman"
						      label="Teman"
						      value="Teman">
						    </el-option>
						</el-select>
					</el-form-item>
					<!-- mobileNumber -->
					<el-form-item label= 'Nomor HP:' prop="mobileNumber" >
					    <el-input v-model="searchForm.mobileNumber" minlength="10" maxlength="12"></el-input>
					</el-form-item>	
					<!-- <el-form-item> -->
						<el-button type="primary" @click="onSubmit" style="margin: 40px auto;width:650px;border-radius:20px; background-color: #2AD2C8;border:#2AD2C8">{{$t('submiteNow')}}
						</el-button>
					<!-- </el-form-item> -->
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
			return{
				canPass: true,
				searchForm: {     
				    "username":"",        //姓名
				    "relationship":"",        //与借款人关系
				    "mobileNumber":""    //手机号码
				},
		        rules: {
		          username: [
		            { validator: isuserName, required: true,  trigger: 'blur' }
		          ],		          
		          relationship: [
		            { required: true,  trigger: 'change' }
		          ],
		          mobileNumber: [
		            { validator: ismobileNumber, required: true, trigger: 'blur' }
		          ]
		        }
			}
		},
		methods:{
			init(){
				this.$axios.post('/api-user/user/studentStepFourInfo', {}).then((response)=>{
					if(response.code==0){
						this.searchForm=response.data;
					}
			   	}).catch((re)=>{
			   		console.log(re);
				});
			},
		    onSubmit(){
		    	let j=1;
		    	for(let i in this.searchForm){
		    		if(!this.searchForm[i]){
		    			this.$message("Format salah");
		    			// this.$message("信息填写不完整");
		    			j=0;
		    		}
		    	}
		    	if(j==1&&this.canPass){
					this.$axios.post('/api-user/user/studentStepFourAdd', this.searchForm).then((response)=>{
						if(response.data.code==0){
							this.$message("Terima kasih! Permohonan Pengajuan Pinjaman Anda Akan Kami Proses");
							setTimeout(()=>{
								this.$router.push("/")
							}, 1500);
						}
						resolve(re);
				   	}).catch((re)=>{
				   		console.log(re);
					});
		    	}else {
		    		this.$message("Format salah");
		    	}
		    }
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
	#formTitle4 {
		display: flex;
		margin: 40px;
		line-height: 40px;
		font-size: 16px;
	}
	#formTitle4>div {
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
	#fts4 {
		color: #FE6C6B;
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