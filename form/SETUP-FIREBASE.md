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
    match /peserta/{id}  { allow create: if valid(); allow read, update, delete: if false; }
    match /pretest/{id}  { allow create: if valid(); allow read, update, delete: if false; }
    match /posttest/{id} { allow create: if valid(); allow read, update, delete: if false; }
  }
}
```

Artinya: siapa pun boleh **mengirim** (create), tapi **tidak ada** yang bisa
membaca/mengubah/menghapus dari sisi web. Data peserta tidak bisa diintip orang
lain lewat browser — kamu tetap bisa melihat semuanya lewat Firebase Console.

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

- **Lihat:** Firebase Console → **Firestore Database → Data** → koleksi
  `peserta`, `pretest`, `posttest`.
- **Unduh ke Excel/CSV:** pakai ekstensi *Export Collections* atau
  `firebase firestore:export`, atau salin manual untuk jumlah kecil.

## Menambah / mengubah pertanyaan tes

Buka `pretest.html` atau `posttest.html`, cari komentar `EDIT DI SINI` dan ubah
array `SOAL`. Tiap item:

```js
{ id:"q1", tipe:"pilihan", teks:"Pertanyaanmu?", opsi:["A","B","C"] }  // pilihan ganda
{ id:"q2", tipe:"isian",   teks:"Pertanyaan isian bebas?" }            // jawaban teks
```

Pastikan tiap `id` unik dalam satu file.
