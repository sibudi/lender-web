<i18n>
  {
    "zh-cn":{
      "advantage": "我们平台优势",
      "fast": "快",
      "simple": "简单",
      "lowrate": "低利率",
      "introduce": "借款流程介绍",
      "tips10": "Perorangan membutuhkan",
      "tips11": "dana untuk",
			"tips12": "keperluan pribadi",
      "tips20": "Mendaftar untuk pinjaman",
      "tips21": "aplikasi Do-it",
      "tips30": "Tim Do-it memproses",
      "tips31": "aplikasi pinjaman",
      "tips40": "Pemberi pinjaman",
      "tips41": "mendanai pinjaman melalui",
      "tips42": "website Do-it",
      "tips50": "Peminjam menerima",
      "tips51": "pinjaman setelah proses",
      "tips52": "pendanaan selesai",
      "risk": "风险保障",
      "risktips1": "严密的风控管理系统",
      "risktips2": "现金雄厚的独家技术",
      "risktips3": "投资安全由法律保障"
    },
    "en":{
    	"advantage": "Keuntungan Meminjam di Do-It",
      "fast": "Cepat",
      "simple": "Mudah",
      "lowrate": "Suku bunga relatif rendah",
      "introduce": "Proses Mengajukan Pinjaman",
      "tips10": "Perorangan membutuhkan",
      "tips11": "dana untuk",
	  "tips12": "keperluan pribadi",
      "tips20": "Mendaftar untuk pinjaman",
      "tips21": "di app Do-It",
      "tips30": "Do-It memproses",
      "tips31": "aplikasi pinjaman",
      "tips40": "Pemberi pinjaman",
      "tips41": "mendanai pinjaman melalui",
      "tips42": "web Do-It",
      "tips50": "Selesai! ",
      "tips51": "Peminjam menerima dana pinjam",
      "risk": "Perlindungan Keamanan",
      "risktips1": "Sistem Manajemen Risiko yang ketat",
      "risktips2": "Teknologi canggih memproses data pengguna",
      "risktips3": "Keamanan data pengguna dijamin"
    }
  }
</i18n>

<template>
	<div class="view_intro">
		<!-- 我们平台的优势 -->
		<div class="intro_box">
			<p v-t="'advantage'" class="intro_title"></p>
			<p class="intro_line"></p>
			<div flex class="intro_content jcsb">
				<div>
					<img src="@/assets/img/new/intro_fast.png" class="intro_img">
					<p v-t="'fast'"></p>
				</div>
				<div>
					<img src="@/assets/img/new/intro_simple.png" class="intro_img">
					<p v-t="'simple'"></p>
				</div>
				<div>
					<img src="@/assets/img/new/intro_low.png" class="intro_img">
					<p v-t="'lowrate'"></p>
				</div>
			</div>
		</div>
		<!-- 借款流程介绍 -->
		<div class="intro_box step_box">
			<p v-t="'introduce'" class="intro_title"></p>
			<p class="intro_line"  style="background: #fff;"></p>
			<div flex class="intro_content jcsb step_content">
<!-- 				<div>
					<img src="@/assets/img/new/intro_step1.png" class="intro_img step_img">
					<p class="step_num">1</p>
					<p v-t="'tips10'"></p>
					<p v-t="'tips11'"></p>
					<p v-t="'tips12'"></p>
				</div> -->
				<div>
					<img src="@/assets/img/new/intro_step2.png" class="intro_img step_img">
					<p class="step_num">1</p>
					<p v-t="'tips20'"></p>
					<p v-t="'tips21'"></p>
				</div>
				<div>
					<img src="@/assets/img/new/intro_step3.png" class="intro_img step_img">
					<p class="step_num">2</p>
					<p v-t="'tips30'"></p>
					<p v-t="'tips31'"></p>
				</div>
				<div>
					<img src="@/assets/img/new/intro_step4.png" class="intro_img step_img">
					<p class="step_num">3</p>
					<p v-t="'tips40'"></p>
					<p v-t="'tips41'"></p>
					<p v-t="'tips42'"></p>
				</div>
				<div>
					<img src="@/assets/img/new/intro_step5.png" class="intro_img step_img">
					<p class="step_num">4</p>
					<p v-t="'tips50'"></p>
					<p v-t="'tips51'"></p>
					<!-- <p v-t="'tips52'"></p> -->
				</div>
			</div>
		</div>
		<!-- 风险保障 -->
		<div class="intro_box">
			<p v-t="'risk'" class="intro_title"></p>
			<p class="intro_line"></p>
			<div flex class="intro_content jcsb">
				<div>
					<img src="@/assets/img/new/intro_safe1.png" class="intro_img risk_img">
					<p v-t="'risktips1'"></p>
				</div>
				<div>
					<img src="@/assets/img/new/intro_safe2.png" class="intro_img risk_img">
					<p v-t="'risktips2'"></p>
				</div>
				<div>
					<img src="@/assets/img/new/intro_safe3.png" class="intro_img risk_img">
					<p v-t="'risktips3'"></p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
	    return {
	    }
  	},
		created(){
	  },
	  methods: {
	  }
	}
</script>
<style lang="less">
	.view_intro{
		.intro_box{
			padding: 90px 0;
			background: #fff;
			font-weight: 500;
			color: #4a4a4a;

			&.step_box{
				color: #fff;
				background: #00C8DC;
			}
				.intro_title{
					font-size: 28px;
				}

				.intro_line{
					width: 34px;
					height: 4px;
					background: #00DACA;
					margin: 14px auto 0;
				}

				.intro_content{
					width: 1134px;
					margin: 54px auto 0;
					font-size: 20px;
						&.step_content{
							font-size: 14px;
							width: 1200px;
							div{
								width: 190px;
								font-weight: 400;
								line-height: 24px;
							}
						}
						.step_num{
							font-size: 20px;
							border-radius: 50%;
							background: #f9cf2d;
							width: 28px;
							height: 28px;
							line-height: 26px;
							text-align: center;
							margin: 12px auto;
						}
						.intro_img{
							width: 180px;
							height: 180px;
	
							margin-bottom: 40px;

								&.step_img{
									width: 90px;
									height: 90px;
									margin-bottom: 0;
								}
								&.risk_img{
									width: 150px;
									height: 150px;
								}
						}

				}

		}

	}
</style>