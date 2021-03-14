const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = class Play extends Command {
  constructor(bot) {
    super(bot, {
      name: "play",
      aliases: ["playaudio"],
      group: "voice",
      memberName: "play",
      description: "Plays audio.",
      /*
      arg: [
        {
          key: "titleOrLink",
          prompt: "Bin kin, tu dois me dire de jouer quelque chose!",
          type: "string",
          default: "Bin kin, tu dois me dire de jouer quelque chose!",
        },
      ],*/
    });
  }

  async run(message /*, titleOrLink*/) {
    /*
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
``*/
try {
  const args = message.content.split(" ");
  const queue = this.client.queue;
  const serverQueue = this.client.queue.get(message.guild.id);

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(this.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      this.play(message, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(
      `${song.title} has been added to the queue!`
    );
  }
} catch (error) {
  console.log(error);
  message.channel.send(error.message);
}
  
};

play(message, song) {
  const queue = this.client.queue;
  const guild = message.guild;
  const serverQueue = queue.get(message.guild.id);
  
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      this.play(message, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
    }
  };