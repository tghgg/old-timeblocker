// Getting the ipc and remote
// Allows this file to communicate with main.js and run main processes from this renderer
const { ipcRenderer } = require('electron');

var app = new Vue({
  el: '#header',
  data: {
    message: 'Rendered with Vue.js'
  }
});

// Open a block creator
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let block_name = document.querySelector('#block_name').value;
  let block_time = document.querySelector('#block_time').value;
  console.log('New block with the name: ' + block_name + ' and the time period: ' + block_time);
  let new_block = document.createElement("pre");
  console.log(block_time);
  if (block_time.length) {
    new_block.textContent = block_name + '|' + block_time;
  } else {
    new_block.textContent = block_name;
  }
  document.querySelector('#block_list').appendChild(new_block);
});
