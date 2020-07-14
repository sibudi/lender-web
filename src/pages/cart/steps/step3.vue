<template>
  <div class="m_20">
    <div class="df aic ele_check">
      <iframe
        @load="onLoad"
        v-if="digiSignUrl"
        :src="digiSignUrl"
        width="800px"
        height="400px"
        style="margin:auto"
      />
      <div
        v-else-if="!digiSignUrl && digiSignError"
        style="margin:30px auto; font-size:16px;color:rgba(22, 66, 118, 1);"
      >{{digiSignError}}</div>
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
        <div class="payment_next_btn df aic" @click="doNext">
          <!-- <img src="../../../assets/images/pay_icon.png" height="26" width="28" /> -->
          <span>Selanjutnya</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../assets/css/element.css";
export default {
  // untuk terima props dari parent
  props: ["currentBalance", "nextStep", "totalAmount", "orderID"],
  data() {
    return {
      digiSignUrl: "",
      digiSignError: ""
    };
  },
  mounted() {
    // console.log(this.orderID)
    this.bindData();
  },
  methods: {
    onLoad() {
      this
        .$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        })
        .close();
    },
    doNext() {
      // this.nextStep();
      let _this = this;
      const loading = _this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      _this.$axios
        .post("api-order/order/checkDigisign", {
          userId: _this.$store.getters.userUuid,
          orders: this.orderID
        })
        .then(function(re) {
          console.log(re);
          loading.close();
          if (re.data.code == 0) {
            // _this.handleCount();
            _this.nextStep();
          } else if (re.data.code == 10011) {
            _this.$message.warning(
              "Silahkan menunggu proses menyiapkan dokumen selesai "
            );
          } else {
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {
          setTimeout(() => {
            loading.close();
          }, 1000);
        });
    },
    bindData() {
      let _this = this;
      const loading = _this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      _this.$axios
        .post("api-order/order/signOrder", {
          userId: _this.$store.getters.userUuid,
          orders: this.orderID
          // orders: ["0120052712tes104599", "0120052712tes204599"]
        })
        .then(function(re) {
          // loading.close();
          if (re.data.code == 0) {
            _this.digiSignUrl = re.data.data;
            // _this.handleCount();
          } else if (
            re.data.code == 10015 ||
            re.data.code == 10016 ||
            re.data.code == 10011
          ) {
            loading.close();
            _this.$message(re.data.message);
            _this.digiSignError = re.data.message;
          } else {
            loading.close();
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {
          setTimeout(() => {
            loading.close();
          }, 1000);
        });
    }
  }
};
</script>
<style>
.text-center {
  text-align: center;
}
.m_20 {
  margin-top: 20px;
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

.payment_next_color {
  font-size: 20px;
  color: #00d6c9;
}

.payment_next_count {
  font-size: 18px;
}
</style>