<i18n>
  {
    "zh-cn":{
    	"goback": "返回上一级",
    	"num": "编号：",
    	"status": "状态",
    	"all": "全部",
    	"having": "持有中",
    	"finish": "已结束",
      "tab1": "Tujuan pinjaman",
      "tab2": "Tingkat resiko",
      "tab3": "Kode",
      "tab4": "Tingkat Bunga Tahunan",
      "tab5": "Durasi pinjaman",
      "tab6": "Jumlah"

    },
    "en":{
    	"goback": "Kembali ke halaman sebelumnya",
    	"num": "Nomor：",
    	"status": "Status",
    	"all": "Semua",
    	"having": " Sedang dimiliki",
    	"finish": "Selesai",
      "tab1": "Tujuan pinjaman",
      "tab2": "Tingkat resiko",
      "tab3": "Kode",
      "tab4": "Tingkat Bunga Tahunan",
      "tab5": "Durasi pinjaman",
      "tab6": "Jumlah",
      "operate": "end"
    }
  }
</i18n>

<template>
	<div class="views_debt">
		<div flex class="aic goback" @click="handleBack"><img src="@/assets/img/new/goback.png"><span v-t="'goback'"></span></div>

		<div class="debt_content">
			<div flex class="jcsb debt_tit">
				<p>{{$t("num")}}{{orderId}}</p>
				<p>{{$t("status")}}：{{(getStatus(Orderstatus))}}</p>
			</div>

<!-- 			<div flex class="debt_status">
				<p v-t="'status'" class="status_left"></p>
				<p class="status_right"><span v-for="(item,$index) in statuslist" @click="changeStatus(item.code, $index)" :class="{active: $index == statusIndex}" class="selectItem">{{$t(item.name)}}</span></p>
			</div> -->

			<el-table :data="tableData" v-loading="tabloading" @row-click="goDebtDetail">
	      <el-table-column :label="$t('tab1')" prop="borrowingPurposes" align="center"></el-table-column>
				<el-table-column :label="$t('tab2')" prop="borrowingPurposes" align="center">
					<template slot-scope="scope">
						Rendah
					</template>
				</el-table-column>
				<el-table-column :label="$t('tab3')" prop="creditorNo" width="180px"  align="center"></el-table-column>
<!-- 				<el-table-column :label="$t('tab4')"  width="180px"  align="center">
					<template slot-scope="scope">
						<p class="hairs"><span class="rates">{{scope.row.yearRateFin*100}}</span>&nbsp;%</p>
					</template>
				</el-table-column> -->
				<el-table-column :label="$t('tab5')"  align="center">
					<template slot-scope="scope">
						<span class="hairs">{{scope.row.term}} Hari</span>
					</template>
				</el-table-column>
				<el-table-column :label="$t('tab6')"  align="center">
					<template slot-scope="scope">
						<span>Rp {{scope.row.amountApply}}</span>
					</template>
				</el-table-column>
			    <el-table-column width='220'>
			        <template slot-scope="scope">
			          <div class="operate_btn">{{getStatus(scope.row.status)}}</div>
			        </template>
			    </el-table-column>
	    </el-table>
		</div>


	</div>
</template>
<script>
	export default{
		data(){
		    return {
		        statuslist: [
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
	        	statusIndex: 0,
		      	tabloading: false,
		      	tableData: [],
		      	creditorNo: '',
		      	Orderstatus: '',
		      	orderId: ''
		    }
	  	},
		created(){
			this.creditorNo = this.$route.query['creditorNo'];
			this.productType=this.$route.query['productType'];
			this.Orderstatus = this.$route.query['status'];
			if(this.productType==3){
				this.orderId=this.creditorNo
			}
			this.getUserInfo();
	  },
	  methods: {
	  	getUserInfo(){
	  		console.log("this.productType"+this.productType)
				this.$axios.post('/api-order/order/selectCreditorinfo', {creditorNo: this.creditorNo,productType:this.productType}).then(res => {
						let _data = res.data;
						if(_data.code == 0){
							this.tableData=res.data.data;
							// this.tableData.push(_data.data);
							
							// this.orderId = this.tableData[0].id;
						}else{
		          this.$message({
		            message: $data.message,
		            type: 'error'
		          });
						}
			  }).catch(res => {
				  });
	  	},
	    changeStatus(data,index){
	      this.statusIndex = index;
	    },
	    getStatus(state){
	      let re = '';
	      this.statuslist.forEach(function (item) {
	        if(item.code == state){
	          re = item.name;
	          return
	        }
	      })
	      return re
	    },
	    goDebtDetail(item){
				this.$router.push({path: '/debtdetail',query:{creditorNo:item.creditorNo}});
	    },
      handleBack() {
      	this.$router.go(-1);
    	},
	  }
	}
</script>
<style lang="less">
	.views_debt{
	  width: 1100px;
  	margin: 20px auto;
  	padding: 20px 15px 60px;
  	background: #fff;
  	border-radius: 4px;
  	font-size: 14px;
  	color: #474747;

  		.goback{
  			color: #99A5B0;
  			margin-bottom: 25px;
  			cursor: pointer;
  			img{
	  			width: 9px;
	  			height: 14px;
	  			margin-right: 15px;
  			}
  		}

  		.debt_content{
  			border: 1px solid #ebeff1;

  			.debt_tit{
  				padding: 0 26px;
  				line-height: 46px;
  				background: #F7F9FA;
  				border-bottom: 1px solid #ebeff1;
  			}


  			.debt_status{
  				line-height: 51px;
  				margin-bottom: 20px;
  				border-bottom: 1px solid #ebeff1;
	  			.status_left{
	  					width: 120px;
	  					text-align: center;
							font-size: 16px;
							border-right: 1px solid #ebeff1;
  				}
  				.status_right{
  					padding-left: 45px;
  					span{
  						margin-right: 30px;
  						cursor: pointer;
  						&.active{
  							color: #2AD2C8;
  						}
  					}
  				}
  			}

	  		.el-table th>.cell{
					color: #474747;
					font-weight: normal;
	  		}
	  		.el-table .cell{
	  			color: #7A7A7A;
	  			line-height: 30px;
	  		}
				.el-table td, .el-table th.is-leaf{
					border-bottom: none;
				}
	  		.el-table::before{
	  			height: 0;
	  		}

	  		.operate_btn{
					width: 180px;
					line-height: 26px;
					background: #2AD2C8;
					border-radius: 20px;
					color: #fff;
					cursor: pointer;
					text-align: center;
	  		}
  		}
	}
</style>