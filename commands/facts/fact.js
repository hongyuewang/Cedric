const { Command } = require('discord.js-commando');
const funfacts = require('./funfacts.json');

module.exports = class Fact extends Command {
    constructor(bot) {
        super(bot, {
            name: 'fact',
            aliases: ['fait', 'funfact'],
            group: 'facts',
            memberName: 'fact',
            description: 'Spits out a fun fact...in french, of course.'
        });
    }

    run(message) {
        let randomNumber = Math.floor(Math.random() * funfacts.fact.length );
        message.say(funfacts.fact[randomNumber]);
    }
}
