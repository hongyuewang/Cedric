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
        var questionsAsked = 0;

        // Starts the quiz
        play();

        function play() {
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
                    message.channel.send(`Heille, ${collected.first().author}, t'as eu la bonne réponse! T'es smart!`);
                    message.channel.send(`La réponse était: **${item.answers[0]}**.`);
                    if (item.alternativeAnswer != undefined) {
                        message.channel.send(`**${item.alternativeAnswer}** était aussi acceptable.`);
                    }

                    questionsAsked++;

                    if ( questionsAsked < quiz.length) {
                        play();
                    } else {
                        message.channel.send("Bin kin, c'était une bonne game les gars! Je vous félicite pour vos connaissances sur le Québec!");
                    }
                })
                .catch(collected => {
                    message.channel.send(`Ça a l'air que personne a eu la bonne réponse... Come on, vous aimez pas le Québec...`);
                    message.channel.send(`La réponse était: **${item.answers[0]}**.`);
                    if (item.alternativeAnswer != undefined) {
                        message.channel.send(`**${item.alternativeAnswer}** était aussi acceptable.`);
                    }

                    questionsAsked++;

                    if (questionsAsked < quiz.length) {
                        play();
                    } else {
                        message.channel.send("Bin kin, c'était une bonne game les gars! Je vous félicite pour vos connaissances sur le Québec!");
                        message.channel.send("Voici le leaderboard de cette partie. Ou plutôt le tableau de classement parce que je suis québécois.");
                    }
                });
            });
        }
    }
}
