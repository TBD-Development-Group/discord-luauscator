const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const obfuscate = require('./obfuscator.js');  // your core obfuscator function

const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'obfuscate') {
    if (args.length === 0) {
      return message.reply('Please provide Lua code to obfuscate. Usage: `!obfuscate <code>`');
    }

    // Combine rest of args as Lua code
    const luaCode = args.join(' ');

    try {
      const obfuscated = obfuscate(luaCode);
      // Discord message limit is 2000 chars, so truncate or send as file if too big
      if (obfuscated.length > 1900) {
        return message.reply({
          files: [{ attachment: Buffer.from(obfuscated, 'utf-8'), name: 'obfuscated.lua' }]
        });
      } else {
        return message.reply(`\`\`\`lua\n${obfuscated}\n\`\`\``);
      }
    } catch (err) {
      console.error(err);
      return message.reply('Failed to obfuscate the Lua code.');
    }
  }
});

client.login(config.token);
