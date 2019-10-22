<template>
	<div id="complaintPage">
		<div class="complaintContent">
			<div class="subComplaint">
				<div class="subComplaintTitle">Syarat pengaduan konsumen ke OJK</div>
				<div class="subComplaintContent">
					a. Konsumen mengalami kerugian finansial paling besar Rp. 500.000.000,00 (lima ratus juta rupiah);<br>
					b. Konsumen mengajukan permohonan secara tertulis disertai dengan dokumen pendukung yang berkaitan dengan pengaduan; <br>
					c. Pelaku Usaha Jasa Keuangan telah melakukan upaya penyelesaian pengaduan namun Konsumen tidak dapat menerima penyelesaian tersebut atau telah melewati batas waktu sebagaimana ditetapkan; <br>
					d. Pengaduan yang diajukan bukan merupakan sengketa sedang dalam proses atau pernah diputus oleh lembaga arbritrase atau peradilan, atau lembaga mediasi lainnya; <br>
					e. Pengaduan yang diajukan bersifat keperdataan; <br>
					f. Pengaduan yang diajukan belum pernah difasilitasi oleh Otoritas Jasa Keuangan (OJK); <br>
					g. Pengajuan penyelesaian pengaduan oleh konsumen tidak melebihi 60 hari kerja. Waktu terhitung sejak tanggal surat hasil penyelesaian pengaduan yang disampaikan pelaku usaha jasa keuangan kepada konsumen.
				</div>
			</div>

		</div>

		<div class="complaintContent">
			<div class="subComplaint">
				<div class="subComplaintTitle">Cara pengaduan konsumen ke OJK</div>
				<div class="subComplaintContent">
					Sesuai dengan Peraturan OJK, nasabah yang tidak puas dengan penyelesaian dari penyelenggara layanan dapat menyampaikannya permohonan kepada OJK untuk dilakukan fasilitasi, melalui :  <br>
					a. Surat tertulis kepada : Anggota Dewan Komisioner OJK Bidang Edukasi dan Perlindungan Konsumen Menara Radius Prawiro Lantai 2. Komplek Perkantoran Bank Indonesia Jl. M. H. Thamrin No. 2 Jakarta.  <br>
					b. Hubungi layanan OJK di: 1500 655  <br>
					c. Email ke: konsumen@ojk.go.id  <br>
					d. Fax ke: + 62 (21) 386 – 6032  <br>
					e. Online di: sikapiuangmu.ojk.go.id
				</div>
			</div>			
		</div>
		<div class="complaintContent">
			<div class="subComplaint">
				<div class="subComplaintTitle">Prosedur komplain customer</div>
				<div id="subComplaintImgs">
					<div id="subComplaintLeft">
						Akses Keluhan：<br>
						·Customer Service <br>(021-40530000)<br>
						·Whatsapp <br>(087787117873)<br>
						·Email <br>(cs@Do-It.id)<br>
						·Aplikasi <br>(Menu Pusat Layanan)<br>
					</div>
					<div id="subComplaintMiddle"><img src="../assets/img/icon/GoTo1.png" alt=""></div>
					<div id="subComplaintRight">
						<div class="subComplaintR" id="subComplaintR1">Proses Registrasi Keluhan</div>
						<div class="subComplaintR" id="subComplaintR2"><img src="../assets/img/icon/GoTo2.png" alt=""></div>
						<div class="subComplaintR" id="subComplaintR3">Validasi Kelengkapan dan Kesesuaian dokumen Keluhan</div>
						<div class="subComplaintR" id="subComplaintR4"><img src="../assets/img/icon/GoTo3.png" alt=""></div>
						<div class="subComplaintR" id="subComplaintR5">Courtesy Call</div>
						<div class="subComplaintR" id="subComplaintR6"><img src="../assets/img/icon/GoTo4.png" alt=""></div>
						<div class="subComplaintR" id="subComplaintR7">Menyampaikan Hasil Keputusan</div>
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
				alertData: ''
			}
		},

	    methods: {
	    	father1(e){
	    		console.log(e)
	    		this.alertShow=e
	    	}
	    }
	}
</script>
<style scoped>
	#complaintPage {
		background-color: #eee;
	}
	.complaintContent {
		margin: 20px;
		padding: 20px;
		border-radius: 5px;
		background-color: white;
		text-align: left;
		overflow: hidden;
		min-width: 1120px;
		box-shadow: #eee 0 0 20px;
	}
	.subComplaintTitle {
		text-align: left;
		font-size: 20px;
		height: 40px;
		line-height: 40px;
		color: #1F2532;
	}
	.subComplaintTitle:before {
		content: '';
		border-left: 5px solid rgb(61,189,182);
		margin: 10px 20px 10px 0;
		height: 20px;
	}
	.subComplaintContent {
		padding: 5px 30px;
		line-height: 30px;
	}
	.subComplaint {
		margin: 20px;
	}
	#subComplaintImgs {
		width: 1000px;
		margin: 0 auto;
		height: 400px;
		padding: 40px;
	}
	#subComplaintLeft {
		background-color: rgb(171,151,213);
		width: 400px;
		height: 400px;
		border-radius: 10px;
		font-size: 18px;
		padding: 50px 80px;
		box-sizing: border-box;
		color: white;
		line-height: 30px;
	}
	#subComplaintMiddle {
		width: 100px;
		padding-top: 200px;
		height: 200px;
	}
	#subComplaintMiddle img {
		width: 24px;
		margin: 0 auto;
		margin-top: -12px;
		display: block;
	}
	#subComplaintImgs>div {
		float: left;
	}
	#subComplaintRight {
		width: 500px;
		height: 400px;
		font-size: 18px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.subComplaintR {
		padding: 10px 20px;
		line-height: 30px;
		float: left;
		flex: 2;
		margin: 10px;
		border-radius: 5px;
		vertical-align: middle;
		display: table-cell;
		color: white;
	}
	#subComplaintR2,#subComplaintR4,#subComplaintR6 {
		flex: 1;
		padding: 0;
		margin: 0;
		text-align: center;
	}
	#subComplaintRight img {
		width: 20px;
	}
	#subComplaintR1 {
		background-color: rgb(255,184,98);
	}
	#subComplaintR3 {
		background-color: rgb(105,202,255);
	}
	#subComplaintR5 {
		background-color: rgb(103,153,243);
	}
	#subComplaintR7 {
		background-color: rgb(27,202,215);
	}

</style>