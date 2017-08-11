import { app, BrowserWindow, Menu } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
let mainMenu;

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial menu options
   */
  const template = [
    {
      role: 'editMenu',
    },
    {
      label: 'Window',
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'close',
        },
        {
          type: 'separator',
        },
        {
          label: 'QBox',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            app.emit('activate');
          },
        },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Document',
          click() { require('electron').shell.openExternal('https://github.com/LanceGin/QBox/blob/master/README.md'); },
        },
        {
          label: '中文文档',
          click() { require('electron').shell.openExternal('https://github.com/LanceGin/QBox/blob/master/README_zh.md'); },
        },
        {
          type: 'separator',
        },
        {
          label: 'Open Source',
          click() { require('electron').shell.openExternal('https://github.com/LanceGin/QBox'); },
        },
        {
          label: 'License',
          click() { require('electron').shell.openExternal('https://github.com/LanceGin/QBox/blob/master/LICENSE'); },
        },
        {
          type: 'separator',
        },
        {
          label: 'About Author(LanceGin)',
          click() { require('electron').shell.openExternal('http://www.lancegin.cc'); },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }

  mainMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(mainMenu);

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 640,
    useContentSize: true,
    width: 400,
    titleBarStyle: 'hidden-inset',
    resizable: false,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
