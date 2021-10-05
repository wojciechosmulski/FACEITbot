import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'FACEIT',
  description: 'How to call the Live Chat',
  aliases: ['lc', 'ls', 'livesupport'],
  globalCooldown: '2m',
  guildOnly: true,
  slash: 'both',
  testOnly: true,

  callback: ({}) => {
    let url = 'https://gyazo.com/8be81b89c3bdb902298caad37893a749';

    let embed = new MessageEmbed()
      .setColor('#ff6500')
      .setAuthor(
        'FACEIT LiveChat',
        'https://media.discordapp.net/attachments/699319928062476349/810893978198343690/718448040335245333.png'
      )
      .setDescription(
        `If you have an issue with a live match, please ask your team captain to start a live chat with one of our technical support agents.\n\nHere's how:` +
          `\n${url}`
      )
      .setImage('https://i.gyazo.com/8be81b89c3bdb902298caad37893a749.gif');
    return embed;
  },
} as ICommand;
