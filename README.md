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
