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
          <el-breadcrumb-item :to="{ path: '/Scattered' }">Investasi</el-breadcrumb-item>
          <el-breadcrumb-item>Detail klaim</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--列表-->
      <div class="order_box df jcsb">
        <div class="detail_box">
          <div class="detail_box_tit">Detail klaim</div>
          <div class="detail_box_con">
            <p>Peminjam ingin meminjam Rp {{amountApply}}</p>
            <p><el-progress :text-inside="true" :stroke-width="23" :percentage="percentage" color="rgba(0, 214, 201, 1)" style="width: 434px;margin-top:20px;"></el-progress></p>

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
            </p> -->
          </div>
          <div class="detail_box_tit">Informasi pinjaman</div>
          <div class="detail_box_con">
            <p class="detail_box_p">Tujuan Pinjaman<span>{{borrowingPurposes}}</span></p>
            <p class="detail_box_p">Batas Waktu Pinjaman<span>{{term.charAt(2)=='d'?term.substr(0,2)+'hari':'3bulan'}}</span></p>
            <p class="detail_box_p">Jumlah pinjaman<span>Rp {{$globals.dataUtil.parseNumber(amountApply)}}</span></p>
            <p class="detail_box_p">Tanggal pembayaran yang diharapkan<span>{{refundIngTime}}</span></p>
            <p class="detail_box_p">Tingkat pengembalian tahunan yang diharapkan<span style="margin-bottom: 0;">{{yearRateFin}}%</span></p>
          </div>
        </div>
        <div class="detail_box">
          <div class="detail_box_tit">Informasi Peminjam</div>
          <div class="detail_box_con" style="padding-bottom: 20px;">
            <p class="detail_box_p">Nomor ponsel<span>{{mobileNumberHid}}</span></p>
            <p class="detail_box_p">Nama lengkap<span>{{realName}}</span></p>
            <p class="detail_box_p">Nomor ID<span>{{idCardNo}}</span></p>
            <p class="detail_box_p">Tanggal lahir<span>{{birthday}}</span></p>
            <p class="detail_box_p">Jenis kelamin<span>{{sex}}</span></p>
            <p class="detail_box_p">Alamat Tempat Tinggal<span>{{address}}</span></p>
            <p class="detail_box_p">Pembagian Kredit<span>{{score}}</span></p>
            <p class="detail_box_p">Riwayat Frekuensi Pinjaman<span>{{loanCount}}</span><span class="check_detail_operate" @click="goHistory(uuid)">Lihat Detail</span></p>
          </div>
            
            <div class="df aic buy_count_box">
              <p>Nominal Produk</p>
              <div class="df count_boxx aic jcsb">
                <p class="minus_btn" @click="cutNumber">-</p>
                <p class="df aic">Rp&nbsp;<el-input v-model="count"  type="number" class="cart_plus_input"></el-input>&nbsp; 0,000</p>
                <p class="plus_btn" @click="addNumber">+</p>
              </div>
            </div>
            <div class="df add_cart_box">
              <div class="add_cart df aic">
                <img src="../../assets/images/cart_icon.png" height="26" width="28">
                <button  @click="addCart">Masukkan ke keranjang</button>
              </div>
              <div class="add_cart df aic">
                <img src="../../assets/images/pay_icon.png" height="26" width="28">
                <button  @click="handlePay">One Click Payment</button>
              </div>
            </div>


        </div>
      </div>
    </div>

</template>
<script>
import '../../assets/css/element.css';
export default{
  data(){
    return {
      percentage:0,
      borrowingPurposes:'',
      term:'',
      amountApply:0,
      refundIngTime:'',
      yearRateFin:0,
      isbuy:0,
      mobileNumber:'',
      mobileNumberHid:'',
      realName:"",
      idCardNo:'',
      birthday:'',
      sex:'',
      address:'',
      score:'',
      count:1,
      loanCount:0,

      uuid:'',
      maxCount:0,
      goodsId:''
    }
  },
  async mounted(){
  },
  created(){
    if(this.$route.query&&this.$route.query['uid']){
      this.uuid = this.$route.query['uid'];
      this.bindData();
    }
  },
  destroyed(){
  },
  methods: {
    handlePay(){
      let _this = this;
      if(_this.count <= 0 || _this.count == ''){
        _this.count = 1;
      }
      if(_this.count > _this.maxCount){
        _this.count = _this.maxCount;
      }
      let _amount = parseInt(_this.count)*10000
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('/api-order/order/orderSubmit', {'userUuid':_this.$store.getters.userUuid,creditorNo:_this.uuid,amount:_amount}).then(function (re) {
        loading.close();
        if(re.data.code==0){
          if(re.data.data.tip){
            _this.$message({type:'warning',message:'Bagian ini sudah dibeli oleh nasabah lain, Silahkan anda membeli kembali, dan optimalkan jumlah pembelian'});
            setTimeout(function(){_this.$router.push({path:'/pay',query:{uid:re.data.data.orderNo}})},3000)
          }else{
            _this.$router.push({path:'/pay',query:{uid:re.data.data.orderNo}})
          }  
        }else if(re.data.code== 10001 || re.data.code == 10002){   //未实名或不是超投都去实名认证
          _this.$message({type: 'warning',message: re.data.message});
          setTimeout(()=>{_this.$router.push("/authentication")}, 1000);
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});

    },
    goHistory(mobileBumber){
      this.$router.push({ path:'/HistoryDetail',query: {uid:mobileBumber,mos:this.mobileNumber,name:this.realName}});
      
    },
    cutNumber: async function(){
      let _this = this;
      _this.count = parseInt(_this.count);
      if (_this.count <= 1) {
        return;
      }
      let number = (_this.count - 1 > 1) ? _this.count - 1 : 1;
      _this.count = number;
    },
    addNumber: async function(){
      let _this = this;
      _this.count = parseInt(_this.count);
      if (_this.count >= _this.maxCount) {
        _this.$message({type:'warning',message:'Tidak bisa membeli lebih banyak'})
        return;
      }
      let number = _this.count + 1;
      _this.count = number;
    },
    addCart(){
      let _this = this;
      if(_this.count <= 0 || _this.count == ''){
        _this.count = 1;
      }
      if(_this.count>_this.maxCount){
        _this.$message({type:'warning',message:'Tidak bisa membeli lebih banyak'});
        _this.count = _this.maxCount;
        return;
      }
      let _data = {
        userId: _this.$store.getters.userUuid,
        goodsList: [{
          goodsId: _this.uuid,
          amount:_this.count
        }]
      }
      const loading = _this.$loading({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
      _this.$axios.post('/api-order/shoppingCart/addList', _data).then(function (re) {
        loading.close();
        if(re.data.code==0){
          _this.$message({type: 'success',message: 'success'});
        }else if(re.data.code== 10001 || re.data.code == 10002){   //未实名或不是超投都去实名认证
          _this.$message({type: 'warning',message: re.data.message});
          setTimeout(()=>{_this.$router.push("/authentication")}, 1000);
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {setTimeout(()=>{loading.close();}, 1000);});
    },
    bindData(){
      let _this = this;
      _this.$axios.post('/api-order/scatterStandard/selectScatterstandardById', {creditorNo:_this.uuid}).then(function (re) {
        if(re.data.code==0){
              let _data = re.data.data;
              let _time = _data.refundIngTime.split('-')
              _this.percentage = parseFloat(((parseFloat(_data.amountBuy)/parseFloat(_data.amountApply))*100).toFixed(2));
              _this.borrowingPurposes = _data.borrowingPurposes;
              _this.term = _data.term;
              _this.amountApply = _data.amountApply;
              _this.refundIngTime = _time[2]+'-'+_time[1]+'-'+_time[0];
              _this.yearRateFin = parseFloat(_data.yearRateFin*100).toFixed(2);
              _this.mobileNumber = _data.mobileNumber;
              _this.realName = _data.realName;
              _this.idCardNo = _data.idCardNo;
              _this.birthday = _data.birthday;
              _this.loanCount = _data.loanCount;
              _this.sex = _data.sex==1?'Laki-laki':'Perempuan';
              _this.address = _data.address;
              _this.score = _data.score;
              _this.maxCount = (parseFloat(_data.amountApply)-parseFloat(_data.amountBuy))/10000;
              if(_data.isBuy == 0){
                _this.mobileNumberHid = _data.mobileNumber.substr(0,3)+"****"+_data.mobileNumber.substr(7);
              }else{
                _this.mobileNumberHid = _data.mobileNumber;
              }
        }else {
          _this.$message(re.data.message);
        }
      }).catch(function (re) {}); 
    }
  }
}
</script>
<style scoped>
.detail_con{
  width: 1200px;
  margin: 0px auto 53px;
  text-align: left;
}
.detail_con .order_box{
  width: 1180px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  padding: 10px 10px 230px;
}
.detail_con .detail_box{
  width:583px;
  border:1px solid rgba(212,219,225,1);
}
.detail_con .detail_box .detail_box_tit{
    width:563px;
    height:50px;
    padding-left: 20px;
    line-height: 50px;
    background:rgba(239,243,245,1);
    font-size:18px;
    font-weight:500;
    color:rgba(22,66,118,1);
    border:1px solid rgba(212,219,225,1);
    border-left: none;
    border-right: none;
}
.detail_con .detail_box .detail_box_tit:nth-child(1){
  border-top: none;
}
.detail_box .detail_box_con{
  padding: 30px 0 30px 52px;
  color: #576877;
}
.detail_box_p{
  margin-top: 19px;
  margin-bottom: 40px;
}
.detail_box_p span{
  font-size: 18px;
  color: #164276;
  margin-left: 20px;
}
/*.detail_con span.detail_box_p{
  margin-top: 0;
  margin-bottom: 40px;
}*/
.detail_con span.check_detail_operate{
  color: #00D6C9;
  margin-left: 205px;
  margin-top: 5px;
  cursor: pointer;
}

.detail_con .add_cart_box{
  padding: 0 0 0 60px;
}
.detail_con .add_cart{
  clear: both;
  width:243px;
  height:60px;
  line-height: 60px;
  background:rgba(42,210,200,1);
  box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
  border-radius:5px;
  margin: 30px 14px 80px 0px;
}
.detail_con .add_cart img{
  margin: 0 16px 0 20px;
}
.detail_con .add_cart button{
  background-color: rgba(42,210,200,1);
  color: #fff;
  font-size: 16px;
}
.detail_con .buy_count_box{
  font-size: 18px;
  color: #164276;
  padding-left: 52px;
}
.detail_con .count_boxx{
  width:305px;
  height:50px;
  border-radius:2px;
  border:1px solid rgba(212,219,225,1);
  padding: 0 22px;
  margin-left: 26px;
}
.detail_con .minus_btn,.detail_con .plus_btn{
  width:20px;
  height:20px;
  border-radius:2px;
  border:1px solid rgba(212,219,225,1);
  text-align: center;
  line-height: 20px;
  font-size: 20px;
  cursor: pointer;
}
.detail_con .cart_plus_input{
  width:95px;
  margin: 0 6px;
}

</style>
<style>
.detail_con .cart_plus_input .el-input__inner{
  font-size: 18px;
  height: 20px;
  line-height: 20px;
  border-radius:2px;
  border:1px solid rgba(212,219,225,1);
  padding: 0 2px;
  text-align: center;
}
.detail_con .el-progress__text{
  font-size: 14px !important;
  margin-left: 15px;
}
</style>
