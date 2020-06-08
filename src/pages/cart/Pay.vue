<i18n>
  {
    "zh-cn":{
    },
    "en":{
      "favor":"favor"
    }
  }
</i18n>
<template>
<div class="pay_con">
  <div class="pay_box" v-if="!needPwd&&showpay">
    <div><i class="el-icon-error colC9 close_btn" @click="goback"></i></div>
    <div class="count_down">{{format}}</div>
    <div class="pay_main">
      <div class="df aic"><p class="pay_tit">Total Nominal</p><p style="font-size: 38px;color#00D6C9;">Rp {{$globals.dataUtil.parseNumber(orderAmount)}}</p></div>
      <div class="df aic"><p class="pay_tit">Nominal yang dapat digunakan</p><p style="font-size: 18px;">Rp {{$globals.dataUtil.parseNumber(amountPay)}} (Sudah digunakan)</p></div>
      <div class="df aic"><p class="pay_tit">Harus dibayarkan</p><p style="font-size: 28px;color#00D6C9;">Rp {{$globals.dataUtil.parseNumber(needPay)}}</p></div>
      <div class="df aic"><p class="pay_tit">Akun virtual</p><p style="font-size: 28px;">{{paymentCode}}</p></div>
      <div class="df aic">
        <p class="pay_tit">Pilih metode pembayaran</p>
        <p><el-cascader :options="options" v-model="selectedOptions" class="form_item_wd form_select" @change="handleChange"></el-cascader></p>
      </div>
      <div class="df" style="margin-top: 30px;">
        <p class="pay_tit">Instruksi Pembayaran</p>
        <div><p v-for="item in bankTips" style="line-height: 24px;">{{item}}</p></div>
      </div>
      <div class="order_detail" @click="goDetail">Detail pesanan</div>
    </div>
  </div>

  <div class="pay_box pass_box" v-if="needPwd&&showpay">
    <div><i class="el-icon-error colC9 close_btn"  @click="goback"></i></div>
    <div class="pass_box_tit">Silakan masukkan password transaksi</div>
    <div class="df aic"><p class="pay_tit">Jumlah transaksi</p><p style="font-size:38px;color:#00D6C9;">Rp {{$globals.dataUtil.parseNumber(needPay)}}</p></div>
    <div class="df aic" style="margin: 40px 0 60px;">
      <p class="pay_tit">Password Transaksi</p>
      <div class='df aic'>
        <p class='settings_txt'><el-input type="password" v-model="payPwd" show-password placeholder="Password Transaksi"></el-input></p>
        <p class='colC9' @click='handleReset' style="cursor:pointer;">Lupa password Anda</p>
      </div>
    </div>
    <div class="sub_btn" @click="handleSubmit">Ajukan</div>
  </div>
</div>
</template>
<script>
import '../../assets/css/element.css';
import bank from '../../assets/js/bank.json.js';
export default{
  data(){
    return {
      uuid:'',
      showpay: false,
      options: [],
      bankTxt:[],
      bankTips:[],
      selectedOptions:[],
      payInfo:{},
      needPwd: false,
      needPay:0,
      amountPay:0,
      orderAmount:0,
      paymentCode:0,
      payPwd:'',
      timestamp:0,
      bank:'',
      mobileNumber: '',
      format: '00:00:00'
    }
  },
  async mounted(){
  },
  created(){
    this.mobileNumber = this.$store.getters.currentUser
    // this.options = bank.jsonBank;
    this.bankTxt = bank.bankTxt;
    if(this.$route.query&&this.$route.query['uid']){
      this.uuid = this.$route.query['uid'];
      this.bindData();
    }
  },
  destroyed(){
  },
  methods: {
  countdowm(timestamp) {
    console.log(timestamp)
    let that = this;
    let timer = setInterval(function () {
      let nowTime = new Date();
      let endTime = new Date(timestamp);
      // let t = endTime.getTime() - nowTime.getTime();
      let t = timestamp - nowTime.getTime();
      if (t > 0) {
        let hour = Math.floor((t / 3600000) % 24);
        let min = Math.floor((t / 60000) % 60);
        let sec = Math.floor((t / 1000) % 60);
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        that.format = hour + ':' + min + ':' + sec
        // timestamp = timestamp - 1000;
      } else {
        clearInterval(timer);
        that.format = '00:00:00'
      }
    }, 1000);
  },
    goback(){
      let _this = this;
      let _data = {orderNo: _this.uuid}
      _this.$axios.post('/api-order/order/failOrder/' + _this.uuid, _data).then(function (re) {
        if(re.data.code==0){
          _this.$router.go(-1);
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {});
    },
    goDetail(){
      this.$router.push('/center/records');
    },
    bindData(){
      let _this = this;
      let _data = {orderNo: _this.uuid}
      _this.$axios.post('/api-order/order/orderPay', _data).then(function (re) {
        if(re.data.code==0){
          _this.showpay = true;
          _this.needPwd = re.data.data.needPwd;
          _this.needPay = re.data.data.needPay;
          _this.amountPay = re.data.data.amountPay;
          _this.orderAmount = re.data.data.orderAmount;
          _this.paymentCode = re.data.data.paymentCode;
          _this.timestamp = re.data.data.timestamp;
          _this.bank = re.data.data.bankCode;
          bank.jsonBank.forEach(v =>{
            if(v.label == _this.bank){
              _this.options.push(v);
              _this.selectedOptions = [v.label,'ATM']
            }
          })
          _this.bankTxt.forEach(v=>{
            if(_this.bank+'/ATM' == v.code){
              _this.bankTips = v.list;
            }
          })

          if(!_this.needPwd){
            _this.countdowm(re.data.data.timestamp)
          }
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {});
    },
    handleChange(e){
      let _this = this;
      let _tmp = e[0]+'/'+e[1]
      _this.bankTxt.forEach(v=>{
        if(_tmp == v.code){
          _this.bankTips = v.list;
          return;
        }
      })
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
    handleSubmit(){
      let _this = this;
      if(_this.payPwd == ''){
        _this.$message({type:'warning',message:'Silakan masukkan password transaksi'});
        return;
      }
      let _data = {
        payPWD: _this.payPwd,
        userUuid: _this.$store.getters.userUuid,
        orderNo: _this.uuid
      }
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('/api-order/order/checkPayPWD', _data).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.$message({type:'success',message:'Anda berhasil melakukan pendanaan'});
          setTimeout(()=>{_this.$router.push("./Scattered");}, 1000);
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    }
  }
}
</script>
<style scoped>
  .pay_con{
    position: fixed;
    background:rgba(87,104,119,0.745);
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
  .pay_box{
    width:740px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(212,219,225,1);
    position: absolute;
    top: 80px;
    left: 50%;
    margin-left: -370px;
    margin-bottom: 80px;
  }
  .pass_box.pay_box{
    width: 678px;
  }
  .pay_box .close_btn{
    font-size: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .pay_box .count_down{
/*    width:110px;
    height:110px;
    background:rgba(0,214,201,1);*/
    font-size: 38px;
    color: rgba(0,214,201,1);
    border-radius: 50%;
    line-height: 110px;
    text-align: center;
    position: relative;
    margin: 50px auto 20px;
  }
  .pay_box .count_down:before{
    position: absolute;
    content: " ";
    width: 94px;
    height: 94px;
    border: 1px solid #fff;
    border-radius: 50%;
    left: 7px;
    top: 7px;
  }
  .pay_box .pay_main{
    text-align: left;
    padding-left: 20px;
    padding-right: 46px;
    font-size: 16px;
    color: #164276;
  }
  .pay_box .pay_tit{
    text-align: right;
    margin-right: 20px;
    min-width: 220px;
  }
  .pay_box .pay_main .df{
    margin-bottom: 15px;
  }
  .pay_box .order_detail{
    text-align: right;
    color: #00D6C9;
    cursor: pointer;
    margin-top: 50px;
    margin-bottom: 31px;
    cursor: pointer;
  }
  .pay_box .form_item_wd{
    width: 260px
  }
  .pass_box{
    font-size: 16px;
  }
  .pass_box_tit{
    font-size: 24px;
    color: #164276;
    text-align: left;
    margin: 90px 0 40px 60px;
  }
  .pay_box.pass_box .pay_tit{
    margin-left: 58px;
    min-width: 100px;
  }
  .pass_box .settings_txt{
    width: 260px;
    background: #fff;
    margin-right: 12px;
  }
  .pass_box .sub_btn{
    width:240px;
    height:40px;
    background:rgba(42,210,200,1);
    box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
    border-radius:5px;
    line-height: 40px;
    color: #fff;
    margin: 0 auto 80px;
    cursor: pointer;
  }
</style>
