const { app, BrowserWindow, ipcMain, dialog, Notification, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow = null;

function createWindow() {
  const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged;

  mainWindow = new BrowserWindow({
    width: 1380,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'Portfolio Studio — Desktop Admin',
    backgroundColor: '#0b0b0b',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    }
  });

  // Security: Prevent unauthorized window opening & open external links in system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('file://') || url.startsWith('http://localhost') || url.startsWith('https://admin.arjunghuge.me')) {
      return;
    }
    event.preventDefault();
    shell.openExternal(url);
  });

  // Load Admin App
  const localFile = path.join(__dirname, '../admin/dist/index.html');
  const fallbackFile = path.join(__dirname, '../../admin/dist/index.html');
  let targetFile = null;
  if (fs.existsSync(localFile)) {
    targetFile = localFile;
  } else if (fs.existsSync(fallbackFile)) {
    targetFile = fallbackFile;
  }

  const startUrl = process.env.ELECTRON_START_URL || (
    isDev
      ? 'http://localhost:5173'
      : (targetFile ? `file://${targetFile}` : 'https://admin.arjunghuge.me')
  );

  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('select-file', async (event, options = {}) => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: options.filters || [
      { name: 'Images & Documents', extensions: ['jpg', 'png', 'webp', 'gif', 'svg', 'pdf'] }
    ]
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  const filePath = result.filePaths[0];
  const stats = fs.statSync(filePath);
  return {
    filePath,
    name: path.basename(filePath),
    size: stats.size
  };
});

ipcMain.handle('save-file', async (event, { defaultName, content }) => {
  if (!mainWindow) return false;
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultName || 'portfolio-backup.json',
    filters: [{ name: 'JSON Backup', extensions: ['json'] }]
  });
  if (result.canceled || !result.filePath) return false;
  fs.writeFileSync(result.filePath, typeof content === 'string' ? content : JSON.stringify(content, null, 2), 'utf-8');
  return true;
});

ipcMain.handle('show-notification', (event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({
      title: title || 'Portfolio Studio',
      body: body || 'Notification from Admin Desktop'
    }).show();
    return true;
  }
  return false;
});

ipcMain.handle('open-external', async (event, url) => {
  if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
    await shell.openExternal(url);
    return true;
  }
  return false;
});

// App Lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
