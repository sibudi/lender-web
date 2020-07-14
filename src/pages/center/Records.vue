<i18n>
  {

  }
</i18n>
<template>
<div style="width:100%">
  <div class="center_tit">Riwayat Pembelian</div>
  <div class='ele_table'>
    <el-table :data="tableData" class="records_list" width="100%" :header-cell-style="headerStyle">
      <!-- <el-table-column prop="id" label="Nomor order" align="left"></el-table-column> -->
      <el-table-column prop="createTime" label="Waktu Pembuatan" width="125px" align="center">
          <template slot-scope="scope">
          <span>{{$globals.dataUtil.parseDateandTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="applyBuy" label="Jumlah Pinjaman" width="160px" align="right">
        <template slot-scope="scope">
          <span>Rp {{$globals.dataUtil.parseNumber(scope.row.applyBuy)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status Pemesanan"  width="160px" align="center">
        <template slot-scope="scope">
          <span><i class="status_quare" :class="setClass(scope.row.status)"></i>{{getOrderStatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="c" label="Perlu mengisi ulang jumlah" width="135px" align="right">
        <template slot-scope="scope">
          <span>Rp {{$globals.dataUtil.parseNumber(scope.row.chargeBuy)}}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="buyTime" label="Waktu Pembayaran" width="125px" align="center">
          <template slot-scope="scope">
          <span>{{$globals.dataUtil.parseDateandTime(scope.row.buyTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status pembayaran" width="160px" align="center">
        <template slot-scope="scope">
          <span><i class="status_quare" :class="setPayClass(scope.row.status)"></i>{{getPayStatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <!-- <div class="df record_operate"> -->
            <!-- <p v-if="scope.row.status ==1" @click="gopay(scope.row.id)">{{scope.row.chargeBuy>0?'Lihat Kode Pembayaran':'Pembayaran'}}</p>
            <p v-if="scope.row.status !=1" style="color:#8F9DAA;">{{scope.row.chargeBuy>0?'Lihat Kode Pembayaran':'Pembayaran'}}</p> -->
            <p  v-if="scope.row.status ==1|| scope.row.status ==3" @click="goDetail(scope.row)" style="wrap-text:break-word;cursor:pointer;">Lihat klaim</p>
            <p  v-if="scope.row.status ==2 || scope.row.status ==9"  style="color:#8F9DAA;wrap-text:break-word;">Validasi klaim</p>
          <!-- </div> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="page_block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, prev, pager, next, sizes, jumper" :total="totalCount"></el-pagination>
    </div>
  </div>


</div>

</template>
<script>
import '../../assets/css/element.css';
export default{
  data(){
    return {
      currentPage:1,
      pageSize:10,
      totalCount:0,
      tableData:[]
    }
  },
  async mounted(){
  },
  created(){
    this.bindData();
  },
  destroyed(){
  },
  methods: {
    headerStyle() {
      return {textAlign:"center"}
    },
    setClass(row){
      return 'status_quare'+row;
    },
    setPayClass(row){
      return 'pay_quare'+row;
    },
    goDetail(row){
      // this.$router.push({path:'/rights',query:{uid:row}});
      this.$router.push('/rights');
      localStorage.setItem('rights', JSON.stringify(row));
    },
    gopay(row){
      this.$router.push({path:'/pay',query:{uid:row}});
    },
    getOrderStatus(status){
      // let list = [{code:'1',name:'投资处理中'},{code:'2',name:'投资失败'},{code:'3',name:'投资成功'},{code:'9',name:'订单失效'}];
       let list = [{code:'1',name:'Pemrosesan pendanaan'},{code:'2',name:'Kegagalan pendanaan'},{code:'3',name:'pendanaan berhasil'},{code:'9',name:'Pesanan tidak valid'}];
      let re = '';
      list.forEach(v=>{if(v.code == status){re = v.name;return;}})
      return re;
    },
    getPayStatus(status){
      // let list = [{code:'1',name:'待支付'},{code:'2',name:'支付成功'},{code:'3',name:'支付成功'},{code:'9',name:'支付失败'}];
      let list = [{code:'1',name:'Harus dibayarkan'},{code:'2',name:'Pembayaran yang berhasil'},{code:'3',name:'Pembayaran yang berhasil'},{code:'9',name:'Pembayaran gagal'}];
      let re = '';
      list.forEach(v=>{if(v.code == status){re = v.name;return;}})
      return re;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.bindData()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.bindData()
    },
    bindData(){
      let _this = this;
      let _data = {
        userId: _this.$store.getters.userUuid,
        pageSize:_this.pageSize,
        pageNo: _this.currentPage
      }
      _this.$axios.post('/api-order/order/selectUsrOrderList', _data).then(function (re) {
        if(re.data.code==0){
          _this.tableData = re.data.data.content;
          _this.totalCount = re.data.data.totalElements;
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {}); 
    }
  }
}
</script>
<style scoped>
  .records_list{
    /* width:1006px; */
    min-height:373px;
    border:1px solid rgba(235,239,241,1);
    margin: 41px auto 28px;
    /* font-size: 12px; */
  }
  .record_operate{
    color: #2AD2C8;
    cursor: pointer;
  }
  .record_operate p:nth-child(1){
    margin-right: 20px;
  }
  .status_quare{
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 1px;
    width:6px;
    height:6px;
  }
  .status_quare1,.pay_quare1{
     background:#F9CF2D;
  }
  .status_quare2,.status_quare9,.pay_quare9{
    background: #FF5D5D;
  }
  .status_quare3,.pay_quare2,.pay_quare3{
    background: #00D6C9;
  }

</style>
<style>
  .ele_table .records_list.el-table th.is-leaf{
    /* font-size: 14px; */
  }
</style>
