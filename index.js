const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

let awayMessage = "I'm busy, leave me alone!";
let autoReply = false;

const cooldowns = new Map();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.id !== client.user.id && message.channel.type !== 'DM') return;
  if (message.content === '!busy' && message.author.id === client.user.id) {
    const sentMsg = await message.channel.send('Busy Mode Activated');
    setTimeout(() => sentMsg.delete().catch(() => {}), 5000);
    autoReply = true;
    console.log('Busy mode enabled');
    return;
  }

  if (message.content === '!available' && message.author.id === client.user.id) {
    const sentMsg = await message.channel.send('Busy Mode Deactivated');
    setTimeout(() => sentMsg.delete().catch(() => {}), 5000);
    autoReply = false;
    console.log('Busy mode disabled');
    return;
  }

  if (message.content.startsWith('!changemsg ') && message.author.id === client.user.id) {
    awayMessage = message.content.slice('!changemsg '.length);
    console.log(`The away message is now: "${awayMessage}"`);
    return;
  }

  if (autoReply && message.channel.type === 'DM' && message.author.id !== client.user.id) {
    const now = Date.now();
    const cooldownAmount = 10 * 60 * 1000;
    const lastSent = cooldowns.get(message.author.id);

    if (!lastSent || now - lastSent > cooldownAmount) {
      try {
        await message.channel.send(awayMessage);
        cooldowns.set(message.author.id, now);
        console.log(`Message sent to ${message.author.tag}`);
      } catch (err) {
        console.error('Error sending message:', err);
      }
    } else {
      console.log(`10-minute cooldown for ${message.author.tag}`);
    }
  }
});

client.login("TOKEN");


// 

// ### **How to Use This Script And What Does It do ?**

// 1. **Requirements**:

//   * Node.js installed (v16+ recommended)
//   * `discord.js-selfbot-v13` installed via `npm install discord.js-selfbot-v13`

// 2. **Setup**:

//   * Replace `TOKEN` with your Discord token. **Be careful:** using selfbots is against Discord's ToS. 

// 3. **Commands**:

//   * `!busy` → Activates busy mode. The bot will automatically reply to incoming DMs.
//   * `!available` → Deactivates busy mode. Auto-replies stop.
//   * `!changemsg <your message>` → Changes the auto-reply message.

// 4. **Behavior**:

//   * Auto-replies are sent only to DMs when busy mode is active.
//   * A 10-minute cooldown prevents sending multiple auto-replies to the same user.

// 5. **Logs**:

//   * The console shows when busy mode is enabled/disabled, messages are sent, or cooldowns are active.
