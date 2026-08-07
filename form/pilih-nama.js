// ============================================================
//  PILIH NAMA — dropdown yang bisa dicari, isinya nama-nama yang
//  sudah pernah masuk lewat Form Persiapan dan Pre-Test.
//
//  Tujuannya supaya nama di post-test persis sama dengan yang dipakai
//  sebelumnya — kalau ejaannya beda sedikit saja, pasangan
//  pre-test → post-test di dashboard jadi tidak ketemu.
//
//  Kelompok & divisi ikut terbawa dari data lama, jadi peserta tidak
//  perlu mengisi ulang (dan tidak bisa salah isi).
//
//  Kalau daftarnya gagal dimuat, atau nama peserta memang belum ada di
//  daftar, field-nya otomatis balik jadi ketikan bebas.
// ============================================================
import { ambilSemua } from "./firebase.js";

const rapikan = (s) => String(s ?? "").trim().replace(/\s+/g, " ");
const kunci = (s) => rapikan(s).toLowerCase();
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

// Ambil nama dari koleksi lama. Yang terbaru menang kalau ada isian ganda,
// karena ambilSemua() sudah mengurutkan terbaru dulu — jadi entri lama
// tidak menimpa kelompok/divisi yang paling akhir dipakai orangnya.
export async function ambilDaftarNama(koleksi = ["peserta", "pretest"]) {
  const hasil = await Promise.all(koleksi.map(k => ambilSemua(k).catch(() => null)));
  // satu koleksi gagal masih bisa ditolong yang lain; kalau semuanya gagal,
  // itu masalah koneksi — biar pemanggilnya bilang apa adanya ke peserta
  if (hasil.every(h => h === null)) throw new Error("Daftar nama gagal dimuat.");

  const peta = new Map();
  hasil.filter(Boolean).flat().forEach(r => {
    const nama = rapikan(r?.nama);
    if (!nama) return;
    const k = kunci(nama);
    if (!peta.has(k)) peta.set(k, { nama, kelompok: r.kelompok || "", divisi: rapikan(r.divisi) });
  });
  return [...peta.values()].sort((a, b) => a.nama.localeCompare(b.nama, "id"));
}

// ------------------------------------------------------------
//  pasangPilihNama(opsi)
//    input     : <input> yang jadi kotak ketik + tampilan pilihan
//    daftar    : hasil ambilDaftarNama()
//    onPilih   : dipanggil dengan entri terpilih (atau null saat manual)
//  Mengembalikan { manual() } supaya pemanggil tahu sedang mode apa.
// ------------------------------------------------------------
export function pasangPilihNama({ input, daftar, onPilih }) {
  const box = document.createElement("div");
  box.className = "combo";
  input.parentNode.insertBefore(box, input);
  box.appendChild(input);

  const list = document.createElement("div");
  list.className = "combo-list";
  list.setAttribute("role", "listbox");
  list.hidden = true;
  box.appendChild(list);

  input.setAttribute("role", "combobox");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("aria-autocomplete", "list");

  const MANUAL = "__manual__";
  let manual = false;     // true = peserta memilih "nama saya tidak ada"
  let sorot = -1;         // indeks baris yang sedang disorot keyboard
  let baris = [];         // [{ nama, kelompok, divisi } | MANUAL]

  const cocok = (q) => {
    const s = kunci(q);
    if (!s) return daftar;
    // cocokkan per kata, jadi "budi san" tetap ketemu "Budi Santoso"
    const kata = s.split(" ").filter(Boolean);
    return daftar.filter(d => kata.every(w => kunci(d.nama).includes(w)));
  };

  function gambar(q) {
    const hit = manual ? [] : cocok(q);
    baris = [...hit, MANUAL];
    list.innerHTML = hit.map((d, i) => {
      const sub = [d.divisi, d.kelompok ? "Kelompok " + d.kelompok : ""].filter(Boolean).join(" · ");
      return `<div class="combo-opt${i === sorot ? " on" : ""}" role="option" data-i="${i}">
        <span class="cn">${esc(d.nama)}</span>${sub ? `<span class="cs">${esc(sub)}</span>` : ""}</div>`;
    }).join("")
      + (hit.length ? "" : `<div class="combo-kosong">Tidak ada nama yang cocok.</div>`)
      + `<div class="combo-opt manual${sorot === baris.length - 1 ? " on" : ""}" role="option" data-i="${baris.length - 1}">
           <span class="cn">✎ Nama saya tidak ada di daftar</span>
           <span class="cs">Ketik sendiri nama lengkapmu</span></div>`;
  }

  function buka(q = input.value) {
    if (manual) return;
    gambar(q);
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function tutup() {
    list.hidden = true;
    sorot = -1;
    input.setAttribute("aria-expanded", "false");
  }

  function keManual() {
    manual = true;
    tutup();
    box.classList.add("manual");
    input.value = "";
    input.placeholder = "Ketik nama lengkapmu";
    onPilih?.(null);
    input.focus();
  }

  function pilih(i) {
    const d = baris[i];
    if (d === MANUAL || d == null) return keManual();
    input.value = d.nama;
    box.classList.add("terpilih");
    tutup();
    onPilih?.(d);
  }

  input.addEventListener("input", () => {
    if (manual) return;
    box.classList.remove("terpilih");
    onPilih?.(null);
    sorot = -1;
    buka();
  });
  input.addEventListener("focus", () => buka());
  // klik juga, bukan cuma focus: kalau kursor sudah di dalam kotaknya
  // (mis. baru saja memilih nama lalu mau ganti), event focus tidak menyala lagi
  input.addEventListener("click", () => buka());
  input.addEventListener("keydown", (e) => {
    if (manual) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (list.hidden) return buka();
      sorot = (sorot + (e.key === "ArrowDown" ? 1 : -1) + baris.length) % baris.length;
      gambar(input.value);
      list.querySelector(".combo-opt.on")?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      if (!list.hidden) { e.preventDefault(); pilih(sorot >= 0 ? sorot : 0); }
    } else if (e.key === "Escape") {
      tutup();
    }
  });

  // mousedown, bukan click — supaya tidak keburu ketutup oleh blur
  list.addEventListener("mousedown", (e) => {
    const opt = e.target.closest(".combo-opt");
    if (!opt) return;
    e.preventDefault();
    pilih(Number(opt.dataset.i));
  });

  document.addEventListener("mousedown", (e) => { if (!box.contains(e.target)) tutup(); });

  return { manual: () => manual };
}
