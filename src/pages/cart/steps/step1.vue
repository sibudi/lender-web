<template>
  <div class="m_20">
    <div v-for="(item) in tableData" class="df aic ele_check" :key="item.goodsId">
      <!-- <el-checkbox-group v-model="item.checked" @change="handleCheckedChange(item)">
        <el-checkbox></el-checkbox>
      </el-checkbox-group>-->
      <ul class="df table_box jcsb f1">
        <li>
          <p class="table_item_tit">Order</p>
          <p class="text-center list-detail">{{item.goodsId}}</p>
        </li>
        <li style="wrap-text:break-word;width:180px">
          <p class="table_item_tit">Tujuan Pinjaman</p>

          <p class="text-center list-detail">{{item.borrowingPurposes}}</p>
        </li>
        <li>
          <p class="table_item_tit">Jumlah pinjaman</p>
          <p class="list-detail">Rp {{$globals.dataUtil.parseNumber(item.totalAmount)}}</p>
        </li>
        <li>
          <p class="table_item_tit">Asuransi</p>
          <p class="list-detail">Rp {{$globals.dataUtil.parseNumber(item.insurance)}}</p>
        </li>
        <li style="wrap-text:break-word;width:100px">
          <p class="table_item_tit">Batas Waktu Pinjaman</p>
          <p class="text-center list-detail">{{item.term}}</p>
        </li>
        <li>
          <p class="table_item_tit" style="wrap-text:break-word;width:100px">Tingkat pengembalian</p>
          <p class="text-center list-detail">{{$globals.dataUtil.parseNumber(item.yearRateFin)}}%</p>
        </li>
        <li>
          <p class="table_item_tit">Progress</p>
          <p class="text-center list-detail">{{item.percentage}}%</p>
        </li>
        <li>
          <p class="table_item_tit">Step Terakhir</p>
          <p class="text-center list-detail" v-if="item.status==1">Keranjang</p>
          <p class="text-center list-detail" v-else-if="item.status==20">Menyiapkan Dokumen</p>
          <p class="text-center list-detail" v-else-if="item.status==21">TTD Digital</p>
          <p class="text-center list-detail" v-else-if="item.status==22">Pendanaan</p>
        </li>
      </ul>
    </div>
    <!-- v-if="tableData.length>=0" -->
    <div class="payment_topay_bar" v-if="tableData.length">
      <div class="payment_topay_con df aic">
        <!-- <div class="payment_next_left df aic" @click="handleBuyAll">
        <p class="cirlcle" :class="allIn?'active':''"></p>
        <span>Sisa Pembelian</span>
        </div>-->
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
  props: [
    "currentBalance",
    "nextStep",
    "totalAmount",
    "setTotalAmount",
    "setOrder",
    "setPaymentId",
    "tableData"
  ],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    doNext() {
      if (this.totalAmount) {
        this.handlePay();
      } else {
        this.$message("Silahkan pilih order untuk meneruskan");
      }
    },
    handlePay() {
      let _this = this;
      let _amount = 0;
      _this.tableData.forEach(v => {
        _amount += parseFloat(v.insurance) + parseFloat(v.totalAmount);
        // *( v.count /100)
      });
      let _data = {
        userUuid: _this.$store.getters.userUuid,
        allIn: false,
        amount: _amount
      };
      const loading = _this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      _this.$axios
        .post("/api-order/order/orderSubmit", _data)
        .then(function(re) {
          loading.close();
          if (re.data.code == 0) {
            if (re.data.data.tip) {
              _this.$message({
                type: "warning",
                message:
                  "Bagian ini sudah dibeli oleh nasabah lain, Silahkan anda membeli kembali, dan optimalkan jumlah pembelian"
              });
            }
            _this.nextStep();
            _this.setTotalAmount(_this.totalAmount);
            _this.setPaymentId(re.data.data.orderNo);
          } else if (re.data.code == 10001 || re.data.code == 10002) {
            _this.$message({ type: "warning", message: re.data.message });
            setTimeout(() => {
              _this.$router.push("/authentication");
            }, 1000);
          } else {
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {
          setTimeout(() => {
            loading.close();
          }, 1000);
        });
    }
    // handleCheckedChange(item) {
    //   //amount baris yg tersisa utk di bayar kan
    //   var amountRow =
    //     ((parseFloat(item.insurance) + parseFloat(item.totalAmount)) *
    //       parseFloat(item.count)) /
    //     100;
    //   if (item.checked && amountRow) {
    //     //check balance enough
    //     if (this.totalAmount + amountRow <= this.currentBalance) {
    //       this.totalAmount += amountRow;
    //     } else {
    //       item.checked = false;
    //       this.$message("Saldo tidak cukup");
    //     }
    //   } else {
    //     if (!amountRow) {
    //       item.checked = false;
    //     }
    //     this.totalAmount -= amountRow;
    //   }
    // },
  }
};
</script>
<style>
.list-detail {
  padding-top: 10px;
  font-size: 18px;
}
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
  font-size: 14px !important;
  font-weight: 500;
  color: rgba(22, 66, 118, 1);
}
.table_box .first_li {
  width: 180px;
}
.table_item_tit {
  height: 32px;
  font-size: 14px;
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