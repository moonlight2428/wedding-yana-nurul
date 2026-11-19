# Undangan Pernikahan Yana & Nurul

## Cara menjalankan
1. Ekstrak folder/ZIP.
2. Pastikan `index.html`, `style.css`, dan `script.js` berada dalam satu folder.
3. Buka `index.html` di browser, atau unggah seluruh file ke hosting statis (GitHub Pages, Netlify, Vercel, atau hosting sendiri).

## Catatan penting
- Tampilan dibuat responsif, mobile-first, dengan animasi reveal, parallax ringan, galeri lightbox, countdown, musik, dan salin rekening.
- Musik mulai dicoba setelah tombol **Buka Undangan** ditekan. Browser dapat tetap menolak audio jika tautan bukan file audio langsung atau formatnya tidak didukung.
- RSVP dan ucapan saat ini disimpan di `localStorage` browser pengunjung. Data ini **belum terkirim ke pemilik undangan dan tidak dibagikan antarperangkat**. Agar semua tamu dapat mengirim dan melihat data secara langsung, hubungkan formulir ke Firebase atau Google Apps Script + Google Sheets.
- Pastikan foto Google Drive disetel dapat diakses oleh siapa pun yang memiliki tautan. Jika foto tidak tampil, periksa izin berbagi dan format tautannya.
- Tautan Maps yang diberikan dipasang sebagai tombol navigasi. Pastikan tautan tersebut mengarah ke titik lokasi acara yang benar.
- Countdown diarahkan ke 21 April 2027 pukul 08.00 WIB menggunakan waktu lokal perangkat pengunjung.

## Struktur
- `index.html` — struktur konten
- `style.css` — tema maroon, tipografi, responsivitas, animasi
- `script.js` — countdown, musik, lightbox, RSVP, guestbook, dan interaksi
