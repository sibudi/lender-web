<template>
  <div class="mt_100">
    <div class="step" v-if="tableData.length">
      <el-steps :active="step" align-center>
        <el-step title="Keranjang"></el-step>
        <el-step title="Menyiapkan Dokumen"></el-step>
        <el-step title="TTD Digital"></el-step>
        <el-step title="Pendanaan"></el-step>
        <el-step title="Selesai"></el-step>
      </el-steps>
      <step1
        v-if="step==0"
        :currentBalance="currentBalance"
        :nextStep="nextStep"
        :totalAmount="totalAmount"
        :setTotalAmount="setTotalAmount"
        :setPaymentId="setPaymentId"
        :tableData="tableData"
      />
      <step2
        v-else-if="step==1"
        :currentBalance="currentBalance"
        :nextStep="nextStep"
        :totalAmount="totalAmount"
        :skipStep="skipStep"
        :orderID="orderID"
      />
      <step3
        v-else-if="step==2"
        :currentBalance="currentBalance"
        :nextStep="nextStep"
        :totalAmount="totalAmount"
        :orderID="orderID"
      />
      <step4
        v-else-if="step==3"
        :currentBalance="currentBalance"
        :nextStep="nextStep"
        :totalAmount="totalAmount"
        :paymentID="paymentID"
      />
      <step5
        v-else-if="step==4"
        :currentBalance="currentBalance"
        :nextStep="nextStep"
        :totalAmount="totalAmount"
      />
    </div>
     <div class="step cart-null" v-else>
       Tidak ada Pendanaan
     </div>
  </div>
</template>
<script>
import "../../assets/css/element.css";
import step1 from "./steps/step1.vue";
import step2 from "./steps/step2.vue";
import step3 from "./steps/step3.vue";
import step4 from "./steps/step4.vue";
import step5 from "./steps/step5.vue";
export default {
  components: {
    step1,
    step2,
    step3,
    step4,
    step5
  },
  data() {
    return {
      step: 0,
      currentBalance: 0,
      totalAmount: 0, //total amount didapat dari step 1, perlu crosschek apabila step 2 ada perubahan amount ini tidak bisa di pakai
      orderID: [],
      paymentID: "",
      tableData: [],
      orderID: []
    };
  },
  mounted() {
    this.selectUserAccount();
    this.bindData();
  },
  methods: {
    setTotalAmount(x) {
      this.totalAmount = x;
    },
    setPaymentId(x) {
      this.paymentID = x;
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
        .post("api-order/shoppingCart/getList", {
          userId: _this.$store.getters.userUuid
        })
        .then(function(re) {
          loading.close();
          if (re.data.code == 0) {
            _this.tableData = re.data.data;
            _this.tableData.forEach(v => {
              if (v.status !== 22) {
                _this.orderID.push(v.goodsId);
              }
              _this.totalAmount +=
                parseFloat(v.insurance) + parseFloat(v.totalAmount);
              // * ( v.count / 100)
              // v.checked = false;
              v.yearRateFin = parseFloat(v.yearRateFin * 100).toFixed(2);
              if (v.term.endsWith("d")) {
                v.term = v.term.substring(0, v.term.length - 1) + " Hari";
              } else if (v.term.endsWith("w")) {
                v.term = v.term.substring(0, v.term.length - 1) + " Minggu";
              } else if (v.term.endsWith("m")) {
                v.term = v.term.substring(0, v.term.length - 1) + " Bulan";
              }
              v.percentage = parseFloat(
                (
                  (parseFloat(v.laveAmount) / parseFloat(v.totalAmount)) *
                  100
                ).toFixed(2)
              );
            });
            // _this.handleCount();
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
    selectUserAccount() {
      let _this = this;
      _this.$axios
        .post("api-user/user/selectUserAccount", {
          userId: _this.$store.getters.userUuid
        })
        .then(function(re) {
          if (re.data.code == 0) {
            _this.currentBalance = re.data.data.currentBalance;
          } else {
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {});
    },
    nextStep() {
      this.step += 1;
    },
    skipStep() {
      this.step += 2;
    }
  },
  updated() {}
};
</script>
<style>
.cart-null{
  text-align: center!important;
  padding: 80px!important;
  font-size: 30px;
}
.mt_100 {
  margin-top: 100px;
  width: 100%;
  margin-bottom: 120px;
  /* padding: 0px 10px 46px;
  margin: 20px auto 50px; */
}

.step {
  text-align: left;
  margin: 20px auto;
  width: 1000px;
  padding: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(212, 219, 225, 1);
}
</style>