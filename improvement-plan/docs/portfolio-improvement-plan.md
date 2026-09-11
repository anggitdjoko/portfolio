# Rencana perbaikan portfolio — audit baseline

**Diverifikasi:** 11 September 2026 (read-only audit)  
**Repo:** `anggitdjoko/portfolio` (public, MIT)  
**Default branch:** `main` @ `725920ce808008b598252fa7d3168eb38e2c2c26`  
**Branch yang melayani GitHub Pages:** `gh-pages` @ `98dd9dedb0dc9935f380ee2991039bb6af7753f6`  
**Live:** `https://anggitdjoko.github.io/portfolio/` dan route `data.html`

## Keputusan dan cakupan

Dokumen ini adalah **plan saja**; audit ini tidak mengubah UI, workflow, `main`, atau `gh-pages`. Baseline penting: GitHub Pages saat ini berstatus `built`, memakai source `gh-pages` (legacy, root `/`), sedangkan default repository adalah `main`. `main/.github/workflows/deploy.yml` sendiri menyatakan build Ghibli/Next bersifat manual dan bahwa site live adalah static space-themed site di `gh-pages`. Karena itu branch plan dibuat dari `main`, bukan dari branch deploy: dokumen perencanaan adalah artefak repository, bukan perubahan produksi.

Visual galaxy/particle, kualitas Android/desktop yang sudah baik, dan fallback iPhone/iPad harus dipertahankan. Prioritas perangkat adalah Safari iPhone/iPad lalu Mac; tidak ada klaim uji Mac fisik pada audit ini. Jangan menghapus atau mengganti karya, kredit, data, lisensi, maupun nama pihak lain hanya berdasarkan kemiripan teks. Tidak boleh menambah metrik, ownership, testimonial, atau dampak yang belum dibuktikan.

## Coverage dan batasan bukti

- **Route yang terjangkau:** homepage live (`index.html`), dashboard `data.html`, asset/runtime yang dirujuk keduanya (`data.js`, `app.js`, `warp.js`, `gas.js`, `kobelco.js`, `jar.js`), serta seluruh tree teks relevan pada `main` dan `gh-pages`. Homepage dan `data.html` juga discrape publik.
- **Source yang ditinjau:** `main/src/app/page.tsx`, `main/src/app/layout.tsx`, `main/src/data/portfolio.ts`, `main/src/styles/globals.css`, komponen nav/layout, `main/README.md`, workflow, dan HTML/JS production branch.
- **Bukan bukti saat ini:** artefak audit lama, PR lama, simulasi Chromium, dan handoff lama hanya dipakai sebagai konteks. Belum dilakukan physical iPhone/iPad Safari, Mac Safari, VoiceOver, screen reader, WebKit, network-throttle, atau benchmark FPS.
- **Riwayat:** PR #2 (`fix/ios-safari-compat-20260909`) sudah merged pada 9 September 2026; PR #1 (`optimize/warp-motion-scroll-20260909`) masih open/draft dan targetnya `gh-pages`. Keduanya tidak dianggap bukti bahwa baseline sekarang sempurna.

## Temuan terverifikasi dan prioritas

### P0 — identitas, trust, dan sumber kebenaran

1. **Runtime live sudah memakai identitas Anggit, tetapi README default branch masih identitas orang lain.** Live `index.html` (title/meta/hero/footer) dan `gh-pages/data.js` menyebut “Anggit Djoko Wibowo”. Namun `main/README.md:5` masih berbunyi `Syahril Arfian Almazril — Personal Portfolio`; baris 18–26 menautkan demo, GitHub `Arfazrll`, dan LinkedIn Syahril; bagian profil/footer masih memuat Azril/Arfazrll. Ini masalah trust recruiter dan maintainer, meski mungkin merupakan arsip/template yang sah. **Jangan auto-relabel.** Owner perlu mengonfirmasi apakah README itu harus menjadi README Anggit, arsip yang dipindah, atau dokumentasi pihak lain. Jika bukan arsip, perbaiki heading, badges, demo, clone URL, profil, kontak, dan footer dalam diff terpisah.

2. **Default source dan production source terpecah.** `main` adalah Next/Ghibli experiment dengan `src/app/page.tsx` dan data portfolio besar; Pages melayani static galaxy dari `gh-pages`. `main` juga memiliki `public/about/anggit.jpg` dan `public/about/arfazrll.jpeg` yang byte-identical pada tree saat ini, serta data main yang memuat URL `syahrilarfianalmazril.vercel.app`, akun Hugging Face `Alfazril`, dan credential username `arfazrlll-6195`. Itu adalah kandidat stale/template atau proyek/kredensial yang valid—bukan alasan cukup untuk menghapus. Tetapkan satu canonical source dan matriks provenance sebelum menyatukan deploy.

3. **Raw data dan identitas organisasi memerlukan privacy/provenance gate.** `main/experience/` berisi CSV/XLSX/PPTX transaksi dan `gh-pages/data.html` menampilkan nama organisasi, jumlah record, nilai penjualan, konsentrasi customer, serta rekomendasi. Karya dashboard boleh menjadi case study jika publikasi dan angka sudah diizinkan; jangan menganggap data mentah otomatis aman hanya karena dashboard sudah online.

### P1 — pesan recruiter/client, bukti kerja, dan navigasi

4. **Live copy sudah spesifik, tetapi perlu hierarki bukti yang lebih cepat dipindai.** Homepage menyatakan “Software Engineer focused on building web applications and software products…”; projects menampilkan enam item (Servgo, GearGrid, HK Farm, SIMRS, portfolio, dashboard) dengan tech stack dan demo reel. Ini bahan kuat. Untuk recruiter, utamakan role yang dicari, skill inti, kontribusi Anggit, problem → keputusan teknis → hasil yang benar-benar terverifikasi. Untuk client, jelaskan layanan/deliverable, siapa yang terbantu, batasan, dan CTA kontak. Jadikan 2–3 case study utama, sementara sisanya secondary; jangan menambah outcome tanpa sumber.

5. **Dashboard internal adalah route bernilai tinggi tetapi perlu framing consent dan ownership.** `data.html` sudah memiliki tiga blok perusahaan, visual, forecast, roadmap, dan catatan bahwa JAR adalah assessment. Tambahkan pada fase implementasi label provenance/scope, tanggal data, dan batasan metodologi; bedakan pekerjaan pribadi, assessment, employment, dan collaboration. Pertahankan caveat yang jujur seperti “nine months is a single partial cycle”; jangan mengubah forecast menjadi janji bisnis.

6. **Temuan navigasi/a11y yang terlihat dari source:** homepage production memiliki `<div class="brand"></div>` kosong di `index.html` dan `app.js` tidak mengisinya; pada scrape publik brand tidak muncul. Sound toggle hanya punya `title`, tanpa accessible name yang eksplisit. Media project memakai `.pmedia` sebagai `role="button"` sekaligus berisi button fullscreen, sehingga ada nested interactive control yang perlu diuji keyboard/screen reader. Back link `data.html` dan warp round-trip harus diuji pada Safari, hash, menu, dialog, Escape, focus return, dan orientation change.

### P2 — hygiene, performance, dan operasi

7. Kandidat artefak stale mencakup `build-log.txt`, `AGENT_HANDOFF.md`, `DEPLOYMENT_ANALYSIS.md`, script analisis/fix, `public/certificate/desktop.ini`, dokumen `docs/ux/`, dan dataset mentah. Tidak ada penghapusan pada plan ini. Lakukan reference/dependency/license/privacy scan dahulu; pindahkan archive bila memang dibutuhkan, hapus hanya lewat PR terpisah dengan approval.

8. Runtime memuat Three.js/GSAP/ScrollTrigger dan Google Fonts dari CDN; video demo lazy-load dengan `preload="none"`, particle count dibedakan mobile/desktop, dan fallback CSS/no-WebGL serta reduced-motion sudah ada. Pertahankan visual galaxy. Ukur terlebih dahulu pada Safari dan jaringan lambat; optimasi hanya jika ada bukti (misalnya defer/versi vendor, poster/video encoding, font fallback, atau budget WebGL), bukan redesign black hole atau penurunan kualitas Android/desktop secara spekulatif.

## Rencana eksekusi berfase

**Fase 0 — keputusan dan inventaris (gate).** Bekukan matriks `main` ↔ `gh-pages` ↔ URL publik: route, file sumber, asset, owner/provenance, dan status deploy. Owner mengonfirmasi canonical name/role/contact, status README lama, izin dashboard/raw data, serta 2–3 case study yang boleh dipromosikan. Output: satu source-of-truth tertulis dan daftar klaim yang boleh dipakai.

**Fase 1 — P0 trust (diff kecil).** Sinkronkan README hanya setelah keputusan Fase 0; audit semua alias, demo, credential URL, avatar, social link, title/meta, footer, dan package/docs. Tambahkan provenance pada case study tanpa membocorkan raw data. Jalankan secret scan, link/reference scan, license check, dan cek bahwa tidak ada dependency/kredit sah yang ikut terhapus.

**Fase 2 — P1 recruiter/client.** Refactor copy dan urutan live experience, bukan visual language: hero dengan positioning yang jelas; 2–3 case study dengan struktur *context → role/contribution → approach → deliverable → verified result/limitation*; secondary work tetap tersedia tanpa memenuhi first viewport. Buat client CTA yang menjawab layanan, deliverable, brief awal, dan kanal kontak. Perbaiki brand nav, accessible name, semantic media controls, focus/keyboard behavior, dan link-state. Gunakan kalimat natural dan spesifik; hindari jargon AI dan angka buatan.

**Fase 3 — P2 quality dan hygiene.** Setelah dependency scan, pisahkan archive dari runtime; minimalkan asset/CDN yang terbukti menghambat, pertahankan poster dan lazy video, dan catat budget WebGL. Tambahkan metadata sosial/SEO seperlunya (canonical/OG image jika tersedia), alt text yang bermakna, status link, dan error/fallback copy. Jangan mengubah workflow atau branch Pages tanpa rencana migrasi dan rollback.

## Acceptance criteria, checks, dan release control

- **Content:** seluruh visible identity, title/meta, README, footer, social URLs, dan case-study provenance konsisten dengan owner-approved matrix; tidak ada nama pihak lain yang direlabel; tidak ada metrik/ownership/testimonial tanpa bukti.
- **Routes:** homepage, `data.html`, back link, hash CTA, filter, video/lightbox, contact, and external links bekerja pada desktop, Android Chrome, iPhone Safari, iPad Safari, dan Mac Safari yang tersedia.
- **Accessibility:** keyboard-only, focus-visible, focus return setelah menu/dialog, Escape, 44px touch targets, screen reader labels, semantic heading order, no nested interactive controls, alt text, reduced-motion, dan no-WebGL fallback lulus.
- **Performance/resilience:** test cold-cache dan cache, slow 4G, offline/error CDN fallback, orientation, safe-area, low-power/save-data, WebGL context loss, and reduced motion. Catat hasil dan browser/version; jangan klaim physical device jika tidak diuji.
- **Release:** setiap perubahan melalui branch/PR terpisah; deploy hanya setelah review dan source/Pages SHA cocok. Smoke-test production route, simpan screenshot/log ringkas, lalu monitor rollback. Rollback berarti mengembalikan branch Pages/source ke SHA deploy terakhir yang diketahui baik—bukan menghapus branch atau rewrite history.

### Aman dikerjakan tanpa input tambahan

Audit link/reference/dependency, route map, accessibility test harness, brand placeholder fix, alt/label/semantic-control fixes, source-of-truth diff, dan pengukuran performa tanpa mengubah visual atau klaim. Pindahkan/hapus artefak **belum** termasuk aman tanpa approval.

### Masih membutuhkan keputusan Anggit

Canonical identity dan README lama; status setiap URL/account yang memakai nama lain; izin menampilkan nama organisasi/angka dashboard/raw datasets; case study utama dan kontribusi yang benar; target role/client; kanal kontak publik; serta apakah dan kapan `main` boleh menjadi source deploy. Plan ini sengaja tidak menebak jawaban tersebut.
