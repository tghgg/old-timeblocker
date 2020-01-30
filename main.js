const { app, BrowserWindow, ipcMain, dialog, Menu, MenuItem } = require('electron');

const path = require('path');
const process = require('process');

// Declare app's windows
let mainWindow;

let menu;

const init_menu = [
  // About box
  {
    label: 'About',
    click: (menuItem, window, event) => {
      dialog.showMessageBox({
        title: 'About',
        message: 'Timeblocker by Choppa2\nNode.js version: ' + process.versions.node + '; Electron version: ' + process.versions.electron + '.',
        buttons: ['Close']
      });
    }
  },

  {
	  label: 'Dev Tools',
	  role: 'toggleDevTools'
  },

  // Hard reload
  {
    label: 'Reload Page',
    role: 'forceReload'
  },

  // Quit
  {
    label: 'Quit',
    role: 'quit'
  }
];

// Create main window
app.on('ready', () => {
  menu = Menu.buildFromTemplate(init_menu);
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 600,
      show: true,
      webPreferences: { nodeIntegration: true },
      enableRemoteModule: false
    }
  );

  mainWindow.loadFile(path.join(__dirname, '/index.html'));
  // mainWindow.webContents.openDevTools();
});

// Time block creator dialog
ipcMain.on('show_block', (input) => {
  dialog.showMessageBox(mainWindow, {
    message: 'Block Name: ' + input,
    buttons: ['OK']
  });
});
