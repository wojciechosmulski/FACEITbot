import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'FACEIT',
  description: 'How can I get help?',
  aliases: ['s', 'sup'],
  globalCooldown: '2m',
  guildOnly: true,
  slash: 'both',
  testOnly: true,

  callback: ({ interaction, message }) => {
    let messageObject = interaction || message;
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL('https://support.faceit.com/hc/en-us/requests/new')
        .setStyle('LINK')
        .setLabel('FACEIT Customer Support')
    );
    const embed = new MessageEmbed()
      .setColor('#ff6500')
      .setAuthor(
        'FACEIT Support',
        'https://media.discordapp.net/attachments/699319928062476349/810893978198343690/718448040335245333.png'
      )
      .setDescription(
        `To contact FACEIT's Customer Support team:\n\n     - Please click [here](https://support.faceit.com/hc/en-us/requests/new)\n     - Fill in the appropriate information in regards to your issue.\n\nYou will then receive an email response letting you know they received your ticket. They will reply back to your issue as quickly as possible.`
      );

    messageObject.reply({ embeds: [embed], components: [row] });
  },
} as ICommand;
