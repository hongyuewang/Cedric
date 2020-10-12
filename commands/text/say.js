const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class Say extends Command {
  constructor(bot) {
    super(bot, {
      name: "say",
      aliases: [],
      group: "text",
      memberName: "say",
      description: "Cédric repeats anything you say.",
      args: [
        {
          key: "text",
          prompt: "Yooooo, qu'est-ce que tu veux que je répète?",
          type: "string",
          default: "Bin kin, qu'est-ce que tu veux que je dise!!!",
        },
      ],
    });
  }

  run(message, { text }) {
    message.channel.send(text);
    message.delete();
  }
};
