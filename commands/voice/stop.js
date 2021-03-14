const { Command } = require("discord.js-commando");

module.exports = class Stop extends Command {
  constructor(bot) {
    super(bot, {
      name: "stop",
      aliases: ["stopaudio"],
      group: "voice",
      memberName: "stop",
      description: "Stops audio",
    });
  }

  async run(message) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      message.reply("Yooo Il faut que tu sois dans un voice channel!");
      return;
    }

    voiceChannel.leave();
    return;
  }
};
