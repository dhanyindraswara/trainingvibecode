# Setup Firebase untuk form persiapan & tes

Web form di folder ini menyimpan jawaban ke **Cloud Firestore**. Karena situs
statik (GitHub Pages), tidak perlu server sendiri — cukup Firebase Web SDK.

Ikuti langkah berikut satu kali. Perkiraan 10 menit.

## 1 · Buat proyek Firebase

1. Buka <https://console.firebase.google.com> dan login dengan akun Google.
2. Klik **Add project** → beri nama (mis. `training-chl`) → **Continue**.
3. Google Analytics boleh **dimatikan** (tidak diperlukan) → **Create project**.

## 2 · Aktifkan Firestore

1. Menu kiri: **Build → Firestore Database → Create database**.
2. Lokasi: pilih yang dekat, mis. `asia-southeast2` (Jakarta) atau
   `asia-southeast1` (Singapore). Lokasi tidak bisa diubah nanti.
3. Pilih **Start in production mode** → **Enable**.

## 3 · Pasang Security Rules

Buka tab **Rules**, ganti seluruh isinya dengan ini, lalu **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function valid() {
      return request.resource.data.nama is string
        && request.resource.data.nama.size() > 0
        && request.resource.data.nama.size() < 300;
    }
    match /peserta/{id}  { allow create: if valid(); allow read: if true; allow update, delete: if false; }
    match /pretest/{id}  { allow create: if valid(); allow read: if true; allow update, delete: if false; }
    match /posttest/{id} { allow create: if valid(); allow read: if true; allow update, delete: if false; }
  }
}
```

Artinya: siapa pun boleh **mengirim** (create) dan **membaca** (read), tapi tidak
bisa mengubah/menghapus. Dashboard `admin.html` tidak perlu login.

> ⚠️ **Konsekuensi:** karena `read` terbuka, data peserta (nama, divisi, task,
> ekspektasi) bisa ditarik siapa saja yang tahu cara lewat API Firebase —
> bukan hanya lewat link admin. Ini keputusan yang diambil sadar demi
> kemudahan. Kalau nanti mau dikunci lagi, ganti `allow read: if true` jadi
> `allow read: if request.auth != null` dan aktifkan Authentication.

## 4 · Daftarkan web app & ambil config

1. Kembali ke **Project Overview** → klik ikon **`</>`** (Web).
2. Beri nama app (mis. `form-web`). **Jangan** centang "Firebase Hosting".
   → **Register app**.
3. Firebase menampilkan potongan kode berisi objek `firebaseConfig`. **Salin
   objek itu** (apiKey, authDomain, projectId, dst.).

> Nilai config ini **aman dipublikasikan** — bukan rahasia. Keamanan data ada
> di Security Rules (langkah 3), bukan pada menyembunyikan config.

## 5 · Tempel ke `firebase-config.js`

Buka [`firebase-config.js`](firebase-config.js) dan ganti nilai `GANTI_*`
dengan punyamu. Contoh hasil akhir:

```js
export const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "training-chl.firebaseapp.com",
  projectId: "training-chl",
  storageBucket: "training-chl.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};
```

Simpan, commit, push. Begitu tayang di Pages, form langsung menyimpan ke
Firestore. Banner peringatan kuning otomatis hilang setelah config terisi.

## 6 · Melihat & mengunduh jawaban

- **Dashboard (disarankan):** buka `…/form/admin.html` — langsung tampil, tanpa
  login. Ada ringkasan per kelompok/divisi, kesiapan, **nilai pre-test**
  (rata-rata, sebaran, rata-rata per kelompok, dan soal mana yang paling banyak
  salah), **nilai post-test** dengan susunan yang sama, perbandingan
  **pre → post** (per orang, dicocokkan dari nama, plus kolom selisih di tabel),
  kumpulan masukan peserta, tabel lengkap, dan tombol **Download CSV** untuk
  `peserta`, `pretest`, dan `posttest`. CSV pre-test memuat kolom `Nilai`,
  `Benar`, dan `Total`; CSV post-test menambah `Nilai pre-test` dan `Selisih`.
- **Mentah:** Firebase Console → **Firestore Database → Data** → koleksi
  `peserta`, `pretest`, `posttest`.

## Membuka / mengunci pre-test & post-test

Sekarang **dua-duanya sudah terbuka.** Kuncinya ada di **dua tempat** — kalau mau
mengunci lagi (atau membuka yang terkunci), keduanya harus diubah:

| Yang diubah | File | Barisnya |
|---|---|---|
| Halamannya | `pretest.html` / `posttest.html` | `const TERKUNCI = false;` ↔ `true` |
| Ubin di menu | `index.html` | tambah/hapus baris `posttest: "Jumat",` di objek `TERKUNCI` |

Lalu commit & push.

**Mengintip lebih dulu tanpa membukanya untuk peserta:** buka
`pretest.html?preview=1` atau `posttest.html?preview=1`. Formnya tampil lengkap
dan bisa dicoba sampai keluar nilainya, tapi jawabannya **tidak** tersimpan ke
Firestore.

## Menambah / mengubah soal

Soal dan kunci jawabannya ada di dua file terpisah dengan format yang sama:
**`form/soal-pretest.js`** dan **`form/soal-posttest.js`**. Masing-masing dipakai
bersama oleh halaman tesnya (untuk menampilkan soal dan menghitung nilai) dan
oleh dashboard admin (untuk analisa per soal), jadi cukup diubah di satu tempat.

```js
{ id:"q16", sesi:"Sesi 03",
  teks:"Pertanyaanmu?",
  opsi:["Pilihan A","Pilihan B","Pilihan C","Pilihan D"],
  benar:1 },   // indeks jawaban benar — 0 = pilihan pertama
```

- `id` harus unik, dan sebaiknya berurutan (`q01`, `q02`, …) supaya kolom di
  tabel admin ikut rapi.
- `sesi` hanya label yang tampil di atas soal.
- Nilai dihitung otomatis: `benar ÷ jumlah soal × 100`, dibulatkan. Jadi jumlah
  soal boleh ditambah atau dikurangi tanpa mengubah apa pun yang lain.

Di post-test ada tambahan: dua kolom **masukan** (`m1`, `m2`) di bagian bawah
halaman. Isinya teks bebas, tidak wajib, tidak ikut dinilai — hasilnya muncul di
panel "Masukan Peserta" pada dashboard. Daftarnya ada di array `MASUKAN` di dalam
`posttest.html`.

> ⚠️ **Kunci jawabannya ada di sisi browser.** `soal-pretest.js` ikut terkirim ke
> laptop peserta, jadi siapa pun yang membuka View Source bisa melihat mana
> jawaban yang benar. Untuk pre-test yang tujuannya mengukur titik awal, ini
> masih wajar. Kalau nanti ada tes yang benar-benar menentukan sesuatu,
> penilaiannya harus dipindah ke sisi server.

> ⚠️ **Nilai ikut terbaca publik.** Security Rules di langkah 3 memakai
> `allow read: if true`, jadi nama beserta nilainya bisa ditarik siapa saja yang
> tahu caranya — bukan cuma lewat `admin.html`. Kalau nilai dianggap sensitif,
> kunci dulu `read`-nya seperti dijelaskan di langkah 3.
