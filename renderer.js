// Getting the ipc and remote
// Allows this file to communicate with main.js and run main processes from this renderer
const { ipcRenderer } = require('electron');

// Open a block creator
/* document.querySelector('#create_block').addEventListener('submit', (event) => {
  event.preventDefault();
  let block = {
    name: document.querySelector('#block_name').value,
    time: document.querySelector('#block_time').value
  };
  console.log('New block with the name: ' + block.name + ' and the time period: ' + block.time);
  let new_block = document.createElement("pre");
  if (block.time.length) {
    new_block.textContent = block.name + '|' + block.time;
  } else {
    new_block.textContent = block.name;
  }
  document.querySelector('#block_list').appendChild(new_block);
}); */
