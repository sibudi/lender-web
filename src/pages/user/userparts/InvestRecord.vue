<i18n>
  {
    "zh-cn":{
      "classify": "产品类型",
      "orderstatus": "订单状态",
      "date": "起止时间",
      "all": "全部",
      "huoqi": "活期",
      "dingqi": "定期",
      "sanbiao": "散标",
      "going": "进行中",
      "finish": "已结束",
      "today": "今天",
      "onemonth": "近1个月",
      "threemonth": "近3个月",
      "confirm": "确定",
      "begindate": "开始日期",
      "enddate": "结束日期",

      "status": "状态：",
      "orderNo": "编号：",
      "day": "天",
      
      "checkDebt": "查看债权",
      "checkpro": "查看合同"
      

    },
    "en":{
      "classify": "Jenis produk",
      "orderstatus": "Status orderan",
      "date": "Waktu mulai dan berakhir",
      "all": "Semua",
      "huoqi": "Current Deposit",
      "dingqi": "Fixed Deposit",
      "sanbiao": "massal Deposit",
      "going": "Sedang investasi / Berinvestasi",
      "finish": "Selesai",
      "today": "Hari ini",
      "onemonth": "1 bulan ini",
      "threemonth": " 3 bulan ini",
      "confirm": "Tentukan",
      "begindate": "tanggal mulai",
      "to": "ke",
      "enddate": "Tanggal berakhir",
      "status": "Status：",
      "orderNo": "Nomor：",
      "day": "Hari",
      "checkDebt": "Lihat klaim",
      "checkpro": "Lihat kontrak"
    }
  }
</i18n>
<template>
  <div class="view_search">

      <div class="search_content">
        <ul>
          <li flex>
            <div class="li_left" v-t="'classify'"></div>
            <div class="li_right" flex>
              <p v-for="(item,$index) in orderType" :class="{active: $index === orderTypeIndex}" @click="changeOrderType(item.code, $index)" class="selectItem">{{$t(item.name)}}</p>
            </div>
          </li>

          <li flex>
            <div class="li_left" v-t="'orderstatus'"></div>
            <div class="li_right" flex>
              <p v-for="(item,$index) in statuslist" @click="changeStatus(item.code, $index)" :class="{active: $index == statusIndex}" class="selectItem">{{$t(item.name)}}</p>
            </div>
          </li>

          <li flex>
            <div class="li_left" v-t="'date'"></div>
            <div class="li_right" flex>
              <p><el-date-picker  v-model="startTime" type="date"  :placeholder="$t('begindate')"></el-date-picker></p>
              <p style="margin-right: 30px;"><el-date-picker  v-model="endTime" type="date"  :placeholder="$t('enddate')" ></el-date-picker></p>
              <p v-t="'confirm'" class="confirm_btn" @click="searchConfirm"></p>
              <p v-for="(item,$index) in datelist" @click="changeDateStatus(item.code, $index)" :class="{active: $index == dataIndex}" class="selectItem">{{$t(item.name)}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="order_table_box">
        <div class="order_table_body">
          <div class="order_item" v-for="item in tableData">
            <div class="order_item_head">
              <ul flex class="jcsb">
                <li>{{$t('orderNo')}}{{item.id}}</li>
                <li></li>
                <li></li>
                <li></li>
                <li>{{$t('status')}}{{(getStatus(item.status))}}</li>
              </ul>
            </div>
            <div class="order_item_body">
              <ul flex class="jcsb">
                <li>{{$t(getOrderType(item.productType))}}</li>
                <li>RP {{item.amountBuy}}</li>
                <li style="width: 70px;">{{item.term}} {{$t('day')}}</li>
                <li>{{getUnixTime(item.createTime)}}</li>
                <li><div class="operate_btn" @click="goDebtDetail(item)" v-t="'checkDebt'"></div></li>
                <li><div class="operate_btn" @click="goDetail(item)" v-t="'checkpro'"></div></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="page_block" v-if="tableData.length != 0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNo"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="totalPageNumber">
            </el-pagination>
        </div>
      </div>
  </div>

</template>
<script>
export default{
  data(){
    return {
      tableData:[],
      statusIndex: 0,
      dataIndex:0,
      orderTypeIndex:0,
      startTime:'',
      endTime:'',
      orderType:[{code:'',name:'all'},{code:'3',name:'dingqi'},{code:'1',name:'sanbiao'}],
      statuslist: [
        {code:'0',name:'Semua'},
        {code:'3',name:'Pembayaran Tertunda'},
        {code:'1',name:'Pencocokan berhasil'},
        {code:'2',name:'Pembayaran Berhasil'}
      ],
            statuslists: [
              {code:'1',name:'Pembayaran Tertunda'},
              {code:'2',name:'Investasi Gagal'},
              {code:'3',name:'Investasi Berhasil'},
              {code:'4',name:'Pencocokan berhasil'},
              {code:'5',name:'Proses Pengembalian'},
              {code:'6',name:'Proses Pembayaran'},
              {code:'7',name:'Pembayaran Gagal'},
              {code:'8',name:'Pembayaran Berhasil'},
              {code:'9',name:'Data tidak valid'}
          ],
      datelist: [{code:'1',name:'all'},{code:'2',name:'today'},{code:'3',name:'onemonth'},{code:'4',name:'threemonth'}],
        pageSize: 10,
        pageNo: 1,
        totalPageNumber: '',
      searchForm:{
        status:'',
        productType:'',
        flag: ''
      }
    }
  },
  created(){
    this.getUsrOrderList();
  },
  destroyed(){
  },
  methods: {
    /**
     * 格式化年月日 format为格式 eg:yyyy-MM-dd*/
    formatTime(dateTime,format = "yyyy-MM-dd"){
      if(!dateTime) return dateTime;
      let args = {
        "M+": dateTime.getMonth() + 1,
        "d+": dateTime.getDate(),
        "h+": dateTime.getHours(),
        "m+": dateTime.getMinutes(),
        "s+": dateTime.getSeconds(),
        "q+": Math.floor((dateTime.getMonth() + 3) / 3),  //quarter
        "S": dateTime.getMilliseconds()
      };
      if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var i in args) {
        let n = args[i];
        if (new RegExp("(" + i + ")").test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
      }
      return format;
    },
    getUsrOrderList(){
      let _data = Object.assign({
        startTime: this.startTime?this.formatTime(this.startTime)+' 00:00:00' : '',
        endTime: this.endTime?this.formatTime(this.endTime)+' 23:59:59' : '',
        pageNo:this.pageNo,pageSize:this.pageSize}, this.searchForm);
      this.$axios.post('/api-order/order/selectUsrOrderList', _data).then(res => {
        let $data = res.data;
        if($data.code == 0){
          this.tableData = $data.data.content;
          this.totalPageNumber = $data.data.totalElements;
        }else{
          this.$message({
            message: $data.message,
            type: 'error'
          });
        }
      }).catch(res => {});
    },

    changeDateStatus(data,index){
      this.dataIndex = index;
      this.searchForm.flag = data;
      this.getUsrOrderList();
    },
    changeStatus(data, index){
      this.statusIndex = index;
      this.searchForm.status = data;
      this.getUsrOrderList();
    },
    changeOrderType(data, index){
      this.orderTypeIndex = index;
      this.searchForm.productType = data;
      this.startTime = '';
      this.endTime = '';
      this.getUsrOrderList();
    },
    searchConfirm(){
      if(!this.startTime){
          this.$message({
            message: 'silahkan pilih tanggal mulai',
            type: 'error'
          });

          return;
      }
      if(!this.endTime){
          this.$message({
            message: 'silahkan pilih tanggal berakhir',
            type: 'error'
          });

          return;
      }
      if(this.startTime && this.endTime && this.startTime.getTime() > this.endTime.getTime()){
          this.$message({
            message: 'Tanggal mulai tidak boleh melebihi tanggal berakhir',
            type: 'error'
          });

          return;
      }
      this.searchForm.flag = '0';
      this.dataIndex = 0;
      this.getUsrOrderList();
    },
    getUnixTime(time){
      if (time == null){ return '' }
      const timeStamp = new Date(time)
      return timeStamp.getFullYear() + '-' +
        (timeStamp.getMonth() + 1) + '-' + timeStamp.getDate() + '-' +
        timeStamp.getHours() + ':' + timeStamp.getMinutes() + ':' + timeStamp.getSeconds()
    },
    getStatus(state){
      let re = '';
      this.statuslists.forEach(function (item) {
        if(item.code == state){
          re = item.name;
          return
        }
      })
      return re
    },
    getOrderType(state){
      let re = '';
      this.orderType.forEach(function (item) {
        if(item.code == state){
          re = item.name;
          return
        }
      })
      return re
    },
    goDebtDetail(data){
      if(data.productType==3){
        data.creditorNo=data.id;
      }
      this.$router.push({path: '/debt',query:{creditorNo:data.creditorNo,productType:data.productType,status:data.status}});
    },

    goDetail(data){
      this.$router.push({path: '/guaranteeProtacol',query:{creditorNo:data.creditorNo}});
    },

    handleSizeChange(val) {
      this.pageNo = val;
      this.getUsrOrderList()
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getUsrOrderList()
    }
  }
}
</script>
<style lang="less">
.view_search{
    .search_content{
      margin-bottom: 35px;
      border: 1px solid #ebeff1;
      color: #474747;
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 170px;
      }
      .el-input__inner{
        height: 30px;
      }

        li{
          line-height: 51px;
          border-bottom: 1px solid #ebeff1;
          font-size: 14px;


            .li_left{
              width: 210px;
              background: rgb(247,249,250);
              border-right: 1px solid #ebeff1;
              font-size: 16px;
            }
            .li_right{
                padding-left: 30px;
                font-size: 14px;

                p{
                  margin-right: 35px;
                  cursor: pointer;
                  &.active{
                    color: #2AD2C8;
                  }
                }

                .confirm_btn{
                  width: 57px;
                  line-height: 30px;
                  text-align: center;
                  background: #2AD2C8;
                  color: #fff;
                  height: 30px;
                  border-radius: 4px;
                  margin-top: 10px;
                  font-size: 12px;
                  cursor: pointer;
                }

            }
        }

        li:nth-last-child(1){
          border-bottom: none;
        }
    }

    .order_table_body{
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
        .order_item{
          margin-bottom: 10px;
          border: 1px solid rgb(235, 239, 241);

            .order_item_head{
              background: #f7f9fa;
              border-bottom: 1px solid rgb(235, 239, 241);
              padding: 0 44px;
              line-height: 46px;
            }

            .order_item_body{
                padding: 0 56px 0 44px;
                color: #7A7A7A;
                line-height: 60px;
                li{
                  min-width: 120px;
                  text-align: left;
                }
                .operate_btn{
                    width: 122px;
                    line-height: 26px;
                    color: #2AD2C8;
                    border: 1px solid #2AD2C8;
                    border-radius: 20px;
                    box-shadow: 0 4px 4px 0 #EEF6FF;
                    margin-top: 16px;
                    cursor: pointer;
                    text-align: center;
                }
            }
        }
    }

    .page_block{
        .el-pager li{
          min-width: 28px;
          border: 1px solid #E1E1E1;
          margin-right: 3px;
          &.active{
            background: #2AD2C8;
            color: #fff;
          }
          &:hover{
            background: #2AD2C8;
            color: #fff;
          }
        }
        .el-pagination .btn-next{
          // border: 1px dashed #999;
          padding-left: 4px;
        }
        .el-pagination .btn-prev{
          // border: 1px dashed #999;
          margin-right: 3px;
          padding-right: 4px;
        }
        .el-pagination button, .el-pagination span:not([class*=suffix]){
          min-width: 28px;
        }
        .el-input__inner{
          border: none;
        }
        .el-pagination__editor.el-input .el-input__inner{
          border: 1px solid #999;
          width: 34px;
        }

    }
}

        .el-select-dropdown__item.selected{
          color: #2AD2C8;
        }

</style>



