import { app, BrowserWindow, Menu, Tray, ipcMain } from 'electron' // eslint-disable-line
import Qiniu from '../renderer/utils/qiniu';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
let mainMenu;
let appIcon = null;

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
    resizable: true,
    show: false,
  });

  mainWindow.loadURL(winURL);

  // disable white loading page by 'ready-to-show' event
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // disable open a outer resource from a dragover event
  mainWindow.webContents.on('will-navigate', (e) => {
    e.preventDefault();
  });

  // icon in menu bar
  let accessKey = '';
  let secretKey = '';
  let defaultBucket = '';
  if (appIcon === null) {
    appIcon = new Tray(`${__static}/img/qboxTemplate.png`);
    // appIcon.setToolTip('Drag file here and upload to the default bucket.');

    // get qiniu bucket list
    ipcMain.on('setKey', (event, key) => {
      accessKey = key.ak;
      secretKey = key.sk;
      defaultBucket = key.db;
      appIcon.setToolTip('set default bucket and drag a file here to upload');

      // appIcon.setToolTip(accessKey);
      Qiniu.buckets(accessKey, secretKey)
        .then((data) => {
          const submenuTmp = [];
          data.map((bucketTmp) => {
            // set the default bucket
            let objTmp;
            if (key.db !== undefined && bucketTmp === key.db) {
              objTmp = {
                label: bucketTmp,
                type: 'radio',
                checked: true,
                click() {
                  event.sender.send('setDefaultBucket', bucketTmp);
                },
              };
            } else {
              objTmp = {
                label: bucketTmp,
                type: 'radio',
                click() {
                  event.sender.send('setDefaultBucket', bucketTmp);
                },
              };
            }

            return submenuTmp.push(objTmp);
          });
          const contextMenu = Menu.buildFromTemplate([
            {
              label: 'Default Bucket',
              submenu: submenuTmp,
            },
          ]);
          appIcon.setContextMenu(contextMenu);
          // this.bucketList = data;
        });
    });

    // app tray click event
    appIcon.on('click', () => {
      if (mainWindow === null) {
        createWindow();
      }
    });

    // app tray drag-enter event
    appIcon.on('drag-enter', () => {
      // window.open(this.$router);
      const uploadWin = new BrowserWindow({
        height: 640,
        useContentSize: true,
        width: 1000,
        titleBarStyle: 'hidden-inset',
        resizable: false,
      });
      const winURL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:9080'
        : `file://${__dirname}/index.html`;
      uploadWin.loadURL(`${winURL}#/upload?bucket=${defaultBucket}`);
    });
  }
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
