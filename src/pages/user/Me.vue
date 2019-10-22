<i18n>
  {
    "zh-cn":{
      "account": "账户总览",
      "invest": "投资记录",
      "persional": "个人信息"
    },
    "en":{
      "account": "Ikhtisar akun",
      "invest": "Catatan investasi",
      "persional": " Informasi pribadi"
    }
  }
</i18n>

<template>
	<div class="views_user">
	  <div class="">
	    <div class="aic jcsb" flex>
	      <ul flex >
	        <li class="header_li" v-for="item in tablist" @click="handleClick(item)" :class="{active: activeIndex === item}">{{$t(item)}}</li>
	      </ul>
	    </div>
	  </div>
		<!-- 账户总览 -->
	  <div v-if="activeIndex == 'account'">
	  	<account-views></account-views>
	  </div>
	  <!-- 投资记录 -->
	  <div v-if="activeIndex == 'invest'">
	  	<invest-record></invest-record>
	  </div>
	  <!-- 个人信息 -->
	  <div v-if="activeIndex == 'persional'">
	  	<persional-info :user-info="userinfo"></persional-info>
	  </div>
	</div>
</template>
<script>
	import InvestRecord from './userparts/InvestRecord.vue'
	import AccountViews from './userparts/AccountViews.vue'
	import PersionalInfo from './userparts/PersionalInfo.vue'
	export default{
	  components: {
	  	InvestRecord,
	  	AccountViews,
	  	PersionalInfo
	  },
		data(){
		    return {
		    	tablist: ['account','invest','persional'],
		     	activeIndex: 'account',
		      	userinfo: {}
		    }
	  	},
		created(){
			this.getUserInfo();
	  	},
		methods: {
		  	getUserInfo(){
					this.$axios.post('/api-user/user/userBasicInfo', {}).then(res => {
						let _data = res.data;
						if(_data.code == 0){
							this.userinfo = _data.data
						}else{
			        this.$message({
			          message: _data.message,
			          type: 'error'
			        });
						}
				  }).catch(res => {
					  });
		  	},
		    handleClick(item) {
		      this.activeIndex = item;
		    }
		}
	}
</script>
<style lang="less">
	.views_user{
	  	width: 1100px;
	  	margin: 20px auto 30px;
	  	padding: 20px 15px 60px;
		color: #4a4a4a;
		background: #fff;
		border-radius: 4px;

			.header_li{
			  font-size: 16px;
			  color: #99A5B0;
			  line-height: 40px;
			  cursor: pointer;
			  padding: 0 25px;
			  margin-bottom: 30px;
					 &.active{
					  color: #474747;
					  background: rgba(42,210,200,.065);
					  border-bottom: 1px solid #2AD2C8;
					  border-width: 3px;
					}
			}
		}
</style>