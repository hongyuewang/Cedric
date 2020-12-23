const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class Chonky extends (
  Command
) {
  constructor(bot) {
    super(bot, {
      name: "chonky",
      aliases: ["chonk", "seal"],
      group: "text",
      memberName: "chonky",
      description: "Cédric tells you about a great pillow.",
    });
  }

  async run(message) {
      message.channel.send(
        "https://plushiesandco.com/products/angry-seal-pillow"
      );
      message.channel.send("J’achète direct!");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      message.channel.send(
        "Avec l’argent que t’as eu pour ta fête, achète" +
          "-toi un chonky seal pour avoir le meilleur réconfort! Comme dirait" +
          " le site : **Kinda fat, Kinda mad. The Absolute Unit!**"
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      message.channel.send(
        "Je suis tombé sur ça parce que ya du marketing très utile sur facebook."
      );
      message.channel
        .send({
          files: [
            {
              attachment: "./commands/text/chonky-img/cedric-with-chonky.png",
              name: "cedric-with-chonky.png",
            },
          ],
        })
        .then(console.log)
        .catch(console.error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.channel.send("Voici mon chonky seal de 60 cm!");
  }
};
