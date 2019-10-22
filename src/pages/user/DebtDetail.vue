<i18n>
  {
    "zh-cn":{
    	"goback": "返回上一级",
      "introduce": "项目介绍",
      "loanInfo": "借款人信息",
      "loanpro": "借款协议",
      "introtips": "本标的为个人资金周转借款，借款人信用优秀。出借人通过平台出借此标获得对应收益。每个借款人经过平台风控人员多层严格筛选。通过保险保证收入来源，稳健可靠。",
      "persional": "个人信息",
      "name": "姓名：",
      "idNo": "证件号码：",
      "sex": "性别：",
      "age": "年龄：",
      "marriage": "婚姻状况：",
      "loantype": "借款人身份：",
      "mobile": "手机号：",
      "email": "邮箱地址：",
      "level": "学历：",
      "birDate": "出生日期：",
      "religion": "宗教：",
      "address": "居住地址：",
      "otnerinfo": "其它认证信息",
      "otherinfo1":"身份证信息：",
      "otherinfo2":"银行卡信息：",
      "otherinfo3":"联系人信息：",
      "otherinfo4":"保险卡信息：",
      "otherinfo5":"家庭卡信息：",
      "trust": "已认证",
      "untrust": "未认证",
      "boy": "男",
      "girl": "女",
      "unkown": "未知",
      "student": "学生",
      "hasjob": "已工作",
      "homegirl": "家庭主妇"

    },
    "en":{
    	"goback": "Kembali ke level sebelumnya",
      "introduce": "Pengenalan proyek",
      "loanInfo": "Informasi peminjam",
      "loanpro": "Perjanjian pinjaman",
      "introtips": "Standar ini adalah pinjaman perputaran modal pribadi, dan kredit peminjam sangat bagus. Pemberi pinjaman mendapatkan penghasilan yang sesuai melalui platform. Setiap peminjam secara ketat disaring oleh beberapa lapisan personel pengendalian risiko platform. Menjamin sumber penghasilan melalui asuransi, stabil dan andal.",
      "persional": "Informasi pribadi",
      "name": "Nama：",
      "idNo": "Nomor ID：",
      "sex": "Jenis kelamin：",
      "age": "age：",
      "marriage": "Status pernikahan：",
      "loantype": "Identitas peminjam：",
      "mobile": "Nomor ponsel：",
      "email": "email",
      "level": "Pendidikan：",
      "birDate": "Tanggal lahir：",
      "religion": "Agama：",
      "address": "Alamat tempat tinggal：",
      "otnerinfo": "Informasi sertifikasi lainnya",
      "otherinfo1":"Informasi KTP：",
      "otherinfo2":"Informasi kartu bank：",
      "otherinfo3":"Informasi kontak：",
      "otherinfo4":"Informasi kartu asuransi：",
      "otherinfo5":"Informasi kartu keluarga：",
      "trust": "Bersertifikat",
      "untrust": "Tidak bersertifikat",
      "boy": "Laki-laki",
      "girl": "Perempuan",
      "unkown": "Tidak dikenal",
      "student": "Pelajar",
      "hasjob": "Bekerja",
      "homegirl": "Ibu rumah tangga"
    }
  }
</i18n>

<template>
	<div class="views_debtdetail">
		<div flex class="aic goback" @click="handleBack"><img src="@/assets/img/new/goback.png"><span v-t="'goback'"></span></div>

		  <div class="">
		    <div class="aic jcsb" flex>
		      <ul flex >
		        <li class="header_li" v-for="item in tablist" @click="handleClick(item)" :class="{active: activeIndex === item}">{{$t(item)}}</li>
		      </ul>
		    </div>
		  </div>
		  <div class="debtdetail_con">
				<!-- 项目介绍 -->
			  <div v-if="activeIndex == 'introduce'">
			  	<div v-t="'introduce'" class="intro_title"></div>
			  	<div v-t="'introtips'" class="intro_con"></div>
			  	<div><img src="@/assets/img/new/debt_intro.png" class="intro_img"></div>
			  </div>
			  <!-- 借款人信息 -->
			  <div v-if="activeIndex == 'loanInfo'" class="loan_content">
			  	<div v-t="'persional'" class="intro_title"></div>
			  	<div flex class="loan_infos jcsb">
			  		<div>
			  			<p>{{$t('name')}}{{lenderUserInfo.name}}</p>
			  			<p>{{$t('marriage')}}{{lenderUserInfo.isMarried==1?"Menikah":"Belum menikah"}}</p>
			  			<p>{{$t('level')}}{{lenderUserInfo.acdemic}}</p>
			  			<!--  -->
			  		</div>
			  		<div>
			  			<p>{{$t('idNo')}}{{lenderUserInfo.idCardNo}}</p>
				  		<p>{{$t('loantype')}}{{$t(getLoanType(lenderUserInfo.identidy))}}</p>
				  		<p>{{$t('birDate')}}{{lenderUserInfo.birty}}</p>	
			  		</div>
			  		<div>
			  			<p>{{$t('sex')}}{{lenderUserInfo.sex == 2?$t('girl'):(lenderUserInfo.sex==1?$t('boy'):$t('unkown'))}}</p>
				  		<p>{{$t('mobile')}}{{lenderUserInfo.mobile}}</p>
				  		<p>{{$t('religion')}}{{lenderUserInfo.religion}}</p>
			  		</div>
			  		<div>
			  			<p>{{$t('age')}}{{lenderUserInfo.age}}</p>
			  			<p>{{$t('email')}}{{lenderUserInfo.email}}</p>
		  			</div>
			  	</div>
			  	<p style="margin-bottom: 57px;">{{$t('address')}}{{lenderUserInfo.address}}</p>


			  	<div v-t="'otnerinfo'" class="intro_title"></div>
			  	<div class="other_infos">
			  		<p>{{$t('otherinfo1')}}{{lenderUserInfo.isIdentidyAuth == 1? $t('trust'):$t('untrust')}}</p>
			  		<p>{{$t('otherinfo2')}}{{lenderUserInfo.isBankCardAuth == 1? $t('trust'):$t('untrust')}}</p>
			  		<p>{{$t('otherinfo3')}}{{lenderUserInfo.isLindManAuth == 1? $t('trust'):$t('untrust')}}</p>
			  		<p>{{$t('otherinfo4')}}{{lenderUserInfo.isInsuranceCardAuth == 1? $t('trust'):$t('untrust')}}</p>
			  		<p>{{$t('otherinfo5')}}{{lenderUserInfo.isFamilyCardAuth == 1? $t('trust'):$t('untrust')}}</p>
			  	</div>
			  </div>
			  <!-- 合同 -->
			  <div v-if="activeIndex == 'loanpro'">
					<loanagreement></loanagreement>
			  </div>
	  </div>
	</div>
</template>
<script>
	import loanagreement from "../agreement/guaranteeProtacol.vue"
	export default{
		data(){
	    return {
	    	tablist: ['introduce','loanInfo','loanpro'],
	      	activeIndex: 'introduce',
	      	creditorNo: '',
	      	lenderUserInfo: {},
	      	loantypelist: [{code:'0',name:'unkown'},{code:'1', name:'student'},{code:'2', name:'hasjob'},{code:'3', name:'homegirl'}],
		    }
	  	},
	  	components: {loanagreement},
		created(){
			this.creditorNo = this.$route.query['creditorNo'];
			this.getUserInfo();
	    },
	    methods: {
		    getLoanType(state){
		      let re = '';
		      this.loantypelist.forEach(function (item) {
		        if(item.code == state){
		          re = item.name;
		          return
		        }
		      })
		      return re
		    },
		  	getUserInfo(){
					this.$axios.post('/api-order/order/selectLenderUserInfo', {creditorNo: this.creditorNo}).then(res => {
						let _data = res.data;
						if(_data.code == 0){
							this.lenderUserInfo = _data.data;
						}else{
		          this.$message({
		            message: $data.message,
		            type: 'error'
		          });
						}

				  }).catch(res => {
					  });
		  	},
		    handleClick(item) {
		      this.activeIndex = item;
		    },
	      	handleBack() {
	      	this.$router.go(-1);
	    	}
	  	}
	}
</script>
<style lang="less">
	.views_debtdetail{
	  width: 1100px;
  	margin: 20px auto;
  	padding: 20px 15px 60px;
  	background: #fff;
  	border-radius: 4px;
  	font-size: 14px;
  	color: #474747;
  	text-align: left;

  		.goback{
  			color: #99A5B0;
  			margin-bottom: 25px;
  			cursor: pointer;
  			img{
	  			width: 9px;
	  			height: 14px;
	  			// border: 1px dashed #888;
	  			margin-right: 15px;
  			}
  		}

			.header_li{
			  font-size: 16px;
			  color: #99A5B0;
			  line-height: 40px;
			  cursor: pointer;
			  padding: 0 25px;

					 &.active{
					  color: #474747;
					  background: rgba(42,210,200,.065);
					  border-bottom: 1px solid #2AD2C8;
					  border-width: 3px;
					}
			}


			.debtdetail_con{
					padding: 0 36px;
					
					.intro_title{
						font-size: 18px;
						margin: 27px 0 15px;
					}
					.loan_content{
						.intro_title{
							margin-bottom: 30px;
						}
					}
					.intro_con{
						font-size: 14px;
						line-height: 28px;
					}
					.intro_img{
						width: 861px;
						height: 642px;
						display: block;
						margin: 29px auto 0;
						// border: 1px dashed #999;
					}
					.loan_infos{
						div:not(:last-child){
							margin-right: 50px;
						}
						div{
								p{
									margin-bottom: 27px;
								}
						}

					}
					.other_infos{
						p{
							margin-bottom: 27px;
						}
					}
			}



		}
</style>