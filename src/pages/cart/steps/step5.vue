<template>
  <div class="m_60">
    <div class="payment_box text-center">
      Anda telah melakukan pendanaan sebesar
      <br />
      Rp {{$globals.dataUtil.parseNumber(totalAmount)}}
      <br />
      <br />Silahkan klik link
      <span
        style="text-decoration:underline;cursor:pointer;"
        @click="redirect('/center/records')"
      >Riwayat Pendanaan</span> atau
      <span
        style="text-decoration:underline;cursor:pointer;"
        @click="redirect('/center/assets')"
      >Aset Saya</span> untuk melihat pendanaan sebelumnya
      <br />
      <br />Terima Kasih
    </div>
  </div>
</template>
<script>
import "../../../assets/css/element.css";
export default {
  // untuk terima props dari parent
  props: ["currentBalance", "nextStep", "totalAmount"],
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.bindData();
  },
  methods: {
    doNext() {
      this.$message("done");
    },
    redirect(route) {
      this.$router.push(route);
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
              v.checked = false;
              // _this.totalAmount += ((parseFloat(v.insurance) + parseFloat(v.totalAmount)) *
              //     parseFloat(v.count)) /
              //   100;
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
    }
  }
};
</script>
<style>
.payment_box {
  margin: auto;
  border: 1px solid rgba(212, 219, 225, 1);
  padding: 20px;
  width: 500px;
  font-size: 20px;
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