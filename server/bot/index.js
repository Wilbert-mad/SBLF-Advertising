const { Client } = require('discord.js');
const { readdir } = require('fs').promises;

require('dotenv').config();
const client = new Client({
  disableMentions: 'everyone',
});

client.commands = new Map();
client.aliases = new Map();

module.exports = {
  async init() {
    try {
      // events handler
      const evtFiles = await readdir('./server/bot/events');
      evtFiles.forEach(f => {
        const evtName = f.split('.')[0];
        console.log(`Loading Event: ${evtName}`);
        const event = require(`../bot/events/${f}`);
        client.on(evtName, event.bind(null, client));
      });
      console.log(`Loading a total of ${evtFiles.length} events.`);

      // login the client
      await client.login(process.env.TOKEN);
    } catch (err) {
      console.error('Error connecting: ', err);
    }  
  },
};
