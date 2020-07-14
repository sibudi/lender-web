<template>
  <div class="m_60">
    <div class="payment_box">
      <div class="payment-title">Silakan masukkan password transaksi</div>
      <el-row class="text-middle pt_30" >
        <el-col :span="8"  >
          <div >Jumlah Transaksi</div> 
        </el-col>
        <el-col :span="16">
          <div style="font-size:38px;color:#00D6C9;">Rp {{$globals.dataUtil.parseNumber(needPay)}}</div>
        </el-col>
      </el-row>
      <el-row class="text-middle pt_30">
        <el-col :span="8">
          <div>Password Transaksi</div>
        </el-col>
        <el-col :span="8">
          <el-input
            style="width:auto"
            type="password"
            v-model="payPwd"
            show-password
            placeholder="Password Transaksi"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <!-- Lupa password Anda -->
          <p @click="handleReset" style="cursor:pointer;color: #00D6C9;padding-left:15px">Lupa password Anda</p>
        </el-col>
      </el-row>
      <!-- <div class="sub_btn" @click="handleSubmit">Pendanaan Sekarang</div> -->
    </div>

    <div class="payment_topay_bar">
      <div class="payment_topay_con df aic">
        <div class="payment_next_count f1">
          <p>
            Jumlah total
            <span
              class="payment_next_color"
            >Rp {{$globals.dataUtil.parseNumber(totalAmount)}}</span>
          </p>
          <p>
            Jumlah yang tersedia
            <span>Rp {{$globals.dataUtil.parseNumber(currentBalance)}}</span>
          </p>
        </div>
        <!-- @click="handlePay" -->
        <div class="payment_next_btn df aic" @click="handleSubmit">
          <span>Pendanaan Sekarang</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../assets/css/element.css";
import bank from "../../../assets/js/bank.json.js";
export default {
  // untuk terima props dari parent
  props: ["currentBalance", "nextStep", "totalAmount", "paymentID"],
  data() {
    return {
      showpay: false,
      options: [],
      bankTxt: [],
      bankTips: [],
      selectedOptions: [],
      payInfo: {},
      needPwd: false,
      needPay: 0,
      amountPay: 0,
      orderAmount: 0,
      paymentCode: 0,
      payPwd: "",
      timestamp: 0,
      bank: "",
      mobileNumber: "",
      format: "00:00:00"
    };
  },
  mounted() {
    this.mobileNumber = this.$store.getters.currentUser
    this.bankTxt = bank.bankTxt;
    this.bindData();
  },
  methods: {
    doNext() {
      this.nextStep();
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
    countdowm(timestamp) {
      console.log(timestamp);
      let that = this;
      let timer = setInterval(function() {
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
          that.format = hour + ":" + min + ":" + sec;
          // timestamp = timestamp - 1000;
        } else {
          clearInterval(timer);
          that.format = "00:00:00";
        }
      }, 1000);
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
        orderNo: _this.paymentID
      }
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('/api-order/order/checkPayPWD', _data).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.$message({type:'success',message:'Anda berhasil melakukan pendanaan'});
          // setTimeout(()=>{_this.$router.push("./Scattered");}, 1000);
          _this.doNext();
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    },
    bindData() {
      let _this = this;
      let _data = { orderNo: _this.paymentID };
      _this.$axios
        .post("/api-order/order/orderPay", _data)
        .then(function(re) {
          if (re.data.code == 0) {
            _this.showpay = true;
            _this.needPwd = re.data.data.needPwd;
            _this.needPay = re.data.data.needPay ? re.data.data.needPay : 0;
            _this.amountPay = re.data.data.amountPay;
            _this.orderAmount = re.data.data.orderAmount;
            _this.paymentCode = re.data.data.paymentCode;
            _this.timestamp = re.data.data.timestamp;
            _this.bank = re.data.data.bankCode;
            bank.jsonBank.forEach(v => {
              if (v.label == _this.bank) {
                _this.options.push(v);
                _this.selectedOptions = [v.label, "ATM"];
              }
            });
            _this.bankTxt.forEach(v => {
              if (_this.bank + "/ATM" == v.code) {
                _this.bankTips = v.list;
              }
            });

            if (!_this.needPwd) {
              _this.countdowm(re.data.data.timestamp);
            }
          } else {
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {});
    }
  }
};
</script>
<style>
.pt_30{
  padding-top: 30px;
}
.sub_btn{
   width:240px;
    height:40px;
    background:rgba(42,210,200,1);
    box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
    border-radius:5px;
    line-height: 40px;
    color: #fff;
    margin: 20px auto 0px;
    cursor: pointer;
    text-align: center;
}
.text-middle{
  display:flex;
  justify-content: middle;
  align-items: center;
  padding-left: 12px;
}
.payment-title {
  font-size: 24px;
  color: #164276;
}
.payment_box {
  margin: auto;
  border: 1px solid rgba(212, 219, 225, 1);
  padding: 20px;
  width: 600px;
}
.text-center {
  text-align: center;
}
.m_60 {
  margin-top: 60px;
  margin-bottom: 60px;
}
.order_box {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  text-align: left;
}
.order_table {
  width: 1004px;
  min-height: 944px;
  padding: 0px 10px 46px;
  margin: 20px auto 50px;
}

.table_box {
  /*width:890px;*/
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  margin-bottom: 16px;
  padding: 15px 10px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(22, 66, 118, 1);
  cursor: pointer;
  margin-left: 25px;
}
.table_box .first_li {
  width: 180px;
}
.table_item_tit {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(87, 104, 119, 1);
  /* height: 30px; */
  text-align: center;
}
.payment_next_count{
  margin-right: 20px;
}

.payment_next_btn {
  /* width: 150px; */
  /* height: 60px; */
  background: rgba(42, 210, 200, 1);
  box-shadow: 0px 4px 4px 0px rgba(211, 211, 211, 0.5);
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  margin-right: 20px;
  margin-left: 20px;
  cursor: pointer;
  padding: 20px 20px;
}
.payment_topay_bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  /* min-width: 1200px; */
  height: 100px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  color: #164276;
  font-weight: 500;
  /* overflow: auto; */
}
.payment_topay_con {
  /* width: 1150px; */
  height: 100%;
  margin: 0 auto;
  padding-left: 50px;
  text-align: right;
  /*background-color: #ff0*/
}

.payment_next_color{
    font-size: 20px;
  color: #00d6c9;
}

.payment_next_count{
  font-size: 18px;
}
</style>