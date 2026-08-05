// ============================================================
//  SOAL PRE-TEST — 15 pilihan ganda, diambil dari deck training.
//  Dipakai bersama oleh form/pretest.html dan dashboard admin.
//
//  "benar" = indeks jawaban benar di dalam array "opsi" (0 = pertama).
//
//  Catatan: kunci jawaban ini ikut terkirim ke browser peserta, jadi
//  bisa dibaca siapa pun yang membuka View Source. Cukup untuk pre-test;
//  kalau nanti ada tes yang benar-benar dinilai, penilaiannya harus
//  dipindah ke sisi server.
// ============================================================

export const SOAL_PRETEST = [
  { id:"q01", sesi:"Sesi 01",
    teks:'Kata "Claude" sebenarnya menunjuk dua hal. Dua hal apa?',
    opsi:[
      "Model AI-nya, dan fitur atau tempat kerjanya",
      "Versi gratis, dan versi berbayar",
      "Aplikasi HP, dan aplikasi desktop",
      "Nama perusahaannya, dan nama produknya",
    ], benar:0 },

  { id:"q02", sesi:"Sesi 01",
    teks:"Kalau belum tahu mau pakai model yang mana, mulai dari yang mana dulu?",
    opsi:[
      "Haiku, karena paling murah",
      "Sonnet, model bawaan yang cukup untuk sebagian besar pekerjaan",
      "Opus, biar sekalian yang paling pintar",
      "Fable, karena paling baru",
    ], benar:1 },

  { id:"q03", sesi:"Sesi 01",
    teks:"Kapan waktunya naik kelas dari Sonnet ke Opus?",
    opsi:[
      "Begitu tugasnya terasa penting",
      "Setiap kali datanya banyak",
      "Setelah tugas yang sama gagal dua kali dan kita bisa menyebut kenapa gagalnya",
      "Setiap awal minggu, biar konsisten",
    ], benar:2 },

  { id:"q04", sesi:"Sesi 01",
    teks:'Claude bilang "tidak bisa membuka file di komputer kamu". Apa yang sebenarnya terjadi?',
    opsi:[
      "Modelnya kurang pintar, harus di-upgrade",
      "Kita sedang di Chat, yang memang tidak punya akses file — pindah ke Cowork",
      "Koneksi internetnya bermasalah",
      "File-nya terlalu besar",
    ], benar:1 },

  { id:"q05", sesi:"Sesi 01",
    teks:"Daftar menu aplikasi sebaiknya dikunci di fitur yang mana, sebelum ada satu baris kode pun?",
    opsi:[
      "Claude Code",
      "Projects",
      "Claude Design",
      "Artifacts",
    ], benar:2 },

  { id:"q06", sesi:"Sesi 02",
    teks:"Untuk urusan membuat dan membaca gambar, aplikasi yang kita bangun memanggil siapa?",
    opsi:[
      "Claude, karena semuanya harus satu vendor",
      "OpenAI, karena di situ kekuatannya",
      "Google Gemini",
      "Tidak memanggil siapa-siapa, digambar manual",
    ], benar:1 },

  { id:"q07", sesi:"Sesi 03",
    teks:"Waktu ada yang meng-upload PDF 30 halaman, file aslinya disimpan di mana?",
    opsi:[
      "Di dalam database Postgres",
      "Di Vercel Blob",
      "Di server OpenAI",
      "Di folder Download laptop yang meng-upload",
    ], benar:1 },

  { id:"q08", sesi:"Sesi 03",
    teks:"Kalau begitu, yang disimpan Postgres soal file itu apa?",
    opsi:[
      "Isi filenya utuh, biar aman",
      "Alamat filenya saja, plus keterangannya",
      "Screenshot halaman pertamanya",
      "Tidak ada — Postgres tidak tahu soal file sama sekali",
    ], benar:1 },

  { id:"q09", sesi:"Sesi 03",
    teks:"Halaman di browser ngobrol ke server aplikasi pakai apa?",
    opsi:[
      "Koneksi SQL langsung ke database",
      "REST API lewat HTTPS — kirim JSON, terima JSON",
      "Email otomatis",
      "Kabel jaringan khusus di kantor",
    ], benar:1 },

  { id:"q10", sesi:"Sesi 03",
    teks:"Kenapa browser sengaja tidak diberi jalur langsung ke API OpenAI?",
    opsi:[
      "Karena OpenAI tidak mengizinkan HTTPS",
      "Karena jadinya lebih lambat",
      "Karena kunci API-nya jadi ikut kelihatan di layar orang lain",
      "Karena browser tidak bisa mengirim gambar",
    ], benar:2 },

  { id:"q11", sesi:"Sesi 03",
    teks:"Kunci API disimpan di mana?",
    opsi:[
      "Di dalam file kode, biar gampang dicari lagi",
      "Di Environment Variables Vercel — tidak pernah di dalam repo",
      "Di grup WhatsApp kelompok",
      "Di README.md supaya satu tim bisa lihat",
    ], benar:1 },

  { id:"q12", sesi:"Sesi 03",
    teks:"Setelah teksnya ditarik keluar dari PDF, langkah berikutnya apa?",
    opsi:[
      "Langsung dikirim utuh ke model AI",
      "Dipotong jadi bagian-bagian kecil, lalu tiap potongan diubah jadi vektor",
      "Disimpan sebagai gambar di Blob",
      "Dikirim lewat email ke seluruh tim",
    ], benar:1 },

  { id:"q13", sesi:"Sesi 03",
    teks:"Jawaban dari menu tanya-dokumen sering meleset. Yang diperiksa duluan apa?",
    opsi:[
      "Langsung naikkan ke model yang lebih mahal",
      "Cara memotong dokumennya",
      "Warna dan tata letak halamannya",
      "Kapasitas RAM laptop peserta",
    ], benar:1 },

  { id:"q14", sesi:"Sesi 03",
    teks:'Claude sudah bilang "selesai, sudah di-push". Aplikasi di alamat publik langsung berubah?',
    opsi:[
      "Ya, detik itu juga",
      "Belum — tunggu Vercel selesai membangun sampai statusnya Ready, sekitar 1–2 menit",
      "Belum — kita harus mengetik perintah deploy manual dulu",
      "Hanya kalau kita menekan tombol Publish di Vercel",
    ], benar:1 },

  { id:"q15", sesi:"Sesi 03",
    teks:"Muncul pesan error merah di layar. Yang paling benar dilakukan?",
    opsi:[
      "Ceritakan ulang errornya pakai kata-kata sendiri ke Claude",
      "Blok, salin, dan tempel seluruh pesan errornya apa adanya",
      "Restart laptop lalu coba lagi",
      "Ganti modelnya ke yang lebih besar",
    ], benar:1 },
];
