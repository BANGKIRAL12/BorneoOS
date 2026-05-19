// src/main/index.js
import { fileURLToPath } from 'url';
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    title: "BorneoOS Desktop",
    backgroundColor: "#070707",
    frame: true, // Ubah ke false jika ingin kustom borderless topbar ala OS asli
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Bridge IPC aman
      contextIsolation: true,  // WAJIB AKTIF untuk keamanan sistem
      nodeIntegration: false,  // Mencegah eksploitasi skrip frontend langsung ke Node.js
      sandbox: true            // Mengisolasi proses renderer
    }
  });

  // Jika masa pengembangan, muat dari server Vite lokal. Jika build, muat file statis
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// --- DAFTAR IPC HUB UTAMA (Pondasi Actions Registry) ---
ipcMain.handle('wa:send', async (event, jid, text) => {
  // Logic Baileys WhatsApp akan ditempatkan di sini
  console.log(`Mengirim pesan ke ${jid}: ${text}`);
  return { success: true };
});