> **All-in-One Personal Desktop OS Environment & Second Brain Workspace**

[![Project Status: Under Development](https://img.shields.io/badge/Status-Under%20Development-orange.svg)](#)
[![Built with AI Assistance](https://img.shields.io/badge/Built%20with-AI%20Assistance-blue.svg)](#)
[![Framework](https://img.shields.io/badge/Framework-Electron%20%2B%20React%20%2B%20Vite-brightgreen.svg)](#)

---

## ⚠️ Pemberitahuan Penting (Project Status)
* **Status Aplikasi:** BorneoOS Desktop saat ini **masih dalam tahap pengembangan aktif (Alpha/Under Development)**. Beberapa komponen inti sedang dalam proses integrasi struktural.
* **Pengembangan Dibantu AI:** Seluruh cetak biru arsitektur (*blueprint*), pemisahan modul penanganan komponen, penataan tata letak ergonomis, hingga perbaikan algoritma matematis dalam proyek ini **dirancang dan dibuat dengan bantuan kecerdasan buatan (AI Co-Pilot)** di bawah supervisi operator manusia.

---

## 🌌 Visi Proyek
BorneoOS Desktop adalah sebuah aplikasi desktop *all-in-one* berbasis **Electron** dan **React** yang dirancang sebagai sistem operasi bayangan (*Second Brain OS*) untuk kebutuhan produktivitas harian, manajemen data, lingkungan koding terintegrasi, dan pusat komunikasi personal.

---

## 🛠️ Tech Stack & Arsitektur
Proyek ini mengimplementasikan pola **Clean Architecture** untuk memisahkan proses backend desktop (*Main Process*) dan antarmuka pengguna (*Renderer Process*).

* **Inti Aplikasi:** Electron Core, Vite, Node.js
* **Antarmuka (UI):** React, Tailwind CSS, Lucide React (Icons), Framer Motion (Animations)
* **Manajemen State & Penyimpanan:** Zustand Global Store, SQLite (via `better-sqlite3`), Electron Store
* **Fitur Utama Terintegrasi:** Monaco Editor (IDE), `node-pty` + `xterm` (Terminal Asli), `@whiskeysockets/baileys` (WhatsApp Logic), Engine AI Lokal (Ollama Api/Qwen)

---

## 📦 Fitur yang Sudah Diimplementasikan (Sejauh Ini)

### 1. Arsitektur Komponen Modular (Clean Architecture Layout)
* **Full-Width Top Navbar:** Barisan navigasi atas yang bersih untuk menu global, pencarian pintar (`Ctrl + K`), status sistem, dan pintasan profil.
* **Modular Right Utility Panel:** Panel samping kanan berukuran ramping (**310px**) yang bertindak sebagai *Router/Layout Container* dinamis untuk memuat alat pembantu (*utility tools*) tanpa memakan ruang kerja utama.

### 2. Utility Blade Tools (Right Panel Components)
Semua perkakas di panel kanan telah dipisahkan ke dalam file modular mandiri di bawah direktori `components/rightPanel/`:
* **BorneoAI Copilot (`MiniAIChat.jsx`):** Antarmuka obrolan AI minimalis yang terhubung langsung ke engine model bahasa lokal Anda (default: `qwen2.5-coder:1.5b`) melalui port Ollama `11434`.
* **Advanced Scientific Calculator (`MiniCalculator.jsx`):** Kalkulator ilmiah canggih yang didesain ulang secara ergonomis menggunakan pembagian 2 kluster utama (*Scientific Row* dan *Numpad Grid*) dengan tata letak 4-kolom presisi untuk menghindari pengetikan berantakan dan mengisi penuh ruang bawah panel secara seimbang. Mendukung fungsi kurung `( )`, perpangkatan `^`, modulus `%`, akar kuadrat `√`, logaritma (`log`, `ln`), trigonometri (`sin`, `cos`, `tan`), serta konstanta `π` dan `e`.
* **Alert Stream Hub (`MiniNotifications.jsx`):** Aliran penampung notifikasi waktu nyata untuk status cadangan SQLite, kesiapan engine AI, dan notifikasi Git repository.
* **Time & Calendar Panel (`MiniCalendarClock.jsx`):** Modul jam digital *real-time* yang dilengkapi dengan matriks penanggalan bulanan interaktif.

### 3. Sistem Akselerasi Pintasan Navigasi (Global Shortcuts)
Integrasi event listener global pada `App.jsx` untuk perpindahan antar modul secara instan:
* `Alt + A` ➔ Membuka / berpindah ke panel **BorneoAI Copilot**
* `Alt + C` ➔ Membuka / berpindah ke panel **Advanced Calculator**
* `Alt + N` ➔ Membuka / berpindah ke panel **Notification Hub**
* `Alt + D` ➔ Membuka / berpindah ke panel **Time & Calendar** (Terbaru ⚡)

---

## 📂 Struktur Direktori Komponen Samping Kanan


```bash
src/renderer/src/components/
├── RightPanel.jsx               # Main Layout Container & Switcher Router Panel Kanan
└── rightPanel/
    ├── MiniAIChat.jsx           # Modul Copilot Local AI Obrolan
    ├── MiniCalculator.jsx       # Modul Kalkulator Advanced Scientific 4-Kolom
    ├── MiniNotifications.jsx    # Modul Log Aliran Notifikasi Sistem
    └── MiniCalendarClock.jsx    # Modul Jam Digital & Matriks Penanggalan

```

---

## 🚀 Panduan Instalasi & Setup Pengembang

### Prerequisites (Prasyarat Sistem)

1. **Node.js** (Versi LTS direkomendasikan, v18+)
2. **Ollama** (Untuk menjalankan AI lokal secara luring di perangkat Anda)
* Pasang Ollama dari situs resminya.
* Unduh model bahasa pengodean lewat terminal:
```bash
ollama run qwen2.5-coder:1.5b

```


### Langkah-Langkah Instalasi

1. **Inisialisasi & Klon Proyek:**
Masuk ke direktori proyek Anda:
```bash
cd borneo-os-desktop

```


2. **Instalasi Dependensi Inti:**
Jalankan perintah npm untuk memasang seluruh paket pustaka yang terdaftar di `package.json`:
```bash
npm install

```


3. **Menjalankan Aplikasi Tahap Pengembangan (Dev Mode):**
Gunakan skrip Vite-Electron dev untuk membuka jendela runtime BorneoOS Desktop:
```bash
npm run dev

```


4. **Kompilasi / Build Aplikasi Final:**
Untuk mengemas aplikasi menjadi berkas eksekusi mandiri biner desktop (`.exe` / `.dmg` / `.deb`):
```bash
npm run build

```



---

## 🛠️ Rencana Pengembangan Selanjutnya (Roadmap)

* [ ] **Fase 2:** Pengembangan Halaman Utama **IDE Editor (Borneo Code Core)** terintegrasi dengan penjelajah berkas kustom.
* [ ] **Fase 3:** Pengembangan Ruang Komunikasi **WhatsApp Space** memanfaatkan library Baileys melalui IPC Handler Main Process.
* [ ] **Fase 4:** Pengaturan Sinkronisasi Database SQLite dan Manajemen Penghematan Tabungan Finansial di Halaman Dashboard Utama.

---

*Dikembangkan dengan semangat eksplorasi teknologi modular dan kecerdasan buatan.* **BorneoOS Dev Team** 💻🔥
"""

