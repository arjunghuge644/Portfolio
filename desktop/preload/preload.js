const { contextBridge, ipcRenderer } = require('electron');

// Expose controlled desktop APIs to renderer process via contextBridge
contextBridge.exposeInMainWorld('desktopAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  selectFile: (options) => ipcRenderer.invoke('select-file', options),
  saveFile: (options) => ipcRenderer.invoke('save-file', options),
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),
  exportPortfolioData: () => ipcRenderer.invoke('export-portfolio-data'),
  importBackupData: () => ipcRenderer.invoke('import-backup-data'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  isElectron: true
});
