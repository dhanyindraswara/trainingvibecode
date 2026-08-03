# Training Vibe Code — Cipta Harmoni Lestari

Materi training **Bangun Aplikasi Integrasi AI dengan Claude**.

🔗 **Buka decknya:** https://dhanyindraswara.github.io/trainingvibecode/

---

## Isi deck

55 slide, satu file HTML, tanpa dependensi apa pun selain font Google.

| Sesi | Isi |
|------|-----|
| **Sesi 01** | Model AI (Haiku 4.5 → Sonnet 5 → Opus 5 → Fable 5 → Mythos 5) dan 7 fitur Claude: Chat, Projects, Artifacts, Tasks & Scheduled, Cowork, Claude Code, Claude Design |
| **Sesi 02** | Peta persaingan: ChatGPT, Gemini, Copilot, Grok, DeepSeek, Perplexity, Llama — beserta harga dan kesimpulan jujurnya |
| **Sesi 03** | Build day — 11 langkah berurutan, dari login sampai semua menu diuji (lihat di bawah) |

### Sesi 03 · 11 langkah build day

| # | Langkah | Isinya |
|---|---------|--------|
| 01 | Login Claude Max | claude.ai di browser, satu akun per kelompok, cek paketnya benar-benar Max |
| 02 | Akun & repo GitHub | daftar, buat repo privat `chl-[proyek]`, undang rekan setim dengan akses Write |
| 03 | Sambungkan Claude ↔ GitHub | Connect GitHub, authorize, pilih repo — Claude bisa pull, commit, push, merge |
| 04 | Tulis PRD | masalah nyata jadi dokumen dua halaman, plus standar mutunya |
| 05 | Bikin design | prototype yang bisa diklik, daftar menu dikunci di sini |
| 06 | Transfer & pilih repo | hasil design dibawa ke ruang kerja, repo GitHub dipilih di titik ini |
| 07 | Hidupkan menunya | logic dan struktur data, satu menu dituntaskan sebelum pindah |
| 08 | Sambungkan database | MySQL + MinIO, `.env.local`, `/api/health`, `.env.example` ke GitHub |
| 09 | Menu ber-AI | API + database = RAG, chatbot, dan gambar |
| 10 | Publikasi | GitHub Pages lewat GitHub Actions, plus batas jujurnya |
| 11 | Uji semua menu | diuji orang yang tidak membangunnya, temuan dicatat, baru serah terima |

Setelah 11 langkah itu ada **Bekal praktis** — delapan halaman yang dibuka saat macet:
anatomi prompt, prompt pembuka, prompt per menu, prompt saat ngadat, perintah harian
Claude Code, commit sebagai save point, isi repository yang rapi, dan checklist sebelum
menulis fitur pertama. Contoh promptnya ditulis Bahasa Indonesia **dan** English
berdampingan.

Tiap langkah punya diagram beranimasi dan pita kemajuan 01–11 di kaki slide, jadi selalu
jelas kita sedang di langkah ke berapa.

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
2. Akun **Claude Max 5×** — bukan paket Pro — bisa login di **Claude web** (claude.ai). Cukup satu akun per kelompok
3. Laptop dan koneksi internet yang stabil sepanjang hari
4. **Satu masalah nyata** dari departemen sendiri, ditulis dalam tiga kalimat

Database, storage, environment, dan API key sudah disiapkan tim INSYNTIVE. Tidak perlu instalasi server maupun setup Docker.

## Akses database & storage saat praktik (Sesi 03 · Langkah 08)

Setiap kelompok mendapat satu database **MySQL** dan satu bucket **MinIO** yang terisolasi di server CHL. Endpoint bersama:

| Layanan | Alamat |
|---------|--------|
| MySQL | `103.59.160.126:23316` |
| MinIO API (S3) | `http://103.59.160.126:29010` |
| MinIO Console | `http://103.59.160.126:29011` |
| Region S3 | `us-east-1` (path-style: `true`) |

Konvensi nama: database/user MySQL = `chl_kelompok_[n]`, bucket/access key MinIO = `chl-kelompok-[n]`. Username MySQL sama dengan nama database; access key MinIO sama dengan nama bucket. **Password MySQL dan secret key MinIO dibagikan per kelompok lewat lembar ACCESS di hari H — tidak ada di repo ini, dan jangan pernah di-commit.**

### Langkah nempel kredensial di Claude Code

1. Buat `.env.local` di root project:

   ```env
   # ganti [n] dengan nomor kelompok (1–6)
   DATABASE_URL="mysql://chl_kelompok_[n]:[password]@103.59.160.126:23316/chl_kelompok_[n]"

   S3_ENDPOINT="http://103.59.160.126:29010"
   S3_REGION="us-east-1"
   S3_BUCKET="chl-kelompok-[n]"
   S3_ACCESS_KEY="chl-kelompok-[n]"
   S3_SECRET_KEY="[secret key]"
   S3_FORCE_PATH_STYLE="true"
   ```

2. Isi `[password]` dan `[secret key]` dari lembar ACCESS kelompokmu — diketik langsung, jangan difoto atau dikirim ke grup chat.
3. Pastikan `.env*` ada di `.gitignore` **sebelum** commit pertama.
4. Prompt ke Claude Code:

   > Baca `.env.local`. Sambungkan app ini ke MySQL pakai `mysql2` dan ke MinIO pakai AWS SDK S3 dengan `forcePathStyle: true`. Buat endpoint `GET /api/health` yang menjalankan `SELECT 1` ke MySQL dan `ListObjects` ke bucket, lalu balas status keduanya.

5. Jalankan app, buka `/api/health` — MySQL dan MinIO dua-duanya `ok` dulu, baru lanjut bikin schema.

Kalau gagal connect: tempel pesan errornya utuh ke Claude Code, dan cek ulang nomor kelompok serta port-nya.

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
- Semuanya tayang lewat GitHub Pages dan sudah diuji menu per menu

Migrasi ke server CHL maksimal **14 hari** setelah training.

---

Training by **INSYNTIVE** · 2026
