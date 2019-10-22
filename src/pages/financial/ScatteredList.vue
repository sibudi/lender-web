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
  <div class="">
        <div class="scatted_bar_bg">
          <div class="df aic scatted_bar"><i class="el-icon-warning" style="color:#FFC018;margin-right:10px;font-size:16px;"></i><p>{{selectCount}} claim telah dipilih, total: <span  class="colC9">Rp：{{$globals.dataUtil.parseNumber(selectAmount)}}</span></p></div>
        </div>
        <!--内容-->
        <div class="order_con">
          <!--列表-->
          <div class="order_box order_table">
            <!-- title -->
              <div class="search_tit" style="position: relative;">
                <p>Pengecekan</p>
                <el-dropdown style="position: absolute;right: 20px;top: 4px;">
                  <p><img src="../../assets/images/gengduo.png" height="20" width="20" style="cursor:pointer;"></p>
                  <el-dropdown-menu slot="dropdown" class="table_left_drop">
                    <el-dropdown-item><p @click="handleSort('biddingTime','DESC')">Susunan Waktu Rilis Terbalik</p></el-dropdown-item>  <!-- 时间倒序 -->
                    <el-dropdown-item><p @click="handleSort('biddingTime','ASC')">Susunan Waktu Rilis Normal</p></el-dropdown-item>  <!-- 时间正序 -->
                    <el-dropdown-item><p @click="handleSort('borrowerYearRate','DESC')">Rating Pengembalian Terbalik Tahunan</p></el-dropdown-item>  <!-- 收益到序 -->
                    <el-dropdown-item><p @click="handleSort('borrowerYearRate','ASC')">Rating Pengembalian Normal Tahunan</p></el-dropdown-item>   <!-- 收益正序 -->
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- 查询条件 -->
              <div class="search_box ele_check">
                <div class="search_item form_select df aic">
                  <p class="search_item_tit">Jumlah Pinjaman</p>
                  <p>         
                    <el-checkbox-group text-color="#00D6C9" fill="#00D6C9" v-model="amountApplys" @change="handleCheck">
                      <el-checkbox v-for="(item,index) in amountList" :label="item.code" :key="index">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                  </p>
                </div>
                <div class="search_item df aic">
                  <p class="search_item_tit">Batas Waktu</p>
                  <p>         
                    <el-checkbox-group text-color="#00d6c9" fill="#00d6c9" v-model="terms" @change="handleCheck">
                      <el-checkbox v-for="(item,index) in termList" :label="item.code" :key="index">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                  </p>
                </div>
                <div class="search_item df aic">
                  <p class="search_item_tit">Usia</p>
                  <div class="block" style="width: 228px;">
                    <el-slider range :marks="marks" :min="18" :max="50" v-model="checkAgelist" @change="handleCheck"></el-slider>
                    <div class="df jcsb age_marks"><span>18</span><span>50</span></div>
                  </div>
                </div>
                <div class="search_item df aic">
                  <p class="search_item_tit">Jenis kelamin</p>
                  <p>         
                    <el-checkbox-group text-color="#00d6c9" fill="#00d6c9"  v-model="sexlist" @change="handleSexCheck">
                      <el-checkbox label="1">Laki-laki</el-checkbox>
                      <el-checkbox label="2">Perempuan</el-checkbox>
                    </el-checkbox-group>
                  </p>
                </div>
                <div class="search_item df aic">
                  <p class="search_item_tit">Alamat Tempat Tinggal</p>
                  <p>        
                    <el-cascader :options="livingAddressOptions" v-model="liveAddressRo" class="form_select" @active-item-change="getLiveAddressList"
            @change="handleAddressChange" clearable></el-cascader>
                  </p>
                </div>
              </div>
              <!-- 列表 -->
              <div  v-for="item in tableData" class="df aic ele_check" style="padding-left: 15px;">
                <el-checkbox-group v-model="item.checked" @change="handleCheckedChange(item)">
                  <el-checkbox></el-checkbox>
                </el-checkbox-group>
                <ul class="df table_box jcsb f1" @click="goDetail(item.creditorNo)">
                  <li class="wd150">
                    <p class="table_item_tit">Tujuan Pinjaman</p>
                    <p>{{item.borrowingPurposes}}</p>
                  </li>
                  <li class="">
                    <p class="table_item_tit first_li">Tingkat pengembalian tahunan yang diharapkan</p>
                    <p>{{item.yearRateFin}}%</p>
                  </li>
                  <li>
                    <p class="table_item_tit">Jumlah pinjaman</p>
                    <p>Rp {{$globals.dataUtil.parseNumber(item.amountApply)}}</p>
                  </li>
                  <li>
                    <p class="table_item_tit">Batas Waktu Pinjaman</p>
                    <p>{{item.term.charAt(2)=='d'?item.term.substr(0,2)+'hari':'3bulan'}}</p>
                  </li>
                  <li style="width: 180px;">
                    <div class="table_item_tit df jcsb">
                      <p>Progress</p>
                      <p>{{item.percentage}}%</p>
                    </div>
                    <p><el-progress :text-inside="true" :stroke-width="23" :percentage="item.percentage" color="rgba(0, 214, 201, 1)"></el-progress></p>
                  </li>
                </ul>
              </div>



              <div v-if="tableData.length>0" class="df aic" style="margin-top: 30px;">
                <div class="scatteb_bot df aic">
                  <p class="bot_cirlcle" :class="isAllList?'active':''" @click="handleCheckAll"></p> 
                  <span>Pilih semua</span>
                </div>
                <div class="add_cart df aic">
                  <img src="../../assets/images/cart_icon.png" height="26" width="28">
                  <button  @click="addCartAll" :disabled="loadingbtn" :loading="loadingbtn">Keranjang Belanja</button>
                </div>
                <div class="page_block f1" style="text-align:right;">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next, sizes, jumper" :total="totalCount"></el-pagination>
                </div>
              </div>


          </div>
        </div>
  </div>

</template>
<script>
import '../../assets/css/element.css';
import store from '../../store'
export default{
  data(){
    return {
      selectCount: 0, //选中的个数
      selectAmount:0, //选中债权的总金额
      tableAmount:0,
      isAllList: false,  //是否剩余全买
      selectData:[], // 用户选中的标
      sortProperty:'biddingTime',
      sortDirection:'DESC',
      loadingbtn:false,
      currentPage:1,
      pageSize:10,
      totalCount:0,
      fatherArr: [],//获取当前点击省市大区小区时候的index，用于设置第几个children
      livingfatherArr: [],//获取当前点击省市大区小区时候的index，用于设置第几个children
      livingfatherCode: '',
      livingfatherIndex: [],
      livingAddressOptions: [],
      // liveAddressRo: ['', '', '', ''],
      liveAddressRo: ['', ''],
      tableData:[],
      amountList:[
        {code:'#40',name:'<40w'},
        {code:'40#80',name:'40w~80w'},
        {code:'80#120',name:'80w~120W'},
        {code:'120#',name:'>120w'}
      ],
      termList:[
        {code:'30d',name:'30hari'},
        {code:'30m',name:'3 bulan'},
      ],
      // 查询条件
      amountApplys:[],
      terms:[],
      checkAgelist:[18,50],
      marks: {
        0: '18',
        100: '50'
      },
      sexlist:[],
      sex:0,
      province:'',
      city:''
    }
  },
  async mounted(){
  },
  created(){
      let _this = this;
        _this.getAddressList(2,1).then(function(value) { 
          _this.fatherArr=value;
          _this.livingfatherArr=value;
          _this.livingAddressOptions=value;
        });
        _this.fetchData();

  },
  destroyed(){
  },
  methods: {
    handleCheckedChange(item){
      let _this = this;
      if(item.checked){
        _this.selectCount = _this.selectCount+1;
        _this.selectAmount = parseFloat(_this.selectAmount) + parseFloat(parseFloat(item.amountApply)-parseFloat(item.amountBuy));
        _this.selectData.push({goodsId:item.creditorNo,item:item,amount:(parseFloat(item.amountApply)-parseFloat(item.amountBuy))/10000});
      }else{
        _this.isAllList = false;
        _this.selectCount = _this.selectCount-1;
        _this.selectAmount = parseFloat(_this.selectAmount) - parseFloat(parseFloat(item.amountApply)-parseFloat(item.amountBuy));
        _this.selectData.forEach(v=>{
          if(v.goodsId == item.creditorNo){
            _this.selectData.splice(v,1);
          }
        })
      }
    },
    handleCheckAll(){
      let _this = this;
      _this.isAllList = !_this.isAllList;
      if(_this.isAllList){
        _this.tableData.forEach(v=>{
          v.checked = true;
        })
        _this.selectCount = _this.totalCount;
        _this.selectAmount = _this.tableAmount;
      }else{
        _this.tableData.forEach(v=>{
          v.checked = false;
        });
        _this.selectData = [];
        _this.selectCount = 0;
        _this.selectAmount = 0;
      }
    },
    goDetail(id){
      this.$router.push({ path:'/ScatteredDetail',query: {uid:id}});
    },
    handleCheck(e){
      this.currentPage = 1;
      this.fetchData();
    },
    handleSexCheck(e){
      if(e.length>=2 || e.length==0){
        this.sex = 0;
      }else{
        this.sex = e[0]
      }
      this.currentPage = 1;
      this.fetchData();
    },
    handleAddressChange(e){
      this.province = e[0];
      this.city = e[1];
      this.currentPage = 1;
      this.fetchData();
    },
    handleSort(a,b){
      this.sortProperty = a;
      this.sortDirection = b;
      this.currentPage = 1;
      this.fetchData();
    },
    fetchData(){
      let _this = this;
      let _data = {
        amountApplys: _this.amountApplys,
        terms: _this.terms,
        lowerAge: _this.checkAgelist[0],
        upperAge: _this.checkAgelist[1],
        sex: _this.sex,
        province: _this.province,
        city: _this.city,
        pageSize:_this.pageSize,
        pageNo: _this.currentPage,
        userId: _this.$store.getters.userUuid,
        sortProperty: _this.sortProperty,
        sortDirection: _this.sortDirection
      }
      _this.$axios.post('/api-order/scatterStandard/selectScatterstandardList', _data).then(function (re) {
        if(re.data.code==0){
          _this.tableAmount = re.data.data.amount;
          _this.tableData = re.data.data.bo.content;
          _this.totalCount = re.data.data.bo.totalElements;
          _this.tableData.forEach(v=>{
            v.yearRateFin = parseFloat(v.yearRateFin*100).toFixed(2);
            v.percentage = parseFloat(((parseFloat(v.amountBuy)/parseFloat(v.amountApply))*100).toFixed(2));
            if(_this.isAllList){  //选择了剩余全买
              v.checked = true;
            }
          })
          // console.log(_this.selectData)
          if(!_this.isAllList){   //若未选择剩余全买，则比较之前是否选择过该债权
              for(let j=0;j<_this.selectData.length;j++){
                for(let i=0;i<_this.tableData.length;i++){
                  if(_this.tableData[i].creditorNo == _this.selectData[j].goodsId){
                    _this.tableData[i].checked = true;
                  }
                }
              } 
          }
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {}); 
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData()
    },
    addCartAll(){
      let _this = this;
      let _selectData = [];
      _this.selectData.forEach(v=>{
        _selectData.push({goodsId:v.goodsId,amount:v.amount})
      })
      if(!_this.isAllList && _selectData.length == 0){
        _this.$message({type:'warning',message:'Silakan memilih clai'});
        return;
      }
      let _data1 = {'userId':_this.$store.getters.userUuid};  //一键加入购物车
      let _data2 = {
        userId: _this.$store.getters.userUuid,
        goodsList: _selectData
      }
      let _url = _this.isAllList ? '/api-order/shoppingCart/addAll' : '/api-order/shoppingCart/addList';
      let _data = _this.isAllList ? _data1 : _data2;
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.loadingbtn = true;
      _this.$axios.post(_url, _data).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.$message({type: 'success',message: 'success'});
          setTimeout(()=>{_this.$router.push("/cart")}, 1000);
        }else if(re.data.code== 10001 || re.data.code == 10002){   //未实名或不是超投都去实名认证
          _this.$message({type: 'warning',message: re.data.message});
          setTimeout(()=>{_this.$router.push("/authentication")}, 1000);
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    },
    getAddressList(h,g){
        let _this=this;
        var p=new Promise(function(resolve,reject){
          _this.$axios.post('/api-system/system/getSysDict', {"distLevel" : h,"parentCode": g,}).then(function (response) {
            let re=[],res=response.data.data;
            res.forEach((i)=>{  
              let obj={};
              obj["values"]=i.distCode;
              obj["value"]=i.distName;
              obj["label"]=i.distName;
              obj["children"]=[];
              re.push(obj)
            });
            resolve(re);
            }).catch(function (re) {
              console.log(re);
          });; 
        })
        return p; // 返回p实例对象
    },
    getLiveAddressList(e){
        let _this=this;
        _this.liveAddressRo = ['', '']
        // 找到当前点击的code
        for(let x in _this.livingAddressOptions){
          _this.livingAddressOptions[x].children = [];
        }
        
        for(let f in _this.fatherArr){
          if(_this.fatherArr[f].value==e[0]){
            _this.livingfatherCode=_this.fatherArr[f].values;
            _this.livingfatherIndex[0]=f;
          }
        }
        // 获取第二级list
        _this.getAddressList(3,_this.livingfatherCode).then(function(e) { 
          for(let f in e){
            e[f].children="";
          }
          _this.livingAddressOptions[_this.livingfatherIndex[0]].children=e;
          // _this.livingfatherArr=e;
        });
        return;
 
    },
  }
}
</script>
<style>
.scatted_bar_bg{
  width:100%;
  min-width: 1200px;
  height:50px;
  background:rgba(217,242,245,1);
  line-height: 50px;
}
.scatted_bar{
  width: 1026px;
  margin: 0 auto;
  font-size: 14px;
  color: #164276;
}
.order_box{
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  text-align:left;
}
.order_table{
  width:1004px;
  min-height: 944px;
  padding: 0px 10px 46px;
  margin: 20px auto 50px;
}
.search_tit{
  width: 992px;
  height:50px;
  padding-left: 12px;
  line-height: 50px;
  margin: 10px auto 30px;
  background:rgba(239,243,245,1);
  font-size:18px;
  font-weight:500;
  color:rgba(22,66,118,1);
}
.search_box .el-input{
  width: auto;
}
.search_item{
  margin-bottom: 26px;
  padding-left: 12px;
}
.search_item_tit{
  font-size:16px;
  font-weight:500;
  color:rgba(22,66,118,1);
  margin-right: 46px;
  width: 180px;
}
.search_item .el-slider__bar{
  background:transparent;
}
.search_item .el-slider__runway{
  background:rgba(235,241,244,1);
  height: 3px;
  top: 3px;
  margin:18px 0 16px;
}
.search_item .el-slider__button{
  width:17px;
  height:17px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(0,214,201,1);
}
.age_marks{
  margin-top: 5px;
}
.age_marks span:nth-child(1){
  margin-left: -8px;
}
.age_marks span:nth-child(2){
  margin-right: -8px;
}
.search_box .form_select .el-input__inner{
  width: 500px;
}

.table_box{
  /*width:890px;*/
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  margin-bottom: 16px;
  padding: 30px 30px 30px 30px;
  font-size:18px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(22,66,118,1);
  cursor: pointer;
  margin-left: 25px;
}
.table_box .first_li{
  width: 180px;
}
.table_box .wd150{
  width: 150px;
}
.table_item_tit{
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(87,104,119,1);
  margin-bottom: 16px;
  height: 30px;
}


  .table_left_drop.el-dropdown-menu{
    background: #132D4B;
    border: none;
  }
  .table_left_drop .el-dropdown-menu__item{
    padding: 0;
  }
  .table_left_drop .el-dropdown-menu__item p{
    padding: 0 20px;
    color: #fff;
  }
  .table_left_drop .el-dropdown-menu__item p:hover{
    background: #00D6C9;
    color: #fff;
  }
.scatteb_bot{
  font-size: 16px;
  padding-left: 10px;
}
.scatteb_bot .bot_cirlcle{
  width: 20px;
  height: 20px;
  border: 1px solid #00D6C9;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 24px;
  position: relative;
}
.scatteb_bot .bot_cirlcle.active:before{
  position: absolute;
  content: " ";
  top: 2px;
  left: 2px;
  background: #00D6C9;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
.add_cart{
  width:223px;
  height:60px;
  line-height: 60px;
  background:rgba(42,210,200,1);
  box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
  border-radius:5px;
  margin-right: 24px;
  margin-left: 24px;
}
.add_cart img{
  margin: 0 16px 0 27px;
}
.add_cart button{
  background-color: rgba(42,210,200,1);
  color: #fff;
  font-size: 16px;
}
</style>
