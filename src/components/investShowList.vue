<i18n>
  {
    "zh-cn":{
      "_investPurpose":"用途",
      "_riskRank":"风险等级",
      "_Kode":"编号",
      "_yearRate":"年利率",
      "_loanTerm":"贷款期限",
      "_investAmount":"金额",
      "_purchaseInvestment":"立即购买 ",
      "_insurance":"保险保障",
      "_bindCardFirst":"请先进行绑定银行卡",
      "_authenticaFirst":"请先进行实名认证"

    },
    "en":{
      "_investPurpose": "Tujuan pinjaman",
      "_riskRank":"Tingkat resiko",
      "_Kode":"Kode",
      "_yearRate":"Tingkat Bunga Tahunan",
      "_loanTerm":"Durasi pinjaman",
      "_investAmount":"pinjamanJumlah",
      "_purchaseInvestment":"Beli sekarang",
      "_insurance":"insurance",
      "_bindCardFirst":"Pendaftaran kartu bank gagal",
      "_authenticaFirst":"Nama asli tidak sesuai dengan pengguna"
    }
  }
</i18n>
<template>
  <div class="investShowList">
    <el-table
      stripe
      :data="tableData"
      header-align="center"
      :header-cell-style='{
        "width": "100%","text-align": "center","padding":"5px 0","color": "black","font-size": "14px"
      }'
      :cell-style='{"padding":"10px 0"}'
      style="width: 100%">
      <el-table-column
        prop="borrowingPurposes"
        :label='$t("_investPurpose")'>
      </el-table-column>
      <el-table-column
        prop=""
        :label='$t("_riskRank")'>
          <template slot-scope="scope">
            {{"Rendah"}}
          </template>
      </el-table-column>
      <el-table-column
        prop="creditorNo"
        :label='$t("_Kode")'
        width="180px">
      </el-table-column>        
      <el-table-column
        prop="yearRateFin"
        class-name="columStyle"
        width="180px"
        :label='$t("_yearRate")'>
        <template  slot-scope="scope">
         <span class="baifenhao">{{scope.row.yearRateFin }}</span> <a class="baifenhao1">%</a>
        </template>
      </el-table-column>        
      <el-table-column
        prop="term"
        :label='$t("_loanTerm")'>
      </el-table-column>        
      <el-table-column
        prop="amountApply"
        :label='$t("_investAmount")'>
      </el-table-column>      
      <el-table-column
        prop=""
        label=""
        width="140px">
         <template slot-scope="scope">
          <div id="purchaseCli">
            <el-button @click="onClick(scope.row)" type="text" class="purchaseNow">{{$t('_purchaseInvestment')}}</el-button>
            <span class="insurce"><img src="../assets/img/protect.png" alt="">{{$t('_insurance')}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableData"],
  name: 'investShowList',
  data () {
    return {

    }
  },
  methods: {
    onClick(e){
      let s=i=>{
        let p = new Promise((resolve, reject)=>{
          this.$axios.post('/api-user/user/userAuthBankInfoBySession', {
            "creditorNo": i
          })
          .then((response)=>{
            resolve(response.data.data);
          })
          .catch((response)=>{
            // console.log(response);
          });
        });
        return p;            
      };
      s(e["creditorNo"]).then((response)=>{
        this.$store.dispatch("setPurchaseInvestment",e);//保存该标的信息
        this.$store.dispatch("loginToBack","/purchaseInvestment");//保存该标的信息

        if(!this.$store.getters.token){
          this.$message("")
          this.$router.push("./login");
          return;
        }
        if(!response.authStatus){
          let _this=this;
            this.$alert("Nama asli tidak sesuai dengan pengguna",'', {
              confirmButtonText: 'ok',
              dangerouslyUseHTMLString: true,

              center: true
            },{}).then(() => {
              _this.$router.push("./authentication");
              return;
            }).catch(() => {
            });
        }else if(!response.bankStatus){
          let _this=this;
            this.$alert("Pendaftaran kartu bank gagal",'', {
              confirmButtonText: 'ok',
              dangerouslyUseHTMLString: true,
              center: true
            },{}).then(() => {
              _this.$router.push("./bindCard");
              return;
            }).catch(() => {
            });
        }else {
          this.$store.dispatch("loginToBack",0);
          this.$router.push("/purchaseInvestment");
          if(this.$route.path=="/purchaseInvestment"){
            window.location.reload();
          }
        }
      })
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
  .onClick {
    height: 20px;
  }
  .purchaseNow {
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #CAB269;
    border-radius: 20px;
    border: 1px solid #CAB269;
    padding: 0;
    display: block;
  }
  #app .purchaseNow:hover {
    color: white;
    background-color: #CAB269;
    border: 1px solid #CAB269;
  }
  .investShowList .columStyle {
    color: #CAB269;
    font-size: 20px;
    width: 20%;
    z-index: 222;
  }
  
  #app .insurce {
    display: block;
    width: 100%;
    text-align: left;
    /*padding-left: 10px;*/
    color: #CAB269;
  }
  #app .insurce img {
    display: block;
    float: left;
    width: 16px;
    padding: 3px;
    height: 16px;
  }
  .el-table th {
    text-align: center;
  }
  #purchaseCli {
    width: 100%;
    height: 40px;
  }
  .baifenhao {
    color: #CAB269;
    font-size: 30px;
  }
  .baifenhao1 {
    color: #CAB269;
    font-size: 16px;
  }
</style>
