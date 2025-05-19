const { Client, GatewayIntentBits, Events, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { obfuscate } = require('./obfuscator');

// Promisify fs functions
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);

// Load config
let config;
try {
  config = require('./config.json');
} catch (err) {
  config = {
    token: process.env.BOT_TOKEN || 'YOUR_DISCORD_BOT_TOKEN',
    prefix: process.env.PREFIX || '!'
  };
}

// Create a new client instance with necessary intents
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

// Configuration
const tempDir = path.join(__dirname, 'temp');

// Ensure temp directory exists
async function ensureTempDir() {
  try {
    await fs.promises.access(tempDir);
  } catch (error) {
    await mkdirAsync(tempDir, { recursive: true });
    console.log('Created temp directory');
  }
}

// Bot command handler
client.on(Events.MessageCreate, async message => {
  // Ignore messages from bots
  if (message.author.bot) return;
  
  // Handle commands
  if (message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    // Help command
    if (command === 'help') {
      const embed = new EmbedBuilder()
        .setTitle('Luauscator Discord Bot')
        .setDescription('Upload a Luau script and use the commands below to obfuscate it.')
        .addFields(
          { name: '!obfuscate', value: 'Obfuscate an attached Luau file', inline: true },
          { name: '!help', value: 'Show this help message', inline: true }
        )
        .setColor('#5865F2')
        .setFooter({ text: 'Made with Luauscator' });
      
      message.reply({ embeds: [embed] });
    }
    
    // Obfuscate command
    else if (command === 'obfuscate') {
      // Check for file attachment
      const attachment = message.attachments.first();
      if (!attachment) {
        return message.reply('Please attach a Luau file to obfuscate!');
      }
      
      // Check file extension
      const fileExt = path.extname(attachment.name).toLowerCase();
      if (!['.lua', '.luau'].includes(fileExt)) {
        return message.reply('Please attach a valid Lua/Luau file (.lua or .luau)!');
      }
      
      try {
        // Ensure temp directory exists
        await ensureTempDir();
        
        // Send a processing message
        const processingMsg = await message.reply('Processing your script...');
        
        // Download the attachment
        const inputPath = path.join(tempDir, `input_${Date.now()}${fileExt}`);
        const outputPath = path.join(tempDir, `obfuscated_${Date.now()}.luau`);
        
        // Download file
        const response = await fetch(attachment.url);
        const fileBuffer = await response.arrayBuffer();
        await writeFileAsync(inputPath, Buffer.from(fileBuffer));
        
        // Obfuscate the script
        await obfuscate(inputPath, outputPath);
        
        // Send the obfuscated file
        const obfuscatedAttachment = new AttachmentBuilder(outputPath, { name: 'obfuscated.luau' });
        
        const embed = new EmbedBuilder()
          .setTitle('Obfuscation Complete')
          .setDescription('Your script has been successfully obfuscated!')
          .setColor('#00FF00')
          .addFields(
            { name: 'Original Size', value: `${(attachment.size / 1024).toFixed(2)} KB`, inline: true },
            { name: 'Obfuscated Size', value: `${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`, inline: true }
          )
          .setTimestamp();
        
        await message.reply({ 
          embeds: [embed],
          files: [obfuscatedAttachment] 
        });
        
        // Clean up temp files
        await Promise.all([
          unlinkAsync(inputPath).catch(() => {}),
          unlinkAsync(outputPath).catch(() => {})
        ]);
        
        // Update processing message
        await processingMsg.delete().catch(() => {});
      } catch (error) {
        console.error('Error processing file:', error);
        message.reply(`Error processing your script: ${error.message}`);
      }
    }
  }
});

// Bot ready event
client.once(Events.ClientReady, async c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  await ensureTempDir();
});

// Error handling
client.on(Events.Error, error => {
  console.error('Discord client error:', error);
});

// Login to Discord
client.login(config.token).catch(error => {
  console.error('Failed to log in to Discord:', error);
  process.exit(1);
});

// Clean up temp files on shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  try {
    // Clean up the temp directory
    const files = await fs.promises.readdir(tempDir);
    await Promise.all(files.map(file => 
      unlinkAsync(path.join(tempDir, file)).catch(() => {})
    ));
    console.log('Cleaned up temp files');
  } catch (error) {
    console.error('Error cleaning up:', error);
  }
  process.exit(0);
});
