// ============================================================
//  SOAL POST-TEST — 15 pilihan ganda, diambil dari materi training.
//  Dipakai bersama oleh form/posttest.html dan dashboard admin.
//
//  "benar" = indeks jawaban benar di dalam array "opsi" (0 = pertama).
//
//  Sengaja dibuat mudah: yang diuji adalah tiga hal inti yang dipakai
//  seharian tadi — Claude Code sebagai tempat ngeprompt, kunci API &
//  bedanya model dengan fitur, dan data yang disimpan di database
//  yang tinggal di server.
//
//  Catatan: kunci jawaban ini ikut terkirim ke browser peserta, jadi
//  bisa dibaca siapa pun yang membuka View Source. Cukup untuk post-test;
//  kalau nanti ada tes yang benar-benar dinilai, penilaiannya harus
//  dipindah ke sisi server.
// ============================================================

export const SOAL_POSTTEST = [
  // ---------- Claude Code: tempat kita ngeprompt ----------
  { id:"q01", sesi:"Claude Code",
    teks:"Claude Code itu tempat kita melakukan apa?",
    opsi:[
      "Mengetik perintah pakai bahasa biasa, lalu Claude yang menuliskan kodenya",
      "Mengetik kode program sendiri baris per baris",
      "Menggambar desain aplikasi pakai mouse",
      "Menyimpan foto dan video tim",
    ], benar:0 },

  { id:"q02", sesi:"Claude Code",
    teks:"Waktu menyuruh Claude Code, kita menulisnya pakai bahasa apa?",
    opsi:[
      "Harus bahasa pemrograman, tidak boleh yang lain",
      "Bahasa sehari-hari — Indonesia biasa pun bisa",
      "Kode rahasia yang dibagikan panitia",
      "Hanya bahasa Inggris formal",
    ], benar:1 },

  { id:"q03", sesi:"Claude Code",
    teks:"Muncul pesan error merah di layar. Yang paling benar dilakukan?",
    opsi:[
      "Diamkan saja, nanti hilang sendiri",
      "Blok, salin, dan tempel seluruh pesan errornya apa adanya ke Claude",
      "Restart laptop sampai errornya tidak muncul",
      "Hapus semua kode lalu mulai dari nol",
    ], benar:1 },

  { id:"q04", sesi:"Claude Code",
    teks:"Sebelum menyuruh Claude Code menulis kode, apa yang sebaiknya sudah jelas dulu?",
    opsi:[
      "Warna tombolnya",
      "Nama domain yang mau dibeli",
      "Mau bikin aplikasi apa dan daftar menunya apa saja",
      "Harga paket internet kantor",
    ], benar:2 },

  { id:"q05", sesi:"Claude Code",
    teks:"Kode yang sudah ditulis Claude Code disimpan dan dikirim ke mana supaya bisa online?",
    opsi:[
      "Ke GitHub, lalu dibangun dan ditayangkan oleh Vercel",
      "Ke grup WhatsApp kelompok",
      "Ke folder Download di laptop, cukup itu saja",
      "Ke email masing-masing peserta",
    ], benar:0 },

  // ---------- Model AI, fitur AI, dan kunci API ----------
  { id:"q06", sesi:"Model & Fitur AI",
    teks:'Kalau kita bilang "model AI" (Sonnet, Opus, Haiku), yang dimaksud itu apa?',
    opsi:[
      "Nama perusahaannya",
      "Mesin atau otak yang mengerjakan dan menjawabnya",
      "Nama paket langganan bulanan",
      "Merek laptop yang dipakai",
    ], benar:1 },

  { id:"q07", sesi:"Model & Fitur AI",
    teks:'Kalau "fitur AI" (Claude Chat, Claude Code, Artifacts), yang dimaksud itu apa?',
    opsi:[
      "Versi model yang lebih pintar",
      "Nama file di dalam kode",
      "Tempat atau pintu kita memakai model itu",
      "Jenis kabel jaringan",
    ], benar:2 },

  { id:"q08", sesi:"Model & Fitur AI",
    teks:"Jadi hubungan model dan fitur itu bagaimana?",
    opsi:[
      "Satu model cuma bisa dipakai di satu fitur",
      "Model yang sama bisa dipakai di fitur yang berbeda-beda",
      "Fitur dan model itu kata yang sama persis",
      "Fitur harus dibeli terpisah dari modelnya",
    ], benar:1 },

  { id:"q09", sesi:"Kunci API",
    teks:"API key (kunci API) itu fungsinya apa?",
    opsi:[
      "Password untuk membuka laptop",
      "Kartu akses supaya aplikasi kita boleh memanggil layanan AI",
      "Nomor invoice dari vendor",
      "Nama pengguna di GitHub",
    ], benar:1 },

  { id:"q10", sesi:"Kunci API",
    teks:"Kunci API itu ada banyak, satu untuk tiap penyedia. Contoh penyedianya siapa saja?",
    opsi:[
      "Anthropic (Claude), OpenAI, Google Gemini",
      "Word, Excel, PowerPoint",
      "Chrome, Firefox, Safari",
      "Instagram, TikTok, YouTube",
    ], benar:0 },

  { id:"q11", sesi:"Kunci API",
    teks:"Satu aplikasi boleh memakai kunci dari lebih dari satu penyedia sekaligus?",
    opsi:[
      "Tidak boleh, harus satu vendor saja",
      "Boleh — pilih yang paling pas untuk tiap pekerjaan",
      "Boleh, tapi harus izin ke Vercel dulu",
      "Hanya boleh kalau aplikasinya berbayar",
    ], benar:1 },

  { id:"q12", sesi:"Kunci API",
    teks:"Kunci API disimpan di mana?",
    opsi:[
      "Ditulis langsung di dalam file kode biar gampang dicari",
      "Di Environment Variables Vercel — tidak pernah ikut masuk ke repo",
      "Di grup WhatsApp kelompok",
      "Di README.md supaya satu tim bisa lihat",
    ], benar:1 },

  // ---------- Data, database, dan server ----------
  { id:"q13", sesi:"Database & Server",
    teks:"Data yang diisi pengguna kita simpan di mana supaya tidak hilang?",
    opsi:[
      "Di database",
      "Di catatan kertas",
      "Di tab browser yang dibiarkan terbuka",
      "Di dalam pesan chat ke Claude",
    ], benar:0 },

  { id:"q14", sesi:"Database & Server",
    teks:"Database yang kita pakai itu letaknya di mana?",
    opsi:[
      "Di laptop masing-masing peserta",
      "Di server (di cloud), jadi bisa diakses dari perangkat mana pun",
      "Di dalam file Excel di folder bersama",
      "Di flashdisk panitia",
    ], benar:1 },

  { id:"q15", sesi:"Database & Server",
    teks:"Kenapa datanya ditaruh di server, bukan disimpan di browser masing-masing?",
    opsi:[
      "Supaya aplikasinya kelihatan lebih mahal",
      "Supaya warnanya lebih bagus",
      "Supaya datanya sama untuk semua orang dan tidak hilang saat ganti perangkat",
      "Supaya tidak perlu internet",
    ], benar:2 },
];
