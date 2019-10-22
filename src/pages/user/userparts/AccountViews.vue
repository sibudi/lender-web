<i18n>
  {
    "zh-cn":{
      "mobile": "手机号:",
      "huoqiassets": "活期资产",
      "dingqiassets": "定期资产",
      "sanbiaoassets": "散标资产",
      "earnings": "昨日收益:",
      "investnum": "投资笔数:",
      "num": "笔",
      "redem": "提前赎回"
    },
    "en":{
      "mobile": "Nomor ponsel:",
      "huoqiassets": "Current Deposit Asset",
      "dingqiassets": "Fixed Deposit Asset: ",
      "sanbiaoassets": "massal Deposit Asset",
      "earnings": "Penghasilan kemarin:",
      "investnum": "Jumlah pena:",
      "num": "Jumlah uang",
      "redem": "Dicairkan terlebih dahulu"
    }
  }
</i18n>
<template>
  <div class="view_account">

      <div class="account_mobile aic" flex>
        <img src="@/assets/img/new/me_icon.png" class="user_header"/>
        <p>{{$t("mobile")}}{{mobile}}</p>
      </div>

      <div class="account_con">

        <div>
<!--           <div class="account_item" flex>
            <img src="@/assets/img/new/me_icon01.png" class="account_icon">
            <div flex class="jcsb f1">
              <div class="account_detail">
                <p class="account_type">{{$t("huoqiassets")}}</p>
                <p class="account_num">0</p>
              </div>
              <div>
                <p>{{$t("earnings")}}0</p>
                <p class="redem_btn" @click="handleRedem">{{$t("redem")}}</p>
              </div>
            </div>
          </div>
          <div class="account_item jcsb" flex>
            <img src="@/assets/img/new/me_icon02.png" class="account_icon">
            <div flex class="jcsb f1">
              <div class="account_detail">
                <p class="account_type">{{$t("dingqiassets")}}</p>
                <p class="account_num">0</p>
              </div>
              <div>
                <p>{{$t("investnum")}}0</p>
              </div>
            </div>
          </div>
          <div class="account_item jcsb" flex>
            <img src="@/assets/img/new/me_icon03.png" class="account_icon">
            <div flex class="jcsb f1">
              <div class="account_detail">
                <p class="account_type">{{$t("sanbiaoassets")}}</p>
                <p class="account_num">{{depositLockBalance}}</p>
              </div>
              <div>
                <p>{{$t("investnum")}}{{size}}</p>
              </div>
            </div>
          </div> -->

          <div id="dingqiItem">
            <div id="dingqiImg"><div id="dingqiTextTitle"><div id="dingtiTitle">Manajemen keuangan reguler</div>Stabil dan nilai tambah , duduk menanti hasil pendapatan</div><img src="@/assets/img/homeProduce2.png" alt=""></div>
            <div id="dingqiContent">
              <div class="dingqiConF">{{$t("dingqiassets") }} <span>{{depositLockBalance}}</span></div>
              <div id="dingqiCFL"></div>
              <div class="dingqiConF">{{$t("investnum") }} <span>{{size}} Jumlah pena</span></div>
            </div>
          </div>
        </div>
        <p style="clear: both;"></p>
      </div>

  </div>
</template>
<script>
export default{
  data(){
    return {
      mobile: '',
      depositLockBalance: '',
      size: '',
    }
  },
  async created(){
    this.mobile = this.$store.state.currentUser;
    await this.getUserAccount();
  },
  destroyed(){
  },
  
  methods: {
    getUserAccount(){
      this.$axios.post('/api-user/user/selectUserAccount', {}).then(res => {
        let $data = res.data;
        if($data.code == 0){
          this.depositLockBalance = $data.data.depositLockBalance+$data.data.depositBalance;
          this.size = $data.data.size;
        }else{
          this.$message({
            message: $data.message,
            type: 'error'
          });
        }
      }).catch(res => {
        });
    },
    handleRedem(){
      // this.$alert('暂无可赎回金额', '提示', {
      //       confirmButtonText: '确定',
      //       callback: action => {}
      // });
      this.$alert('Jumlah yang tidak dapat dicairkan', 'Prompt', {
            confirmButtonText: 'Saya sudah tahu',
            callback: action => {}
      });
    }
  }
}
</script>
<style lang="less">
.view_account{
  margin: 0 auto;
  padding: 0 15px;
  font-size: 14px;
  color: #7a7a7a;
      .account_mobile{
        margin-bottom: 38px;

        .user_header{
          width: 70px;
          height: 70px;
          display: block;
          margin-right: 20px;
        }
      }

    .account_con{
      .account_item{
        float: left;
        width: 420px;
        height: 106px;
        padding: 40px 30px 0 50px;
        box-shadow: 0px 1px 10px 0 rgba(226, 226, 226, 0.5);
        margin-bottom: 30px;
        border-radius: 5px;
        position: relative;
        margin-right: 30px;
          &:before{
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 12px;
            height: 100%;
            border-radius: 5px 0 0 5px;
          }

        .account_icon{
          width: 29px;
          height: 29px;
          margin-right: 20px;
          margin-top: -2px;
        }
        .account_detail{
          text-align: left;

              .account_type{
                word-spacing: 1px;
                font-weight: 600;
                margin-bottom: 14px;
                font-size: 16px;
              }
              .account_num{
                font-size: 30px;
                word-spacing: 1px;
                line-height: 42px;
              }
        }
        .redem_btn{
          padding: 0 10px;
          line-height: 24px;
          border: 1px solid #2AD2C8;
          color: #2AD2C8;
          border-radius: 20px;
          box-shadow: 0px 4px 4px 0 #EEF6FF;
          margin-top: 25px;
          cursor: pointer;
        }
      }
      .account_item:nth-child(2){
        margin-right: 0;
      }
      .account_item:nth-child(1):before{
        background: #2AD2C8;
      }
      .account_item:nth-child(2):before{
        background: #AB97D5;
      }
      .account_item:nth-child(3):before{
        background: #FDC101;
      }
    }
}
  #dingqiItem {
    width: 100%;
    border: 1px solid #eee;
    overflow: hidden;
    box-shadow: 0px 0px 5px #eee;
      #dingqiImg{
        position: relative;
        float: left;
        width: 160px;
        height: 200px;
        font-size: 12px;
        line-height: 30px;
        overflow: hidden;
         img {
          width: 100%
         }
         #dingqiTextTitle {
          color:white;
          position: absolute;
          top: 0;
          left: 0;
           #dingtiTitle {
            margin: 20px 0;
            width: 100%;
            font-size: 14px;
            line-height: 20px;
           }
         }
      }
      #dingqiContent {

        float: left;
        width: 900px;
          .dingqiConF{
            width: 400px;
            height: 160px;
            line-height: 160px;
            float: left;
            font-size: 20px;
            padding: 20px;
              span {
                color: #cab269;
                font-size: 25px;
              }
          }
          #dingqiCFL{
            height: 100%;
            border-left: 1px solid #eee;
            float: left;
            height: 160px;
            margin: 20px 0;
          }
      }

  }
</style>



