import { app, BrowserWindow, ipcMain, dialog, Menu, MenuItem } from 'electron';

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
      width: 600,
      height: 400,
      show: true,
      webPreferences: { nodeIntegration: true },
      enableRemoteModule: false
    }
  );

  mainWindow.loadFile(__dirname + '/index.html');
  // mainWindow.webContents.openDevTools();
});

// Time block creator dialog
ipcMain.on('create-block', (input) => {
  dialog.showMessageBox(mainWindow, {
    message: "Block created.",
    buttons: ['OK nibba']
  });
});
