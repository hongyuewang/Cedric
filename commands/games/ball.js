const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class Ball extends (
  Command
) {
  constructor(bot) {
    super(bot, {
      name: "ball",
      aliases: ["basketball", "basket"],
      group: "games",
      memberName: "ball",
      description: "A fun basketball game with Cédric.",
    });
  }

  async run(message) {
      let choice;
      const embedStart = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle("Cédric est en possession du ballon.")
        .setDescription("Va-t-il faire une passe ou tirer?")
        .attachFiles(["./commands/games/ball-img/basketball.jpg"])
        .setImage("attachment://basketball.jpg");

      const embedPass = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle("Cédric vous passe la balle.")
        .setDescription('"Vas-y, fais un point! Comme à la NBA!"')
        .attachFiles(["./commands/games/ball-img/cedric_pass.jpg"])
        .setImage("attachment://cedric_pass.jpg");

      const embedNoStimuli = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle("Cédric ne répond pas aux stimuli.")
        .setDescription("... La game est finie.")
        .attachFiles(["./commands/games/ball-img/basketball.jpg"])
        .setImage("attachment://basketball.jpg");

      const embedCedricShot = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle(
          "Cédric lance le ballon vers le panier, espérant faire un point."
        )
        .setDescription('"Yooooo, check la balle aller!"')
        .attachFiles(["./commands/games/ball-img/cedric_shot.gif"])
        .setImage("attachment://cedric_shot.gif");

      const embedUserShot = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle("Vous faites un lancer. Cédric vous encourage.")
        .setDescription(`"Let's go t'es capable!"`)
        .attachFiles(["./commands/games/ball-img/user_shot.gif"])
        .setImage("attachment://user_shot.gif");

      const embedCedricPoint = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle("Cédric marque un point.")
        .setDescription(
          `"Oh ça c'était un bon lancer! Je suis fier de mon coup!"`
        )
        .attachFiles(["./commands/games/ball-img/cedric_point.gif"])
        .setImage("attachment://cedric_point.gif");

      const embedCedricMiss = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle("Cédric manque le panier.")
        .setDescription(`"It's *hokay*, je l'aurai la prochaine fois."`)
        .attachFiles(["./commands/games/ball-img/cedric_miss.gif"])
        .setImage("attachment://cedric_miss.gif");

      const embedUserPoint = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle("Vous marquez un point.")
        .setDescription(
          `"Heille bravo ${message.author.username}. C'était vraiment beau ça."`
        )
        .attachFiles(["./commands/games/ball-img/user_point.gif"])
        .setImage("attachment://user_point.gif");

      const embedUserMiss = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          message.author.username,
          message.author.avatarURL({ format: "jpg" })
        )
        .setTitle("Vous manquez le panier.")
        .setDescription(`"Come on ${message.author.username}, t'es poche!"`)
        .attachFiles(["./commands/games/ball-img/user_miss.gif"])
        .setImage("attachment://user_miss.gif");

      message.say("Le basket? Ye je suis down de jouer.");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // set a pause of 2 seconds
      message.channel.send(embedStart);

      const passOrShoot = [
        "pass",
        "pass",
        "pass",
        "pass",
        "shoot",
        "shoot",
        "shoot",
        "shoot",
        "noStimuli",
        "noStimuli",
      ];
      const hitOrMiss = ["hit", "miss", "hit", "miss", "miss"];
      choice = Math.floor(Math.random() * passOrShoot.length);

      if (passOrShoot[choice] === "pass") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        message.channel.send(embedPass);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        message.channel.send(embedUserShot);
        choice = Math.floor(Math.random() * hitOrMiss.length);
        if (hitOrMiss[choice] === "hit") {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          message.channel.send(embedUserPoint);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          message.channel.send(embedUserMiss);
        }
      } else if (passOrShoot[choice] === "shoot") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        message.channel.send(embedCedricShot);
        choice = Math.floor(Math.random() * hitOrMiss.length);
        if (hitOrMiss[choice] === "hit") {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          message.channel.send(embedCedricPoint);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          message.channel.send(embedCedricMiss);
        }
      } else if (passOrShoot[choice] === "noStimuli") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        message.channel.send(embedNoStimuli);
      } else {
        return;
      }

      choice = null;
  }
};
