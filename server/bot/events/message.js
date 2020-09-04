module.exports = (client, message) => {
  if (message.author.bot) return;

  const command =  message.content.split(' ')[0];
  const args =  message.content.split(' ').slice(1);

  if (!command.startsWith(client.prefix)) return;

  let cmd = client.commands.get(command.slice(client.prefix.length)) ||
			client.commands.get(client.aliases.get(command.slice(client.prefix.length)));
  if (cmd) cmd.run(client, message, args);
};
