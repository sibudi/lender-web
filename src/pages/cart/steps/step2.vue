<template>
  <div class="m_20">
    <div v-for="(item) in tableData" class="df aic ele_check" :key="item.goodsId">
      <ul class="df table_box jcsb f1">
        <li>
          <p class="table_item_tit">Order</p>
          <p class="text-center list-detail">{{item.goodsId}}</p>
        </li>
        <li style="wrap-text:break-word;width:180px">
          <p class="table_item_tit">Tujuan Pinjaman</p>
          <p class="text-center list-detail">{{item.borrowingPurposes}}</p>
        </li>
        <li >
          <p class="table_item_tit">Jumlah pinjaman</p>
          <p class="list-detail">Rp {{$globals.dataUtil.parseNumber(item.totalAmount)}}</p>
        </li>
        <li>
          <p class="table_item_tit">Asuransi</p>
          <p class="list-detail">Rp {{$globals.dataUtil.parseNumber(item.insurance)}}</p>
        </li>
        <li  style="wrap-text:break-word;width:100px">
          <p class="table_item_tit">Batas Waktu Pinjaman</p>
          <p class="text-center list-detail">{{item.term}}</p>
        </li>
        <!-- <li  style="wrap-text:break-word;width:100px">
          <p class="table_item_tit">Tingkat pengembalian</p>
          <p class="text-center list-detail">{{$globals.dataUtil.parseNumber(item.yearRateFin)}}%</p>
        </li>
        <li>
          <p class="table_item_tit">Progress</p>
          <p class="text-center list-detail">{{item.percentage}}%</p>
        </li> -->
        <li>
          <div style="display:inline-block;">
            <el-progress
              type="circle"
              :percentage="item.uploadProgress"
              v-if="item.uploadProgress<100 &&item.uploadStatus==''"
              :width="33"
            ></el-progress>
            <el-progress
              type="circle"
              :percentage="item.uploadProgress"
              v-else-if="item.uploadProgress==100 && item.uploadStatus=='success'"
              status="success"
              :width="33"
            ></el-progress>
            <el-progress
              type="circle"
              :percentage="item.uploadProgress"
              v-else-if=" item.uploadStatus=='failed'"
              status="exception"
              :width="33"
            ></el-progress>
          </div>

          <div
            style="wrap-text:break-word;width:80px;display:inline-block;text-align:center;"
          >Menyiapkan Dokumen</div>
          <!-- <p class="table_item_tit">Step Terakhir</p>
          <p class="text-center">Testtest Test</p>-->
        </li>
      </ul>
     <div style="display:none">{{progress}}</div>
    </div>

    <!-- v-if="tableData.length>=0" -->
    <div class="payment_topay_bar">
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
  props: ["currentBalance", "nextStep", "totalAmount", "orderID", "skipStep"],
  data() {
    return {
      tableData: [],
      progress:0
    };
  },
  mounted() {
    this.bindData();
  },
  methods: {
    doNext() {
      var _cekUploadDocument = true;
      this.tableData.map(item => {
        if (item.uploadStatus == "failed" || item.uploadProgress !== 100) {
          _cekUploadDocument = false;
        }
      });
      if (_cekUploadDocument) {
        if (this.orderID.length) {
          this.nextStep();
        } else {
          this.skipStep();
        }
      } else {
        this.$message.warning("Silahkan perikasa kembali dokumen anda");
      }
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
            re.data.data.map(item => {
              _this.tableData.push(item);
            });
            _this.tableData.map((v, index) => {
              v.uploadProgress = 0;
              v.uploadStatus = "";
             
              if (v.status == 1||v.status ==20)  {
                _this.uploadDocument(v,index);
              }
               else {
                v.uploadProgress = 100;
                v.uploadStatus = "success";
              }

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
    uploadDocument(x,index) {
      let _this = this;
      let _data = {
        orderNo: x.goodsId,
        userId: _this.$store.getters.userUuid
      };
      _this.$axios
        .post("/api-order/order/sendDigisign", _data)
        .then(function(re) {
          if (re.data.code == 0) {           
            x.uploadProgress = 100;
            x.uploadStatus = "success";
            _this.progress =index+1
          } else {
            x.uploadProgress = 0;
            x.uploadStatus = "failed";
            _this.progress =index+1
          }
        })
        .catch(function(re) {
          console.log("error");
          x.uploadProgress = 0;
        });
    }
  },computed:{
   
  }
};
</script>
<style>
.list-detail{
  padding-top:10px;
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
  font-size: 14px;
  font-family: PingFangSC-Medium;
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

.payment_next_color{
    font-size: 20px;
  color: #00d6c9;
}

.payment_next_count{
  font-size: 18px;
}
</style>