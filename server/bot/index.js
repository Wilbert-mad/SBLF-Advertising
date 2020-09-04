const { Client } = require('discord.js');
const fsp = require('fs').promises;
const fs = require('fs');

require('dotenv').config();
const client = new Client({
  disableMentions: 'everyone',
});

client.commands = new Map();
client.aliases = new Map();
client.prefix = require('../../application.js').prefix;

module.exports = {
  async init() {
    try {
      // commands handler
      fs.readdir('./server/bot/commands/', (err, files) => {
        if (err) console.error(err);
        const jsfiles = files.filter(f => f.split('.').pop() === 'js');
        if (jsfiles.length <= 0) return console.log('[logs] no commands to load!');

        jsfiles.forEach((f, i) => {
          const pull = require(`../bot/commands/${f}`);
          if (!pull.help) 
            return console.error(`Error will loading: ${f}`);  
          console.log(`[logs] ${i + 1}: ${f} loaded`);
          client.commands.set(pull.help.name, pull);
          if (!pull.help.aliases) return;
          pull.help.aliases.forEach(alias => {
            client.aliases.set(alias, pull.help.name);
          });
        });
      });

      // events handler
      const evtFiles = await fsp.readdir('./server/bot/events');
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
  Client: client,
};
