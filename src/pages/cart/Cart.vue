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
<div>
  <div class="cart_del_bar" v-if="fullNumber>0">
    <div class="cart_del_info df aic">
      <!-- <img src="../../assets/images/login_logo.png" height="20" width="20" alt=""> -->
      <i class="el-icon-warning"></i>
      <p>Ada {{fullNumber}} target yang sudah penuh, <span  class="colC9" @click="handleDel">hapus sekali klik</span></p>
      <!-- <p>有{{fullNumber}}个标的已经满标了，<span class="colC9" @click="handleDel">一键删除</span></p> -->
    </div>
  </div>

  <div class="cart_con" v-if="tableData.length>0">
    <!--列表-->
    <div class="order_box order_table">
        <div  v-for="(item,index) in tableData">
          <ul class="df table_item jcsb">
            <li  class="wd150">
              <p class="table_item_tit">Tujuan Pinjaman</p>
              <p>{{item.borrowingPurposes}}</p>
            </li>
            <li>
              <p class="table_item_tit first_li">Tingkat pengembalian tahunan yang diharapkan</p>
              <p>{{item.yearRateFin}}%</p>
            </li>
            <li>
              <p class="table_item_tit">Jumlah pinjaman</p>
              <p>Rp {{$globals.dataUtil.parseNumber(item.totalAmount)}}</p>
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
            <li style="width: 190px;">
              <div class="table_item_tit df jcsb">
                <p @click="handleOneDel(item.goodsId)" style="cursor:pointer;"> Menghapus</p>
                <p class="colC9" style="cursor:pointer;" @click="buyAll(item)">Sisa Pembelian</p>
              </div>
              <div class="df cart_plus_box aic jcsb">
                <p class="minus_btn" @click="cutNumber(item.count,index,item.goodsId)">-</p>
                <p class="df aic">Rp&nbsp;<el-input v-model="item.count" type="number" class="cart_plus_input" @blur="handleBlur(item)" min='1' @focus="handleFocus(item)"></el-input>&nbsp; 0,000</p>
                <p class="plus_btn" @click="addNumber(item)">+</p>
              </div>
            </li>
            <div class="cart_full" v-if="item.count==0&&item.count !=''&&!item.focus"><p class="full_text">Penuh</p></div>
          </ul>
        </div>
    </div>
  </div>

  <div class="cart_topay_bar" v-if="tableData.length>=0">
    <div class="cart_topay_con df aic">
      <div class="cart_pay_left df aic" @click="handleBuyAll">
        <p class="cirlcle" :class="allIn?'active':''"></p> 
        <span>Sisa Pembelian</span>
      </div>
      <div class="cart_pay_count f1">
        <p>Jumlah total <span class="cart_pay_color">Rp {{$globals.dataUtil.parseNumber(totalAmount)}}</span></p>
        <p>Jumlah yang tersedia <span>Rp {{$globals.dataUtil.parseNumber(currentBalance)}}</span></p>
      </div>
      <div class='cart_pay_btn df aic' @click="handlePay"><img src="../../assets/images/pay_icon.png" height="26" width="28"><span>One Click Payment</span></div>
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
      currentPage:1,
      pageSize:10,
      totalCount:0,
      tableData:[],
      currentBalance:0,
      totalAmount:0,
      fullNumber:0,
      allIn:false
    }
  },
  async mounted(){
  },
  created(){
    this.bindGrid();
    this.selectUserAccount();
  },
  destroyed(){
  },
  methods: {
    //左下角剩余全买
    handleBuyAll(){
      let _this = this;
      if(_this.allIn){
        const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
        _this.$axios.post('/api-order/shoppingCart/resetCart', {}).then(function (re) {
          loading.close();
          if(re.data.code==0){
            _this.tableData.forEach(v=>{
              v.count = 1;
            });
            _this.handleCount();
            _this.allIn = !_this.allIn;
          }else {
            _this.$message(re.data.message);
          }
        }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);}); 
      }else{
        _this.tableData.forEach(v=>{
          console.log(parseInt(v.totalAmount.split('.')[0]),parseInt(v.laveAmount.split('.')[0]))
          v.count = (parseInt(v.totalAmount.split('.')[0])-parseInt(v.laveAmount.split('.')[0]))/10000;
        });
        _this.handleCount();
        _this.allIn = !_this.allIn;
      }

    },
    // 单个剩余全买
    buyAll(item){
      let _laveAmount = parseInt(item.laveAmount.split('.')[0]);
      let _totalAmount = parseInt(item.totalAmount.split('.')[0]);
      item.count = parseInt((_totalAmount-_laveAmount))/10000;
      this.changeCutNum(item.goodsId,item.count);
    },
    // 一键支付
    handlePay(){
      let _this = this;
      let _amount = 0;
      _this.tableData.forEach(v =>{
        _amount = _amount + parseInt(v.count)*10000;
      })
      let _data = {
        'userUuid':_this.$store.getters.userUuid,
        allIn:_this.allIn,
        amount:_amount
      }
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('/api-order/order/orderSubmit', _data).then(function (re) {
        loading.close();
        if(re.data.code==0){
          if(re.data.data.tip){
            _this.$message({type:'warning',message:'Bagian ini sudah dibeli oleh nasabah lain, Silahkan anda membeli kembali, dan optimalkan jumlah pembelian'});
            setTimeout(function(){_this.$router.push({path:'/pay',query:{uid:re.data.data.orderNo}})},3000)
          }else{
            _this.$router.push({path:'/pay',query:{uid:re.data.data.orderNo}});
          }  
        }else if(re.data.code== 10001 || re.data.code == 10002){   //未实名或不是超投都去实名认证
          _this.$message({type: 'warning',message: re.data.message});
          setTimeout(()=>{_this.$router.push("/authentication")}, 1000);
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    },
    // 一键删除满标
    handleDel(){
      let _this = this;
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('/api-order/shoppingCart/deleteFull', {'userId':_this.$store.getters.userUuid}).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.$message({type: 'success',message: 'success'});
          _this.fullNumber = 0;
          _this.bindGrid();
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    },
    // 单个删除购物车商品
    handleOneDel(goodsId){
      let _this = this;
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('api-order/shoppingCart/deleteOne', {'userId':_this.$store.getters.userUuid,goodsId:goodsId}).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.$message({type: 'success',message: 'success'});
          _this.bindGrid();
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    },
    // 计算总金额
    handleCount(){
      let _this = this;
      let _amount = 0;
      _this.tableData.forEach(v =>{
        _amount = _amount + parseFloat(v.count)*10000;
      })
      _this.totalAmount = _amount;
    },
    // 改变购物车数量
    changeCutNum: async function(goodsId,amount){
      let _this = this;
      _this.$axios.post('api-order/shoppingCart/updateAmount', {'userId':_this.$store.getters.userUuid,goodsId:goodsId,amount:amount}).then(function (re) {
        if(re.data.code==0){
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {});
      _this.handleCount();
    },
    // 购物车数量改变，失去焦点时
    handleBlur(item){
      let _this = this;
      let _laveAmount = parseInt(item.laveAmount.split('.')[0]);
      let _totalAmount = parseInt(item.totalAmount.split('.')[0]);
      let _maxCount = (_totalAmount-_laveAmount)/10000
      if(item.count > _maxCount){
        _this.$message({type:'warning',message:'Tidak bisa membeli lebih banyak'});
        item.count = _maxCount;
      }
      if(item.count <=0 || item.count == ''){
        item.count = 1;
      }
      item.focus = false;
      _this.changeCutNum(item.goodsId,item.count);
    },
    // 购物车数量改变，输入框内容发生变化时
    handleFocus(item){
      item.focus = true;
    },
    cutNumber: async function(num,index,goodsId){
      let _this = this;
      num = parseInt(num);
      if (num <= 1) {
        return;
      }
      let number = (num - 1 > 1) ? num - 1 : 1;
      _this.tableData[index].count = number;
      _this.changeCutNum(goodsId,number)
    },
    addNumber: async function(item){
      let _this = this;
      let _laveAmount = parseInt(item.laveAmount.split('.')[0]);
      let _totalAmount = parseInt(item.totalAmount.split('.')[0]);
      let _maxCount = (_totalAmount-_laveAmount)/10000;
      if(parseInt(item.count) >= _maxCount){
        _this.$message({type:'warning',message:'Tidak bisa membeli lebih banyak'});
        return;
      }
      item.count++;
      _this.changeCutNum(item.goodsId,item.count)
    },
    // 剩余金额
    selectUserAccount(){
      let _this = this;
      _this.$axios.post('api-user/user/selectUserAccount', {userId:_this.$store.getters.userUuid}).then(function (re) {
        if(re.data.code==0){
          _this.currentBalance = re.data.data.currentBalance;
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {});
    },
    // 购物车列表
    bindGrid: async function(){
      let _this = this;
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('api-order/shoppingCart/getList', {'userId':_this.$store.getters.userUuid}).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.tableData = re.data.data;
          _this.tableData.forEach(v=>{
            v.yearRateFin = parseFloat(v.yearRateFin*100).toFixed(2);
            //计算满标个数
            if(v.count == 0){
              _this.fullNumber++
            }
            //进度
            v.percentage = parseFloat(((parseInt(v.laveAmount.split('.')[0])/parseInt(v.totalAmount.split('.')[0]))*100).toFixed(2));
          })
          _this.handleCount();
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    },
  }
}
</script>
<style scoped>
.cart_del_bar{
  width:100%;
  height:50px;
  background:rgba(217,242,245,1);
}
.cart_del_info{
  width: 1200px;
  height: 50px;
  margin: 0 auto;
  font-size: 18px;
  color: #164276;
  cursor: pointer;
}
.cart_del_info .el-icon-warning{
  margin-right: 10px;
  color: #FFC018;
  font-size: 20px;
}
.cart_con{
  width: 1200px;
  margin: 0px auto 160px;
  text-align: left;
}

.cart_con .order_table{
  width:1180px;
  /*min-height: 940px;*/
  padding: 10px 10px 0px;
  overflow: hidden;
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  margin-top: 20px;
}

.cart_con .table_item{
  /*width:1086px;*/
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  margin-bottom: 16px;
  padding: 26px 22px 20px 22px;
  font-size:18px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(22,66,118,1);
  position: relative;
}
.table_item .first_li{
  width: 180px;
}
.table_item .wd150{
  width: 150px;
}
.cart_con .table_item_tit{
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(87,104,119,1);
  margin-bottom: 14px;
  height: 32px;
}
.cart_con .table_item .cart_full{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background:rgba(22,66,118,0.16);
}
.cart_full .full_text{
  position: absolute;
  width:90px;
  height:90px;
  background:rgba(42,210,200,1);
  font-size: 18px;
  border-radius: 50%;
  text-align: center;
  line-height: 90px;
  color: #fff;
  right: 66px;
  top: 24px;
}
.cart_plus_box{
  width:175px;
  height:34px;
  padding: 0 8px;
  border-radius:2px;
  border:1px solid rgba(212,219,225,1);
  font-size: 18px;
  font-weight: 400;
  margin-top: -5px;
}
.minus_btn,.plus_btn{
  width:20px;
  height:20px;
  border-radius:2px;
  border:1px solid rgba(212,219,225,1);
  text-align: center;
  line-height: 16px;
  font-size: 20px;
  cursor: pointer;
}
.cart_plus_input{
  width:40px;
/*  height:20px;*/

}



.cart_topay_bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  min-width: 1200px;
  height:136px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  color: #164276;
  font-weight: 500;
  overflow: auto;
}
.cart_topay_con{
  width: 1150px;
  height: 100%;
  margin: 0 auto;
  padding-left: 50px;
  text-align: left;
  /*background-color: #ff0*/
}
.cart_pay_left{
  font-size: 24px;
}
.cart_pay_left .cirlcle{
  width: 24px;
  height: 24px;
  border: 1px solid #00D6C9;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 16px;
  position: relative;
}
.cart_pay_left .cirlcle.active:before{
  position: absolute;
  content: " ";
  top: 2px;
  left: 2px;
  background: #00D6C9;
  width: 20px;
  height: 20px;
  border-radius: 50%;

}
.cart_pay_count{
  font-size: 20px;
  text-align: right;
}
.cart_pay_count p:nth-child(1){
  margin-bottom: 10px;
}
.cart_pay_count span{
  margin-left: 10px;
}
.cart_pay_color{
  font-size: 36px;
  color: #00D6C9;
}
.cart_pay_btn{
  width:280px;
  height:60px;
  background:rgba(42,210,200,1);
  box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
  border-radius:5px;
  color: #fff;
  font-size: 16px;
  margin-left: 60px;
  cursor: pointer;
}
.cart_pay_btn img{
  margin: 0 27px 0 27px;
}
</style>
<style>
.cart_plus_input .el-input__inner{
  height: 20px;
  line-height: 20px;
  border-radius:2px;
  border:1px solid rgba(212,219,225,1);
  padding: 0 2px;
  text-align: center;
}
</style>
