<i18n>
  {
    "zh-cn":{
      "_programTearm":"项目期限",
      "_programAccount":"项目金额",
      "_yearRate":"年化利率",
      "_singalInvestment":"散标",
      "_freeInvestment":"活期",
      "_fixedInvestment":"定期",
      "_insurance":"购买流程",
      "registerBorrower":"註冊出借人",
      "authentication":"身份認證",
      "loanInvest":"出借",
      "earnRate":"賺取收益"
    },
    "en":{
      "_programTearm":"Tenggat waktu proyek",
      "_programAccount":"Jumlah proyek",
      "_singalInvestment":"Tanda massal",
      "_freeInvestment":"Periode saat ini",
      "_fixedInvestment":"Reguler",
      "_insurance":"Proses pembelian",
      "registerBorrower":"Daftar sebagai pemberi pinjaman",
      "authentication":"Otentikasi identitas",
      "loanInvest":"Pinjaman",
      "earnRate":"Hasilkan pendapatan"
    }
  }
</i18n>

<template>
	<div>
		<div id="investmentBody">
<!-- 			<div id="userInfTitless">
				<div  v-for="e in investType" :class="{currentTitle:e==isCurrentTitle}" @click="changeTitleStyle(e)">{{$t(e)}}</div>
			</div>
			<div class="bodyContents" v-if="'_fixedInvestment'!=isCurrentTitle">
				<div class="selectItemPeriodess">
					<ul>
						<li class="selectItemPeriodTitle">{{$t('_programTearm')}}</li> 
						<li v-for="(liItemPeriod,index) in ItemPeriodLis" @click="liPeriodClick(liItemPeriod,index)" :class="{styleObject:index==stylePeriodCurrent}">{{liItemPeriod.name}}</li>
					</ul>
				</div>
				<div class="selectItemPeriodess">
					<ul>
						<li class="selectItemPeriodTitle">{{$t('_programAccount')}}</li> 
						<li v-for="(liItemAccout,index) in ItemAccoutLis" @click="liAccoutClick(liItemAccout,index)" :class="{styleObject:index==styleAccoutCurrent}">{{liItemAccout.name}}</li>
					</ul>
				</div>
				<div id="showProduct">
					<div class="producetable">
						<investShowList :table-data="tableData"></investShowList>
					</div>
				</div>
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="pageNo"
			      :page-size="pageSize"
			      layout="total, prev, pager, next, jumper"
			      :total="totalPageNumber">
			    </el-pagination>
			</div> -->
				<table v-if="'_fixedInvestment'!=isCurrentTitle" id="stuDatas" border="1" bordercolor="#F1F1F1" style="border-collapse:collapse;width: 1360px" >
					<tr>
						<td v-for="e in produceContents">
						  	<div id="produceContentTitle">{{e.productName}}</div>	
							<div class="currentLiii"><span> {{ e.interestRate }} </span><i>%</i></div>
							<span>{{$t('investLoanTerm')}} {{e.borrowingTerm }} {{$t('message.day')}}</span>
							<div id="produceContentBtn" @click="produceContentListBtn(e)">{{$t('message.purchaseNow')}}</div>
						</td>
					</tr>
				</table>
		</div>

		<div id="showImg">
			<div id="showImgTitle">{{$t('_insurance')}}</div>
			<div id="showImgLine"></div>
			<div id="showImgLists">
				<div><img src="../assets/img/icon/icon_Purchase1.png" alt=""><span>{{$t('registerBorrower')}}</span></div>
				<div><img src="../assets/img/icon/icon_Purchase2.png" alt=""><span>{{$t('authentication')}}</span></div>
				<div><img src="../assets/img/icon/icon_Purchase3.png" alt=""><span>{{$t('loanInvest')}}</span></div>
				<div><img src="../assets/img/icon/icon_Purchase4.png" alt=""><span>{{$t('earnRate')}}</span></div>
			</div>
		</div>

		<div id="showImgs">
			<div id="showImgTitles">{{$t('_insurance')}}</div>
			<div id="showImgLines"></div>
			<div id="showImgListss">
				<div><img src="../assets/img/icon/icon_yichu1.png" alt=""><span>{{$t('registerBorrower')}}</span></div>
				<div><img src="../assets/img/icon/icon_yichu2.png" alt=""><span>{{$t('authentication')}}</span></div>
				<div><img src="../assets/img/icon/icon_yichu3.png" alt=""><span>{{$t('loanInvest')}}</span></div>
			</div>
		</div>

	</div>

</template>

<script>
	import investShowList from '../components/investShowList.vue'

	export default {
		data(){
			return {
				isCurrentTitle: "_singalInvestment",
				pageSize: 5,
				pageNo: 1,
				totalPageNumber: 0,
				ItemPeriodCurrent:'',
				ItemAccoutCurrent: '', 
				ItemRateCurrent: '', 
				stylePeriodCurrent:'',
				styleAccoutCurrent: '', 
				styleRateCurrent: '', 
				investType:["_singalInvestment","_fixedInvestment"],
				ItemPeriodLis: [{value:"",name:"Semua"},{value:"7",name:"7Hari"},{value:"8",name:"8Hari"},{value:"9",name:"9Hari"},{value:"10",name:"10Hari"},{value:"11",name:"11Hari"},{value:"12",name:"12Hari"},{value:"13",name:"13Hari"},{value:'14',name:"14Hari"}],
				ItemAccoutLis: [{value:"",name:"Semua"},{value:"1.200.000",name:"1.200.000"},{value:'1.500.000',name:"1.500.000"}],
				ItemRateLis: [{value:"",name:"Semua"},{value:".05",name:"5%"},{value:'.0612',name:"6.12%"}],
				tableData: [],
				produceContents: [{productName:"",interestRate:'',borrowingTerm:''},{productName:"",interestRate:'',borrowingTerm:''}]
			}
		},
		components: {investShowList},
		methods: {
			changeTitleStyle(e){
				this.isCurrentTitle=e;
				if(e!="_singalInvestment"){
					this.tableData=[];
				}else{
					this.searchItems();
				}
			},
			liPeriodClick(liItemPeriod,index){
				this.stylePeriodCurrent = index;
				this.ItemPeriodCurrent = this.ItemPeriodLis[index].value;
				this.searchItems();

			},
			liAccoutClick(liItemAccout,index){
				this.styleAccoutCurrent = index;
				this.ItemAccoutCurrent = this.ItemAccoutLis[index].value;
				this.searchItems();
			},
			liRateClick(liItemRate,index){
				this.styleRateCurrent = index;
				this.ItemRateCurrent = this.ItemRateLis[index].value;
				this.searchItems();
			},
			handleCurrentChange(index){
				this.pageNo=index;
				this.searchItems();
			},
			handleSizeChange(index){
				this.pageNo=index;
				this.searchItems();
			},
			produceContentListBtn(e){
		        this.$store.dispatch("setPurchaseInvestment",e);//保存该标的信息
		        this.$store.dispatch("loginToBack","/investment");//保存该标的信息
		        if(!this.$store.getters.token){
		          this.$router.push("./login");
		          return;
		        }
			    let s=()=>{
			        let p = new Promise((resolve, reject)=>{
			          this.$axios.post('/api-user/user/userAuthBankInfoBySession', {})
			          .then((response)=>{
			            resolve(response.data.data);
			          })
			          .catch((response)=>{
			            // console.log(response);
			          });
			        });
			        return p;            
			    };
			    s().then((response)=>{
			        if(!response.authStatus){
			          let _this=this;
			            this.$alert("Nama Asli tidak dikenali atau otentifikasi nama gagal, silahkan coba kembali",'', {
			              confirmButtonText: 'ok',
			              dangerouslyUseHTMLString: true,
			              center: true
			            },{}).then(() => {
			              _this.$router.push("./authentication");
			              return;
			            }).catch(() => {
			            });
			        }else if(response.authStatus==2){
			        	this.$message("Sedang dalam proses verifikasi, mohon tunggu dengan sabar");//认证中
			        	return;
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
				        this.$router.push("/purchaseFixed");
			        }
			    })


			},
			searchItems(){
				let _this=this;
				let account=this.ItemAccoutCurrent;
				account=account.split(".").join("");
				//散标列表获取
	    // 		this.$axios.post('/api-order/order/selectScatterstandardList', {
				 //    "yearRateFin": this.ItemRateCurrent,
					// "amountApply": account,
					// "term": this.ItemPeriodCurrent,
					// "pageNo": this.pageNo,
					// "pageSize": this.pageSize
				 //  })
				 //  .then((response)=>{
				 //    this.tableData=response.data.data.content;
				 //    this.totalPageNumber=response.data.data.totalElements;
				 //    this.totalPages=response.data.data.totalPages;
				 //    for(let i in this.tableData){
				 //    	this.tableData[i].yearRateFin=this.tableData[i].yearRateFin*100
				 //    }
				 //  })
				 //  .catch((response)=>{
				 //    // console.log(response);
				 //  });

	    		this.$axios.post('/api-order/order/productconf/pathProductconfList', {})
				  .then((response)=>{
				    this.produceContents=response.data.data;
				    for(let i in this.produceContents){
				    	this.produceContents[i].interestRate=(this.produceContents[i].interestRate*100).toFixed(0)
				    	// this.tableDataLenght++;
				    }
				  })
				  .catch((response)=>{
				    // console.log(response);
				  }); 
			}
		},
		watch:{
	        newValue(val, oldVal){
	            console.log("b.c: "+val, oldVal);
	        }
	    },
	    computed: {
	    　　newValue() {
	    // 　　　　return this.b.c
	    　　}
	    },
	    mounted(){
    		this.searchItems();
	    }
	}
</script>
<style scoped>
	.el-pagination.is-background .el-pager li:not(.disabled).active{
		background-color: #2AD2C8;
	}
	.el-pagination.is-background .el-pager li:not(.disabled):hover {
		color:#2AD2C8;
	}
	.el-pager li.active {
		color: #2AD2C8;
	}
	#investmentBody {
		margin: 20px;
		padding: 40px 0;
		background-color: white;
		overflow: hidden;

	}
	.bodyContents .selectItemPeriodess {
		height: 50px;
		line-height: 50px;
		width: 1400px;
		overflow: hidden;
		margin: 0 20px;
		/*padding: 5px 20px;*/
		overflow: hidden;
		font-weight: 700;
		border: .5px solid #eee;
	}
	.selectItemPeriodess li {
		display: block;
		float: left;
		width: 100px;
	}
	.styleObject {
		color: #2AD2C8;
	}
	.selectItemPeriodess li:hover {
		cursor: pointer;
	}
	.bodyContents .selectItemPeriodTitle {
		font-weight: 700;
		font-size: 16px;
		border: 1px solid #d9d9d9;
		width: 300px;
		background-color: #EBEFF1;
	}
	
	#showProduct {
		margin: 20px;
		overflow: hidden;
		background-color: white;
	}
	#showProduct .producetable {
		width: 100%;
		padding: 50px 0;
		overflow: hidden;
	}		
	#showImg {
		background-color: #00DACA;
		width: 100%;
		box-sizing: border-box;
		padding: 0 60px;
		height: 400px;
		/*display: flex;*/
	}
	#showImgLists {
		float: left;
		width: 100%;
		min-width: 1200px;
		display: flex;
	}
	#showImgLists>div {
		flex: 1;
	}
	#showImgLists>div img {
		display: block;
		width: 120px;
		margin: 0 auto;
	}
	#showImgLists>div span {
		color: white;
		font-size: 18px;
		height: 60px;
		line-height: 60px;
	}
	#showImgTitle {
		font-size: 25px;
		margin: 10px auto;
		padding-top: 60px;
		color: white;
	}
	#showImgLine {
		width: 40px;
		height: 8px;
		margin: 0 auto;
		background-color: white;
		margin-bottom: 40px;
	}
	#showImgs {
		background-color: white;
		width: 100%;
		height: 400px;
		/*display: flex;*/
	}
	#showImgListss {
		float: left;
		width: 100%;
		display: flex;
	}
	#showImgListss>div {
		flex: 1;
	}
	#showImgListss>div img {
		display: block;
		margin: 0 auto;
		width: 150px;
	}
	#showImgListss>div span {
		/*color: white;*/
		font-size: 18px;
		height: 60px;
		line-height: 60px;
	}
	#showImgTitles {
		font-size: 25px;
		margin: 0px auto;
		padding-bottom: 10px;
		padding-top: 40px;

	}
	#showImgLines {
		width: 40px;
		height: 8px;
		margin: 0 auto;
		background-color: #00DACA;
		margin-bottom: 40px;
	}
	#showImgs {
		padding-top: 50px;
	}
	#userInfTitless {
		margin:  0 auto;
		margin-bottom: 20px;
		overflow: hidden;
		width: 1400px;
	}
	#userInfTitless div {
		float: left;
		width: 200px;
		height: 40px;
		line-height: 40px;
		margin: 10px 20px;
		font-size: 16px;
	}
	#userInfTitless div:hover {
		cursor: pointer;
	}
	.currentTitle {
		background-color: rgba(42,210,200,.2);
		border-bottom: 2px solid #2AD2C8;
		color: black;

	}
	#stuDatas {
		padding: 20px 50px;
		margin: 0 auto;
		box-sizing: border-box;
	}
	#stuDatas td {
		padding: 40px 10px;
		text-align: center;
		color: #CAB269;
	}
	.currentLiii {
		float: left;
		margin: 0px 40px;
	}
	.currentLiii>span {
		font-size: 55px;
		text-align: center;
	}
	.currentLiii>i {
		height: 40px;
		line-height: 40px;
		font-size: 16px;
	    /*显示为内联元素*/
	    display: inline-block;
	    /*对齐方式为居中*/
	    vertical-align: middle;
	}
	#produceContentBtn:hover {
		cursor: pointer;
		background-color: #CAB269;
		color: white;
	}
	#stuDatas td>span {
		height: 90px;
		line-height: 90px;
		display: block;
		font-size: 18px;
		float: left;
	}
	  #produceContentTitle {
	  	height: 60px;
	  	line-height: 60px;
	  	font-size: 30px;
	  	padding-left: 40px;
	  	margin-bottom: 30px;
	  	margin-top: 10px;
	  	color: black;
	  	text-align: left;
	  }
	#produceContentBtn {
		/*width: 80%;*/
		height: 45px;
		float: right;
		font-size: 18px;
		line-height: 45px;
		width: 180px;
		border: 1px solid #CAB269;
		border-radius: 23px;
		margin: 10px 40px 10px 0;
		border-radius: 20px;
	}
</style>