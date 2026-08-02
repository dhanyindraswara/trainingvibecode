# Training Vibe Code — Cipta Harmoni Lestari

Materi training **Bangun Aplikasi Integrasi AI dengan Claude**.

🔗 **Buka decknya:** https://dhanyindraswara.github.io/trainingvibecode/

---

## Isi deck

41 slide, satu file HTML, tanpa dependensi apa pun selain font Google.

| Sesi | Isi |
|------|-----|
| **Sesi 01** | Model AI (Haiku 4.5 → Sonnet 5 → Opus 5 → Fable 5 → Mythos 5) dan 7 fitur Claude: Chat, Projects, Artifacts, Tasks & Scheduled, Cowork, Claude Code, Claude Design |
| **Sesi 02** | Peta persaingan: ChatGPT, Gemini, Copilot, Grok, DeepSeek, Perplexity, Llama — beserta harga dan kesimpulan jujurnya |
| **Sesi 03** | Build day: PRD → Claude Design → Claude Code → GitHub → Database → Integrasi AI |

Tiap tahap di Sesi 03 punya diagram beranimasi **INPUT → DIOLAH OLEH → OUTPUT → KIRIM KE**, jadi jelas apa yang masuk, siapa yang mengolah, keluarnya apa, dan dikirim ke mana.

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
2. Akun **Claude Max 5×** — bukan paket Pro — sudah login di aplikasi desktop
3. Laptop dan koneksi internet yang stabil sepanjang hari
4. **Satu masalah nyata** dari departemen sendiri, ditulis dalam tiga kalimat

Database, storage, environment, dan API key sudah disiapkan tim INSYNTIVE. Tidak perlu instalasi server maupun setup Docker.

## Akses database & storage saat praktik (Sesi 03 · Tahap 05)

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

## Yang dibangun hari itu

- Web App
- RAG atas dokumen sendiri
- Chatbot
- Satu menu bebas — tantangan tiap tim

Migrasi ke server CHL maksimal **14 hari** setelah training.

---

Training by **INSYNTIVE** · 2026
