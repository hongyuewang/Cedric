const { Command } = require("discord.js-commando");
const fs = require("fs");
const ytdl = require("ytdl-core");

module.exports = class Play extends Command {
  constructor(bot) {
    super(bot, {
      name: "play",
      aliases: ["playaudio"],
      group: "voice",
      memberName: "play",
      description: "Plays audio.",
      arg: [
        {
          key: "titleOrLink",
          prompt: "Bin kin, tu dois me dire de jouer quelque chose!",
          type: "string",
          default: "Bin kin, tu dois me dire de jouer quelque chose!",
        },
      ],
    });
  }

  async run(message, titleOrLink) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      message.reply("Yooo Il faut que tu sois dans un voice channel!");
      return;
    }

    try {
      var connection = await voiceChannel.join();
      const dispatcher = connection
        .play(ytdl(titleOrLink).pipe(fs.createWriteStream('video.flv')))////WTFFFFFFF
        .on("finish", () => {
          voiceChannel.leave();
        })
        .on("error", (error) => {
          console.log(`There was an error playing the audio file: ${error}`);
          message.channel.send(`Il y a eu une erreur haha! ${error}`);
        });
      dispatcher.setVolumeLogarithmic(5 / 5);
    } catch (error) {
      console.log(
        `There was an error connecting to the voice channel: ${error}`
      );
      message.channel.send(`Je peux pas me connecter... Check ça: ${error}`);
    }
  }
};
