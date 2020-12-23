const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const quiz = require("./quiz-questions.json");

class Player {
  constructor(username) {
    this._username = username;
    this._score = 0;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
  }

  get score() {
    return this._score;
  }

  set score(newScore) {
    this._score = newScore;
  }

  addPoint() {
    this._score += 1;
  }
}

isActiveQuiz = false;

module.exports = class Quiz extends (
  Command
) {
  constructor(bot) {
    super(bot, {
      name: "quiz",
      group: "games",
      memberName: "quiz",
      description: "A quiz about various Quebecer things.",
    });
  }

  async run(message) {
    try {
      this.client.dispatcher.addInhibitor(() => {
        return isActiveQuiz;
      });

      isActiveQuiz = true;

      var questionsAsked = 0;
      let playerArray = [];

      // Starts the quiz
      message.channel.send(`**Bienvenue à mon quiz!!!**`);
      message.channel.send(
        "**Vous avez 30 secondes pour répondre à chaque question!**"
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      play();

      function play() {
        var randomIndex = Math.floor(Math.random() * quiz.length);
        var item;

        while (quiz[randomIndex].question == undefined) {
          randomIndex = Math.floor(Math.random() * quiz.length);
        }
        item = quiz[randomIndex];

        const filter = (response) => {
          return item.answers.some(
            (answer) => answer.toLowerCase() === response.content.toLowerCase()
          );
        };

        const allMessagesFilter = (m) => m.author.id != "708042232292180011";

        const allCollector = message.channel.createMessageCollector(
          allMessagesFilter,
          { time: 150000 }
        ); // CHANGE AT THE SAME TIME AS QUIZ LENGTH

        allCollector.on("collect", (m) => {
          console.log(`Collected ${m.content}`);
          if (
            playerArray.find((obj) => obj.username == m.author.username) ==
            undefined
          ) {
            playerArray.push(new Player(m.author.username));
            console.log("New Player!");
            console.log(playerArray);
          } else {
            console.log("Current Players:");
            console.log(playerArray);
          }
        });

        message.channel.send(item.question).then(() => {
          if (item.image != undefined) {
            const embed = new Discord.MessageEmbed().setImage(item.image);
            message.channel.send(embed);
          }
          message.channel
            .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
            .then((collected) => {
              message.channel.send(
                `Heille, ${
                  collected.first().author
                }, t'as eu la bonne réponse! T'es smart!`
              );
              message.channel.send(`La réponse était: **${item.answers[0]}**.`);
              if (item.alternativeAnswer != undefined) {
                message.channel.send(
                  `**${item.alternativeAnswer}** était aussi acceptable.`
                );
              }
              let roundWinner = playerArray.find(
                (obj) => obj.username == collected.first().author.username
              );
              roundWinner.addPoint();
              questionsAsked++;
              console.log(questionsAsked);

              if (questionsAsked < 5) {
                play();
              } else {
                message.channel.send(
                  "Bin kin, c'était une bonne game les gars! Je vous félicite pour vos connaissances sur le Québec!"
                );
                message.channel.send(
                  "Voici le leaderboard de cette partie. Ou plutôt le tableau de classement parce que je suis québécois."
                );
                message.channel.send("**TABLEAU DE CLASSEMENT**");
                for (var player of playerArray) {
                  message.channel.send(
                    `**${player.username}**: ${player.score} points`
                  );
                }
                isActiveQuiz = false;
              }
            })
            .catch((collected) => {
              message.channel.send(
                `Ça a l'air que personne a eu la bonne réponse... Come on, vous aimez pas le Québec...`
              );
              message.channel.send(`La réponse était: **${item.answers[0]}**.`);
              if (item.alternativeAnswer != undefined) {
                message.channel.send(
                  `**${item.alternativeAnswer}** était aussi acceptable.`
                );
              }

              questionsAsked++;

              if (questionsAsked < 5) {
                play();
              } else {
                message.channel.send(
                  "Bin kin, c'était une bonne game les gars! Je vous félicite pour vos connaissances sur le Québec!"
                );
                message.channel.send(
                  "Voici le leaderboard de cette partie. Ou plutôt le tableau de classement parce que je suis québécois."
                );
                message.channel.send("**TABLEAU DE CLASSEMENT**");
                for (var player of playerArray) {
                  message.channel.send(
                    `**${player.username}**: ${player.score} points`
                  );
                }
                isActiveQuiz = false;
              }
            });
        });
        delete quiz[randomIndex];
      }
    } catch (error) {
      console.log(error);
    }
  }
};
