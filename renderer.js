const { ipcRenderer } = require('electron');
      // Seems to be pretty containerized
      // List the hours on the sidebar 
      var hours_list = new Vue({
        el: '#hours_list',
        data: {
          hours: []
        }
      });
      for (i=0;i<25;i++) {
        hours_list.hours.push(i.toString());
      }
      // List the blocks created
      var block_list = new Vue({
        el: '#block_list',
        data: {
          blocks: [
            'Inbox Zero | 10:00AM - 12:00PM',
            'Draft for new scene',
          ]
        },
        methods: {
          // Show a block's info
          show_block: (event, input) => {
            event.preventDefault();
            console.log(input + ' is the block to be shown.');
            // Tell the main process to show a dialog box containing the box's info
            ipcRenderer.send('show_block', input);
          }
        }
      });
      // Handler for creating new blocks
      var create_block = new Vue({
        el: '#create_block',
        methods: {
          create_block: (event) => {
            event.preventDefault();
            // Add block to block list
            let block = {
              name: document.querySelector('#block_name').value,
              time: {
                start: document.querySelector('#block_time_start').value,
                end: document.querySelector('#block_time_end').value
              }
            };
            console.log('New block with the name: ' + block.name + ' and the time period: ' + block.time);
            console.log(block_list.blocks + ' are the current blocks.');
            if (block.time.start || block.time.end) {
              block_list.blocks.push(block.name + ' | ' + block.time.start + ' - ' + block.time.end);
            } else {
              block_list.blocks.push(block.name);
            }
            console.log(block_list.blocks + ' are the new blocks.');
            // Clear block input field
            document.getElementsByTagName('input').value = '';
        }
      }
      });
      // Footer showing current time
      var footer = new Vue({
        el: '#footer',
        data: {
          current_time: `${new Date().getHours()}:${new Date().getMinutes()}` 
        },
        methods: {
          update_current_time: () => {
            console.log('Update current time.');
            footer.current_time = `${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        }
      });
      // Update footer every minute
      setInterval(footer.update_current_time, 60000);
      // Main process signals handlers
      ipcRenderer.on('delete_block', (event, input) => {
        console.log(input + ' to be deleted.');
        block_list.blocks.splice(block_list.blocks.indexOf(input), 1);
        console.log('New block list: ' + block_list.blocks);
      });
      ipcRenderer.on('edit_block', (event, input) => {
        console.log(input + ' to be edited.');
        // prompt() is not supported by Electron as it is synchronous and therefore blocking
        // have to find another way to get quick input
      });