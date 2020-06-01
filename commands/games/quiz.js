const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const quiz = require('./quiz-questions.json');

module.exports = class Quiz extends Command {
    constructor(bot) {
        super(bot, {
            name: 'quiz',
            group: 'games',
            memberName: 'quiz',
            description: 'A quiz about various Quebecer things.'
        });
    }

    async run(message) {
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() ===
            response.content.toLowerCase());
        };

        message.channel.send(item.question).then(() => {
            if (item.image != undefined) {
                const embed = new Discord.MessageEmbed().setImage(item.image);
                message.channel.send(embed);
            }
            message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
            .then(collected => {
                message.channel.send(`Heille, ${collected.first().author} a eu la bonne réponse! Wow t'es smart!`);
            })
            .catch(collected => {
                message.channel.send(`Ça a l'air que personne a eu la bonne réponse... Come on, vous aimez pas le Québec...`);
            });
        });
    }
}
