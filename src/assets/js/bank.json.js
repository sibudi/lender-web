/**
 * Created by ly on 16/6/2.
 */


 var jsonBank = [{
    "value": "BCA",
    "label": "BCA",
    "children": [{
      "value": "ATM",
      "label": "ATM",
    },{
      "value": "ONLINE",
      "label": "ONLINE",
    },{
      "value": "M-BANKING",
      "label": "M-BANKING",
    }]},
    {
    "value": "BNI",
    "label": "BNI",
    "children": [{
      "value": "ATM",
      "label": "ATM",
    },{
      "value": "ONLINE",
      "label": "ONLINE",
    },{
      "value": "M-BANKING",
      "label": "M-BANKING",
    }]},
    {
    "value": "CIMB",
    "label": "CIMB",
    "children": [{
      "value": "ATM",
      "label": "ATM",
    },{
      "value": "ONLINE",
      "label": "ONLINE",
    },{
      "value": "M-BANKING",
      "label": "M-BANKING",
    }]
  }];

  var bankTxt = [{
    "code":"BCA/ATM",
    "list":["1. Masukkan kartu ATM BCA dan PIN",
          "2. Pilih \"Transaksi Lainnya\"",
          "3. Pilih \"Transfer\"",
          "4. Pilih \"ke Rekening BCA Virtual Account\"",
          "5. Masukkan nomor BCA Virtual Account",
          "6. Masukkan jumlah yang ingin dibayarkan",
          "7. Setelah Proses Validasi selesai dengan menekan tombol \"Ya\", simpan bukti transaksi anda."]
  },{
    "code":"BCA/ONLINE",
    "list":["1. Login pada aplikasi KlikBCA Individual",
          "2. Masukkan User ID dan PIN",
          "3. Pilih \"Transfer Dana\"",
          "4. Pilih \"Transfer ke BCA Virtual Account\"",
          "5. Masukkan nomor BCA Virtual",
          "6. Masukkan jumlah yang ingin dibayarkan",
          "7. Setelah Proses Validasi selesai dengan menekan tombol \"Kirim\", simpan bukti transaksi anda."]
  },{
    "code":"BCA/M-BANKING",
    "list":["1. Pilih m-Transfer",
          "2. Pilih Transfer – BCA Virtual Account",
          "3. Pilih nomor rekening yang akan didebet",
          "4. Masukkan nomor BCA Virtual Account, lalu pilih OK",
          "5. Tampil konfirmasi nomor BCA Virtual Account dan rekening pendebetan, lalu Kirim",
          "6. Tampil konfirmasi pembayaran, lalu pilih OK",
          "a) Masukkan jumlah nominal transfer dan berita, atau",
          "b) Masukkan berita",
          "7. Ikuti langkah selanjutnya sampai transaksi selesai."]
  },{
    "code":"BNI/ATM",
    "list":["1. Masukkan kartu, pilih bahasa kemudian masukkan PIN Anda",
          "2. Pilih \"Menu Lainnya\" lalu pilih \"Transfer\"",
          "3. Pilih \"Tabungan\" lalu \"Rekening BNI Virtual Account\"",
          "4. Masukkan nomor Virtual Account 0000000000000000 dan nominal yang inginAnda bayar",
          "5. Periksa kembali data transaksi kemudian tekan \"Ya\"."]
  },{
    "code":"BNI/ONLINE",
    "list":["1. Login di https://ibank.bni.co.id, masukkan User ID dan Password",
          "2. Pilih “TRANSFER” lalu pilih “Tambah Rekening Favorit”",
          "3. JikaAnda menggunakan desktop untuk menambah rekening, pilih “Transaksi” lalu pilih “Atur RekeningTujuan” kemudian “Tambah RekeningTujuan”",
          "4. Masukkan Nama dan nomor Virtual Account 0000000000000000 Anda, lalu masukkan Kode OtentikasiToken",
          "5. Jika Nomor rekening tujuan berhasil ditambahkan, kembali ke menu “TRANSFER”",
          "6. Pilih “TRANSFER ANTAR REKENING BNI”, kemudian pilih rekening tujuan",
          "7. Pilih Rekening Debit dan ketik nominal, lalu masukkan kode otentikasi token."]
  },{
    "code":"BNI/M-BANKING",
    "list":["1. Login ke BNI Mobile Banking, masukkan User ID dan MPIN",
          "2. Pilih menu \"Transfer\", lalu pilih \"Antar Rekening BNI\"",
          "3. Pilih \"Input Rekening Baru\"",
          "4. Masukkan \"Rekening Debet\", \"RekeningTujuan\" 0000000000000000 dan \"Nominal\" kemudian klik \"Lanjut\"",
          "5. Periksa kembali data transaksiAnda, masukkan “Password Transaksi” kemudian klik “Lanjut.”"]
  },{
    "code":"CIMB/ATM",
    "list":["1. Masukkan kartu ATM CIMB Niaga, lalu masukkan \"PIN ATM\" anda.",
          "2. Pilih \"Transfer\"",
          "3. Pilih \"Rekening CIMB Niaga\"",
          "4. Masukkan \"Jumlah\" , lalu masukkan \"Nomor Virtual Akun\"",
          "5. Ketika muncul konfirmasi, pilih \"Ya\" / \"Lanjut\"",
          "6. Transaksi selesai. Mohon simpan bukti transfer anda."]
  },{
    "code":"CIMB/ONLINE",
    "list":["1. Masuk ke Internet Banking CIMB Niaga",
          "2. Pilih menu \"TRANSFER\"",
          "3. Pilih sumber akun di \"Transfer dari\", masukkan jumlah, lalu pilih Other Account (CIMB Niaga/Rekening Ponsel) di bagian \"Transfer ke\", lalu pilih \"Lanjut\"",
          "4. Pilih \"Bank CIMB Niaga\", lalu masukkan \"Nomor Virtual Akun\" di bagian \"Beneficiary\", lalu klik \"Lanjut\"",
          "5. Masukkan \"mPIN\" lalu klik \"Masukkan\"",
          "6. Transaksi selesai. Mohon simpan bukti transfer anda."]
  },{
    "code":"CIMB/M-BANKING",
    "list":["1. Masuk ke \"Mobile Banking CIMB Niaga\"",
          "2. Pilih menu Transfer, lalu pilih \"Rekening Ponsel/CIMB Niaga\"",
          "3. Pilih \"Rekening sumber\"",
          "4. Pilih \"Rekening Tujuan\" : CASA",
          "6. Ketika muncul konfirmasi, pilih \"Ya\" / \"Lanjut\"",
          "7. Transaksi selesai. Mohon simpan bukti transfer anda."]
  }]


export default {
    jsonBank,bankTxt
}
