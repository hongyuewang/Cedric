const keepAlive = require("./server");
var moment = require("moment-timezone");
const Discord = require("discord.js");
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const activity = require("./json/activity/activity.json");
const { EventEmitter } = require("events");

const bot = new CommandoClient({
  commandPrefix: "ced!",
  owner: "306624719338209282",
});

bot.setMaxListeners(25);

// Registering command groups
bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ["text", "Text"],
    ["games", "Games"],
    ["admin", "Admin"],
    ["voice", "Voice"],
  ])
  .registerCommandsIn(path.join(__dirname, "commands"));

// Login
require("dotenv").config();
keepAlive();
const token = process.env.TOKEN;
bot.login(token);

bot.once("ready", () => {
  var guildID;
  var greetingGuild;
  var greetingChannel;
  var localTime;

  console.log("Ready!");

  setInterval(() => {
    for (guildID of bot.guilds.cache.keyArray()) {
      greetingGuild = bot.guilds.cache.get(guildID);
      greetingChannel = greetingGuild.channels.cache.find(
        (channel) => channel.name === "general"
      );
      localTime = moment().tz("America/Toronto");

      if (localTime.hour() == 09 && localTime.minutes() == 00) {
        greetingChannel.send("Bon matin ma bande de *heggrolls*!");
      }
      if (localTime.hour() == 23 && localTime.minutes() == 30) {
        greetingChannel.send("Bonne nuit mes *heggrolls*");
      }

      if (localTime.hour() == 16 && localTime.minutes() == 20) {
        greetingChannel.send("Haha il est 4:20");
      }
    }
  }, 57500);

  var randomNumber = Math.floor(Math.random() * activity.length);
  bot.user
    .setActivity(activity[randomNumber].name, {
      type: activity[randomNumber].type,
    })
    .then((presence) =>
      console.log(`Activity set to ${presence.activities[0].name}`)
    )
    .catch(console.error);

  setInterval(() => {
    randomNumber = Math.floor(Math.random() * activity.length);
    bot.user
      .setActivity(activity[randomNumber].name, {
        type: activity[randomNumber].type,
      })
      .then((presence) =>
        console.log(`Activity set to ${presence.activities[0].name}`)
      )
      .catch(console.error);
  }, 300000);
});

bot.on("message", (message) => {
  console.log(message.content);
  var localTime = moment().tz("America/Toronto");
  console.log(
    localTime.hour() + ":" + localTime.minutes() + ":" + localTime.seconds()
  );
});

// Overlord Command
bot.on("message", (message) => {
  if (
    message.content.toLowerCase() == "ced!overlord" ||
    message.content.toLowerCase() == "ced!kill"
  ) {
    message.channel.send("Restarting...");
    process.exit();
  }
});

// Keyword Commands

// The Ping Command: Cédric replies with a bad pun about ping pong whenever a message contains the word 'ping'.
bot.on("message", (message) => {
  if (message.content.toLowerCase().includes("ping")) {
    if (message.author.id === bot.user.id) return;
    message.reply(
      "Tu veux savoir ton ping? Un peu comme le ping pong? HAHAHA PING PONG COMME LE SPORT."
    );
  }
});

// The Quebec Command: Cédric talks about the province of Quebec whenever someone in the server mentions it.
bot.on("message", async (message) => {
  let randomNumber;
  const quebecReplies = [
    "Le Québec c'est un pays!", // 0
    "Si on me donnait 1 million pour haïr le Québec, je le ferais jamais!",

    "Le Québec *his* my *ome*. Bin kin, comme mon *ome* dans Minecraft!",

    "Au Québec, on est une nation. On a notre propre identité au Québec. " +
      "On est différent du reste du Canada. On a notre propre culture. Une " +
      "super belle culture. On a la Saint-Jean, des usines québécoises. " +
      "On a de la bonne bière. Genre en revenant de la job, je prends souvent de l'Unibroue ou de l'Archibald. C'est super bon. Au " +
      "Vieux-Hull, il y a des bonnes brasseries.",

    "On a des super belles entreprises au Québec (des PME). Si on " +
      "investissait plus dans les PME, l'économie serait bien stimulée " +
      "dans la belle province. Je pense même que ça va même favoriser " +
      "le nombre d'emplois parce que les entreprises auront " +
      "tellement d'argent qu'ils pourront embaucher plus de monde. " +
      "À moment donné, je suis allé au Mont-Tremblant avec mes " +
      "grand-parents et il y avait un petit magasin local, je m'en " +
      "rappelle plus du nom. Ah oui, le marché Bourassa. C'était super nice.",

    "Le drapeau du Québec il est super beau, super attirant. Un drapeau " +
      "pas trop compliqué et ça rend fier parce que ça a été fait dans " +
      "un temps où le nationalisme commençait à grandir parce que c'était " +
      "juste avant les élections de Maurice Duplessis. Et on le voit à " +
      "la Saint-Jean. Comme j'en ai acheté un pour le after au Dollarama " +
      "pour 3 piasses. Et c'est juste nice de courir avec ça sur ton " +
      "dos là. T'as le Québec en toi.",

    "Tsé c'est pas pour rien qu'on est toujours en conflit avec les anglophones. Ça va jamais partir. " + // 6
      "Même quand Pierre Elliot Trudeau a refait la constitution, ça a fait un genre de scandale parce que " +
      "ça mettait les québécois en minorité.",
    "On a eu des super bons leaders québécois dans le temps du nationalisme. C'est dommage qu'on en a plus " + // 7
      "aujourd'hui. Des super bons leaders comme René Lévesque, Robert Bourassa, Jean Lesage... Et aujourd'hui... " +
      "Mais François Legault il fait exception parce qu'il est nationaliste. Mais je pense que la rébellion avec " +
      "Louis-Joseph Papineau, ça c'était le moment le plus québécois.",
    "Nous autres au Québec on a des super bons joueurs de hockey. Mais" +
      " malheuresement, la majorité du Canada est anglophone alors l'équipe" +
      " de hockey du Canada a pas tant de joueurs québécois, tsé parce que" +
      " c'est le Canada au complet. Comme au championnat du monde, on a" +
      " perdu contre les Russes 6-0 parce qu'ils ont pas bien choisi les" +
      " joueurs.",
    "Les Simpsons je trouve que j'aime plus la voix de Homer Simpson en québécois qu'en anglais parce que je trouve qu'il rentre plus dans le personnage d'un père québécois épais. En anglais on dirait qu'il essaie trop d'être cave.",
  ];

  if (
    message.content.toLowerCase().includes("quebec") ||
    message.content.toLowerCase().includes("québec") ||
    message.content.toLowerCase().includes("québécois")
  ) {
    if (message.author.id === bot.user.id) return;
    if (
      (message.content.toLowerCase().includes("pas") &&
        message.content.toLowerCase().includes("pays")) === false
    ) {
      message.channel.send("Le Québec?");
      // set a pause of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // returns a random number between 0 and 9
      randomNumber = Math.floor(Math.random() * quebecReplies.length);
      message.channel.send(quebecReplies[randomNumber]);
    }
  }
});

// The Anti-Quebec Command: Cédric responds to whoever suggests that Quebec is not a country.
bot.on("message", async (message) => {
  if (
    (message.content.toLowerCase().includes("quebec") ||
      message.content.toLowerCase().includes("québec")) &&
    message.content.toLowerCase().includes("pas") &&
    message.content.toLowerCase().includes("pays")
  ) {
    if (message.author.id === bot.user.id) return;
    message.channel.send("Tu dis que le Québec c'est pas un pays?");
    // set a pause of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    message.channel.send(
      "Techniquement t'as raison là, mais ça devrait l'être."
    );
    // set a pause of 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Légalement c'est pas un pays, mais légitimement ça devrait l'être. " +
        "Le Québec c'est plutôt une nation."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000)); // set a pause of 10 seconds
    message.channel.send(
      "Mais tsé, Maurice Richard était un précurseur " +
        "du Québec dans le temps de la Grande Noirceur."
    );
    // set a pause of 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Ben c'était du nationalisme aussi, mais " +
        "ça motivait pas tant là. T'étais pas vraiment comfortable."
    );
    // set a pause of 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Mais là il faut pas encourager les compagnies américaines au Québec. " +
        "Tu les encourages seulement si c'est de la qualité. "
    );
    // set a pause of 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Sinon tu devrais encourager les petites compagnies locales."
    );
  }
});

/* The Cool Hwhip Command: Cédric talks about Cool Hwip and Family Guy whenever
the word 'cool' is present in a message. */

bot.on("message", async (message) => {
  if (message.content.toLowerCase().includes("cool")) {
    if (message.author.id === bot.user.id) return;
    message.channel.send("Cool? Comme la cool hwip?");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    message.channel.send("Moi j’aime d’la cool hwhip, hahahahahaha!");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Cool whip, c’est pas nice à dire. T'as juste les" +
        " américains qui disent cool whip, pis ben ça fait vraiment" +
        " américain. C’est du cool hwhip! Genre d’la bonne crème fouettée" +
        " qu’on prend sur notre gâteau quand on est jeune."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Moi j'en ai mangé beaucoup de cool hwhip." +
        " Mettons, tu peux pas avoir une tarte sans cool hwhip."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "C’est pour ça que j’aime Family Guy, ça l’amène" +
        " des choses qui sont random mais tu ris pareil! C’est américain" +
        " mais, je sais pas là, j’aime ça!"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "McFarlane c’est pas un républicain, c’est un" +
        " démocrate, so c’est chill! C’est pas genre le gros américain" +
        " capitaliste sauvage."
    );
  }
});

/* The Generation Command: Cédric talks about Gen-Z*/
bot.on("message", async (message) => {
  if (message.content.toLowerCase().replace(/é/g, "e").includes("generation")) {
    if (message.author.id === bot.user.id) return;
    message.channel.send("Les générations?");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    message.channel.send("Ye les personnes âgés n’aiment pas les jeunes");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    message.channel.send("C’est une génération chialeuse");
    await new Promise((resolve) => setTimeout(resolve, 8000));
    message.channel.send(
      "Jme demande si on sera de même plus tard. J’espère que non 🤞"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Mais avec l’immigration, la naissance de " +
        "d’autres parties politiques et plusieurs facteurs, nous " +
        "semblons être une génération plus tolérante"
    );
    await new Promise((resolve) => setTimeout(resolve, 8000));
    message.channel.send(
      "C’est juste qui faut pas trop se radicalisé " +
        "vers la gauche et ça sera all good"
    );
    await new Promise((resolve) => setTimeout(resolve, 9000));
    message.channel.send(
      "Je sais.. Mon sujet de conversation n’a " +
        "aucun rapport avec le principe de la convo mais bon"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Comme je l’ai dis plus tôt, la génération " +
        "Z semble être une génération plus tolérante que les boomers du premier regard."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Cela est en effet des facts puisque la " +
        "tolérance et le jugement de la plupart des individus de notre " +
        "génération demeure assez modéré contrairement à ceux qui sont d’âge d’or."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Regardez mon patron par exemple. Lorsqu’il " +
        "voit deux homosexuels dans un magasin, il est super étonné de " +
        "la première vue. Il dit tout doucement « eh tabarnak.. »."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Cependant, je ne peux point me baser " +
        "là-dessus, car mes propos sont stéréotypés. Alors, allons cette " +
        "fois-ci dans les réseaux sociaux pour se baser sur le jugement " +
        "des personnes âgées vu que c’est une excellence source pour " +
        "arriver à des résultats concrets."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Ceux-ci se lamente beaucoup au sujet des " +
        "personnalités publiques que ce soit dans le monde de la " +
        "politique, du divertissement, etc."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "L’attaque personnelle est une arme qui est " +
        "très utilisée par les personnes au-dessus de 65 ans et cela a " +
        "crée le meme du « ok boomer » qui a malheureusement été " +
        "surutilisé par la génération Z et même critiqué par le monde de la génération X."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Le monde de la génération Y semble neutre à " +
        " se sujet. Bref... (suite de mon analyse dans les prochaines " +
        " au sujet de la génération Z"
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    message.channel.send("Les prochains temps*");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Et en ajoutant une source, le réseau sociaux " +
        "que je me réfère davantage est bien évidemment facebook"
    );
  }
});

// The Dhar Mann Command: Cédric talks about Dhar Mann and sitcoms
bot.on("message", async (message) => {
  try {
    if (message.content.toLowerCase().includes("man")) {
      if (message.author.id === bot.user.id) return;
      message.channel.send("Man? Comme Dhar Mann?");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.channel.send(
        "Dhar mann garde toujours le même fking " +
          "pattern dans ses scénarios et c’est grâce à ça qui se faire " +
          "pleins de cash vu que c’est quirky."
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      message.channel.send(
        "Les Américains aiment le quirkyness. C’est " +
          "ça qui attire les jeunes"
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      message.channel.send(
        "Genre les séries avec des rires dans " + "le background"
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      message.channel.send(
        "Jsp. Genre check les vieilles séries de " +
          "disney channel ou genre des séries genre F.R.I.E.N.D.S ou big " +
          "band theory pour les plus intellos. Ça l’a toujours des rires " +
          "dans les backgrounds pour inciter les téléspectateurs à rire " +
          "et toujours regarder la série"
      );
    }
  } catch (error) {
    console.log(error);
  }
});

// The Exam Command: Cédric talks about his philosophy exam
bot.on("message", async (message) => {
  if (message.content.toLowerCase().includes("exam")) {
    if (message.author.id === bot.user.id) return;
    message.channel.send("Les examens?");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    message.channel.send(
      "En philo, j’étudiais sur le psychisme " +
        "et l’inconscient. Ça m’en fait apprendre davantage sur ce que " +
        "nous sommes apparement"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "C’est tellement pas clair à propos de l’exam. On a aucun document ou rien"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Apparemment c’est aujourd’hui, mais pour vrai j’ai aucune idée"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send("Check dans le plan de cours");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    message.channel.send("Mais ya donné aucune informations");
    await new Promise((resolve) => setTimeout(resolve, 7000));
    message.channel.send(
      "Le dude est tellement perché. Lui aussi c’est un cas particulier"
    );
    await new Promise((resolve) => setTimeout(resolve, 7000));
    message.channel.send("Jpense que ça va être bin chill tkt");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "C’est au sujet de la conscience, du " +
        "côté collectif et tout un paquet d’affaire qui est assez " +
        "facile à reformuler"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send("Attend m’a checker dans la vidéo");
    await new Promise((resolve) => setTimeout(resolve, 20000));
    message.channel.send("Bro ya aucun document ou rien haha");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Je pense pas que l'exam est aujourd'hui. On va " +
        "voir. J’ai des doutes quand même. C’est quand même weird de donner " +
        "un exam quand il y a legit aucune préparation concrète"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Même dans le plan de cours ya très " + "peu d’information"
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send("Pi ofc yé pas là attend haha");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send("Le dude est pas là pour moi haha");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send("Pour moi yé juste pas là hahaha");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send("Esti que ça dead🤣");
  }
});

// The Right Command: Cédric talks about his grand economic plan
bot.on("message", async (message) => {
  if (message.content.toLowerCase().includes("droite")) {
    if (message.author.id === bot.user.id) return;
    message.channel.send("La droite?");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    message.channel.send(
      "Parce que moi économiquement je suis assez de droite. Selon moi tout " +
        "le monde devrait être productif. Ça serait idéal. "
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "En fait il y en a certains qui sont plus productifs que d'autres. " +
        "Moi je suis le genre de gars qui croirait qu'on devrait avoir " +
        "du fascisme dans 10 ans pour renforcer le monde et les rendre " +
        "plus productifs."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "C'est en les renforçant qu'on va les rendre plus productifs."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "C'est pour ça que les Allemands étaient plus disciplinés. "
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Même encore là c'est encore du monde super discipliné à cause " +
        "des moments durs qu'ils ont eus dans le passé."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Dans un monde sensible, c'est certain que ça va les traumatiser, " +
        "mais la globalisation va rendre ça plus facile."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Je trouve que du fascisme ça va renforcer la société culturellement " +
        "et ça va rapporter tellement beaucoup. "
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "Je suis quelqu'un quand même qui n'aime pas les monopoles. Je suis " +
        "le genre de gars qui enlèverait ce genre de monopole afin " +
        "de renforcer le libre-échange."
    );
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send("Je suis pas le genre de gars libertarien pur.");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    message.channel.send(
      "En plus socialement je suis assez libéral, mais économiquement " +
        "c'est différent"
    );
  }
});

// The RONA command: Cédric talks about his career goals.

bot.on("message", async (message) => {
    if (message.content.toLowerCase().includes("rona")) {
      if (message.author.id === bot.user.id) return;
      message.channel.send("Le RONA?");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.channel.send(
        "Plus que je travaille au RONA, moins j’ai l’intérêt de rester " +
          "dans l’établissement."
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      message.channel.send(
        "Je ne devrais même pas encourager cette entreprise."
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      message.channel.send(
        "Je préfère voir du monde qui on la passion de vendre des produits " +
          "de qualité que voir du monde à s’en mettre pleins les poches " +
          "grâce aux multinationales. "
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      message.channel.send(
        "La quantité vient avant la qualité et c’est pour ça que je vais " +
          "aller en administration des affaires."
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      message.channel.send(
        "Je pourrais aussi avoir l’option d’être conseiller et je " +
          "veux encourager ces compagnies locales à grandir au sein " +
          "de la province québécoise."
      );
    }
});

// The Question Command: Cédric answers anything.

bot.on("message", async (message) => {
    const embedYes = new Discord.MessageEmbed()
      .setColor("#33a532")
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setTitle("Ben oui!!")
      .setDescription("AhHhHHhHhHhHHhHHh")
      .attachFiles(["./img/questions/yes.gif"])
      .setImage("attachment://yes.gif");

    const embedNo = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setTitle("Non.")
      .attachFiles(["./img/questions/no.gif"])
      .setImage("attachment://no.gif");

    if (
      message.content
        .toLowerCase()
        .replace(/é/g, "e")
        .startsWith("cedric es") ||
      message.content
        .toLowerCase()
        .replace(/é/g, "e")
        .startsWith("cedric peu") ||
      message.content
        .toLowerCase()
        .replace(/é/g, "e")
        .startsWith("cedric va") ||
      message.content.toLowerCase().replace(/é/g, "e").startsWith("cedric a") ||
      message.content
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/é/g, "e")
        .startsWith("cedric tes") ||
      message.content
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/é/g, "e")
        .startsWith("cedric jai") ||
      message.content
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/é/g, "e")
        .startsWith("cedric je peu") ||
      message.content
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/é/g, "e")
        .startsWith("cedric tu peu")
    ) {
      if (message.author.id === bot.user.id) return;
      const randomNumber = Math.floor(Math.random() * 2);
      switch (randomNumber) {
        case 0:
          message.channel.send(embedNo);
          break;
        case 1:
          message.channel.send(embedYes);
          break;
      }
    }

    if (
      message.content
        .toLowerCase()
        .replace(/é/g, "e")
        .replace(/ù/g, "u")
        .startsWith("cedric ou")
    ) {
      if (message.author.id === bot.user.id) return;
      const locations = require("./json/questions/locations.json");
      const randomNumber = Math.floor(Math.random() * locations.length);
      const randomLocationName = locations[randomNumber].name;
      const randomLocationImage = new Discord.MessageEmbed().setImage(
        locations[randomNumber].image
      );
      message.channel.send(randomLocationName);
      if (locations[randomNumber].image != undefined) {
        message.channel.send(randomLocationImage);
      }
    }
});
