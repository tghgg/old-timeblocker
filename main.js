const { app, BrowserWindow, ipcMain, dialog, Menu, MenuItem } = require('electron');

const path = require('path');
const process = require('process');

// Declare app's windows
let mainWindow, editWindow;

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
    role: 'forceReload',
    accelerator: 'CommandOrControl+Shift+S'
  },

  // Quit
  {
    label: 'Quit',
    role: 'close'
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

// Show block info box
// Reminder that 'on' methods have two arguments: event, data
ipcMain.on('show_block', (event, input) => {
  dialog.showMessageBox(mainWindow, {
    message: 'Block Name: ' + input,
    // Have buttons for edit, delete, or do nothing options
    // showMessageBox returns a Promise with the index of the button the user clicked on
    buttons: ['OK', 'Delete', 'Edit']
  }).then((response) => {
    console.log(response.response + ' was the index of the button clicked.');
    switch (response.response) {
      case 0:
        console.log('Close block info box.');
        break;
      case 1:
        // Send back to info of the about-to-be-deleted block
        mainWindow.webContents.send('delete_block', input);
        console.log('Delete this block');
        break;
      case 2:
        // Send back to info of the about-to-be-edited block
        editWindow = new BrowserWindow({
          width: 400,
          height: 300,
          resizable: false,
          enableRemoteModule: false
        });
        editWindow.loadFile(path.join(__dirname, '/windows/edit.html'));
        console.log('Edit this block.');
        break;
      default:
        console.log('Something went wrong trying to close the block info dialog box!');
        break;
    }
  }, (err) => {
    console.log(err);
    console.log('Error retrieving a response from the block info dialog box!');
  });
});
