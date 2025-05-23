require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const obfuscator = require('./obfuscator');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'obfuscate') {
    // Check for code block
    const codeBlock = message.content.match(/```(?:lua)?\n([\s\S]*?)```/);
    
    if (!codeBlock) {
      return message.reply('Please provide Lua code in a code block:\n\\`\\`\\`lua\n-- your code here\n\\`\\`\\`');
    }

    const luaCode = codeBlock[1];
    
    try {
      // Show "typing" indicator
      await message.channel.sendTyping();
      
      // Obfuscate the code
      const obfuscated = obfuscator(luaCode, config);
      
      // Create embed
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('Lua Obfuscator')
        .setDescription('Here\'s your obfuscated code:')
        .addFields(
          { name: 'Original Length', value: `${luaCode.length} characters`, inline: true },
          { name: 'Obfuscated Length', value: `${obfuscated.length} characters`, inline: true }
        )
        .setTimestamp();
      
      // Send the obfuscated code in a file attachment if it's too long
      if (obfuscated.length > 1500) {
        const buffer = Buffer.from(obfuscated, 'utf8');
        return message.reply({
          embeds: [embed],
          files: [{
            attachment: buffer,
            name: 'obfuscated.lua'
          }]
        });
      } else {
        embed.addFields({
          name: 'Obfuscated Code',
          value: `\`\`\`lua\n${obfuscated}\n\`\`\``
        });
        return message.reply({ embeds: [embed] });
      }
    } catch (err) {
      console.error(err);
      return message.reply(`An error occurred while obfuscating:\n\`${err.message}\``);
    }
  }

  if (command === 'obfuscate-help') {
    const helpEmbed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('Lua Obfuscator Help')
      .setDescription('Obfuscate your Lua code to protect it from prying eyes!')
      .addFields(
        { name: 'Usage', value: '```!obfuscate\n```lua\n-- your code here\n```\n```' },
        { name: 'Features', value: '- Variable renaming\n- String encoding\n- Number encoding\n- Junk code insertion\n- Built-in function aliasing' },
        { name: 'Config', value: 'Modify `config.json` to change obfuscation settings' }
      );
    return message.reply({ embeds: [helpEmbed] });
  }
});

client.login(process.env.TOKEN);
