<i18n>
  {

  }
</i18n>
<template>
<div>
      <!-- 基本设置 -->
  <div class="center_tit">Setel Ulang Kata Sandi</div>
  <div class="reset_tips">Kode OTP telah dikirim ke nomor{{mobileNumber}}</div>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="reset_form">
      <el-form-item label="Kode OTP" prop="smsCode">
        <el-input v-model="ruleForm.smsCode" class="form_width"></el-input>
      </el-form-item>
      <el-form-item label="Password Transaksi" prop="payPwd" :rules="[{ required: true, message: 'Mohon isi Password'},
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
        <el-input v-model="ruleForm.payPwd" class="form_width" show-password></el-input>
      </el-form-item>
      <el-form-item label="Konfirmasi Password" prop="repayPwd" :rules="[{ required: true, message: 'Mohon isi konfirmasi Password'},
						{
						validator: (rule, value, callback) => {
					if (!value) {
						return callback('Konfirmasi Password Wajib diisi');
					} else{
				
						if(value != this.ruleForm.payPwd)
						{
							return callback('Konfirmasi Password harus sama dengan Password');
						} else{
							callback()
						}
					}
				}, trigger: ['change','blur'] }
				
				]">
        <el-input v-model="ruleForm.repayPwd" class="form_width" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="onSubmit" class="formsub_btn"  :disabled="loadingbtn" :loading="loadingbtn">Ubah Password</el-button>
         <el-button  @click="onCancel" type="danger"  :disabled="loadingbtn" :loading="loadingbtn" style="font-size:16px;">Batal</el-button>
      </el-form-item>
      <!-- <el-form-item>
       
      </el-form-item> -->
    </el-form>
  </div>
</div>

</template>
<script>
import '../../assets/css/element.css';
export default{
  data(){
    return {
      mobileNumber: '',
      loadingbtn:false,
      ruleForm:{
        smsCode:'',
        payPwd:'',
        repayPwd:''
      },
      rules:{
        smsCode: [
          { required: true, message: 'Silahkan masukkan kode OTP', trigger: 'blur' },
        ],
        payPwd: [
          { required: true, message: 'Password Transaksi', trigger: 'blur' },
        ],
        repayPwd: [
          { required: true, message: 'Masukan Password Transaksi sekali lagi', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted(){
  },
  created(){
    let mobile = this.$store.getters.currentUser;
    this.mobileNumber = mobile.substr(0,3)+"****"+mobile.substr(7);
  },
  destroyed(){
    
  },
  methods: {
    onCancel(){
      this.$router.push('/center/setting');
    },
    onSubmit(){
      let _this = this;
      _this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if(_this.ruleForm.payPwd != _this.ruleForm.repayPwd){
              _this.$message({
                type: 'warnning',
                message: 'Password tidak sama, silakan masukkan kembali'
              });
              return;
            }
            _this.loadingbtn = true;
            _this.$axios.post('/api-user/users/resetPayPassword', {smsCode:_this.ruleForm.smsCode,payPwd:_this.ruleForm.payPwd}).then(function (re) {
              _this.loadingbtn = false;
              if(re.data.code==0){
                _this.$message({type: 'success',message: 'Password berhasil diubah'});
                    _this.$router.push('/center/setting');
              }else {
                _this.$message(re.data.message);
              }
            }).catch(function (re) {setTimeout(()=>{_this.loadingbtn = false;}, 1000);});

          } else {return false;}
      });
    }
  }
}
</script>
<style scoped>
  .reset_tips{
    color: #00D6C9;
    font-size: 14px;
    margin: 60px 0 16px 302px;
    text-align: left;
  }
  .reset_form{
    margin-left: 0px;
    text-align: left;
    color: #164276;
  }
  .reset_form .form_width{
    width: 401px;
    margin-right: 16px;
  }
  .reset_form .formsub_btn{
    width:auto;
    height:40px;
    background:rgba(42,210,200,1);
    box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
    border-radius:5px;
    color: #fff;
    font-size: 16px;
    margin: 0px;
  }
</style>
<style>
  .drawal_form .el-form-item__label{
    padding: 0 30px 0 0;
    color: #164276;
  }
  .drawal_form .el-button{
    border: none;
  }
</style>
