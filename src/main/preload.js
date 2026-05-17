// Potongan kode untuk ditambahkan ke dalam src/main/preload.js Anda:
contextBridge.exposeInMainWorld('api', {
  createTerminal: (id) => ipcRenderer.send('pty:create', id),
  writeTerminal: (id, data) => ipcRenderer.send('pty:write', { id, data }),
  closeTerminal: (id) => ipcRenderer.send('pty:close', id),
  onTerminalData: (id, callback) => {
    const listener = (event, data) => callback(data);
    ipcRenderer.on(`pty:data-${id}`, listener);
    return () => ipcRenderer.removeListener(`pty:data-${id}`, listener);
  }
});