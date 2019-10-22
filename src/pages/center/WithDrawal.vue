<i18n>
  {

  }
</i18n>
<template>
<div>
      <!-- 基本设置 -->
  <div class="center_tit">Penarikan</div>

  <div class="drawal_tit_box">
    <div class="drawal_tit">Jumlah penarikan tunai</div>
    <div class="drawal_amount">Rp {{$globals.dataUtil.parseNumber(currentBalance)}}</div>
  </div>

  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="drawal_form">
      <el-form-item label="Informasi Kartu Bank" prop="bankNumberNo">
        <el-input v-model="ruleForm.bankNumberNo" class="form_width" disabled></el-input>
      </el-form-item>
      <el-form-item label="Jumlah penarikan tunai" prop="amount">
        <el-input v-model="ruleForm.amount" class="form_width"></el-input>
        <span class="colC9 handle_all"  @click="handleAll" >Penarikan penuh</span>
      </el-form-item>
      <el-form-item label="Password Transaksi" prop="passWord">
        <el-input v-model="ruleForm.passWord" class="form_width" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="onSubmit" class="formsub_btn"  :disabled="loadingbtn" :loading="loadingbtn">Ajukan</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="drawal_tips_box">
    Pengingat
    <p style="margin-top: 15px;line-height: 26px;">Biaya penarikan: 0.00%. Saat ini perusahaan tidak memberikan biaya penarikan. Biaya penarikan sewaktu-waktu akan berubah disesuaikan dengan situasi perusahaan. Kami mohon maaf untuk hal ini. <br>
Perkiraan waktu: T+3 hari kerja, karena adanya ketidakpastian waktu dari bank maka waktu yang diperkirakan adalah T+3 hari kerja. Sekali lagi, mohon maaf atas ketidaknyamanannya karena perkiraan waktu tergantung pada bank.</p>
  </div>


  <div class="with_alert_bg" v-if="showBox">
      <div  class="with_alert_box">
        <div><i class="el-icon-error colC9 close_btn" @click="goback"></i></div>
        <div class=""><img src="../../assets/images/with_icon.png" height="124" width="110" class="with_drawl_icon"></div>
        <div class="hoem_alter_amount" style="font-size: 24px;">Penerapan berhasil</div>
        <div class="home_alert_check" style="font-size: 18px;color:#576877;margin: 18px 0 50px;">Diharapkan cair dalam 3 hari kerja</div>
        <div class="df"><p>Akun pembayaran</p><p>{{companyBankCarkNo}}</p></div>
        <div class="df"><p>Akun pembayaran</p><p>{{ruleForm.bankNumberNo}}</p></div>
<!--         <div class="df"><p>收款人姓名</p><p>吴加号</p></div>
        <div class="df"><p>转账金额</p><p>Rp5,000,000</p></div> -->
      </div>
      
    </div>

        
</div>

</template>
<script>
import '../../assets/css/element.css';
export default{
  data(){
    return {
      showBox:false,
      loadingbtn:false,
      companyBankCarkNo:"",
      currentBalance:0,
      ruleForm:{
        bankNumberNo:'',
        amount:'',
        passWord:''
      },
      rules:{
        amount: [
          { required: true, message: 'Silakan masukkan jumlah uang tunai', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: 'Silakan masukkan password transaksi', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted(){
  },
  created(){
    this.init();
  },
  destroyed(){
  },
  methods: {
    goback(){
      this.showBox = false;
    },
    init(){
      let _this = this;
      _this.$axios.post('/api-user/user/userBankAndAccountInfo', {'userUuid':_this.$store.getters.userUuid}).then(function (re) {
        if(re.data.code==0){
          _this.currentBalance = re.data.data.currentBalance;
          _this.ruleForm.bankNumberNo = re.data.data.bankCarkNo;
          _this.companyBankCarkNo = re.data.data.companyBankCarkNo;
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {});
    },
    handleAll(){
      this.ruleForm.amount = this.currentBalance;
    },
    onSubmit(){
      let _this = this;
      _this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let _data = {
              amount: _this.ruleForm.amount,
              bankNumberNo: _this.ruleForm.bankNumberNo,
              passWord: _this.ruleForm.passWord,
              userId: _this.$store.getters.userUuid
            }
            const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
            _this.$axios.post('api-user/user/withdrawDeposit', _data).then(function (re) {
              loading.close();
              if(re.data.code==0){
                _this.showBox = true;
                _this.$message({type: 'success',message: 'success'});
              }else {
                _this.$message(re.data.message);
              }
            }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});

          } else {return false;}
      });
    }
  }
}
</script>
<style scoped>
.with_alert_bg{
    position: fixed;
    background:rgba(87,104,119,0.745);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 3;
}
.with_alert_box{
    width:644px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(212,219,225,1);
    position: absolute;
    top: 200px;
    left: 50%;
    border-radius: 4px;
    margin-left: -339px;
    margin-bottom: 80px;
    color: #164276;
    font-size: 18px;
    padding-bottom: 40px;
}
  .with_alert_box .close_btn{
    font-size: 30px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .with_alert_box .with_drawl_icon{
    margin: 80px auto 30px;
  }
  .with_alert_box .df{
    margin-bottom: 30px;
  }
  .with_alert_box .df p:nth-child(1){
    font-size: 16px;
    margin-right: 20px;
    text-align: right;
    width: 300px;
  }
  .drawal_tit_box{
    text-align: left;
    padding-top: 52px;
  }

  .drawal_tit{
    font-size: 18px;
    color: #164276;
    position: relative;
    margin-left: 240px;
  }
  .drawal_tit:before{
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background-color: #00D6C9;
    top: 8px;
    left: -16px;
  }
  .drawal_amount{
    font-size:38px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,214,201,1);
    padding: 40px 0 50px 300px;
  }
  .drawal_form{
    margin-left: 46px;
    text-align: left;
    color: #164276;
  }
  .drawal_form .form_width{
    width: 401px;
    margin-right: 16px;
  }
  .drawal_form .handle_all{
    cursor: pointer;
    display: inline-block;
    height: 100%;
  }
  .formsub_btn{
    width:240px;
    height:40px;
    background:rgba(42,210,200,1);
    box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
    border-radius:5px;
    color: #fff;
    font-size: 16px;
    margin: 28px 0 20px 81px;
  }
  .drawal_tips_box{
    width:627px;
    height:205px;
    background:rgba(255,255,255,1);
    border-radius:2px;
    border:1px solid rgba(42,210,200,1);
    color: #2AD2C8;
    line-height: 16px;
    margin-left: 70px;
    text-align: left;
    padding: 20px 22px;
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
