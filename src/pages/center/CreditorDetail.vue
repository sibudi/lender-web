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
            <p class="" style="font-size: 18px;color:#164276;margin-top:19px;">Rp {{$globals.dataUtil.parseNumber(amountBuy)}}</p>
          </div>
          <div class="detail_box_tit">Detail klaim</div>
          <div class="detail_box_con">
            <p>Status Klaim</p>
            <p class="" style="color:#FFA922;font-size: 18px;margin-top:19px;">{{getOrderStatus(status)}}</p>
          </div>
          <div class="detail_box_tit">Informasi pinjaman</div>
          <div class="detail_box_con">
            <p class="detail_box_p">Tujuan Pinjaman<span>{{borrowingPurposes}}</span></p>
            <p class="detail_box_p">Batas Waktu Pinjaman<span>{{term}}</span></p>
            <p class="detail_box_p">Jumlah pinjaman<span>Rp {{$globals.dataUtil.parseNumber(amountApply)}}</span></p>
            <p class="detail_box_p">Tanggal pembayaran yang diharapkan<span style="white-space: pre;">{{refundIngTime}}</span></p>
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
            <p class="detail_box_p">Alamat<span>{{address}}</span></p>
            <p class="detail_box_p">Pembagian Kredit<span>{{score}}</span></p>
            <p class="detail_box_p">Riwayat Frekuensi Pinjaman<span>{{loanCount}}</span><span class="check_detail_operate" @click="goHistory(uuid)">Lihat Detail</span></p>
            <p class="detail_box_p">Asuransi(11%) : <span>Rp {{$globals.dataUtil.parseNumber(insurance)}}</span></p>
            <p class="detail_box_p">Total : <span>Rp {{$globals.dataUtil.parseNumber(insurance+amountApply)}}</span></p>

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
      uuid:'',
      percentage:0,
      borrowingPurposes:'',
      term:'',
      amountBuy:0,
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
      insurance:0,
      score:'',
      loanCount: '',
      debts:{},
      status:0
    }
  },
  async mounted(){
  },
  created(){
    this.debts = JSON.parse(localStorage.getItem('Debts'));
    this.uuid = this.debts.creditorNo;
    this.bindData();
  },
  destroyed(){
  },
  methods: {
    getOrderStatus(status){
      // let list = [
      // {code:'1',name:'投标中'},{code:'2',name:'锁定中'},{code:'3',name:'满标'},{code:'4',name:'放款中'},{code:'5',name:'放款失败'}
      // ,{code:'6',name:'放款成功'},{code:'7',name:'放款清分成功'},{code:'8',name:'放款成功'},{code:'9',name:'还款处理中'},{code:'10',name:'已还款'}
      // ,{code:'11',name:'逾期已还款'},{code:'12',name:'还款清分成功'},{code:'13',name:'已还款'}];
      let list = [
      {code:'1',name:'Penawaran'},{code:'2',name:'Terkunci'},{code:'3',name:'Penuh'},{code:'4',name:'Pinjaman'},{code:'5',name:'Pinjaman gagal'}
      ,{code:'6',name:'Pinjaman Berhasil'},{code:'7',name:'Peminjaman Dana Berhasil'},{code:'8',name:'Pinjaman Berhasil'},{code:'9',name:'Dalam Proses Pengembalian'},{code:'10',name:'Sudah Lunas'}
      ,{code:'11',name:'Pelunasan terlambat'},{code:'12',name:'Pengembalian Dana Berhasil'},{code:'13',name:'Sudah Lunas'}];
      let re = '';
      list.forEach(v=>{if(v.code == status){re = v.name;return;}})
      return re;
    },
    goHistory(){
      this.$router.push({path:'/history',query:{mos:this.mobileNumber,name:this.realName}});
    },
    bindData(){
      let _this = this;
      _this.$axios.post('/api-order/scatterStandard/selectScatterstandardById', {creditorNo:_this.uuid}).then(function (re) {
        if(re.data.code==0){
              let _data = re.data.data;
              if(_data.creditorType!=2){
                let _time = _data.refundIngTime.split('-')
                _this.refundIngTime = _time[2]+'-'+_time[1]+'-'+_time[0];
              }
              else{
                let output = "";
                _data.refundPlanList.forEach(function(entry) {
                    // console.log(entry);
                    let date = new Date(entry.refundIngTime);
                    output += "\n • " + (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + '-'
                    + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + date.getFullYear() + ' (Rp ' + _this.$globals.dataUtil.parseNumber(entry.refundIngAmount) + ')';
                });
                _this.refundIngTime = output;
              }
              // let _time = _data.refundIngTime.split('-')
              _this.percentage = parseFloat(((parseFloat(_data.amountBuy)/parseFloat(_data.amountApply))*100).toFixed(2));
              _this.borrowingPurposes = _data.borrowingPurposes;
              // _this.term = _data.term;
              _this.amountApply = _data.amountApply;
              // _this.refundIngTime = _time[2]+'-'+_time[1]+'-'+_time[0];
              _this.yearRateFin = parseFloat(_data.yearRateFin*100).toFixed(2);
              _this.mobileNumber = _data.mobileNumber;
              console.log(_data.realName);
              console.log(_data.mobileNumber);
              console.log(_data.yearRateFin);
              _this.realName = _data.realName;
              _this.idCardNo = _data.idCardNo;
              _this.amountBuy = _data.amountBuy;
              _this.birthday = _data.birthday;
              _this.loanCount = _data.loanCount;
              _this.sex = _data.sex==1?'Laki-laki':'Perempuan';
              _this.address = _data.address;
              _this.score = _data.score;
              _this.status = _data.status;
              _this.maxCount = (parseFloat(_data.amountApply)-parseFloat(_data.amountBuy))/10000;
              if(_data.insurance!=0){
                _this.insurance = _data.insurance;
              }
              if(_data.term.endsWith('d')){
                _this.term = _data.term.substring(0, _data.term.length - 1) + " Hari";
              }else if(_data.term.endsWith('w')){
                _this.term = _data.term.substring(0, _data.term.length - 1) + " Minggu";
              }else if(_data.term.endsWith('m')){
                _this.term = _data.term.substring(0, _data.term.length - 1) + " Bulan";
              }
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
<style>
.rights_detail_con{
  width: 1200px;
  margin: 0px auto 53px;
  text-align: left;
}
.rights_detail_con .order_box{
  width: 1180px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(212,219,225,1);
  padding: 10px 10px 230px;
}
.rights_detail_con .detail_box{
  width:583px;
  border:1px solid rgba(212,219,225,1);
}
.rights_detail_con .detail_box .detail_box_tit{
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
.rights_detail_con .detail_box .detail_box_tit:nth-child(1){
  border-top: none;
}
.rights_detail_con .detail_box_con{
  padding: 30px 0 30px 52px;
  color: #576877;
}
.rights_detail_con .detail_box_p{
  margin-top: 19px;
  margin-bottom: 40px;
}
.rights_detail_con .detail_box_p span{
  font-size: 18px;
  color: #164276;
  margin-left: 20px;
}
.rights_detail_con span.check_detail_operate{
  color: #00D6C9;
  margin-left: 200px;
  margin-top: 5px;
  cursor: pointer;
}
</style>
