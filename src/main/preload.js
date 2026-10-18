import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('terminalAPI', {
  onData: (callback) => ipcRenderer.on('terminal-data', (_event, data) => callback(data)),
  sendData: (data) => ipcRenderer.send('terminal-write', data),
  resize: (cols, rows) => ipcRenderer.send('terminal-resize', { cols, rows })
});