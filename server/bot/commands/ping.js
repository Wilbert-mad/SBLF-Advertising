module.exports.run = (client, message) => {
  const startTime = Date.now();
  message.channel.send('pinging...').then((msg) => {
    const endTime = Date.now();
    msg.edit(`ping \`${endTime - startTime}ms\``);
  });
};

module.exports.help = {
  name: 'ping',
  aliases: [],
};
