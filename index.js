# discord-bot
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  const createChannelId = "ID_CREATE_CHANNEL"; // канал "create"
  const categoryId = "ID_CATEGORY"; // твоя voice категорія

  // коли заходиш в create канал
  if (newState.channelId === createChannelId) {
    const channel = await newState.guild.channels.create({
      name: `🔊 ${newState.member.user.username}`,
      type: 2, // voice channel
      parent: categoryId,
    });

    // переносимо користувача
    newState.setChannel(channel);
  }

  // якщо канал пустий — видаляємо
  if (oldState.channel && oldState.channel.members.size === 0) {
    oldState.channel.delete().catch(() => {});
  }
});

client.login(process.env.TOKEN);
