<i18n>
  {
    "zh-cn":{

    },
    "en":{

    }
  }
</i18n>
<template>
  <div class="bot_commom_box">

    <div class="bot_main">

    <div class="df bot_more">
      <div class="bot_more_item">
        <p class="bot_more_tit">Layanan</p>
        <p><router-link to="/Scattered">Pendanaan</router-link></p>
        <p><router-link to="/BorrowIntro">Pinjaman</router-link></p>
      </div>
      <div class="bot_more_item">
        <p class="bot_more_tit">Tentang kami</p>
        <p><router-link to="/aboutUs">Tentang kami</router-link></p>
        <p><router-link to="/joinus">Karir</router-link></p>
        <p><router-link to="/blogList">Blog</router-link></p>
      </div>
      <div class="bot_more_item" style="width:10px">
        <p class="bot_more_tit">Legal</p>
        <p><router-link to="/faq">Pengaduan Layanan</router-link></p>
      </div>
      <div class="bot_more_item" style="padding-left:50vh" >
        <p class="bot_more_tit">Layanan Pengaduan Do-It</p>
        <p class="noHover"><router-link to="">Senin - Minggu : 09.00 - 17.00 WIB</router-link></p>
        <p><a href="tel:(021)50858846">(021) 5085 8846</a></p>
        <p><a href="mailto:cs@Do-it.id"> cs@Do-it.id</a></p>
        <p><a href="https://www.do-it.id">www.do-it.id</a></p>
      </div>
    </div>

    
    <div class="bot_app_box df jcsb">
      <div class="down_app">
        <p class="bottom_tit">Unduh Aplikasi Pinjaman Do-It</p>
        <a href="https://play.google.com/store/apps/details?id=com.qy.doit" target="_blank"><img src="../assets/img/playstore.png" height="65 "></a>
      </div>
      <div>
        <p class="bottom_tit">Ikuti Kami di Social Media</p>
        <div class="social_box">
          <a href="https://twitter.com/DoIt_Glotech" target="_blank"><img src="../assets/img/icon/twitterLogo.png"></a>
          <a href="https://www.facebook.com/Glotech.Prima.Vista/" target="_blank"><img src="../assets/img/icon/facebookLogo.png"></a>
          <a href="https://linkedin.com/company/doitglotech/" target="_blank"><img src="../assets/img/icon/linkedinLogo.png"></a>
          <a href="https://www.instagram.com/doitglotech/" target="_blank"><img src="../assets/img/icon/instagramLogo.png"></a>
        </div>
      </div>
    </div>

    <hr>
    <div class="bot_proldoc_box">
      <div>
        <p class="proldoc_tit">DISCLAIMER RISIKO:</p>
        <div class="df jcsb"  :class="showMores?'hei280':'down'">
          <div class="bot_proldoc_item f1" style="margin-right:46px;text-align:justify">
            1.  Layanan Pinjam Meminjam Berbasis Teknologi Informasi merupakan kesepakatan perdata antara Pemberi Pinjaman dengan Penerima Pinjaman, sehingga segala risiko yang timbul dari kesepakatan tersebut ditanggung sepenuhnya oleh masing-masing pihak.<br>
            2.  Risiko kredit atau gagal bayar ditanggung sepenuhnya oleh Pemberi Pinjaman. Tidak ada lembaga atau otoritas negara yang bertanggung jawab atas risiko gagal bayar ini.<br>
            3.  Penyelenggara dengan persetujuan dari masing-masing Pengguna (Pemberi Pinjaman dan/atau Penerima Pinjaman) mengakses, memperoleh, menyimpan, mengelola, dan/atau menggunakan data pribadi Pengguna ("Pemanfaatan Data") pada atau di dalam benda, perangkat elektronik (termasuk smartphone atau telepon seluler), perangkat keras (hardware) maupun lunak (software), dokumen elektronik, aplikasi atau sistem elektronik milik Pengguna atau yang dikuasai Pengguna, dengan memberitahukan tujuan, batasan, dan mekanisme Pemanfaatan Data tersebut kepada Pengguna yang bersangkutan sebelum memperoleh persetujuan yang dimaksud.<br>
            4.  Pemberi Pinjaman yang belum memiliki pengetahuan dan pengalaman pinjam meminjam, disarankan untuk tidak menggunakan layanan ini.<br>
            5.  Penerima Pinjaman harus mempertimbangkan tingkat bunga pinjaman dan biaya lainnya sesuai dengan kemampuan dalam melunasi pinjaman.<br>
            6.  Setiap kecurangan tercatat secara digital di dunia maya dan dapat diketahui masyarakat luas di media sosial.<br>
            7.  Pengguna harus membaca dan memahami informasi ini sebelum membuat keputusan menjadi Pemberi Pinjaman atau Penerima Pinjaman.<br>
            8.  Pemerintah yaitu dalam hal ini Otoritas Jasa Keuangan, tidak bertanggung jawab atas setiap pelanggaran atau ketidakpatuhan oleh Pengguna, baik Pemberi Pinjaman maupun Penerima Pinjaman (baik karena kesengajaan atau kelalaian Pengguna) terhadap ketentuan peraturan perundang-undangan maupun kesepakatan atau perikatan antara Penyelenggara dengan Pemberi Pinjaman dan/atau Penerima Pinjaman.<br>
          </div>
          <div class="bot_proldoc_item f1" style="text-align:justify">
        9.  Setiap transaksi dan kegiatan pinjam meminjam atau pelaksanaan kesepakatan mengenai pinjam meminjam antara atau yang melibatkan Penyelenggara, Pemberi Pinjaman, dan/atau Penerima Pinjaman wajib dilakukan melalui escrow account dan virtual account sebagaimana yang diwajibkan berdasarkan Peraturan Otoritas Jasa Keuangan Nomor 77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi dan pelanggaran atau ketidakpatuhan terhadap ketentuan tersebut merupakan bukti telah terjadinya pelanggaran hukum oleh Penyelenggara sehingga Penyelenggara wajib menanggung ganti rugi yang diderita oleh masing-masing Pengguna sebagai akibat langsung dari pelanggaran hukum tersebut di atas tanpa mengurangi hak Pengguna yang menderita kerugian menurut Kitab Undang-Undang Hukum Perdata.<br>
        PT Glotech Prima Vista merupakan badan hukum yang didirikan berdasarkan Hukum Republik Indonesia. Berdiri sebagai perusahaan yang telah diatur oleh dan dalam pengawasan Otoritas Jasa Keuangan (OJK) di Indonesia, Perusahaan menyediakan layanan interfacing  sebagai penghubung pihak yang memberikan pinjaman dan pihak yang membutuhkan pinjaman meliputi pendanaan dari individu, organisasi, maupun badan hukum kepada individu atau badan hukum tertentu. Perusahaan tidak menyediakan segala bentuk saran atau rekomendasi pendanaan terkait pilihan-pilihan dalam situs ini.<br>
        Isi dan materi yang tersedia pada situs Do-It dimaksudkan untuk memberikan informasi dan tidak dianggap sebagai sebuah penawaran, permohonan, undangan, saran, maupun rekomendasi untuk pendanaan sekuritas, produk pasar modal, atau jasa keuangan lainya. Perusahaan dalam memberikan jasanya hanya terbatas pada fungsi administratif.<br>
        Pendanaan dan pinjaman yang ditempatkan di rekening Do-It adalah tidak dan tidak akan dianggap sebagai simpanan yang diselenggarakan oleh Perusahaan seperti diatur dalam Peraturan Perundang-Undangan tentang Perbankan di Indonesia. Perusahaan atau setiap Direktur, Pegawai, Karyawan, Wakil, Afiliasi, atau Agen-Agennya tidak memiliki tanggung jawab terkait dengan setiap gangguan atau masalah yang terjadi atau yang dianggap terjadi yang disebabkan oleh minimnya persiapan atau publikasi dari materi yang tercantum pada situs Perusahaan.
          </div>
        </div>
      </div>
    </div>
    <div class="bot_more_line" @click="showMore">Tampilkan</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'indexBottom',
  data () {
    return {
      isfixed: 0,
      showMores: true
    }
  },
  methods: {
    init(){
        window.onload=()=>{
            let canvas=document.querySelector('body');
            if(canvas.offsetHeight<900){
                this.isfixed=true
            }
        }
    },
    showMore(){
      this.showMores = !this.showMores;
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Raleway');
.bot_commom_box{
  width: 100%;
  min-width: 1200px;
  background-color:#46B9B4;
  text-align: left;
}

hr{
  color:white;
}


.bot_main{
  width: 981px;
  margin: 0 auto;
  color: #fff;
  padding: 50px 110px 100px 109px;
}
.bottom_tit{
  font-size:15px;
  font-weight:bold;
  color:rgba(255,255,255,1);
  margin-bottom: 30px;
}
.bot_app_box{
  margin-bottom: 60px;
  padding-bottom: 53px;
  padding-right: 96px;
  padding-left: 17px;
  padding-top:20px;
}
.social_box a{
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-right: 30px;
  cursor: pointer;
}
.social_box img{
  width: 100%;
  height: 100%;
  display: block;
}

.social_box img:hover{
 transition: transform .2s; /* Animation */
    transform: scale(1.2);
}
.bot_proldoc_box{
  line-height: 25px;
  font-size: 14px;
}
.bot_proldoc_box .proldoc_tit{
  font-size: 20px;
  font-weight:400;
  margin-bottom: 19px;
}
.bot_proldoc_box .hei280{
  height: 280px;
  overflow: hidden;
  animation: up 1.5s;
  -moz-animation: up 1.5s; /* Firefox */
  -webkit-animation: up 1.5s;  /* Safari 和 Chrome */
  -o-animation: up 1.5s; /* Opera */
  overflow: hidden;
  }
.bot_proldoc_box .down{
animation: down 1.5s;
-moz-animation: down 1.5s; /* Firefox */
-webkit-animation: down 1.5s;  /* Safari 和 Chrome */
-o-animation: down 1.5s; /* Opera */
overflow: hidden;
}

.bot_more{
  font-size: 12px;
  padding-left: 30px;
}
.bot_more_item{
  margin-right: 40px;
  font-size:15px;
}
.bot_more_item a:hover{
  color:rgb(255, 255, 255);
}

.bot_more_item .noHover a:hover{
   color: rgb(197, 234, 247);
}
.bot_more_item a{
  color: rgb(197, 234, 247);
}
.bot_more_item p{
  margin-bottom: 20px;
  cursor: pointer;

}
.bot_more_item .bot_more_tit{
  font-size: 15px;
  font-weight:1000;
  
}
.bot_more_line{
  position: relative;
  margin: 50px auto 30px;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
}
.bot_more_line:before{
  position: absolute;
  content: " ";
  width: 440px;
  border: 1px solid #576877;
  left: 0;
  top: 8px;
}
.bot_more_line:after{
  position: absolute;
  content: " ";
  width: 440px;
  border: 1px solid #576877;
  right: 0;
  top: 8px;
}



@keyframes down
{
from {height: 280px;}
to {height: 880px;}
}

@-moz-keyframes down /* Firefox */
{
from {height: 280px;}
to {height: 880px;}
}

@-webkit-keyframes down /* Safari 和 Chrome */
{
from {height: 280px;}
to {height: 880px;}
}

@-o-keyframes down /* Opera */
{
from {height: 280px;}
to {height: 880px;}
}
@keyframes up
{
from {height: 880px;}
to {height: 280px;}
}

@-moz-keyframes up /* Firefox */
{
from {height: 880px;}
to {height: 280px;}
}

@-webkit-keyframes up /* Safari 和 Chrome */
{
from {height: 880px;}
to {height: 280px;}
}

@-o-keyframes up /* Opera */
{
from {height: 880px;}
to {height: 280px;}
}
</style>
