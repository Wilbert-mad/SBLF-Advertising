const { Client } = require('discord.js');

require('dotenv').config();
const client = new Client({
  disableMentions: 'everyone',
});

client.commands = new Map();
client.aliases = new Map();

client.on('ready', () => console.log(`${client.user.tag} Is Ready`));

module.exports = {
  async init() {
    try {
      client.login(process.env.TOKEN);
    } catch (err) {
      console.error('Error connection to discord: ', err);
    }  
  },
};
