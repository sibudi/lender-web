<i18n>
  {
    "zh-cn":{
    },
    "en":{
      	"enterPhoneNum":"Format nomor telepon salah",
	    "productProduce":"Rekomendasi produk",
	    "borrowProduce":"Panduan Keuangan",
	    "borrowProduceContent":"Mengapa Harus mengelola uang?Untuk mencapai kebebasan finansial, gunakan uang anda untuk menghasilkan uang, hal tercepat untuk meraih kekayaan. Biarkan uang anda menghasilka  uang sebagai pengahasilan tambahan untuk mencapai kebebasan finansial.Belajar mengelola uang, mengalokasikannya dengan tepat dan maksimal.",	    
	    "investProduce":"Panduan Meminjam Uang",
	    "investProduceContent":"Menggunakan uang anda untuk memenuhi kehiduoan hari ini, hanya butuh beberapa langkah.Masih khawatir malu jika meminjam uang ke teman atau tetangga?Masih khawatir dengan kantong yang kosong?Kami menyediakan sebuah layanan peminjaman uang bagi anda, sehingga anda tidak perlu lagi malu karena kantong kosong.",
	    "leftTitle1":"Pengelolaan keuangan saat ini",
	    "leftTitleContent1":"On-the-go , Nyaman dan mudah digunakan",
	    "leftTitle2":"Manajemen keuangan reguler",
	    "leftTitleContent2":"Stabil dan nilai tambah , duduk menanti hasil pendapatan",
	    "leftTitle3":"Area massal",
	    "leftTitleContent3":"Jumlah kecil dispersi, pinjaman pinjaman hanya satu klikan",
	    "companyTitle":"Pengesahan perusahaan, pengungkapan informasi",
	    "freeBorrowLoan":"On-the-go",
	    "lowLockdate":"Periode penguncian minimal 7 hari",
	    "investLoanTerm":"Periode keuangan",
	    "aboutNew":"Tentang laporan berita kami"
  	}
  }
</i18n>
<template>
<div>
    <el-carousel indicator-position="none" class="bannerImgs" height="100%">
        <el-carousel-item v-for="item in bannerLists" :key="item.url">
            <img :src="item.url" alt="" class="banner_img">
            <div class="bannerTip">{{item.text}}</div>
        </el-carousel-item>
    </el-carousel>

		<div class="introduce_box">
			<div class="introduce_box_main">
				<div class="intro_box_item" style="background:#fff;">
					<div class="intro_box_item_con df jcsb">
						<div class="intro_text">
							<p>Panduan Memberi Pinjaman Uang</p>
							<div>Mengapa harus mengelola uang?</div>
							<div>Untuk mencapai kebebasan finansial, gunakan uang Anda untuk menghasilkan uang. </div>
							<div>Kelola uang Anda dengan baik, alokasikan dengan tepat dan maksimal.</div>
						</div>
						<div class="intro_video_box" @mouseover='vedio1over' @mouseout='vedio1out'>
							<video class="intro_video" :controls="control1" style="width:469px; height:298px; object-fit: fill">
							    <source src="../assets/video/movie1.mp4" type="video/mp4">
							    <source src="../assets/video/movie1.mp4" type="video/ogg">
							</video>
						</div>
					</div>
				</div>
				<div class="intro_box_item" style="background:#F1F3F6;">
					<div class="intro_box_item_con df jcsb">
						<div class="intro_video_box" @mouseover='vedio2over' @mouseout='vedio2out'>
							<video class="intro_video" :controls="control2"  style="width:469px; height:298px; object-fit: fill">
							    <source src="../assets/video/movie2.mp4" type="video/mp4">
							    <source src="../assets/video/movie2.mp4" type="video/ogg">
							</video>
						</div>
						<div class="intro_text" id="">
							<p>Panduan Meminjam Uang</p>
							<div>Ada kebutuhan mendesak tapi bingung mencari dananya?</div>
							<div>Khawatir atau malu jika harus meminjam uang ke teman atau saudara?</div>
							<div>Do-It adalah solusi paling tepat. Download aplikasinya sekarang!</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div class="team_box">
			<div class="team_box_main">
				<p class="team_box_tit">Tim yang profesional, <br>solid dan penuh kasih</p>
				<div class="team_box_detail">
					<div class="team_detail_tit">Tim Do-It</div>
					<div class="team_detail_con">Do-It memiliki tim manajemen yang berpengalaman di bidangnya. <br>Anggota tim merupakan lulusan terbaik dari kampus dalam negeri maupun luar negeri serta memiliki pengalaman kerja di berbagai perusahaan ternama.</div>
				</div>
			</div>
		</div>


		<div class="partner_box">
			<div class="partner_box_main">
				<div class="df aic">
					<p>Liputan Media oleh</p>
					<div>
						<a href="https://infobisnis.id/2019/05/14/do-it-edukasi-depok-creative-women-mengembangkan-usaha-dengan-ekonomi-digital/ " target="_blank"><img src="../assets/images/home_icon01.png" height="52" width="120"></a>
						<a href="https://ekonomi.kompas.com/read/2019/05/25/185244926/jangan-lupa-bijak-dalam-pinjam-dana-di-fintech" target="_blank"><img src="../assets/images/home_icon02.png" height="52" width="120"></a>
						<a href="https://finansial.bisnis.com/read/20190519/55/924437/begini-cara-atur-keuangan-keluarga-ala-do-it" target="_blank"><img src="../assets/images/home_icon03.png" height="52" width="120"></a>
						<a href="https://keuangan.kontan.co.id/news/do-it-ajak-milenial-persiapkan-biaya-pendidikan-sejak-dini
	" target="_blank"><img src="../assets/images/home_icon04.png" height="52" width="120"></a>
						<a href="http://www.tribunnews.com/bisnis/2019/06/11/do-it-dukung-umkm-untuk-masuk-ke-dunia-digital" target="_blank"><img src="../assets/images/home_icon05.png" height="52" width="120" style="margin-right: 0;"></a>
					</div>
				</div>
				<div class="df aic">
					<p>Mitra</p>
					<div>
						<img src="../assets/images/home_icon07.png" height="52" width="120">
						<img src="../assets/images/home_icon08.png" height="52" width="120">
						<img src="../assets/images/home_icon09.png" height="52" width="120">
						<img src="../assets/images/home_icon10.png" height="52" width="120" style="margin-right: 0;">
					</div>
				</div>
			</div>
		</div>

		<div class="bot_logo_box df">
	      <div class="f1 bot_logo_item">
	        <p>Telah Terdaftar dan Diawasi oleh</p>
	        <img src="../assets/images/ojk_logo.png" height="35" width="96">
	      </div>
	      <div class="f1 bot_logo_item">
	        <p>Anggota dari</p>
	        <div id="SCRafpi"></div>
	      </div>
    </div>

    <!-- <div class="home_alert_bg" v-if="currentBalance>0&&login">
    	<div  class="home_alert_box">
    		<div><i class="el-icon-error colC9 close_btn" @click="goback"></i></div>
    		<div class="home_alter_tit">Jumlah yang tersedia</div>
    		<div class="hoem_alter_amount">Rp {{$globals.dataUtil.parseNumber(currentBalance)}}</div>
    		<div class="home_alert_check" @click="goAssets">Lihat Detail</div>
    		<div class="df home_alert_btn jcsb">
    			<p @click="goBank">Tidak, transfer ke kartu bank.</p>
    			<p @click="goScattered">Pendanaan segera</p>
    		</div>
    	</div>
	    
	  </div> -->

</div>
</template>

<script scoped>
	import investShowList from '../components/investShowList.vue'
	import store from '../store/index.js'
	import '../../static/jquery.min.js'
	export default {
		data(){
			return {
				currentBalance:0,
				login: false,
				control1: false,
				control2: false,
				bannerLists:[{url:"./static/banner4.png"},{url:"./static/banner3.png"}],
				domainUrl:''
			}
		},
		components: {investShowList},
		methods: {
			init(){

				let bannerImgs=document.querySelector(".bannerImgs");
		        let clientW=document.documentElement.clientWidth;
		        let clientH=document.documentElement.clientHeight;
				// bannerImgs.style.cssText="margin-top:-1.7rem;height:"+clientH+"px";
				
		      let _this = this;
		     	_this.login = localStorage.getItem('login');
		     	if(_this.login&&_this.$store.getters.token){
			     	_this.$axios.post('/api-user/user/selectUserAccountSession', {'userId':_this.$store.getters.userUuid}).then(function (re) {
			        if(re.data.code==0){
			          _this.currentBalance = re.data.data.currentBalance;
			        }else {
			          _this.$message(re.data.message);
			        }
			      }).catch(function (re) {});
		     	}


			},
			vedio1over(){
				this.control1=true
			},
			vedio1out(){
				this.control1=false
			},
			vedio2over(){
				this.control2=true
			},
			vedio2out(){
				this.control2=false
			},
			goback(){
				this.login = false;
				localStorage.removeItem('login');
			},
			goAssets(){
				this.$router.push('/center/assets');
			},
			goBank(){
				this.$router.push('/center/withdrawal');
			},
			goScattered(){
				this.$router.push('/Scattered');
			}
		},
		mounted(){
		    this.init();
        const s = document.createElement('script');
		    s.type = 'text/javascript';
		    s.src = process.env.AFPI_URL;
		    document.body.appendChild(s);

		},
		destroyed(){
			localStorage.removeItem('login');
			const otherJs = document.getElementsByTagName('script');
	    for(let i=0;i<otherJs.length;i++){
	    	if(otherJs[i].src == process.env.AFPI_URL){
	    		document.body.removeChild(otherJs[i])
	    	}
	    }
  	},
	}


	
</script>
<style scoped>
	.banner_img {
	  	width: 100%;
	  	min-width: 1200px;
	  	object-fit: cover;
	  	height: 100%;
	}
	.bannerImgs{
		height: 698px;
		/* margin-top:-20px; */
	}
	.introduce_box{
		width: 100%;
	}
	.intro_box_item{
		overflow: hidden;
		text-align: left;
		padding: 52px 0px;
	}
	.intro_box_item_con{
		width: 1086px;
		margin:0 auto;
		padding: 0 52px 0 62px;
	}
	.intro_video_box {
  	width: 469px;
  	height: 298px;
	}
	.intro_text {
		width: 486px;
		font-family:PingFangSC-Medium;
	}
	.intro_text p{
		font-size:24px;
		color:#164276;
		margin-bottom: 18px;
		margin-top: 10px;
		}
		.intro_text div{
			font-size: 16px;
			margin-bottom: 20px;
			color: #8F9DAA;
			line-height: 30px;
			font-family:PingFangSC-Regular;
			font-weight:400;
		}


	.team_box{
		height: 472px;
		width: 100%;
	 	background: url('../assets/images/home_bg.png') no-repeat center center;
		background-size: cover; 
		-webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */ 
		-o-background-size: cover;/* 兼容Opera */ 
	}
	.team_box_main{
		width: 1200px;
		height: 472px;
	  margin: 0 auto;
	  text-align: left;
	  position: relative;
	}
	.team_box_tit{
		color: #fff;
		font-size: 36px;
		padding:187px 225px 0 145px;
	}
	.team_box_detail{
		width:396px;
		height:296px;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 60px 10px rgba(13,37,62,0.1);
		border-radius:4px;
		position: absolute;
		top: -16px;
		right: 29px;
		padding:100px 50px 109px 44px;
	}
	.team_detail_tit{
		font-size: 24px;
		margin-bottom: 20px;
		color: #2AD2C8;
	}
	.team_detail_con{
		font-size: 20px;
		color: #8F9DAA;
		line-height: 32px;
	}

	.partner_box{
		background: #164276;
		height: 135px;
		color: #fff;
		font-size: 18px;
		padding: 58px 0 50px;
		text-align: left;
	}
	.partner_box_main{
	  width: 1093px;
	  margin: 0 auto;
	  padding-left: 107px;
	}	
	.partner_box_main p{
		width: 128px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		text-align: center;
		margin-right: 35px;
	}
	.partner_box_main img{
		margin-right: 40px
	}
	.partner_box_main div.df{
		margin-bottom: 31px;
	}

	.bot_logo_box{
	  font-size: 18px;
	  width: 100%;
	  margin: 0 auto;
	}
.bot_logo_item{
  background-color: #fff;
  color: #164276;
  height: 98px;
  padding: 40px 0 40px;
  text-align: center;
}
.bot_logo_item:nth-child(2){
  background-color: #5F5EFF;
  color: #fff;
}
.bot_logo_item p{
  margin-bottom: 27px;
}

.home_alert_bg{
    position: fixed;
    background:rgba(87,104,119,0.745);
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 3;
}
.home_alert_box{
	  width:678px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(212,219,225,1);
    position: absolute;
    top: 150px;
    left: 50%;
    margin-left: -339px;
    margin-bottom: 80px;
}
  .home_alert_box .close_btn{
    font-size: 30px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .home_alert_box .home_alter_tit{
	padding: 120px 0 40px;
	font-size: 24px;
	color: #164276;
}
.home_alert_box .hoem_alter_amount{
	color: #00D6C9;
	font-size: 52px;
}
.home_alert_box .home_alert_check{
	font-size: 18px;
	color: #00D6C9;
	padding: 30px 0 60px;
	cursor: pointer;
}
.home_alert_btn{
	padding: 0 90px;
}
.home_alert_box .home_alert_btn p{
	min-width:230px;
	height:58px;
	border-radius:5px;
	color: #fff;
	font-size: 16px;
	line-height: 60px;
	cursor: pointer;
	margin-bottom: 60px;
}
.home_alert_box .home_alert_btn p:nth-child(1){
		border:1px solid rgba(0,214,201,1);
		box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
		color: #00D6C9;
}
.home_alert_box .home_alert_btn p:nth-child(2){
	border:1px solid rgba(42,210,200,1);
	background:rgba(42,210,200,1);
	box-shadow:0px 4px 4px 0px rgba(211,211,211,0.5);
}


	
</style>

<style>
.bot_logo_item #SCRafpi .clientData{
	position: initial;
	width: 96px;
	margin: 0 auto;
}
</style>