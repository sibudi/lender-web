<i18n>
  {

  }
</i18n>
<template>
  <div>
    <div class="center_tit">Aset saya</div>

    <div class="df asset_box jcsb">
      <div class="asste_item">
        <div class="asste_top">
          <p class="asset_top_tit">Jumlah pendanaan</p>
          <p>Rp{{$globals.dataUtil.parseNumber(investingBanlance)}}</p>
        </div>
        <div class="asste_tips">Aset terkunci Rp{{$globals.dataUtil.parseNumber(lockedBalance)}}</div>
      </div>
      <div class="asste_item">
        <div class="asste_top">
          <p class="asset_top_tit">Aset yang tersedia</p>
          <p>Rp{{$globals.dataUtil.parseNumber(currentBalance)}}</p>
        </div>
        <!-- <div class="asste_operate df jcsb"><p @click="out">Tarik tunai</p><p @click="buy">Membeli</p></div> -->
      </div>
    </div>

    <div class="ele_table">
      <div class="df aic table_search">
        <div>Tipe Transaksi</div>
        <div>
          <el-select v-model="businessType" clearable class="form_select search_sel">
            <el-option
              v-for="item in businessTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </div>
        <div>
          <button class="serach_btn" @click="handleSectet">Lihat</button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;"
        class="asste_list"
        :header-cell-style="headerStyle"
      >
        <el-table-column prop="businessType" label="Tipe Transaksi" width="140">
          <template slot-scope="scope">
            <div style="word-break: break-word;">{{scope.row.businessType}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="dealTime" label="Waktu Transaksi" width="120" align="center">
          <template slot-scope="scope">
            <div
              style="word-break: break-word;"
            >{{$globals.dataUtil.parseDateandTime(scope.row.dealTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="Jumlah Uang" width="160" align="right">
          <template slot-scope="scope">
            <span>Rp {{$globals.dataUtil.parseNumber(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="currentBanlance"
          label="Saldo Akun yang Tersedia"
          width="160"
          align="right"
        >
          <template slot-scope="scope">
            <span>Rp {{$globals.dataUtil.parseNumber(scope.row.currentBanlance)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="investBanlance"
          label="Saldo Akun Pendanaan"
          width="160"
          align="right"
        >
          <template slot-scope="scope">
            <span>Rp {{$globals.dataUtil.parseNumber(scope.row.investBanlance)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lockedBanlance" label="Saldo Terkunci" width="160" align="right">
          <template slot-scope="scope">
            <span>Rp {{$globals.dataUtil.parseNumber(scope.row.lockedBanlance)}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="tradeInfo" label="Komentar"></el-table-column> -->
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
  name: "AssetsDetail",
  data() {
    return {
      lockedBalance: 0,
      currentBalance: 0,
      investingBanlance: 0,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      tableData: [],
      // businessTypeList: [{value: '1',label: '充值'},{value: '2',label: '购买债权'},{value: '3',label: '购买债权成功'},{value: '4',label: '购买债权失败'},{value: '5',label: '利息收入'},{value: '6',label: '80%服务费'},{value: '7',label: '还款清分'},{value: '8',label: '提现申请'},{value: '9',label: '提现成功'},{value: '10',label: '资金退回'}],
      businessTypeList: [
        { value: "1", label: "Isi ulang" },
        { value: "2", label: "Pembelian Kreditor" },
        { value: "3", label: "Klaim Pembelian Sukses" },
        { value: "4", label: "Klaim Pembelian Gagal" },
        { value: "5", label: "Pendapatan bunga" },
        { value: "6", label: "Biaya admin 75%" },
        { value: "7", label: "Pengembalian Dana" },
        { value: "8", label: "Pendaftaran Penarikan Dana" },
        { value: "9", label: "Penarikan Berhasil" },
        { value: "10", label: "Dana dikembalikan" }
      ],
      businessType: ""
    };
  },
  async mounted() {
    this.init();
  },
  created() {
    this.fetchData();
  },
  destroyed() {},
  methods: {
    headerStyle() {
      return {textAlign:"center"}
    },
    buy() {
      this.$router.push("/Scattered");
    },
    out() {
      this.$router.push("/center/withdrawal");
    },
    init() {
      let _this = this;
      _this.$axios
        .post("/api-user/user/selectUserAccountSession", {
          userId: _this.$store.getters.userUuid
        })
        .then(function(re) {
          if (re.data.code == 0) {
            _this.currentBalance = re.data.data.currentBalance;
            _this.lockedBalance = re.data.data.lockedBalance;
            _this.investingBanlance = re.data.data.investingBanlance;
          } else {
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {});
    },
    handleSectet() {
      this.fetchData();
    },
    fetchData() {
      let _this = this;
      let _data = {
        pageNo: _this.currentPage,
        pageSize: _this.pageSize,
        businessType: _this.businessType,
        userUuid: _this.$store.getters.userUuid
      };
      _this.$axios
        .post("/api-user/user/getAccountHistoryByType", _data)
        .then(function(re) {
          if (re.data.code == 0) {
            _this.tableData = re.data.data.content;
            _this.totalCount = re.data.data.totalElements;
          } else {
            _this.$message(re.data.message);
          }
        })
        .catch(function(re) {});
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    }
  }
};
</script>
<style scoped>
.asset_box {
  padding: 56px 45px 63px 46px;
}
.asste_item {
  width: 393px;
  height: 280px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 30px 10px rgba(13, 37, 62, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(238, 238, 238, 1);
}
.asste_top {
  width: 393px;
  height: 99px;
  padding: 49px 0 44px;
  border-radius: 4px 4px 0px 0px;
  font-size: 36px;
  color: #fff;
  letter-spacing: 2px;
}
.asset_top_tit {
  font-size: 24px;
  margin-bottom: 18px;
  /*letter-spacing: 5px;*/
}
.asste_item:nth-child(1) .asste_top {
  background: rgba(30, 136, 245, 1);
  box-shadow: 0px 2px 16px 0px rgba(30, 136, 245, 0.3);
}
.asste_item:nth-child(2) .asste_top {
  background: rgba(255, 204, 1, 1);
  box-shadow: 0px 2px 16px 0px rgba(255, 204, 1, 0.3);
}
.asste_tips {
  font-size: 22px;
  color: #8f9daa;
  padding-top: 28px;
}
/*  .asste_tips img{
    margin: 0 30px 0 64px;
  }
  .asste_tips .el-icon-check{
    color: #1E88F5;
    font-weight: 800;
    margin: 0 30px 0 64px;
  }*/
.asste_operate {
  padding: 18px 35px 0;
}
.asste_operate p {
  width: 140px;
  height: 48px;
  box-shadow: 0px 0px 20px 0px rgba(254, 203, 1, 0.4);
  border-radius: 4px;
  font-size: 18px;
  line-height: 50px;
  cursor: pointer;
}
.asste_operate p:nth-child(2) {
  height: 50px;
  background: rgba(255, 204, 1, 1);
  color: #fff;
}
.asste_operate p:nth-child(1) {
  border: 1px solid rgba(255, 204, 1, 1);
  color: #ffcc01;
}

.table_search {
  color: #164276;
  padding-left: 20px;
}
.search_sel {
  width: 170px;
  margin: 0 20px;
}
.serach_btn {
  width: 140px;
  height: 40px;
  background: rgba(42, 210, 200, 1);
  box-shadow: 0px 4px 4px 0px rgba(211, 211, 211, 0.5);
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
}
.asste_list {
  width: 1006px;
  min-height: 373px;
  border: 1px solid rgba(235, 239, 241, 1);
  margin: 41px auto 28px;
}
</style>
