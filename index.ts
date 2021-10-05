import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import WOKCommands from 'wokcommands';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    typeScript: true,
    testServers: ['891289307229339679'],
    mongoUri: process.env.MONGOURI,
  });
  console.log('Bot is ready');
});

client.login(process.env.TOKEN);
