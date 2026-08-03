// ============================================================
//  Lapisan Firebase — dipakai bersama form & dashboard admin.
//  Firestore untuk data, Authentication untuk login admin.
//  Biasanya tidak perlu diubah.
// ============================================================
import { firebaseConfig } from "./firebase-config.js";

const VERSI = "10.12.5";
const cdn = (m) => `https://www.gstatic.com/firebasejs/${VERSI}/firebase-${m}.js`;

// true kalau firebase-config.js sudah diisi (bukan placeholder GANTI_*)
export function konfigurasiTerisi() {
  return Boolean(firebaseConfig.projectId) &&
    !firebaseConfig.projectId.startsWith("GANTI");
}

// App di-init sekali, ditunda sampai benar-benar dibutuhkan.
let appPromise = null;
function getApp() {
  if (!konfigurasiTerisi()) {
    throw new Error("Firebase belum dikonfigurasi. Isi form/firebase-config.js dulu.");
  }
  if (!appPromise) {
    appPromise = (async () => {
      const { initializeApp } = await import(cdn("app"));
      return initializeApp(firebaseConfig);
    })();
  }
  return appPromise;
}

async function getDb() {
  const app = await getApp();
  const { getFirestore } = await import(cdn("firestore"));
  return getFirestore(app);
}

// ---------- Tulis (dipakai form peserta) ----------
export async function simpanData(namaKoleksi, data) {
  const db = await getDb();
  const { collection, addDoc, serverTimestamp } = await import(cdn("firestore"));
  const ref = await addDoc(collection(db, namaKoleksi), {
    ...data,
    dibuat: serverTimestamp(),
  });
  return ref.id;
}

// ---------- Baca & hapus (dipakai dashboard admin, butuh login) ----------
export async function ambilSemua(namaKoleksi) {
  const db = await getDb();
  const { collection, getDocs } = await import(cdn("firestore"));
  const snap = await getDocs(collection(db, namaKoleksi));
  const baris = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  // urutkan terbaru dulu berdasarkan timestamp 'dibuat'
  baris.sort((a, b) => (b.dibuat?.seconds || 0) - (a.dibuat?.seconds || 0));
  return baris;
}

export async function hapusDok(namaKoleksi, id) {
  const db = await getDb();
  const { doc, deleteDoc } = await import(cdn("firestore"));
  await deleteDoc(doc(db, namaKoleksi, id));
}

// ---------- Autentikasi admin ----------
export async function pantauAuth(callback) {
  const app = await getApp();
  const { getAuth, onAuthStateChanged } = await import(cdn("auth"));
  onAuthStateChanged(getAuth(app), callback);
}

export async function masuk(email, sandi) {
  const app = await getApp();
  const { getAuth, signInWithEmailAndPassword } = await import(cdn("auth"));
  await signInWithEmailAndPassword(getAuth(app), email, sandi);
}

export async function keluar() {
  const app = await getApp();
  const { getAuth, signOut } = await import(cdn("auth"));
  await signOut(getAuth(app));
}
