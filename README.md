# Training Vibe Code — Cipta Harmoni Lestari

Materi training **Bangun Aplikasi Integrasi AI dengan Claude**.

🔗 **Buka decknya:** https://dhanyindraswara.github.io/trainingvibecode/

---

## Isi deck

64 slide, satu file HTML, tanpa dependensi apa pun selain font Google.

| Sesi | Isi |
|------|-----|
| **Sesi 01** | Model AI (Haiku 4.5 → Sonnet 5 → Opus 5 → Fable 5 → Mythos 5) dan 7 fitur Claude: Chat, Projects, Artifacts, Tasks & Scheduled, Cowork, Claude Code, Claude Design |
| **Sesi 02** | Peta persaingan: ChatGPT, Gemini, Copilot, Grok, DeepSeek, Perplexity, Llama — beserta harga dan kesimpulan jujurnya |
| **Sesi 03** | Build day — 10 langkah berurutan, dari login sampai semua menu diuji (lihat di bawah) |

### Sesi 03 · 10 langkah build day

| # | Langkah | Isinya |
|---|---------|--------|
| 01 | Login Claude Max | claude.ai di browser, satu akun per kelompok, cek paketnya benar-benar Max |
| 02 | Akun & repo GitHub | daftar, buat repo privat `chl-[proyek]`, undang rekan setim dengan akses Write |
| 03 | Sambungkan Claude ↔ GitHub | Connect GitHub, authorize, pilih repo — Claude bisa pull, commit, push, merge |
| 04 | Sambungkan Vercel | login pakai akun GitHub, import repo, deploy — alamat publik hidup sejak repo masih kosong |
| 05 | Tulis PRD | masalah nyata jadi dokumen dua halaman, plus standar mutunya |
| 06 | Bikin design | prototype yang bisa diklik, daftar menu dikunci di sini, lalu ditransfer ke Claude Code |
| 07 | Nyalakan data | Vercel Postgres + Blob dari tab Storage, kredensial ditempel Vercel sendiri, `/api/health` |
| 08 | Hidupkan menunya | logic dan struktur data, satu menu dituntaskan sebelum pindah |
| 09 | Menu ber-AI | API + database = RAG, chatbot, dan gambar |
| 10 | Uji semua menu | diuji orang yang tidak membangunnya, temuan dicatat, baru serah terima |

Setelah 10 langkah itu ada **Bekal praktis** — delapan halaman yang dibuka saat macet:
anatomi prompt, prompt pembuka, prompt per menu, prompt saat ngadat, perintah harian
Claude Code, commit sebagai save point, isi repository yang rapi, dan checklist sebelum
menulis fitur pertama. Contoh promptnya ditulis Bahasa Indonesia **dan** English
berdampingan.

Tiap langkah punya diagram beranimasi dan pita kemajuan 01–10 di kaki slide, jadi selalu
jelas kita sedang di langkah ke berapa.

### Bengkel — sembilan halaman untuk saat layar merah

Ditulis dari satu sesi build nyata (empat menu ber-AI, dibangun seluruhnya lewat browser),
lengkap dengan delapan macet yang benar-benar ditemui dan cara keluarnya.

| Halaman | Isinya |
|---------|--------|
| Studi kasus | Kronologi satu sesi: di tahap mana macetnya menumpuk, dan kenapa |
| Peta macet | Tabel rujukan: gejala di layar → penyebab sebenarnya → obatnya |
| Bengkel 01 | Build gagal di Vercel — repo kosong, dan Vercel salah menebak framework |
| Bengkel 02 | Membaca tab Deployments, menemukan Environment Variables, nama variabel Neon |
| Bengkel 03 | Database menyala tapi belum bertabel — menjalankan schema, memastikan pgvector |
| Bengkel 04 | Blob publik vs privat — sifat yang dipilih sekali dan tidak bisa diubah |
| Bengkel 05 | Jawaban AI ngawir dan penuh tanda bintang — dua kalimat perintah yang kurang |
| Bengkel 06 | Kunci API bocor — mencabut, mengganti, dan kebiasaan yang mencegahnya |
| Bengkel 07 | Lingkaran perbaikan: lapor → Claude perbaiki → push → tunggu Ready → uji ulang |

Intinya satu: tujuh dari delapan macet itu bukan kesalahan kode, melainkan setelan layanan
atau kalimat perintah — dan refleks "berarti kodenya salah" adalah yang paling banyak
membuang waktu.

## Cara pakai

| Aksi | Tombol |
|------|--------|
| Slide berikutnya | `→` `spasi` atau klik sisi kanan layar |
| Slide sebelumnya | `←` atau klik sisi kiri layar |
| Lihat semua slide | `O` |
| Layar penuh | `F` |
| Di HP | geser kiri / kanan |

## Yang disiapkan peserta sebelum hari H

1. Akun **GitHub** sudah dibuat dan bisa login
2. Akun **Claude Max 5×** — bukan paket Pro — bisa login di **Claude web** (claude.ai). Cukup satu akun per kelompok. Catatan: langganan Max **tidak** termasuk akses API — API key Anthropic untuk menu ber-AI disiapkan panitia
3. Laptop dan koneksi internet yang stabil sepanjang hari
4. **Satu masalah nyata** dari departemen sendiri, ditulis dalam tiga kalimat

Database, storage, alamat publik, dan API key sudah diurus tim INSYNTIVE. Tidak ada instalasi server, tidak ada Docker, dan tidak ada kredensial database yang diketik manual.

## Akses database & storage saat praktik (Sesi 03 · Langkah 07)

Semuanya di **Vercel** — tidak ada server yang dipasang dan tidak ada kredensial
database yang diketik manual.

| Kebutuhan | Layanan |
|-----------|---------|
| Aplikasi jalan + alamat publik | Vercel (Next.js) |
| Database | Vercel Postgres |
| File: PDF, foto, lampiran | Vercel Blob |

Satu project Vercel per kelompok, dibuat dengan login **Continue with GitHub** —
tidak ada pendaftaran atau password baru.

### Langkah menyalakan datanya

1. Di project Vercel: tab **Storage** → **Create** → **Postgres**. Region terdekat: Singapore.
2. Ulangi untuk **Blob**.
3. Vercel menempelkan kredensialnya sendiri ke project sebagai environment variable:

   ```env
   # ditempel Vercel, jangan diubah
   POSTGRES_URL
   BLOB_READ_WRITE_TOKEN

   # ditempel sendiri, sekali, di Settings → Environment Variables
   ANTHROPIC_API_KEY
   ```

4. **Redeploy** sekali supaya variabel barunya terbaca.
5. Prompt ke Claude Code:

   > Sambungkan app ini ke Vercel Postgres lewat `POSTGRES_URL` dan Vercel Blob lewat
   > `BLOB_READ_WRITE_TOKEN`. Buat endpoint `GET /api/health` yang menjalankan `SELECT 1`
   > dan sekali *list* blob, lalu balas status keduanya.

6. Buka `/api/health` — dua-duanya `ok` dulu, baru lanjut bikin schema.

**Aturan keras:** jangan simpan file di dalam database. Yang masuk Postgres cuma
alamat filenya; isinya di Blob. `ANTHROPIC_API_KEY` ditempel di Vercel, tidak pernah
di dalam repo — pastikan `.env*` ada di `.gitignore` sebelum commit pertama.

## Form persiapan & tes peserta

Hub satu-pintu untuk peserta ada di folder [`form/`](form/) — tayang di
`https://dhanyindraswara.github.io/trainingvibecode/form/`. Empat tombol: **Form
Persiapan · Pre-Test · Post-Test · Buka Materi**. Jawaban tersimpan ke Cloud
Firestore (situs statik, tanpa server).

Sebelum dipakai, sambungkan Firebase satu kali — panduannya di
[`form/SETUP-FIREBASE.md`](form/SETUP-FIREBASE.md). Sebelum config diisi, form
menampilkan banner peringatan dan belum menyimpan apa pun.

## Yang dibangun hari itu

- Web App
- RAG atas dokumen sendiri
- Chatbot
- Satu menu bebas — tantangan tiap tim
- Semuanya tayang lewat Vercel sejak pagi dan sudah diuji menu per menu

Pindah ke akun Vercel perusahaan maksimal **14 hari** setelah training.

---

Training by **INSYNTIVE** · 2026
