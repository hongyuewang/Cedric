const { Command } = require('discord.js-commando');
const funfacts = require('./funfacts.json');

module.exports = class Fact extends Command {
    constructor(bot) {
        super(bot, {
            name: 'fact',
            aliases: ['fait', 'funfact'],
            group: 'text',
            memberName: 'fact',
            description: 'Spits out a fun fact...in french, of course.'
        });
    }

    async run(message) {
        message.say("Tu veux connaître un fait intéressant?");
		await new Promise(resolve => setTimeout(resolve, 2000)); // set a pause of 2 seconds
        let randomNumber = Math.floor(Math.random() * funfacts.fact.length );
        message.say(funfacts.fact[randomNumber]);
    }
}
