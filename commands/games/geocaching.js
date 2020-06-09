const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

isActiveGeocaching = false;

module.exports = class Geocaching extends Command {
    constructor(bot) {
        super(bot, {
            name: 'geocaching',
            aliases: ['geocache', 'geo', 'gc'],
            group: 'games',
            memberName: 'geocaching',
            description: `A 'Choose-Your-Own-Adventure' style game featuring Cédric as the protagonist.`
        });
    }

    async run(message) {
        this.client.dispatcher.addInhibitor(() => {
            return isActiveGeocaching;
        });

        isActiveGeocaching = true;
    }
}
