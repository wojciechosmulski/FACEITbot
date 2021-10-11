import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'FACEIT',
  description: 'The bot can now express himself',
  aliases: [],
  permissions: ['MANAGE_MESSAGES'],
  guildOnly: true,
  minArgs: 1,
  maxArgs: -1,
  slash: false,
  testOnly: true,

  callback: ({ message, args }) => {
    let content = args.join(' ');
    message.channel.send(content);
    console.log(`${message.member} issued say command and said ${content}`);
  },
} as ICommand;
