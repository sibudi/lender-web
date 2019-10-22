<template>
	<div id="saBodyss">
		<el-dialog
		  :visible.sync="dialogVisible"
		  width="50%"
		  id="dialogSa"
		  style="backgroundColor:#eee">
			<login></login>
		</el-dialog>
		<div id="saContentss">
			<div id="formTitlesss">
				<el-dialog title="" :visible.sync="studentTableShow">
					<div id="stuAlert">
						<span id="stuAlert1"><img @click="stuQquestion" src="../../assets/img/answer.png" alt="">Perkiraan jumlah uang yang akan dibayarkan setiap bulan adalah sebagai berikut</span>
						<table id="stuData" border="1" bordercolor="#99A5B0" style="border-collapse:collapse;width: 100%" >
							<tr style="width:100%">
								<th>Bulan</th>
								<th>Jumlah</th>
							</tr>
							<tr v-for="item in studentpayData">
								<td style="width:50%">{{item.datee}}</td>
								<td>Rp. {{item.value}}</td>
							</tr>
						</table>
						<div id="studentButton">
							<div id="studentButton1" @click="stuCancel">Batalkan</div>
							<div id="studentButton2" @click="stuOk">Konfirmasi</div>
						</div>
					</div>
				</el-dialog>

				<div style="position:relative">
					<img src="../../assets/img/studentBanner.png" alt="">
					<img src="../../assets/img/logo.png" alt="" id="zanshiImgL">
					<img src="../../assets/img/ojklogo.png" alt="" id="zanshiImgR">
					<div id="formContent">
						<div id="formContentTitle">Berkomitmen Untuk Menyediakan Layanan Pinjaman Uang Bagi<br>Seluruh Pelajar di Indonesia</div>
						<el-form ref="form" :model="searchForm" label-width="250px" style="padding-right: 250px;width: 700px;margin: 0 auto">	
							<!-- 姓名 -->
							<el-form-item prop="amountApply" >
								<div class="formUserName">Jumlah Pinjaman</div>
								<i id="studentBorrowI">Rp</i>
							    <input type="text" id="login_div" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength = 15 class="formUserNamee" placeholder="" v-model="searchForm.amountApply">
							</el-form-item>	
							<!-- iddetailed -->
							<el-form-item prop="term">
								<div class="formUserName">Jangka waktu pinjaman</div>
								<div id="selecttt">
								    <el-select v-model="searchForm.term" style="width: 100%;">
									    <el-option
									      key="6 bulan"
									      label="6 bulan"
									      value="6 bulan">
									    </el-option>
									</el-select>
								</div>
								<span id="studentTips">Perkiraan biaya yang akan dibayarkan setiap bulan：</span>
								<div id="studentRepayV">Rp {{studentsValue}}</div>
							</el-form-item>	
							<el-form-item>
								<el-button type="primary" @click="onSubmit" class="onSubmitS">Lihat rencana pinjaman
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
			<div id="companyContent">
				<div class="companyContentDiv">
					<div id="companyContentTitle">
						Dokumen untuk pengajuan
						<i></i>
					</div>
					<div id="companyContentImg"><img src="../../assets/img/studentDoit.png" alt=""></div>
					<div id="companyContentText">
						<span>Data Permohonan</span>
						<ul id="studentLi">
							<li>•  Kartu Tanda Penduduk (KTP)</li>
							<li>•  Kartu Keluarga (KK)</li>
							<li>•  Kartu Tanda Mahasiswa</li>
							<li>•  Foto Bukti sebagai Mahasiswa</li>
							<li>•  Informasi Penjamin Nasabah</li>
						</ul>
					</div>
				</div>
			</div>
			<div id="companyQa">
				<div id="companyQaTitle">FAQ Do-It for Education</div>
				<div id="comQaContentItems">				
					<div id="comQaContent1">
						<div class="comQaContentItem" v-for="i in qaItemDataL">					
							<div class="comQaContentQ">
								<div class="comQaContentQL">Q:</div>
								<div class="comQaContentQR">{{i.q}}</div>
							</div>
							<div class="comQaContentA">
								<div class="comQaContentQL">A:</div>
								<div class="comQaContentQR">{{i.a}}</div>
							</div>
						</div>
					</div>
					<div id="comQaContent2">
						<div class="comQaContentItem" v-for="i in qaItemDataR">					
							<div class="comQaContentQ">
								<div class="comQaContentQL">Q:</div>
								<div class="comQaContentQR">{{i.q}}</div>
							</div>
							<div class="comQaContentA">
								<div class="comQaContentQL">A:</div>
								<div class="comQaContentQR">{{i.a}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from './../../store'
	import login from './../login/Login'
	export default {
		data(){
			return{
				searchForm: {     
				    "amountApply":"",
				    "term":"6 bulan",
				},
				dialogVisible: false,
				guangbiao: 0,
				upp: 0,
				studentsValue: "",
				studentpayData:[{datee:"",value:""},{datee:"",value:""},{datee:"",value:""},{datee:"",value:""},{datee:"",value:""},{datee:"",value:""}],
				studentTableShow: false,
				isAbleSub: 0,
				qaItemDataL: [
					{
						q:'Apa itu Do-It for Education?',
						a:'Do-It for Education adalah layanan dari Do-It yang memberikan fasilitas pinjaman uang kuliah semester kepada mahasiswa'
					},{
						q:'Apa syarat yang diperlukan untuk mengajukan pinjaman di layanan Do-It for Education?',
						a:'Terdapat beberapa persyaratan yang diperlukan untuk mengajukan layanan Do-It for Education, yakni : · Anda harus merupakan Warga Negara Indonesia yang dibuktikan dengan Kartu Tanda Penduduk · Anda harus terdaftar di salah satu universitas atau perguruan tinggi di Indonesia '
					},{
						q:'Bagaimana proses pengajuan pinjaman di Do-It for Education?',
						a:'Layanan dapat diakses dari website Do-It, lalu Anda dapat mendaftarkan diri dan mengisi semua informasi di website tersebut. Data yang Anda isi akan diverifikasi oleh tim Do-It, kemudian bila Anda lulus verifikasi, kami akan memberitahukan kepada Anda.'
					},{
						q:'Berapa lama periode cicilan?',
						a:'Untuk saat ini Anda dapat mencicil dengan periode 6 bulan'
					},{
						q:'Biaya apa saja yang menjadi layanan Do-It for Education?',
						a:'Untuk saat ini layanan Do-It for Education melayani pinjaman untuk biaya uang kuliah semester, ke depan Anda bisa menikmati layanan untuk pinjaman uang pangkal, uang Gedung, uang administrasi, ataupun biaya akademis lainnya yang bisa Do-It bayarkan langsung ke rekening institusi Pendidikan tempat Anda terdaftar'
					},{
						q:'Apakah ada dokumen lain yang diperlukan?',
						a:'Ya, kami membutuhkan lampiran foto kartu keluarga, lampiran foto Kartu Tanda Mahasiswa, lampiran foto bukti atau screenshot tagihan yang harus dibayarkan atau instruksi pembayaran dari pihak universitas tempat Anda terdaftar'
					},{
						q:'Bagaimana penagihan yang dilakukan bila melewati jatuh tempo atau telat?',
						a:'Pihak kami akan mengirimkan informasi sebagai pengigat untuk melakukan pembayaran sebelum jatuh tempo. Kemudian, sesuai dengan peraturan OJK penagihan dapat dilakukan langsung oleh kami sebagai penyelenggara maupun menggunakan atau melibatkan jasa pihak lain di luar penyelenggara.'
					},{
						q:'Bagaimana proses pembayaran di Do-It for Education?',
						a:'Do-It akan melakukan pengiriman uang kuliah ke universitas tempat Anda terdaftar sesuai dengan tagihan yang harus Anda bayarkan di semester yang bersangkutan, lalu Anda dapat membayar kepada Do-It dengan cara mencicil setiap bulan'
					}
				],
				qaItemDataR: [
					{
						q:'Apakah saya membutuhkan penjamin pinjaman?',
						a:'Iya, Anda membutuhkan penjamin pinjaman dari orang tua atau keluarga inti Anda yang memenuhi persyaratan untuk menjadi penjamin Anda'
					},{
						q:'Apa syarat menjadi penjamin pinjaman?',
						a:'Merupakan Warga Negara Indonesia yang dibuktikan dengan Kartu Tanda Penduduk, berusia minimal 21 tahun, dan mempunyai pekerjaan tetap yang dibuktikan dengan slip gaji ataupun surat keterangan penghasilan bagi yang tidak memiliki slip gaji'
					},{
						q:'Berapa bunga pinjaman?',
						a:'Bunga pinjamannya adalah 1.75% /bulan dari total pinjaman yang Anda ajukan'
					},{
						q:'Kapan periode pembayaran cicilan?',
						a:'Periode pembayaran cicilan setiap bulan dapat diajukan setiap hari di bulan yang bersangkutan'
					},{
						q:'Bagaimana perhitungan pembayaran cicilan?',
						a:'Berikut mekanisme perhitungan pembayaran cicilan Do-It for Education Bulan pertama Anda harus membayarkan DP (10% dari total pinjaman) dan biaya admin (3% dari total pinjaman) - Bulan kedua sampai keenam, Anda akan membayarkan cicilan perbulan ditambah dengan bunga.Perhitungan cicilan : (90% dari total pinjaman) / 5 bulan. Bunga : 1.75% dari total pinjaman Contoh : Pengajuan pinjaman Rp 10.000.000. Bulan pertama : DP (10% *10.000.000 = 1.000.000) + biaya admin 3% (3%*10.000.000 = 300.000) = Rp 1.300.000. Bulan kedua : cicilan ((90%*10.000.000)/5 = 1.800.000) + bunga per bulan (1,75%*10.000.000 = 175.000) = Rp 1.975.000. Bulan ketiga sampai dengan bulan keenam, jumlah pembayaran cicilan sama seperti bulan kedua'
					},{
						q:'Apa yang terjadi bila saya tidak membayar cicilan secara tepat waktu?',
						a:'Anda akan dikenakan biaya pinalti dan biaya keterlambatan. Biaya pinalti adalah sebesar Rp 50.000 dan biaya keterlambatan adalah sebesar 0,5%/hari dari total tagihan bulan yang bersangkutan'
					},{
						q:'Apakah saya bisa membayar biaya cicilan lebih awal atau melunasi seluruh cicilan sebelum waktu jatuh tempo?',
						a:'Ya, Anda bisa melunasi keseluruhan pembayaran maupun membayar biaya cicilan lebih awal'
				}],
				nextUrlTo:{path:"/studentApply1"}
			}
		},
	    components: {
	      login
	    },
		watch:{
			searchForm: {
　　　　　　　　　handler(curVal,oldVal){
					let v=curVal.amountApply,s=Math.ceil((v*0.13)/100)*100;
			    	let mydatee=new Date,y=mydatee.getFullYear(),m=mydatee.getMonth()+1;
			    	let sm=(m<10 ? "0"+m:m);
　　　　　　　　　　　this.studentsValue=Math.ceil((v*0.9/5+v*0.0175)/100)*100;
					this.studentpayData[0].value=this.dealNumber(s);
					this.studentpayData[0].datee=y+"."+sm;
			    	for(let i=1,yy=0,mm=0;i<5;i++){
			    		if(m<12){
							m++;
			    		}else {
			    			m=1;
			    			y++;
			    		}
			    		let ms=(m<10 ? "0"+m:m);
			    		this.studentpayData[i].datee=y+"."+ms;
			    		// this.studentpayData[i].value=((v*0.9/5+v*0.0175)/1000).toFixed(0)*1000;
			    		this.studentpayData[i].value=this.dealNumber(Math.ceil((v*0.9/5+v*0.0175)/100)*100);
			    		this.studentsValue=this.studentpayData[i].value;
			    	}

　　　　　　　　　},
　　　　　　　　　deep:true
			}

		},
		methods:{
			init(){
				if(store.getters.token){
					this.$axios.post('/api-user/user/studentStepInfo', {}).then((response) =>{
						if(response.data.code==0){
							this.isAbleSub=response.data.data["initAble"];
							let a=response.data.data["step"]+1;
							this.nextUrlTo["path"]="/studentApply"+a;

						}else {
							// this.$message(response.data.message);
						}
						resolve(re);
				   	}).catch( (re)=>{
				   		// console.log(re);
					});
				}
			},
			/*将100000转为100,000.00形式*/
			dealNumber(money){
			    if(money && money!=null){
			        money = String(money);
			        var left=money.split('.')[0],right=money.split('.')[1];
			        right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '';
			        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
			        return (Number(money)<0?"-":"") + temp.join('.').split('').reverse().join('')+right;
			    }else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
			        return '0';
			    }else{
			        return "";
			    }	
			},
			/*将100,000.00转为100000形式*/
			undoNubmer(money){
			    if(money && money!=null){
			        money = String(money);
			        var group = money.split('.');
			        var left = group[0].split('.').join('');
			        return Number(left+"."+group[1]);
			    }else{
			        return "";
			    }	
			},
		    onSubmit(){
		    	if(!store.getters.token){
					this.dialogVisible=true;
					return;
		    	}
		    	if(this.nextUrlTo["path"]=="/studentApply5"){
		    		this.nextUrlTo["path"]="/studentApply1";
		    	}
		    	if(this.isAbleSub==1){
			        this.$alert('Anda sudah mengajukan permohonan.Mohon menunggu hasil permohonan Anda.', '', {
			          confirmButtonText: 'Kembali',
			          center: true
			        }).then(() => {

			        }).catch(() => {
			          
			        });
		    		return;
		    	}
		    	if(this.searchForm['amountApply']>15000000||this.searchForm['amountApply']<1000){
		    		this.$message("Harap masukkan jumlah yang lebih besar dari 1000 dan kurang dari 150000000");
		    		return
		    	}
		    	let j=1;
		    	for(let i in this.searchForm){
		    		if(!this.searchForm[i]){
		    			this.$message("Tidak boleh kosong");
		    			j=0;
		    			return;
		    		}
		    	}
		    	if(this.searchForm["term"]=="6 bulan"){
		    		this.searchForm["term"]=6
		    	};
		    	this.studentTableShow=true;

		    },
		    stuQquestion(){

		        this.$alert("Anggaran pelunasan hanya sebagai perkiraan. Untuk pelunasan sebenarnya, harap menyesuaikan dengan data pinjaman sebenarnya.<br>Demi menjaga kredit pinjaman anda yang baik, maka harap segera melunasi pinjaman anda. Jika saya tidak melunasi sesuai dengan waktu yang dijanjikan, maka saya bersedia menanggung biaya keterlambatan beserta dendanya. <p>Bunga: 1,75% dari pinjaman pokok</p><p>Biaya keterlambatan : 0.5%per hari </p><p> pinalti keterlambatan : Rp 50.000</p>",'Penjelasan Biaya', {
		          dangerouslyUseHTMLString: true,
		        },{}).then(() => {

		        }).catch(() => {

		        });
		    },
		    stuCancel(){
		    	this.studentTableShow=false
		    },
		    stuOk(){
				this.$axios.post('/api-user/user/studentLoanInit', this.searchForm).then((response) =>{
					if(response.data.code==0){
						this.studentTableShow=false;
						this.$message({message: 'success', type: 'success'});
						setTimeout(()=>{
							this.$router.push(this.nextUrlTo["path"])
						}, 1000);
					}else {
						this.$message(response.data.message);
					}
					resolve(re);
			   	}).catch( (re)=>{
			   		// console.log(re);
				});
		    }
		},
		mounted(){
			this.init();
		}
	}
</script>
<style scoped>
	#saBodyss {
		position: static;
		min-width: 1400px;
	}
	#dialogSa {
		min-width: 1200px;
	}
	#formTitlesss {
		position: relative;
		margin:20px;
		height: 800px;
		overflow: hidden;
	}
	#studentBorrowI {
		display: block;
		position: absolute;
		padding-left: 20px;
		font-size: 20px;
		top: 40px;
		left: 0;
		color: #1F2532;
	}
	.formUserNamee {
		border-radius: 20px;
		height: 40px;
		width: 390px;
		padding-left: 60px;
		line-height: 40px;
		font-size: 16px;
	}
	#formContent {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	#formContentTitle {
		width: 1000px;
		margin: 80px auto;
		height: 80px;
		line-height: 40px;
		font-size: 30px;
		color: white;
	}
	.formUserName {
		font-size: 20px;
		color: white;
		text-align: left;
	}
	#studentTips {
		line-height: 40px;
		font-size: 16px;
		color: white;
		text-align: left;
		display: block;
	}
	#studentRepayV {
		width: 100%;
		text-align: right;
		font-size: 30px;
		color: #FF642E;
	}
	.onSubmitS {
		width:450px;
		background-color:#2AD2C8;
		border:#2AD2C8;
		border-radius:20px;
		height: 40px;
		line-height: 16px;
		font-size: 18px;
	}
	#formTitlesss img {
		width: 100%;
	}
	#selecttt {
		border-radius: 20px;
		overflow: hidden;
	}
	#companyContent {
		/*min-width: 1200px;*/
		height: 500px;
		overflow: hidden;
		margin: 20px;
		box-shadow: 5px 5px 5px #eee;
		background-color: white;
	}
	#companyContentTitle {
		width: 1050px;
		text-align: center;
		height: 40px;
		margin: 60px auto;
		line-height: 40px;
		font-size: 35px;
		color: #1F2532;
		font-family: PingFangSC;
		font-weight: Medium;
	}
	#companyContentImg {
		width: 400px;
		height: 300px;
		overflow: hidden;
		float: left;
		margin: 20px 50px;
		margin-left: 150px;
	}
	#companyContentImg img {
		margin-left: 50px;
		height: 100%;
	}
	#companyContentText {
		float: left;
		text-align: left;
		line-height: 25px;
		padding: 20px 50px;
		width: 350px;
		height: 260px;
	}
	#companyContentText span {
		font-size: 25px;
		line-height: 40px;
		height: 40px;
		display: block;
		width: 100%;
	}
	.companyContentDiv {
		width: 1050px;
		margin: 0 auto;
		overflow: hidden;
	}
	#studentLi li {
		height: 35px;
		line-height: 35px;
	}
	#ddd {
		color: red;
		font-size: 33px;
	}
	.el-message-box--center .el-message-box__title {
		justify-content: left;
		text-align: left;
	}
	#stuAlert {
		color:#4A4A4A;
		z-index: 99;
		background-color: white;
		padding: 20px;
		border-radius: 5px;
	}
	#stuAlert1 {
		margin-top: -40px;
		display: block;
		height: 50px;
		line-height: 30px;
		width: 100%;
		text-align: left;
		color: gray;
		border: 0;
		background-color: white;
	}
	#stuAlert1 img {
		float: left;
		width: 20px;
		height: 20px;
		padding: 5px 10px 5px 0;
	}
	#stuData tr{
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	#studentButton {
		width: 100%;
		margin-top: 20px;
		display: flex;
	}
	#studentButton1,#studentButton2 {
		flex: 1;
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
		color: #ffff;
		font-size: 16px;
		text-align: center;
	}
	#studentButton1 {
		background-color: rgb(153,165,176);
		margin-right: 60px;
	}
	#studentButton1:hover {
		cursor: pointer;
	}
	#studentButton2:hover {
		cursor: pointer;
	}
	#studentButton2 {
		background-color: #2AD2C8;
		margin-left: 60px;
	}
	#companyQa {
		margin: 20px;
		padding: 60px 0;
		text-align: left;
		background-color: white;
	}
	#comQaContentItems {
		width: 1400px;
		margin: 0 auto;
		overflow: hidden;
		font-size: 16px;
		line-height: 30px;
	}
	.comQaContentItem {
		margin-top: 20px;
		overflow: hidden;
	}
	#companyQaTitle {
		text-align: center;
		width: 100%;
		font-size: 30px;
		margin: 20px 0 50px 0;
	}
	#comQaContent1 {
		width: 600px;
		float: left;
		overflow: hidden;
		margin-left: 70px;

	}
	#comQaContent2 {
		width: 600px;
		float: right;
		overflow: hidden;
		margin-right: 80px;
	}
	.comQaContentQ {
		font-weight: 700;
	}
	.comQaContentQL {
		width: 30px;
		float: left;
	}
	.comQaContentQR {
		float: left;
		width: 550px;
	}
	.comQaContentA {
		text-align: justify;
	}
	#formTitlesss #zanshiImgL {
		display: block;
		width: 300px;
		position: absolute;
		left: 40px;
		top: 20px;
	}
	#formTitlesss #zanshiImgR {
		display: block;
		width: 200px;
		position: absolute;
		right: 20px;
		top: 20px;
	}
</style>