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
<div class="message_con ele_check">

      <div class="message_table ele_table">

        <span class="mark_all_read" @click="handleMark">Tandai Semua Sudah Baca</span>
        <el-table ref="multipleTable" :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <div>
                <p class="message_item_tit">{{scope.row.title}}</p>
                <p>{{scope.row.content}}</p>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page_block" v-if="tableData.length>0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, prev, pager, next, sizes, jumper" :total="totalCount"></el-pagination>
      </div>
</div>

</template>
<script>
import store from '../../store'
import '../../assets/css/element.css';
export default{
  data(){
    return {
      currentPage:1,
      pageSize:10,
      totalCount:0,
      tableData:[],
      checkAll: false,
      selectData:[]
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
    handleSizeChange(){
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData()
    },
    handleCurrentChange(){
      this.currentPage = val;
      this.fetchData()
    },
    handleSelectionChange(val){
        this.selectData = val;
    },
    handleMark(){
      let _this = this;
      let _messageIds = [];
      if(_this.selectData.length<=0){
        _this.$message({type:'warning',message:'Pilih'})
        return;
      }
      _this.selectData.forEach(v=>{
        _messageIds.push(v.id)
      })
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('api-user/users/updateUserMessage', {messageIds:_messageIds.join(',')}).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.bindData()
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    },
    bindData(){
      let _this = this;
      _this.$axios.post('/api-user/users/getMessageList', {'userId':_this.$store.getters.userUuid}).then(function (re) {
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
.message_con{
  width: 1138px;
  /*height: 840px;*/
  padding: 50px;
  margin: 50px auto 53px;
  text-align: left;
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  overflow: hidden;

}
.message_con .mark_all_read{
  display: inline-block;
  color: #fff;
  text-align: center;
  line-height: 40px;
  width:185px;
  height:40px;
  background:rgba(42,210,200,1);
  box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
  border-radius:5px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  z-index: 999;
  left: 64px;
}
.message_con .message_table{
  position: relative;
}
.message_con .page_block{
  margin-top: 96px;
}
.message_item_tit{
  color: #164276;
  margin-bottom: 8px;
  font-size: 18px;
}

</style>
<style>
  .message_table .el-table th{
    background: #fff;
    
  }
  .message_table .el-table__header-wrapper{
    margin-bottom: 30px;
  }
</style>
