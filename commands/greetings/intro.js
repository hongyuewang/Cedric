const { Command } = require('discord.js-commando');

module.exports = class IntroCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'intro',
            aliases: ['introduction'],
            group: 'greetings',
            memberName: 'intro',
            description: "Cédric's introduction."
        });
    }

    run(message) {
        return message.say("Salut moi c'est Cédric et je travaille au Rona!");
    }
};
