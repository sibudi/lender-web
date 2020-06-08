<i18n>
  {
    "zh-cn":{
      	"yearRate":"年化收益率",
    	"loanTerm":"借款期限",
    	"surplusAcount":"可投资金额",
    	"investNow":"立即投资",
    	"alreadyInvestmentAgreement":"已阅读投资协议",
    	"otherQualityRecommend":"其他优质推荐",
    	"_name":"姓名：",
    	"_idCard":"证件号码：",
    	"_sex":"性别：",
    	"_age":"年龄：",
    	"_marriage":"婚姻状况：",
    	"_identity":"借款人身份：",
    	"_phoneNum":"手机号：",
    	"_Email":"邮箱地址：",
    	"_education":"学历：",
    	"_birthDate":"出生hari期：",
    	"_religion":"宗教：",
    	"_homeAddress":"居住地址：",
    	"_idCardInf":"身份证信息：",
    	"_bankCardInf":"银行卡信息：",
    	"_contactInf":"联系人信息：",
    	"_insuranceInf":"保险卡信息：",
    	"_famliyCardInf":"家庭卡信息：",
    	"_projectProduce":"项目介绍",
    	"_borrowUserInf":"借款人信息",
    	"_personInf":"个人信息",
    	"_otherIdentificationInf":"其他认证信息",
    	"_month":"日"
    },
    "en":{
    	"yearRate":"Tingkat bunga tahunan yang",
    	"loanTerm":"batas waktu",
    	"surplusAcount":"Jumlah pendanaan",
    	"investNow":"pendanaan",
    	"alreadyInvestmentAgreement":"Telah membaca              perjanjian pendanaan",
    	"otherQualityRecommend":"Rekomendasi kualitas lainnya",
    	"_name":"Nama:",
    	"_idCard":"Nomor ID:",
    	"_sex":"Jenis kelamin:",
    	"_age":"Umur:",
    	"_marriage":"Status pernikahan:",
    	"_identity":"Identitas peminjam：",
    	"_phoneNum":"Nomor ponsel：",
    	"_Email":"Alamat email：",
    	"_education":"Pendidikan：",
    	"_birthDate":"Tanggal lahir：",
    	"_religion":"Agama：",
    	"_homeAddress":"Alamat tempat tinggal：",
    	"_idCardInf":"Informasi KTP：",
    	"_bankCardInf":"Informasi kartu bank：",
    	"_contactInf":"Informasi kontak：",
    	"_insuranceInf":"Informasi kartu asuransi：",
    	"_famliyCardInf":"Informasi kartu keluarga：",
    	"_projectProduce":"Pengenalan proyek",
    	"_borrowUserInf":"Informasi peminjam",
    	"_personInf":"Informasi pribadi",
    	"_otherIdentificationInf":"Informasi sertifikasi lainnya",
    	"_month":"bulan",
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
		<div class="bodyContent">
			<div id="productProduceTitle">
				{{"Nomor barang："+investInf.id}} 
				<span id="projectItemProduceDate">{{"Waktu rilis："+investInf.createTime}}</span>
			</div>
			<div id="purchaseProduct">
				<div id="produceContentOne">
					<ul class="produceContent">
						<li id="rateColorRed">
							<div class="currentLi">
								<span>{{investInf.interestRate}}</span>
								<i>%</i>
							</div>
							<span>{{$t('yearRate')}}</span>
						</li>
						<li><div class="currentLi"><span>{{investInf.borrowingTerm}}</span><i>{{$t('message.day')}}</i></div><span>{{$t('loanTerm')}}</span></li>
						<li  id="currentLiThree"><div class="currentLi" ><span id="lowAmountCenter">{{investInf.lowAmount}}</span><i></i></div><span id="lastAccount">{{$t('surplusAcount')}}</span></li>
					</ul>
					<div class="investContent">
						<input type="text" id="investCount" v-model="inputPurchase" minlength="6" maxlength="16">
						<div id="investButton" @click="purchaseBtn()">{{$t('investNow')}}</div>
						<span id="isReadFile" @click="toAgreement()">{{$t('alreadyInvestmentAgreement')}}</span>
					</div>
				</div>
			</div>
		<div id="showImg">
			<div id="showImgTitle">{{$t('_insurance')}}</div>
			<div id="showImgLine"></div>
			<img src="../assets/img/icon/dingqiIcon0.png" alt="">
			<div id="showImgtips">P2P Marketplace</div>

		</div>

		<div id="showImgs">
			<div id="showImgTitles">{{$t('_insurance')}}</div>
			<div id="showImgLines"></div>
			<div id="showImgListss">
				<div><img src="../assets/img/icon/dingqiIcon1.png" alt=""><div class="dingqigoumaiIcon"><div>Deposito bank</div><br>Platform berhasil menyetor dengan Bank BCA</div></div>
				<div><img src="../assets/img/icon/dingqiIcon2.png" alt=""><div class="dingqigoumaiIcon"><div>Pengendalian risiko profesional</div><br>Model Pengendalian risiko data besar, memprediksi probabilitas risiko, perkiraan yang terlambat/lewat dari hari jatuh tempo</div></div>
				<div><img src="../assets/img/icon/dingqiIcon3.png" alt=""><div class="dingqigoumaiIcon"><div>Perlindungan asuransi</div><br>Jika terjadi kasus terlambat/lewat dari hari jatuh tempo, perusahaan asuransi akan membayar terlebih dahulu</div></div>
				<div><img src="../assets/img/icon/dingqiIcon4.png" alt=""><div class="dingqigoumaiIcon"><div>Jaminnya Kolektor</div><br>Staf kolektor yang profesional, memanajemen kolek dengan profesional</div></div>
			</div>
		</div>
		</div>
		
		<el-dialog
		  :visible.sync="dialogVisible"
		  width="60%">
		     <div id="purDialog">
		     	<div id="purDialogTitle">
		     		<span class="purDialogTi" :class="purDialogTi?'currentTitle':''" @click="purDialogTitle">BCA</span>
		     	</div>
		     	<div class="purDialogContent">
		     		<div id="purContentTi" v-if='!purDialogTi'>
		     			<span :class="purDialogSub==1?'currentTitle2':''" @click="purcDialSub(1)">ATM</span>
		     			<span :class="purDialogSub==2?'currentTitle2':''" @click="purcDialSub(2)">ONLINE</span>
		     			<span :class="purDialogSub==3?'currentTitle2':''" @click="purcDialSub(3)">M-BANKING</span>
		     		</div>
	     			<div id="purSubNum" v-if='purDialogTi'>
		     				<span>Nomor permohonan：<div>{{getBackBuy.externalId}}</div></span>
		     				<span>Tanggal hari jatuh tempo：<div>{{ investInf.createTime}}</div></span>
		     				<span>Jumlah pinjaman：Rp.<a class="jineColor"> {{ inputPurchase}}</a></span>
		     				<span>Periode pinjaman：<div>{{investInf.term}}</div></span>
	     			</div>
		     		<div id="purSubAlfamarty" v-if='purDialogTi'>
						1,Pergi ke Alfamart;<br>2,Bilang ke kasir anda ingin membayar transaksi online Doku ,beritahu jumlahnya（RP.<a class="jineColor"> {{ inputPurchase}}</a>）dan kode transaksi（<a class="payCode">{{getBackBuy.paymentCode}}</a>）；<br>3,Kasir akan memberikan konfirmasi dan memberitahu anda total pembayaran；<br>4,Berikan pembayaran pada kasir dan dapatkan struk pembayaran。
		     		</div>
		     		<div id="purSubCon"  v-if='!purDialogTi'>
		     			<div id="purSubNum">
		     				<span>Jumlah pinjaman</span>
		     				<span>Akun virtual</span>
		     				<span>Rp.<a class="jineColor"> {{ inputPurchase}}</a></span>
		     				<span><div>{{getBackBuy.paymentCode}}</div></span>
		     			</div>
	     				<div id="purchaseBCA">
		     				<a v-if="purDialogSub==1">1，Masukkan kartu ATM dan PIN anda<br>2，Pilih "Transaks lainnya" dan pilih "Transfer"<br>3，Pilih "Ke Akun Virtual BCA"<br>4，Masukkan no akun virtual(<a class="payCode">{{getBackBuy.paymentCode}}</a>) Tekan"BENAR" untuk melanjutkan<br>5，Verifikasi detil akun virtual dan masukkan jumlah yang ingin ditransfer dan tekan BENAR untuk konfirmasi<br>6，Konfirmasi detil transaksi di layar.Pilih YES jika informasi tersebut benar, pilih NO jika informasi tersebut salah
		     				</a>
		     				<a v-if="purDialogSub==2">1,Login to KlikBCA individual<br>2,Pilih "Transfer"<br>3,Pilih "Transfer ke Akun Virtual BCA"<br>4,Masukkan  no akun virtual (<a class="payCode">{{getBackBuy.paymentCode}}</a>)<br>5,Pilih "Continue" untuk melanjutkan <br>6,Masukkan "RESPON KEYBCA APPLI 1" yang ditunjukkan di Token BCA anda kemnudian klik tombol Kinm
		     				</a>
		     				<a v-if="purDialogSub==3">
		     					1，Buka BCA Mobile app 2，Pilih "m-BCA"<br>3，Pilih "m-transfer"<br>4，Pilih "Akun Virtual BCA"<br>5，Masukkan no akun virtual (<a class="payCode">{{getBackBuy.paymentCode}}</a>) dan pilih "OK"<br>6，Klik tombol "KIRIM" di sudut kanan Atas untuk melanjutkan<br>7，Klik "OK" untuk melanjutkan<br>8，Masukkan PIN untuk melanjutkan transaksi<br>
		     				</a>
	     				</div>
		     		</div>
		     	</div>
		     </div>
		</el-dialog>
	</div>
</template>

<script>
	import investShowList from '../components/investShowList.vue'
	import store from '../store/index.js'
	export default {
		data(){
			return {
				inputPurchase: '',
				isCurrentTitle: true,
				pageSize: 20,
				pageSizesList:2,
				totalDataNumber: 50,
				ItemPeriodCurrent:'',
				ItemAccoutCurrent: '', 
				ItemRateCurrent: '', 
				tableData: [],
				pageSize: 10,
				pageNo: 1,
				totalPageNumber: 0,
		        userBasicInfo: {},
		        guangbiao: 0,
		        investInf:{
		        	creditorNo:'',
					createTime:'',
					amountApply:'',
					term:'',
					yearRateFin:'',
				},
				jobList: {
					0: 'Tidak dikenal',
					1: 'Pelajar',
					2: 'Bekerja',
					3: 'Ibu rumah tangga'
				},
				dialogVisible: false,
				purDialogTi: false,
				purDialogSub:1,
				isAlfamart: false,
				getBackBuy: {
			        "paymentCode": "",
			        "depositChannel": "",
			        "externalId": "",
			        "depositStatus": "",
			        "transactionId": ""
				}

			}
		},
		components: {investShowList},
		methods: {
			init(){
			    (function smoothscroll(){
				    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
				    if (currentScroll > 0) {
				         window.requestAnimationFrame(smoothscroll);
				         window.scrollTo (0,currentScroll - (currentScroll/5));
				    }
				})();
				let investItem=this.$store.getters.getPurchaseInvestment;
				this.investInf=investItem;
				this.investInf["createTime"]=this.getTimeStyle(this.investInf["createTime"]);
			},
			getJob(e){
				 for(let i=0;i<this.jobList.length;i++){
				 	if(i==e){
				 		this.userBasicInfo.identidy=this.jobList[i]
				 	}
				 	
				 }
			},
			getTimeStyle(e){
				console.log("a")
				return timestampToTime(e)
				function timestampToTime(timestamp) {
				    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				    let Y = date.getFullYear() + '-';
				    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				    let D = change(date.getDate()) + ' ';
				    let h = change(date.getHours()) + ':';
				    let m = change(date.getMinutes()) + ':';
				    let s = change(date.getSeconds());
				    console.log(Y + M + D + h + m + s)
				    return (Y + M + D + h + m + s);
				}
				function change(t) {
				    if (t < 10) {
				        return "0" + t;
				    } else {
				        return t;
				    }
				}

			},
			mykeyup(){
				let w=this.inputPurchase;
				w=w.toString().length;
				function set_text_value_position(obj, spos){
				    var tobj = document.getElementById(obj);
				    if(spos<0)
				            spos = tobj.value.length;
				    if(tobj.setSelectionRange){ //兼容火狐,谷歌
				            setTimeout(function(){
				                tobj.setSelectionRange(spos, spos);
				                tobj.focus();}
				                ,0);
				    }else if(tobj.createTextRange){ //兼容IE
				            var rng = tobj.createTextRange();
				            rng.move('character', spos);
				            rng.select();
				    }
				}
				//调用演示
				if(!this.guangbiao){
					this.inputPurchase=this.inputPurchase*1000;
				}
				this.guangbiao++;
				set_text_value_position('investCount', w-3); //设置到开头
			},
			handleCurrentChange(index){
				this.pageNo=index;
				this.searchItems();
			},
			handleSizeChange(index){
				this.pageNo=index;
				this.searchItems();
			},
			searchItems(){
				let _this=this;
				let account=this.ItemAccoutCurrent;
				account=account.split(".").join("");
	    		this.$axios.post('/api-order/order/selectScatterstandardList', {
				    "yearRateFin": this.ItemRateCurrent,
					"amountApply": account,
					"term": this.ItemPeriodCurrent,
					"pageNo": this.pageNo,
					"pageSize": this.pageSize
				  })
				  .then((response)=>{
				    this.tableData=response.data.data.content;
				    for(let i in this.tableData){
				    	this.tableData[i].yearRateFin=this.tableData[i].yearRateFin*100
				    	this.tableDataLenght++;
				    }
				    this.totalPageNumber=response.data.data.totalElements;
				  })
				  .catch((response)=>{
				    // console.log(response);
				  });
			},
			purchaseBtn(){
				if(this.inputPurchase<this.investInf.lowAmount||this.inputPurchase>this.investInf.maxAmount){
					this.$message("Harap masukkan jumlah yang lebih besar dari "+this.investInf.lowAmount+" dan kurang dari "+this.investInf.maxAmount);
					return;
				}


			    this.purchaseConfirm();
				

			},
			purchaseConfirm(){
				let userUuid=this.$store.getters.userUuid;
				let userName=this.$store.getters.userName;
				this.$axios.post('/api-order/p2p/pay/income/immediateInvestmentFinancing', {
				    "productId": this.investInf.id,
				    "userUuid": userUuid,
				    "userName": userName,
				    "amount": this.inputPurchase
				}).then((response)=>{
					this.$message(response.data.message);
				  	if(response.data.code==0){
				    	this.dialogVisible = true;
				    	this.getBackBuy=response.data.data;
				  	}else {
				  		this.$message(response.data.message);
				  	}
				  })
				  .catch((response)=>{
				    this.$message(response.data.message);
				  });
			},
			toAgreement(){
				this.$router.push("./guaranteeProtacol")
			},
			purDialogTitle(){
				this.purDialogTi=!this.purDialogTi
			},
			purcDialSub(e){
				this.purDialogSub=e
			}
		},
		mounted(){
			this.searchItems();
			this.init();
		}
	}


	
</script>
<style scoped>
	.bodyContent{
		padding: 20px;
		background-color: #eee;
		width: 100%;
		box-sizing: border-box;
		min-width: 1400px;
	}
	#purchaseProduct {
		background-color: white;
		overflow: hidden;
		margin-top: 0;
	}
	#purchaseProduct>div {
		width: 1400px;
	}
	#productProduceTitle {
		background-color: white;
		height: 60px;
		line-height: 20px;
		overflow: hidden;
		padding-left: 30px;
		padding-top: 40px;
		box-sizing: border-box;
		font-size: 18px;
		text-align: left;
	}
	#productProduceTitle::before {
		content: "";
		color: #00DACA;
		border-left: 6px solid #00DACA;
	}
	#produceContentOne {
		overflow: hidden;
		width: 100%;
		margin: 60px;
	}
	.produceContent {
		width: 800px;
		padding: 40px 0;
		float: left;
		display: flex;
	}
	.investContent {
		width: 470px;
		margin: 0 50px;
		float: right;
		border-left: 1px solid #eee
	}
	.produceContent .currentLi {
		width: 100%;
		overflow: hidden;
		line-height: 50px;
		height: 50px;
		margin: 0 auto;

	}
	.produceContent li>span {
		display: block;
		/*text-align: left;*/
		font-size: 15px;
		/*width: 80%;*/
		height: 50px;
		line-height: 50px;
		color: gray;
	}
	.produceContent li {
		float: left;
		flex: 1;
		height: 100px;
		line-height: 50px;
	}
	.produceContent .currentLi span {
		font-size: 50px;
		line-height: 50px;
		padding-left: 60px;
		float: left;
		display: block;

	}	
	.produceContent .currentLi i {
		font-size: 25px;
		line-height: 60px;
		width: 40px;
		float: left;
		display: block;
	}
	#currentLiThree {
		flex: 1.5;
	}
	#lastAccount {
		padding-left: 10px;
	}
	#projectItemProduceDate {
		display: block;
		float: right;
		margin-right: 40px;
	}
	#investCount,#investButton {
		height: 60px;
		line-height: 60px;
		width: 250px;
		border-radius: 30px;
		background-color: #eee;
		border: .1px solid gray;
		display: block;
		margin: 20px 0;
		margin-left: 30%;
		
		/*float: left;*/
	}
	#rateColorRed {
		color: red;
	}
	#investCount {
		box-sizing: border-box;
		padding: 0 30px;
		font-size: 20px;
	}
	#investButton {
		color: white;
		font-size: 22px;
		background-color: #00DACA;
		border: .1px solid  #00DACA;
	}
	#isReadFile {
		display: block;
		float: left;
		margin-left: 140px;
		margin-top: -20px;
	}
	#investButton:hover {
		cursor: pointer;
	}	
	#isReadFile:hover {
		cursor: pointer;
	}
	#isReadFile::before {
		content: url("../assets/img/isReadFile.png");
		width: 20px;
		height: 20px;
		padding: 20px 5px;
		vertical-align:middle;
		display:inline-block;
	}
	#showProduct {
		margin: 20px;
		overflow: hidden;
		background-color: white;
	}
	#showProduct .producetable {
		min-width: 1100px;
		max-width: 1740px;
		padding: 50px 60px 0 60px;
	}	
	.investShowList {
		width: 100%;
		min-width: 1100px;
		max-width: 1740px;
	}
	#otherProduce {
		text-align: left;
		font-size: 25px;
		font-weight: 700;
		margin: 60px 0 0 60px;
	}
	#otherProduce::before {
		content: "";
		border-left: 6px solid #CAB269;
	}
	#showUserInf {
		overflow: hidden;
		margin: 20px;
		padding-bottom: 40px;
		background-color: white;
	}
	#userInfContent {
		width: 1440px;
		background-color: white;
		position: relative;
		overflow: hidden;
	}		
	#userInfTitle {
		position: absolute;
		top: 40px;
		left: 40px;

	}
	#userInfTitle div {
		float: left;
		width: 200px;
		height: 40px;
		line-height: 40px;
		margin: 10px 0;
		font-size: 16px;
	}
	#userInfTitle div:hover {
		cursor: pointer;
	}
	#userInfProduce {
		margin: 20px;
		padding: 120px 80px;
		box-sizing: border-box;
		background-color: white;
	}
	.userProduceItem {
		width: 100%;
		overflow: hidden;
	}
	.userProduceItem div {
		text-align: left;
		float: left;
		width: 300px;
		height: 60px;
		line-height: 60px;
	}
	.userProduceTitle {
		width: 100%;
		height: 80px;
		line-height: 80px;
		font-size: 18px;
		text-align: left;
		font-weight: 700;
		float: left;
		color: gray;
	}
	.otherProduceItem div {
		float: left;
		width: 100%;
		text-align: left;
		height: 60px;
		line-height: 60px;
	}
	.currentTitle {
		background-color: rgba(42,210,200,.2);
		border-bottom: 2px solid #2AD2C8;
		color: black;
	}
	.currentContent {
		display: none;
	}
	#projectProduceContent {
		width: 1200px;
		box-sizing: border-box;
		font-size: 14px;
		margin: 40px 0;
		line-height: 25px;

		text-align: left;
	}
	#purchasePage {
		margin: 60px 0 40px 0;
	}
	.purDialogStyle {
		border-bottom: 2px solid 
	}
	#purDialog {
		margin-top: -40px;
	}
	.purDialogTi {
		display: block;
		float: left;
		font-size: 20px;
		width: 150px;
		height: 40px;
		line-height: 40px;
	}
	#purContentTi .currentTitle2 {
		background-color: #00DACA;
		color: white;
	}
	#purContentTi {
		width: 100%;
		overflow: hidden;
	}
	#purContentTi span {
		width: 120px;
		height: 32px;
		line-height: 32px;
		display: block;
		float: left;
		margin-right: 20px;
		border-radius: 5px;
		background-color: rgba(42,210,200,.2);
	}
	#purContentTi span:hover {
		cursor: pointer;
	}
	#purDialogTitle span {
		cursor: pointer;
		
	}
	#purDialogTitle {
		width: 100%;
		overflow: hidden;
	}
	.purDialogContent {
		width: 100%;
		margin: 20px 0;
		overflow: hidden;
	}
	#purSubCon {
		width: 100%;
	}
	#purSubNum {
		width: 100%;
		margin: 10px 0;
		padding: 10px 0;
		height: 60px;
		font-size: 16px;
		line-height: 30px;
		background-color: #eee;
	}
	#purSubNum span {
		display: block;
		float: left;
		width: 48%;
		height: 30px;
		
	}
	#purchaseBCA {
		overflow: hidden;
		width: 100%;
		text-align: left;
		line-height: 30px;
	}
	#purSubAlfamarty {
		text-align: left;
		margin-top: 20px;
		line-height: 30px;
	}
	.jineColor {
		display: inline-block;
		font-weight: 700;
	}
	.payCode {
		display: inline-block;
		color: orange;
	}
	#showImg {
		background-color: white;

		width: 100%;
		box-sizing: border-box;
	}
	#showImgLists {
		float: left;
		width: 100%;
		min-width: 1200px;
		display: flex;
	}
	#showImg img {
		width: 100%;
		min-width: 1200px;
	}
	#showImgTitle {
		font-size: 25px;
		margin: 10px auto;
		padding-top: 60px;
	}
	#showImgLine {
		width: 40px;
		height: 8px;
		margin: 0 auto;
		background-color: gray;
		margin-bottom: 40px;
	}
	#showImgs {
		background-color: white;
		width: 100%;
		height: 400px;
		padding-top: 50px;
		margin-top: 20px;
		padding-bottom: 50px;
	}
	#showImgListss {
		float: left;
		width: 100%;
		display: flex;
		padding-bottom: 50px;
		margin-bottom: 20px;
		background-color: white;
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
	#showImgtips {
		font-size: 25px;
		height: 100px;
		line-height: 100px;
		padding-bottom: 50px;
	}
	.dingqigoumaiIcon {
		margin: 20px auto;
		line-height: 25px;
	}
	.dingqigoumaiIcon div {
		font-weight: 700;
		font-size: 20px;
		padding-top: 20px;
	}
	#lowAmountCenter {
		display: block;
		padding: 0;
		margin: 0 auto;
		text-align: center;
		width: 100%;
	}
</style>