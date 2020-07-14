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
  <div class="detail_con">
    <div class="bread_bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Scattered' }">Pendanaan</el-breadcrumb-item>
        <el-breadcrumb-item>Detail klaim</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--列表-->
    <div class="order_box df jcsb">
      <div class="detail_box">
        <div class="detail_box_tit">Detail Klaim</div>
        <div class="detail_box_con">
          <p>Peminjam ingin meminjam Rp {{$globals.dataUtil.parseNumber(amountApply)}}</p>
          <p>
            <el-progress
              :text-inside="true"
              :stroke-width="23"
              :percentage="percentage"
              color="rgba(0, 214, 201, 1)"
              style="width: 434px;margin-top:20px;"
            ></el-progress>
          </p>

          <!--             <p style="margin-top:30px;">还款计划表</p>
            <p style="padding-right: 52px;margin-top: 20px;" class="ele_table">
              <el-table :data="tableData"style="width: 100%" class="">
                <el-table-column prop="businessType" label="期数"></el-table-column>
                <el-table-column prop="dealTime" label="应还款时间">
                    <template slot-scope="scope">{{scope.row.dealTime.split('.')[0]}}</template>
                </el-table-column>
                <el-table-column prop="amount" label="应还款金额">
                  <template slot-scope="scope">
                    <span>Rp {{$globals.dataUtil.parseNumber(scope.row.amount)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="currentBanlance" label="还款状态">
                  <template slot-scope="scope">
                    <span>Rp {{$globals.dataUtil.parseNumber(scope.row.currentBanlance)}}</span>
                  </template>
                </el-table-column>
              </el-table>
          </p>-->
        </div>
        <div class="detail_box_tit">Informasi Pinjaman</div>
        <div class="detail_box_con">
          <el-table
            :data="creditInformation"
            style="width: 100%; word-wrap: break-word;"
            :show-header="false"
          >
            <el-table-column prop="label" label="label"></el-table-column>
            <el-table-column prop="mark" label="mark" width="25px"></el-table-column>
            <el-table-column prop="value" label="Name">
              <template slot-scope="scope">
                <div
                  v-if="scope.row.name=='amountApply'||scope.row.name=='fullAmount'"
                >Rp {{$globals.dataUtil.parseNumber(scope.row.value)}}</div>
                <div
                  v-else-if="scope.row.name=='yearRateFin'"
                >{{$globals.dataUtil.parseNumber(scope.row.value)}} %</div>
                <div
                  v-else-if="scope.row.name=='refundIngTime'&&scope.row.value.creditorType == 1"
                >{{$globals.dataUtil.parseDate(scope.row.value.data)}}</div>
                <div v-else-if="scope.row.name=='refundIngTime'&&scope.row.value.creditorType == 2">
                  <ol style="list-style-type:disc;padding-left:10px;">
                    <li v-for="item in scope.row.value.data" :key="item.periodNo">{{ $globals.dataUtil.parseDate(item.refundIngTime) }} (Rp {{$globals.dataUtil.parseNumber(item.refundIngAmount)}})</li>
                  </ol>
                </div>
                <div v-else>{{scope.row.value}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="detail_box">
        <div class="detail_box_tit">Informasi Peminjam</div>
        <div class="detail_box_con" style="padding-bottom: 20px;">
          <el-table
            :data="creditorsInformation"
            style="width: 100%; word-wrap: break-word;"
            :show-header="false"
          >
            <el-table-column prop="label" label="label"></el-table-column>
            <el-table-column prop="mark" label="mark" width="25px"></el-table-column>
            <el-table-column prop="value" label="Name">
              <template slot-scope="scope">
                <div v-if="scope.row.name=='score'">{{getScoreLabel(score)}}</div>
                <div
                  v-else-if="scope.row.name =='insurance'||scope.row.name =='total'"
                >Rp {{$globals.dataUtil.parseNumber(scope.row.value)}}</div>
                <div v-else-if="scope.row.name =='loanCount'">
                  {{loanCount}}
                  <span class="check_detail_operate" @click="goHistory(uuid)">Lihat Detail</span>
                </div>
                <div v-else-if="scope.row.name =='count'">{{scope.row.value?scope.row.value:"0"}} %</div>
                <div v-else>{{scope.row.value}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="df add_cart_box">
          <div class="add_cart df aic">
            <img src="../../assets/images/cart_icon.png" height="26" width="28" />
            <button @click="addCart">Masukkan ke keranjang</button>
          </div>
          <!-- <div class="add_cart df aic">
            <img src="../../assets/images/pay_icon.png" height="26" width="28" />
            <button @click="handlePay">Proses Pembayaran</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/css/element.css";
export default {
  data() {
    return {
      creditInformation: [],
      creditorsInformation: [],
      percentage: 0,
      borrowingPurposes: "",
      term: "",
      labelterm: "",
      amountApply: 0,
      fullAmount: 0,
      refundIngTime: "",
      yearRateFin: 0,
      isbuy: 0,
      mobileNumber: "",
      mobileNumberHid: "",
      realName: "",
      idCardNo: "",
      birthday: "",
      sex: "",
      address: "",
      score: "",
      count: 10,
      loanCount: 0,
      insurance: 0,
      uuid: "",
      maxCount: 0,
      goodsId: ""
    };
  },
  async mounted() {},
  created() {
    if (this.$route.query && this.$route.query["uid"]) {
      this.uuid = this.$route.query["uid"];
      this.bindData();
    }
  },
  destroyed() {},
  methods: {
    handlePay() {
      let _this = this;
      if (_this.count <= 0 || _this.count == "") {
        _this.count = 10;
      }
      if (_this.count > _this.maxCount) {
        _this.count = _this.maxCount;
      }
      let _amount = parseInt(_this.count) * 0.01 * _this.amountApply;
      const loading = _this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      _this.$axios
        .post("/api-order/order/orderSubmit", {
          userUuid: _this.$store.getters.userUuid,
          creditorNo: _this.uuid,
          amount: _amount
        })
        .then(function(re) {
          loading.close();
          if (re.data.code == 0) {
            if (re.data.data.tip) {
              _this.$message({
                type: "warning",
                message:
                  "Bagian ini sudah dibeli oleh nasabah lain, Silahkan anda membeli kembali, dan optimalkan jumlah pembelian"
              });
              setTimeout(function() {
                _this.$router.push({
                  path: "/pay",
                  query: { uid: re.data.data.orderNo }
                });
              }, 3000);
            } else {
              _this.$router.push({
                path: "/pay",
                query: { uid: re.data.data.orderNo }
              });
            }
          } else if (re.data.code == 10001 || re.data.code == 10002) {
            //未实名或不是超投都去实名认证
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
    },
    goHistory(mobileBumber) {
      this.$router.push({
        path: "/HistoryDetail",
        query: {
          uid: mobileBumber,
          mos: this.mobileNumber,
          name: this.realName
        }
      });
    },
    getScoreLabel(score) {
      let temp = parseFloat(score);
      if (temp > 374 && temp < 445) {
        return "Risiko Tinggi";
      } else if (temp > 446 && temp < 490) {
        return "Risiko Sedang";
      } else if (temp > 491 && temp < 585) {
        return "Risiko Rendah";
      } else {
        return temp;
      }
    },
    cutNumber: async function() {
      let _this = this;
      _this.count = parseInt(_this.count);
      if (_this.count <= 10) {
        return;
      }
      let number = _this.count - 10 > 10 ? _this.count - 10 : 10;
      _this.count = number;
    },
    addNumber: async function() {
      let _this = this;
      _this.count = parseInt(_this.count);
      if (_this.count >= _this.maxCount) {
        _this.$message({
          type: "warning",
          message: "Tidak bisa membeli lebih banyak"
        });
        return;
      }
      let number = _this.count + 10;
      _this.count = number;
    },
    addCart() {
      let _this = this;
      if (_this.count <= 0 || _this.count == "") {
        _this.count = 10;
      }
      if (_this.count > _this.maxCount) {
        _this.$message({
          type: "warning",
          message: "Tidak bisa membeli lebih banyak"
        });
        _this.count = _this.maxCount;
        return;
      }
      let _data = {
        userId: _this.$store.getters.userUuid,
        goodsList: [
          {
            goodsId: _this.uuid,
            amount: _this.count
          }
        ]
      };
      const loading = _this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      _this.$axios
        .post("/api-order/shoppingCart/addList", _data)
        .then(function(re) {
          loading.close();
          if (re.data.code == 0) {
            _this.$message({ type: "success", message: "Berhasil menambahkan ke keranjang" });
          } else if (re.data.code == 10001 || re.data.code == 10002) {
            //未实名或不是超投都去实名认证
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
    },
    bindData() {
      let _this = this;
      _this.$axios
        .post("/api-order/scatterStandard/selectScatterstandardById", {
          creditorNo: _this.uuid
        })
        .then(function(re) {
          if (re.data.code == 0) {
            let _data = re.data.data;
          
            _this.percentage = parseFloat(
              (
                (parseFloat(_data.amountBuy) / parseFloat(_data.amountApply)) *
                100
              ).toFixed(2)
            );
            _this.borrowingPurposes = _data.borrowingPurposes;
            _this.amountApply = _data.amountApply;
            _this.fullAmount = _data.fullAmount;
            _this.yearRateFin = parseFloat(_data.yearRateFin * 100).toFixed(2);
            _this.mobileNumber = _data.mobileNumber;
            _this.realName = _data.realName;
            _this.idCardNo = _data.idCardNo;
            _this.birthday = _data.birthday;
            _this.loanCount = _data.loanCount;
            _this.sex = _data.sex == 1 ? "Laki-laki" : "Perempuan";
            _this.address = _data.address;
            _this.score = _data.score;
            _this.maxCount =
              ((_data.amountApply - _data.amountBuy) / _data.amountApply) * 100;
            _this.count =
              ((_data.amountApply - _data.amountBuy) / _data.amountApply) * 100;
            if (_data.term.endsWith("d")) {
              _this.term =
                _data.term.substring(0, _data.term.length - 1) + " Hari";
            } else if (_data.term.endsWith("w")) {
              _this.term =
                _data.term.substring(0, _data.term.length - 1) + " Minggu";
            } else if (_data.term.endsWith("m")) {
              _this.term =
                _data.term.substring(0, _data.term.length - 1) + " Bulan";
            }
            if (_data.isBuy == 0) {
              _this.mobileNumberHid =
                _data.mobileNumber.substr(0, 3) +
                "****" +
                _data.mobileNumber.substr(7);
            } else {
              _this.mobileNumberHid = _data.mobileNumber;
            }
            if (_data.insurance != 0) {
              _this.insurance = _data.insurance;
            }

            _this.creditInformation = [
              {
                label: "Tujuan pinjaman",
                name: "borrowingPurposes",
                mark: ":",
                value: _this.borrowingPurposes
              },
              {
                label: "Batas waktu pinjaman",
                name: "term",
                mark: ":",
                value: _this.term
              },
              {
                label: "Jumlah pinjaman",
                name: "fullAmount",
                mark: ":",
                value: _this.fullAmount
              },
              {
                label: "Jumlah pinjaman diterima",
                name: "amountApply",
                mark: ":",
                value: _this.amountApply
              },
              {
                label: "Tanggal pembayaran yang diharapkan",
                name: "refundIngTime",
                mark: ":",
                value: {
                  creditorType: _data.creditorType,
                  data:
                    _data.creditorType != 2
                      ? _data.refundIngTime
                      : _data.refundPlanList
                }

                // _this.refundIngTime
              },
              {
                label: "Tingkat pengembalian tahunan yang diharapkan",
                name: "yearRateFin",
                mark: ":",
                value: _this.yearRateFin
              }
            ];
            _this.creditorsInformation = [
              {
                label: "Nomor ponsel",
                name: "mobileNumberHid",
                mark: ":",
                value: _this.mobileNumberHid
              },
              {
                label: "Nama lengkap",
                name: "realName",
                mark: ":",
                value: _this.realName
              },
              {
                label: " Nomor ID",
                name: "idCardNo",
                mark: ":",
                value: _this.idCardNo
              },
              {
                label: "Tanggal lahir",
                name: "birthday",
                mark: ":",
                value: _this.birthday
              },
              {
                label: "Jenis kelamin",
                name: "sex",
                mark: ":",
                value: _this.sex
              },
              {
                label: "Alamat",
                name: "address",
                mark: ":",
                value: _this.address
              },
              {
                label: "Kredit Score",
                name: "score",
                mark: ":",
                value: _this.score
              },
              {
                label: "Riwayat Frekuensi Pinjaman",
                name: "loanCount",
                mark: ":",
                value: _this.loanCount
              },
              {
                label: " Asuransi(11%) :",
                name: "insurance",
                mark: ":",
                value: _this.insurance
              },
              {
                label: "Total :",
                name: "total",
                mark: ":",
                value: _this.insurance + _this.amountApply
              },
              {
                label: "Nominal Produk yang dibeli",
                name: "count",
                mark: ":",
                value: _this.count
              }
            ];
          } else {
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {});
    }
  }
};
</script>
<style scoped>
.detail_con {
  width: 1200px;
  margin: 100px auto 53px;
  text-align: left;
}
.detail_con .order_box {
  width: 1180px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  padding: 10px 10px 20px;
}
.detail_con .detail_box {
  width: 583px;
  border: 1px solid rgba(212, 219, 225, 1);
}
.detail_con .detail_box .detail_box_tit {
  width: 563px;
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  background: rgba(239, 243, 245, 1);
  font-size: 18px;
  font-weight: 500;
  color: rgba(22, 66, 118, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  border-left: none;
  border-right: none;
}
.detail_con .detail_box .detail_box_tit:nth-child(1) {
  border-top: none;
}
.detail_box .detail_box_con {
  padding: 20px;
  color: #576877;
}
.detail_box_p {
  margin-top: 19px;
  margin-bottom: 40px;
}
.detail_box_p span {
  font-size: 18px;
  color: #164276;
  margin-left: 20px;
}
/*.detail_con span.detail_box_p{
  margin-top: 0;
  margin-bottom: 40px;
}*/
.detail_con span.check_detail_operate {
  color: #00d6c9;
  cursor: pointer;
  float: right;
}

.detail_con .add_cart_box {
  padding: 0 0 0 20px;
}
.detail_con .add_cart {
  clear: both;
  width: 243px;
  height: 60px;
  line-height: 60px;
  background: rgba(42, 210, 200, 1);
  box-shadow: 0px 4px 4px 0px rgba(211, 211, 211, 0.5);
  border-radius: 5px;
  margin: 20px 14px 20px 0px;
}
.detail_con .add_cart img {
  margin: 0 16px 0 20px;
}
.detail_con .add_cart button {
  background-color: rgba(42, 210, 200, 1);
  color: #fff;
  font-size: 16px;
}
.detail_con .buy_count_box {
  font-size: 18px;
  color: #164276;
  padding-left: 52px;
}
.detail_con .count_boxx {
  width: 305px;
  height: 50px;
  border-radius: 2px;
  border: 1px solid rgba(212, 219, 225, 1);
  padding: 0 22px;
  margin-left: 26px;
}
.detail_con .minus_btn,
.detail_con .plus_btn {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid rgba(212, 219, 225, 1);
  text-align: center;
  line-height: 20px;
  font-size: 20px;
  cursor: pointer;
}
.detail_con .cart_plus_input {
  width: 95px;
  margin: 0 6px;
}
</style>
<style>
.detail_con .cart_plus_input .el-input__inner {
  font-size: 18px;
  height: 20px;
  line-height: 20px;
  border-radius: 2px;
  border: 1px solid rgba(212, 219, 225, 1);
  padding: 0 2px;
  text-align: center;
}
.detail_con .el-progress__text {
  font-size: 14px !important;
  margin-left: 15px;
}
</style>
