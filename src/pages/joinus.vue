<template>
	<div>
		<div class="topbg">
			<img src="../assets/img/joinus.jpg" alt="" width="100%" >
		</div>
		
		<div id="investmentBody">
			<div class="dcrition">
				<div class="cen_contain">
					<div class="gt_tophead">
			Do-It adalah perusahaan teknologi keuangan (fintech) yang bergerak di bidang peer-to-peer lending,<br>
menghubungkan peminjam dengan pemberi pinjaman. Memiliki tujuan untuk membantu masyarakat <br>
dalam memberikan pinjaman produktif demi tercapainya kehidupan masyarakat Indonesia yang lebih baik, kami membutuhkan orang-orang bertalenta hebat untuk bekerja bersama kami dalam bidang-bidang berikut:

					</div>
					<div class="gt_title">
						Posisi yang Tersedia
					</div>
					<div class="module module_one" @click= "routePushTo(0)">
						<img src="../assets/img/zpone.png" alt="" class="zpone">
						<span class="lable_ls">Finance</span>
					</div>
					<div class="module module_two" @click= "routePushTo(1)">
						<img src="../assets/img/zptwo.png" alt="" class="zpone">
						<span class="lable_ls1">Marketing & Ops</span>
					</div>
					<div class="module module_three" @click= "routePushTo(2)">
						<img src="../assets/img/zp3.png" alt="" class="zpone">
						<span class="lable_ls">Collection</span>
					</div>
					<div class="module module_four" @click= "routePushTo(3)">
						<img src="../assets/img/zp4.png" alt="" class="zpone">
						<span class="lable_ls">Risk</span>
					</div>
					<div class="module module_five" @click= "routePushTo(4)">
						<img src="../assets/img/zp5.png" alt="" class="zpone">
						<span class="lable_ls">HR & Legal</span>
					</div>
					<div class="module module_six" @click= "routePushTo(5)">
						<img src="../assets/img/zp6.png" alt="" class="zpone">
						<span class="lable_ls">IT</span>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				alertShow: 'false'
			}
		},
	    methods: {
	    	father1(e){
	    		this.alertShow=e
	    	},
	    	routePushTo(e){
	    		this.$router.push('/recruit?itemIndex='+e)
	    	}
	    }
	}
</script>
<style>
	.aboutContent {
		width: 13.6rem;
		height: 3.3rem;
		margin: .3rem;
		padding: .3rem 0;
		background-color: white;
	}
	.aboutTitle {
		width: 100%;
		text-align: center;
		font-size: .3rem;
		color: rgb(61,189,182)
	}
	.aboutText {
		width: 13rem;
		height: 3rem;
		padding: .3rem;
		font-size: .2rem;
		line-height: .3rem;
		text-indent:2em;
	}
	.bottomInf {
		bottom: 0;
		width: 100%;
		height: 1.2rem;
		color: rgb(245,245,245);
		background-color: rgb(62,62,88);
		overflow: hidden;
	}
	.topbg {
		/*height: 6.24rem;*/
		overflow: hidden;
	}
	.topbg img {
		width: 100%;
	}
	.dcrition {
		height: 10rem;
		position: relative;
	}
	.cen_contain {
		width: 8.77rem;
		
		height: 100%;
		position: absolute;
		margin-left: 50%;
		left: -4.38rem;

	}
	.gt_tophead {
		width: 100%;
		height: 2rem;
		font-size: .18rem;
		text-align: left;
		line-height: .38rem;
		color: rgb(30,30,30);
	}
	.gt_title {
		width: 4rem;
		height: .38rem;
		line-height: .38rem;
		color: rgb(30,30,30);
		font-size: .24rem;
		text-align: center;
		position: absolute;
		top: 2.98rem;
		margin-left: 50%;
		left: -2rem;
	}
	.zpone {
		width: 1.42rem;
		margin-top:0; 
	}
	.lable_ls {
		font-size: .24rem;
		display: inline-block;
		position: absolute;
		width: 1.42rem;
		text-align: center;
		bottom: 0;
		left: 0;
	}
	.module:hover {
		cursor: pointer;
	}
	.module_one {
		height: 2.1rem;
		width: 1.42rem;
		position: absolute;
		top: 3.95rem;
		left: 0;
	}
	.module_two {
		height: 2.1rem;
		width: 1.42rem;
		position: absolute;
		top: 3.95rem;
		left: 3.56rem;
	}
	.lable_ls1 {
		font-size: .24rem;
		display: inline-block;
		position: absolute;
		width: 1.95rem;
		text-align: left;
		bottom: 0;
		left: -.1rem;
		height: .24rem;
	}
	.module_three {
		height: 2.1rem;
		width: 1.42rem;
		position: absolute;
		top: 3.95rem;
		right: 0;
	}
	.module_four {
		height: 2.1rem;
		width: 1.42rem;
		position: absolute;
		top: 6.69rem;
		left: 0;
	} 
	.module_five {
		height: 2.1rem;
		width: 1.42rem;
		position: absolute;
		top: 6.69rem;
		left: 3.56rem;
	}
	.module_six {
		height: 2.1rem;
		width: 1.42rem;
		position: absolute;
		top: 6.69rem;
		right: 0;
	}

	#investmentBody {
		margin: 20px;
		margin-top: 0;
		padding: 40px 0;
		background-color: white;
		overflow: hidden;
	}


</style>