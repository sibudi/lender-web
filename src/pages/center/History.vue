  {
    "zh-cn":{
    },
    "en":{
      "favor":"favor"
    }
  }
</i18n>
<template>
    <div class="order_history">
      <div class="bread_bar">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/center/records' }">Riwayat Pembelian</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/rights' }">Lihat klaim</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/rightsdetail'}">Detail klaim</el-breadcrumb-item>
          <el-breadcrumb-item>Riwayat Frekuensi Pinjaman</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--列表-->
      <div class="order_box order_table">
          <div class="df order_user">
            <img src="../../assets/images/touxiang.png" height="80" width="80">
            <p>{{name}}</p>
          </div>
          <div class="search_tit">Riwayat Frekuensi Pinjaman</div>
          <div  v-for="item in tableData">
            <ul class="df table_box jcsb">
              <li>
                <p class="table_item_tit">Tujuan Pinjaman</p>
                <p>{{item.borrowingPurpose}}</p>
              </li>
              <li>
                <p class="table_item_tit">Jumlah pinjaman</p>
                <p>Rp {{$globals.dataUtil.parseNumber(item.amount)}}</p>
              </li>
              <li>
                <p class="table_item_tit">Batas Waktu Pinjaman</p>
                <p>{{item.borrowingTerm.charAt(2)=='d'?item.borrowingTerm.substr(0,2)+'hari':'3bulan'}}</p>
              </li>
              <li style="width: 230px;">
                <p class="table_item_tit">Status Pinjaman</p>
                <p>{{getStatus(item.status)}}</p>
              </li>
            </ul>
          </div>

          <div class="page_block" v-if="tableData.length>0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, prev, pager, next, sizes, jumper" :total="totalCount"></el-pagination>
          </div>
      </div>
    </div>

</template>
<script>
import store from '../../store'
import '../../assets/css/element.css';
export default{
  data(){
    return {
      uuid:'',
      name:'',
      headImage:'',
      currentPage:1,
      pageSize:10,
      totalCount:0,
      mobileBumber: '',
      tableData:[],
      statusList:[{
        code:'10',
        name:'Pelunasan Tepat Waktu'
      },{
        code:'11',
        name:'Pelunasan terlambat'
      }]
    }
  },
  async mounted(){
  },
  created(){
    if(this.$route.query&&this.$route.query['mos']){
      this.mobileBumber = this.$route.query['mos'];
      this.name = this.$route.query['name'];
    }
    
    // this.headImage = this.$store.getters.headImage;
    this.bindData();
  },
  destroyed(){
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.bindData()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.bindData()
    },
    getStatus(s){
      let re = '';
      this.statusList.forEach(v=>{
        if(v.code == s){
          re = v.name;
          return
        }
      })
      return re;
    },
    bindData(){
      let _this = this;
      let _data = {
        mobileNumber: _this.mobileBumber,
        pageSize: _this.pageSize,
        pageNo: _this.currentPage
      }
      _this.$axios.post('/api-order/scatterStandard/selectLoanHistory', _data).then(function (re) {
        if(re.data.code==0){
          _this.tableData = re.data.data;
          _this.totalCount = re.data.data.length;
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {}); 
    }
  }
}
</script>
<style scoped>
.order_history{
  width: 1200px;
  margin: 0px auto 53px;
  text-align: left;
}

.order_history .order_box{
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
}
.order_history .order_table{
  width:1180px;
  min-height: 950px;
  padding: 0px 10px 40px;
  overflow: hidden;
}
.order_history .search_tit{
  border:1px solid rgba(212,219,225,1);
  border-bottom: none;
  width:1160px;
  height:50px;
  padding-left: 20px;
  line-height: 50px;
  margin: 10px auto 0;
  background:rgba(239,243,245,1);
  font-size:18px;
  font-weight:500;
  color:rgba(22,66,118,1);
}

.order_history .table_box{
  width:1069px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  margin-bottom: 16px;
  padding: 33px 59px 33px 52px;
  font-size:18px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(22,66,118,1);
}
.order_history .table_item_tit{
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(87,104,119,1);
  margin-bottom: 16px;
}

.order_history .order_user{
  font-size:18px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(22,66,118,1);
  line-height: 150px;
}
.order_history .order_user img{
  margin: 40px 20px 49px 40px;
  border-radius: 50%;
}
</style>
