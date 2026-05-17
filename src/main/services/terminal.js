const { ipcMain } = require('electron');
const pty = require('node-pty');
const os = require('os');

const ptyProcesses = {};

function setupTerminalService() {
  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

  // Handler membuat terminal baru
  ipcMain.on('pty:create', (event, id) => {
    const ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 24,
      cwd: process.env.HOME || process.env.USERPROFILE,
      env: process.env,
    });

    ptyProcesses[id] = ptyProcess;

    // Kirim data keluaran shell ke UI renderer
    ptyProcess.onData((data) => {
      event.sender.send(`pty:data-${id}`, data);
    });
  });

  // Handler menerima ketikan dari UI
  ipcMain.on('pty:write', (_, { id, data }) => {
    if (ptyProcesses[id]) {
      ptyProcesses[id].write(data);
    }
  });

  // Handler ketika tab terminal ditutup
  ipcMain.on('pty:close', (_, id) => {
    if (ptyProcesses[id]) {
      ptyProcesses[id].kill();
      delete ptyProcesses[id];
    }
  });
}

module.exports = { setupTerminalService };