<i18n>
  {

  }
</i18n>
<template>
<div>
      <!-- 基本设置 -->
      <div class="center_tit">Informasi dasar</div>
      <div class='df setting_box'>
        <div class="">
          <div>
            <p>Nomor ponsel</p>
            <p class='setting_txt'>{{mobileNumber}}</p>
          </div>
          <div>
            <p>Nama lengkap</p>
            <p class='setting_txt'>{{realName}}</p>
          </div>
          <div>
            <p>Nomor ID</p>
            <p class='setting_txt'>{{idCardNo}}</p>
          </div>
        </div>
        <div class='upload_header_box'>
          <p>Foto Profil</p>
          <img :src="avatar" height="110" width="110" alt="">
          <el-upload :action="UPLOAD_IMAGE" :data="upLoadData" :on-success='handleAvatarSuccess' :show-file-list="false">
            <el-button size="small" type="primary"><i class="el-icon-upload"></i> Perbaharui Foto Profil</el-button>
          </el-upload>
        </div>
      </div>
      <!-- 银行卡信息 -->
      <div class="center_tit">Informasi Kartu Bank</div>
      <div class='setting_box'>
        <div class="">
          <div>
            <p>Kartu Bank</p>
            <p class='setting_txt'>{{bankName}}</p>
          </div>
          <div>
            <p>Nomor Kartu Bank</p>
            <div class='df'>
              <p class='setting_txt'><el-input v-model="bankCardNo" :disabled="canEditCard"></el-input></p>
              <p class='edit_btn' @click="handleEditCard" >{{canEditCard?'Ubah':'Lengkap'}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 密码管理 -->
      <div class="center_tit">Pengaturan Password</div>
      <div class='setting_box'>
          <div>
            <p>Password Transaksi</p>
            <div class='df'>
              <p class='setting_txt'><el-input type="password" v-model="payPwd" disabled show-password></el-input></p>
              <p class='edit_btn' @click='handleReset'>Setel Ulang</p>
            </div>
          </div>
      </div>
      <div class="center_tit">Akun Deactivate </div>
      <div class="deactivate">
      <div v-if="authStatus ==2">
         <el-button size="small" type="danger" @click="deActivate">Deactivate</el-button>
      </div>
       <el-dialog
      title="Deactivate Account"
      :visible.sync="deactivateDialogVisible"
      v-model="deactivateDialogVisible"
      :close-on-click-modal="false"
      size="small"
    >
  Apakah anda akan menonaktifkan akun anda?
    <div slot="footer" class="dialog-footer">
      <el-button @click="deactivateDialogVisible= false; ">Batal</el-button>
        <el-button
          type="danger"
          @click="deActivateDialogSubmit"
          :loading="deactivateDialogLoading"
        >Deactivate</el-button>
    </div>
    </el-dialog>
      </div>
</div>

</template>
<script>
import '../../assets/css/element.css';
export default{
  data(){
    return {
      UPLOAD_IMAGE:'',
      avatar:'',
      upLoadData:{"fileType": "img","sessionId": ""},
      payPwd:"",
      mobileNumber:'',
      realName:'',
      idCardNo:'',
      bankName:'',
      bankCardNo:'',
      bankCode:'',
      authStatus:0,
      canEditCard: true,
      BasicInfoForm:{
        pass:'',
        checkPass:'',
        age:""
      },
      fileList:[],
      deactivateDialogVisible:false,
      deactivateDialogLoading:false
    }
  },
  async mounted(){
    this.UPLOAD_IMAGE = process.env.UPLOAD_IMAGE;
    this.upLoadData['sessionId']=this.$store.getters.token;
  },
  created(){
    this.bindInit();
  },
  destroyed(){
  },
  methods: {
    bindInit(){
        let _this = this;
       _this.$axios.post('/api-user/user/userBasicInfo', {'userId':_this.$store.getters.userUuid}).then(function (re) {
        if(re.data.code==0){
          _this.mobileNumber = re.data.data.mobileNumber;
          _this.realName = re.data.data.realName;
          _this.idCardNo = re.data.data.idCardNo;
          _this.bankName = re.data.data.bankName;
          _this.bankCardNo = re.data.data.bankCardNo;
          _this.bankCode = re.data.data.bankCode;
          _this.payPwd = re.data.data.payPwd;
          _this.authStatus = re.data.data.authStatus;
          _this.avatar = process.env.SHOW_IMAGE+'?path='+re.data.data.headImage + '&sessionId='+_this.$store.getters.token;
        }else {
          _this.mobileNumber  =""
          _this.realName      =""
          _this.idCardNo      =""
          _this.bankName      =""
          _this.bankCardNo    =""
          _this.bankCode      =""
          _this.payPwd        =""
          _this.authStatus    =""
          _this.avatar        =""
          _this.$message(re.data.message);
        }
      }).catch(function (re) {});
    },
    handleAvatarSuccess(response, file,fileList){
      console.log(response,file,fileList)
      let _re = response,_this = this;
      _this.$axios.post('/api-user/users/uploadHeadImage', {headImage:_re.data['filePath']}).then(function (re) {
        if(re.data.code==0){
          _this.avatar = process.env.SHOW_IMAGE+'?path='+_re.data['filePath'] + '&sessionId='+_this.$store.getters.token;
          _this.$store.dispatch("setHeadImage",_this.avatar);
          fileList = [];
          // this.$message({type: 'success',message: ''});
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {});
    },
    handleEditCard(){
      let _this = this;
      // 完成的情况
      if(!_this.canEditCard){
          const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
          _this.$axios.post('/api-user/user/updateUserBankInfo', {'userId':_this.$store.getters.userUuid,bankCode:_this.bankCode,bankNumberNo:_this.bankCardNo,bankHolderName:_this.realName,payPwd:_this.payPwd}).then(function (re) {
              loading.close();
              if(re.data.code==0){
                _this.canEditCard = !_this.canEditCard;
                _this.$message({type: 'success',message: 'success'});
              }else {
                _this.$message(re.data.message);
              }
            }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
      }else{
            _this.canEditCard = !_this.canEditCard;
      }
    },
    handleReset(){
      let _this = this;
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('/api-system/system/sendSmsCode', {
          "mobileNumber": _this.mobileNumber,
          "smsType": "PASSWORD_REST"
      }).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.$router.push('/center/reset')
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {});
    },
    deActivate(){
     this.deactivateDialogVisible=true;
    },deActivateDialogSubmit(){
      this.deactivateDialogLoading=true;
       this.$axios.post('/api-user/user/deactivate', {'userId':this.$store.getters.userUuid}).then((re)=> {
         this.deactivateDialogLoading=false;
        if(re.data.code==0){
          console.log('lewat sini')
          this.bindInit();
          this.deactivateDialogVisible=false;

       }else {
          this.$message(re.data.message);
        }
      }).catch((re)=> {});
      // this.deactivateDialogVisible=false
    }
  }
}
</script>
<style scoped>
  .deactivate{
    padding: 20px;
    text-align: left;
  }
  .deactivate_button{
    background: red;
    width: 120px;
    border-radius: 5px;
    padding: 10px;
    color: white;
  }
  .setting_box{
    padding-left: 20px;
    text-align: left;
    color: #164276;
    font-size: 16px;
    padding-top: 30px;
  }
  .setting_txt{
    width:389px;
    height:36px;
    font-size: 12px;
    padding-left: 12px;
    line-height: 36px;
    border-radius:2px;
    border:1px solid rgba(212,219,225,1);
    margin: 15px 0 26px;
  }
  .edit_btn{
    color: #00D6C9;
    margin: 26px 0 0 16px;
    cursor: pointer;
  }
  .upload_header_box{
    margin-left: 85px;
  }
  .upload_header_box img{
    border-radius: 50%;
    margin: 31px 0 0 63px;
  }
  .upload_header_box .el-button--primary{
    width: 208px;
    height: 40px;
    margin-left: 23px;
    margin-top: 33px;
    font-size: 16px;
  }

</style>
<style>
.setting_txt .el-input__inner{
    border: none;
    padding: 0;
    height: 36px;
    line-height: 36px;
  }
  .setting_txt .el-input.is-disabled .el-input__inner{
    background-color: #fff;
  }
</style>
