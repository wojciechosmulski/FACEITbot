import { MessageEmbed, TextChannel } from 'discord.js';
import { ICommand } from 'wokcommands';
import steamFunctions from '../functions/steamFunctions';
import superagent from 'superagent';
import timestamp from '../functions/timestamp';
const globalvariables = require('../globalvariables.json');
export default {
  category: 'FACEIT',
  description: 'Status',
  permissions: ['MANAGE_MESSAGES'],
  guildOnly: true,
  slash: false,
  testOnly: true,
  hidden: true,

  callback: async ({ message, client }) => {
    let SteamMessage: any = await (
      client.channels.cache.get(
        `${globalvariables.statusChannel}`
      ) as TextChannel
    ).messages.fetch(`${globalvariables.statusMessage}`);
    let steamDump = await superagent
      .get(
        `https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=${process.env.STEAM_TOKEN}`
      )
      .catch((err: { response: { res: { text: any } } }) => {
        console.log(`STEAM API ERROR: ${err.response.res.text}`);
      });
    let { body: faceitDump } = await superagent.get(`${process.env.STATUS}`);
    let { body: freeDump } = await superagent.get(`${process.env.FREE_Q}`);
    let { body: premDump } = await superagent.get(`${process.env.PREM_Q}`);

    if (steamDump) {
      var steamSessionsLogon: string =
        steamDump.body.result.services.SessionsLogon;
      var steamMMscheduler: string =
        steamDump.body.result.matchmaking.scheduler;
    } else {
      var steamSessionsLogon = 'offline';
      var steamMMscheduler = 'offline';
    }

    let steamEmbed = new MessageEmbed()
      .setColor('#171A21')
      .setAuthor(
        'CSGO Service Status',
        'https://media.discordapp.net/attachments/699319928062476349/810893978198343690/718448040335245333.png'
      )
      .addField('\u200b', '\t**STEAM:**')
      .addField(
        'Sessions Logon',
        steamFunctions.steamPrettifier(steamSessionsLogon),
        true
      )
      .addField(
        'CSGO Matchmaking service',
        steamFunctions.steamPrettifier(steamMMscheduler),
        true
      )
      .addField('\u200b', '\t**FACEIT:**')
      .addField(
        'FACEIT Services',
        '' +
          steamFunctions.faceitPrettifier(faceitDump.status.indicator) +
          ' [' +
          faceitDump.status.description +
          '](https://www.faceitstatus.com/) ' +
          steamFunctions.faceitPrettifier(faceitDump.status.indicator) +
          '',
        true
      )
      .addField(
        'Free Queue',
        steamFunctions.queuePrettifier(freeDump.payload[0].open),
        true
      )
      .addField(
        'Premium Queue',
        steamFunctions.queuePrettifier(premDump.payload[0].open),
        true
      )
      .addField('FACEIT Bot', '✅ Online ✅')
      .setFooter(
        `Updated at ${timestamp.generateTimestamp()} GMT+0000`,
        'https://media.discordapp.net/attachments/699319928062476349/810893978198343690/718448040335245333.png'
      );

    SteamMessage.edit({ embeds: [steamEmbed] });

    console.log(
      `Status widget was force updated by ${message.member.displayName}(${message.member})`
    );
    message
      .reply('Status widget has been updated ✅')
      .then((r) => setTimeout(() => r.delete(), 10000));
  },
} as ICommand;
