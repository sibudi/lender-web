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
  <div class="rights_detail_con">
    <div class="bread_bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/center/records' }">Riwayat Pembelian</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/rights'}">Lihat klaim</el-breadcrumb-item>
        <el-breadcrumb-item>Detail klaim</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--列表-->
    <div class="order_box df jcsb">
      <div class="detail_box">
        <div class="detail_box_tit">Jumlah pendanaan</div>
        <div class="detail_box_con">
          <p>Jumlah pendanaan</p>
          <p
            class
            style="font-size: 18px;color:#164276;margin-top:19px;"
          >Rp {{$globals.dataUtil.parseNumber(amountBuy)}}</p>
        </div>
        <div class="detail_box_tit">Detail klaim</div>
        <div class="detail_box_con">
          <p>Status Klaim</p>
          <p class style="color:#FFA922;font-size: 18px;margin-top:19px;">{{getOrderStatus(status)}}</p>
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
                    <li
                      v-for="item in scope.row.value.data"
                      :key="item.periodNo"
                    >{{ $globals.dataUtil.parseDate(item.refundIngTime) }} (Rp {{$globals.dataUtil.parseNumber(item.refundIngAmount)}})</li>
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
        <div class="detail_box_con" >
            <el-table
            :data="creditorsInformation"
            style="width: 100%; word-wrap: break-word;"
            :show-header="false"
          >
            <el-table-column prop="label" label="label"></el-table-column>
            <el-table-column prop="mark" label="mark" width="25px"></el-table-column>
            <el-table-column prop="value" label="Name">
              <template slot-scope="scope">
                <div v-if="scope.row.name=='score'">{{score}}</div>
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
      uuid: "",
      percentage: 0,
      borrowingPurposes: "",
      term: "",
      amountBuy: 0,
      amountApply: 0,
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
      insurance: 0,
      score: "",
      loanCount: "",
      debts: {},
      status: 0
    };
  },
  async mounted() {},
  created() {
    this.debts = JSON.parse(localStorage.getItem("Debts"));
    this.uuid = this.debts.creditorNo;
    this.bindData();
  },
  destroyed() {},
  methods: {
    getOrderStatus(status) {
      // let list = [
      // {code:'1',name:'投标中'},{code:'2',name:'锁定中'},{code:'3',name:'满标'},{code:'4',name:'放款中'},{code:'5',name:'放款失败'}
      // ,{code:'6',name:'放款成功'},{code:'7',name:'放款清分成功'},{code:'8',name:'放款成功'},{code:'9',name:'还款处理中'},{code:'10',name:'已还款'}
      // ,{code:'11',name:'逾期已还款'},{code:'12',name:'还款清分成功'},{code:'13',name:'已还款'}];
      let list = [
        { code: "1", name: "Penawaran" },
        { code: "2", name: "Terkunci" },
        { code: "3", name: "Penuh" },
        { code: "4", name: "Pinjaman" },
        { code: "5", name: "Pinjaman gagal" },
        { code: "6", name: "Pinjaman Berhasil" },
        { code: "7", name: "Peminjaman Dana Berhasil" },
        { code: "8", name: "Pinjaman Berhasil" },
        { code: "9", name: "Dalam Proses Pengembalian" },
        { code: "10", name: "Sudah Lunas" },
        { code: "11", name: "Pelunasan terlambat" },
        { code: "12", name: "Pengembalian Dana Berhasil" },
        { code: "13", name: "Sudah Lunas" }
      ];
      let re = "";
      list.forEach(v => {
        if (v.code == status) {
          re = v.name;
          return;
        }
      });
      return re;
    },
    goHistory() {
      this.$router.push({
        path: "/history",
        query: { mos: this.mobileNumber, name: this.realName }
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
            if (_data.creditorType != 2) {
              let _time = _data.refundIngTime.split("-");
              _this.refundIngTime = _time[2] + "-" + _time[1] + "-" + _time[0];
            } else {
              let output = "";
              _data.refundPlanList.forEach(function(entry) {
                // console.log(entry);
                let date = new Date(entry.refundIngTime);
                output +=
                  "\n • " +
                  (date.getDate() + 1 < 10
                    ? "0" + (date.getDate() + 1)
                    : date.getDate() + 1) +
                  "-" +
                  (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) +
                  "-" +
                  date.getFullYear() +
                  " (Rp " +
                  _this.$globals.dataUtil.parseNumber(entry.refundIngAmount) +
                  ")";
              });
              _this.refundIngTime = output;
            }
            // let _time = _data.refundIngTime.split('-')
            _this.percentage = parseFloat(
              (
                (parseFloat(_data.amountBuy) / parseFloat(_data.amountApply)) *
                100
              ).toFixed(2)
            );
            _this.borrowingPurposes = _data.borrowingPurposes;

            // _this.term = _data.term;
            _this.amountApply = _data.amountApply;
            // _this.refundIngTime = _time[2]+'-'+_time[1]+'-'+_time[0];
            _this.yearRateFin = parseFloat(_data.yearRateFin * 100).toFixed(2);
            _this.mobileNumber = _data.mobileNumber;
            console.log(_data.realName);
            console.log(_data.mobileNumber);
            console.log(_data.yearRateFin);
            _this.realName = _data.realName;
            _this.idCardNo = _data.idCardNo;
            _this.amountBuy = _data.amountBuy;
            _this.birthday = _data.birthday;
            _this.loanCount = _data.loanCount;
            _this.sex = _data.sex == 1 ? "Laki-laki" : "Perempuan";
            _this.address = _data.address;
            _this.score = _data.score;
            _this.status = _data.status;
            _this.maxCount =
              (parseFloat(_data.amountApply) - parseFloat(_data.amountBuy)) /
              10000;
            if (_data.insurance != 0) {
              _this.insurance = _data.insurance;
            }
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
<style>
.rights_detail_con {
  width: 1200px;
  margin: 100px auto 53px;
  text-align: left;
}
.rights_detail_con .order_box {
  width: 1180px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  padding: 10px 10px 20px;
}
.rights_detail_con .detail_box {
  width: 583px;
  border: 1px solid rgba(212, 219, 225, 1);
}
.rights_detail_con .detail_box .detail_box_tit {
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
.rights_detail_con .detail_box .detail_box_tit:nth-child(1) {
  border-top: none;
}
.rights_detail_con .detail_box_con {
  padding: 20px;
  color: #576877;
}
.rights_detail_con .detail_box_p {
  margin-top: 19px;
  margin-bottom: 40px;
}
.rights_detail_con .detail_box_p span {
  font-size: 18px;
  color: #164276;
  margin-left: 20px;
}
.rights_detail_con span.check_detail_operate {
  color: #00d6c9;
  cursor: pointer;
  float: right;

}
</style>
