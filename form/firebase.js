// ============================================================
//  Lapisan koneksi Firestore — dipakai bersama oleh semua form
//  (persiapan, pretest, posttest). Biasanya tidak perlu diubah.
// ============================================================
import { firebaseConfig } from "./firebase-config.js";

const VERSI = "10.12.5";

// true kalau firebase-config.js sudah diisi (bukan placeholder GANTI_*)
export function konfigurasiTerisi() {
  return Boolean(firebaseConfig.projectId) &&
    !firebaseConfig.projectId.startsWith("GANTI");
}

// Init ditunda sampai benar-benar dibutuhkan (saat submit pertama).
// Halaman jadi ringan dan tidak menyentuh internet sampai perlu.
let dbPromise = null;
function getDb() {
  if (!konfigurasiTerisi()) {
    throw new Error(
      "Firebase belum dikonfigurasi. Isi form/firebase-config.js dulu."
    );
  }
  if (!dbPromise) {
    dbPromise = (async () => {
      const { initializeApp } = await import(
        `https://www.gstatic.com/firebasejs/${VERSI}/firebase-app.js`
      );
      const { getFirestore } = await import(
        `https://www.gstatic.com/firebasejs/${VERSI}/firebase-firestore.js`
      );
      return getFirestore(initializeApp(firebaseConfig));
    })();
  }
  return dbPromise;
}

// Simpan satu baris ke sebuah koleksi.
//   simpanData("peserta",  { nama, divisi, ... })
//   simpanData("pretest",  { nama, divisi, jawaban })
//   simpanData("posttest", { nama, divisi, jawaban })
// Mengembalikan ID dokumen yang baru dibuat.
export async function simpanData(namaKoleksi, data) {
  const db = await getDb();
  const { collection, addDoc, serverTimestamp } = await import(
    `https://www.gstatic.com/firebasejs/${VERSI}/firebase-firestore.js`
  );
  const ref = await addDoc(collection(db, namaKoleksi), {
    ...data,
    dibuat: serverTimestamp(),
  });
  return ref.id;
}
