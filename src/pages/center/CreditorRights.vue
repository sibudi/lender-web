<i18n>
  {

  }
</i18n>
<template>
  <div class="rights_detail_box">
    <div class="bread_bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/center' }">Akun Saya</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/center/records' }">Riwayat Pembelian</el-breadcrumb-item>
        <el-breadcrumb-item>Klaim</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="ele_table">
      <div class="right_detail_tit df aic jcsb">
        <p>Nomor order：{{rights.id}}</p>
        <p>Waktu Pembuatan：{{$globals.dataUtil.parseDateandTime(rights.createTime)}}</p>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        class="rights_list"
        :header-cell-style="headerStyle"
      >
        <el-table-column prop="creditorNo" label="Nomor Klaim" align="center"></el-table-column>
        <el-table-column label="Jumlah pendanaan" align="right">
          <template slot-scope="scope">
            <span>Rp {{$globals.dataUtil.parseNumber(scope.row.amountBuy)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amountApply" label="Jumlah Tunggakan" align="right">
          <template slot-scope="scope">
            <span>Rp {{$globals.dataUtil.parseNumber(scope.row.amountApply)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop
          label="Tingkat pengembalian tahunan yang diharapkan"
          width="180px"
          align="right"
        >
          <template slot-scope="scope">{{(parseFloat(scope.row.yearRateFin)*100).toFixed(2)}}%</template>
        </el-table-column>
        <el-table-column prop="b" label="Status Klaim">
          <template slot-scope="scope">
            <span>
              <i class="status_quare" :class="setClass(scope.row.status)"></i>
              {{getOrderStatus(scope.row.status)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="Nama Peminjam" align="center"></el-table-column>
        <el-table-column prop label="Terapkan">
          <template slot-scope="scope">
            <div class="df record_operate">
              <p v-if="scope.row.status !=5" @click="gopay(scope.row.creditorNo)">Lihat kontraknya</p>
              <p v-if="scope.row.status ==5" style="color:#8F9DAA;">Lihat kontraknya</p>
              <p @click="goDetail(scope.row)">Melihat rincian</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/css/element.css";
export default {
  data() {
    return {
      rights: {},
      uuid: "",
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      tableData: []
    };
  },
  async mounted() {},
  created() {
    this.rights = JSON.parse(localStorage.getItem("rights"));
    this.uuid = this.rights.id;
    this.bindData();
  },
  destroyed() {},
  methods: {
    headerStyle({ rowIndex }) {
      return { textAlign: "center" };
    },
    gopay(row) {
      // window.open(
      //   process.env.SHOW_CONTRACT +
      //     row+"APPCODE="+process.env.APPCODE ,
      //   "_blank"
      // );
    let _this = this
      _this.$axios
        .post("/api-upload/downloadContract/" + row, {})
        .then(function(re) {
          if (re.data) {
            _this.openBase64InNewTab(re.data, "application/pdf");
          } else {
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {});
    },
    openBase64InNewTab(data, mimeType) {
      var byteCharacters = atob(data);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], { type: mimeType + ";base64," });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    },
    goDetail(row) {
      this.$router.push("/rightsdetail");
      localStorage.setItem("Debts", JSON.stringify(row));
    },
    setClass(row) {
      return "status_quares" + row;
    },
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.bindData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.bindData();
    },
    bindData() {
      let _this = this;
      let _data = {
        orderNo: _this.uuid
      };
      _this.$axios
        .post("/api-order/order/selectOrderDetail", _data)
        .then(function(re) {
          if (re.data.code == 0) {
            _this.tableData = re.data.data.content;
            _this.totalCount = re.data.data.totalElements;
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
.rights_detail_box {
  width: 1200px;
  margin: 100px auto 0px;
}
.rights_detail_box .right_detail_tit {
  width: 1140px;
  height: 50px;
  background: rgba(239, 243, 245, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  font-size: 18px;
  color: #164276;
  padding: 0 20px;
}
.rights_detail_box .ele_table {
  /*width:1180px;*/
  min-height: 600px;
  padding: 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(212, 219, 225, 1);
  margin-bottom: 50px;
}
.rights_detail_box .rights_list {
  width: 1006px;
  min-height: 373px;
  border: 1px solid rgba(235, 239, 241, 1);
  margin: 28px auto;
  font-size: 14px;
}
.record_operate {
  color: #2ad2c8;
  cursor: pointer;
}
.status_quare {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 1px;
  width: 6px;
  height: 6px;
}
.status_quares1,
.status_quares2,
.status_quares3,
.status_quares4,
.status_quares9 {
  background-color: #f9cf2d;
}
.status_quares6,
.status_quares7,
.status_quares8,
.status_quares10,
.status_quares11,
.status_quares12,
.status_quares13 {
  background-color: #00d6c9;
}
.status_quares5 {
  background-color: #ff5d5d;
}
</style>
<style>
.ele_table .rights_list.el-table th.is-leaf {
  font-size: 14px;
}
</style>
