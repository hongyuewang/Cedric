const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

isActiveGeocaching = false;
let state = {};

module.exports = class Geocaching extends (
  Command
) {
  constructor(bot) {
    super(bot, {
      name: "geocaching",
      aliases: ["geocache", "geo", "gc"],
      group: "games",
      memberName: "geocaching",
      description: `A text adventure game featuring Cédric as the protagonist.`,
    });
  }

  async run(message) {
    let visibleOptions;
    function startGame() {
      message.channel.send("`L ' O D Y S S É E  D U  G É O C A C H E U R`");
      state = {};
      showTextNode(1);
    }

    function showTextNode(textNodeIndex) {
      const textNode = textNodes.find(
        (textNode) => textNode.id == textNodeIndex
      );
      message.channel.send("`" + textNode.text + "`");
      visibleOptions = [];

      textNode.options.forEach((option) => {
        if (showOption(option)) {
          message.channel.send("`" + option.text + "`");
          visibleOptions.push(option);
        }
      });

      const filter = (m) =>
        m.author.id == message.author.id &&
        (m.content.toLowerCase() == "a" || m.content.toLowerCase() == "b") &&
        visibleOptions.find(
          (option) => option.letter.toLowerCase() == m.content.toLowerCase()
        ) != undefined;
      const collector = message.channel.createMessageCollector(filter, {
        max: 1,
        time: 300000,
      });
      collector.on("collect", (m) => {
        console.log(`Collected ${m.content}`);
        const chosenOption = visibleOptions.find(
          (option) => option.letter.toLowerCase() == m.content.toLowerCase()
        );
        selectOption(chosenOption);
      });
    }

    function showOption(option) {
      return option.requiredState == null || option.requiredState(state);
    }

    function selectOption(option) {
      const nextTextNodeId = option.next;
      if (nextTextNodeId == 0) {
        return startGame();
      }
      if (nextTextNodeId == -1) {
        message.channel.send("Bin kin, ça c'était toute une aventure.");
        return;
      }

      state = Object.assign(state, option.setState);
      showTextNode(nextTextNodeId);
    }

    const textNodes = [
      {
        id: 1,
        text:
          "Cédric se réveille à 9h00. Il réalise qu'il n'a pas de shift au Rona aujourd'hui et qu'il s'agit de la journée idéale pour aller faire du géocaching. Mais d'abord, il doit déjeuner.\n Que devrait-il manger?",
        options: [
          {
            text:
              "A. Des Frosted Flakes de Kellogg's, une compagnie américaine",
            letter: "A",
            next: 2,
          },

          {
            text: "B. Une grosse poutine québécoise",
            letter: "B",
            next: 2,
          },
        ],
      },

      {
        id: 2,
        text:
          "Après un repas copieux, Cédric fait son sac à dos pour son aventure. Il y met un GPS, un drapeau du Québec, un hiPad et son porte-feuille. Il reste de la place pour un dernier item.\nLequel devrait-il choisir?",
        options: [
          {
            text: "A. Un parapluie",
            letter: "A",
            setState: { umbrella: true, bottle: false },
            next: 3,
          },

          {
            text: "B. Une bouteille d'eau",
            letter: "B",
            setState: { umbrella: false, bottle: true },
            next: 3,
          },
        ],
      },

      {
        id: 3,
        text:
          "Cédric dit au revoir à ses parents et sort de sa maison. Il ouvre l'application de géocaching et voit qu'il y a deux caches intéressantes dans les environs. Il y a une cache à côté du Canadian Tire placée en 2007, mais il y a aussi une nouvelle cache dans le forêt Boucher: elle a été placée hier.\nQuelle cache devrait Cédric poursuivre?",
        options: [
          {
            text: "A. Celle du Canadian Tire",
            letter: "A",
            next: 4,
          },

          {
            text: "B. Celle de la forêt Boucher",
            letter: "B",
            next: 5,
          },
        ],
      },

      {
        id: 4,
        text:
          "Cédric marche jusqu'au Canadian Tire situé à l'intersection des boulevards des Grives et du Plateau. Au loin, il voit le Rona. Après une demi-heure, il trouve finalement la cache sur le vaste terrain près du magasin.",
        options: [
          {
            text: "A. Se reposer devant le Canadian Tire",
            letter: "A",
            next: 6,
          },

          {
            text:
              "B. Partir à la recherche d'autres géocaches à l'est du Boulevard du Plateau",
            letter: "B",
            next: 7,
          },
        ],
      },

      {
        id: 5,
        text:
          "Cédric marche vers la forêt et arrive après 30 minutes. Il est épuisé, mais persévérant. Son GPS indique que le trésor est proche. Soudainement, il commence à pleuvoir.",
        options: [
          {
            text: "A. Sortir son parapluie et continuer à chercher la cache",
            letter: "A",
            requiredState: (currentState) => currentState.umbrella,
            next: 8,
          },

          {
            text: "B. Chercher un abri",
            letter: "B",
            next: 9,
          },
        ],
      },

      {
        id: 6,
        text:
          "Avant qu'il ne puisse d'asseoir, deux employées costauds sortent du magasin et s'emparent de Cédric. Il essait de se libérer de toutes ses forces, mais ils sont trop forts. Il ressent un coup sur sa tête, et tout devient noir.\nLorsqu'il se réveille, il se trouve attaché à un barbecue Cuisinart Gourmet 600B avec une chaîne pour remorque. Un homme chauve se trouve devant lui.\n— Bonjour, Cédric, dit-il avec un sourire malicieux. Un petit oiseau m'a dit que tu es l'employé du mois au Rona. Peut-être que si tu nous disais comment t'as acquis ce... talent, on te laisserait partir.",
        options: [
          {
            text: "A. Révéler le secret",
            letter: "A",
            next: 10,
          },

          {
            text: "B. Refuser",
            letter: "B",
            next: 11,
          },
        ],
      },

      {
        id: 7,
        text:
          "Cédric continue sa marche. Au loin, il voit Vincent Buiel sur un vélo qui se dirige vers lui.\n— Yooooo what's hup, Buiel? dit-il à son ami.\n— Hey Cédric, veux-tu venir chez moi pour jouer à Minecraft? demande Buiel. J'ai trouvé un nouveau client qui s'appelle Badlion Client, c'est genre la meilleure chose ever.",
        options: [
          {
            text: "A. Accepter",
            letter: "A",
            next: 12,
          },

          {
            text: "B. Refuser",
            letter: "B",
            next: 13,
          },
        ],
      },

      {
        id: 8,
        text:
          "Malgré la pluie, Cédric continue tout droit sur le sentier. Éventuellement, le chemin se termine. Un arbre mort se tient à la fin de la piste mouillée. En s'approchant, le GPS que Cédric tient s'éteint. Un coyote sort de derrière le tronc.\n— Jeune Québécois, dit l'animal, tu n'es pas au bon endroit. De l'autre côté de la rivière, un être anti-québécois a pris le contrôle du gouvernement canadien. Il est une menace au futur de la Belle Province. Tu dois intervenir! Je ne peux pas te forcer, par contre. La décision reste la tienne.",
        options: [
          {
            text: "A. Sauver le Québec",
            letter: "A",
            next: 14,
          },

          {
            text: "B. Refuser",
            letter: "B",
            next: 15,
          },
        ],
      },

      {
        id: 9,
        text:
          "Il s'éloigne du sentier pour aller plus loin dans les bois sombres. Les branches au dessus de lui le protégeront de la pluie. Il arrive à une clarière où se trouve un chalet qui semble être abandonné.",
        options: [
          {
            text: "A. Explorer le chalet",
            letter: "A",
            next: 16,
          },

          {
            text: "B. Retourner sur le sentier",
            letter: "B",
            next: 8,
          },
        ],
      },

      {
        id: 10,
        text:
          "— Hokay... Je vais vous le dire.\nCédric chuchote le secret dans l'oreille de l'homme chauve. C'est la première fois depuis 1945 que cette connaissance est révélée à un compétiteur du Rona.\n— Un sérum injecté dans les employés? répète l'homme chauve en riant. Wow, je n'ai jamais pensé à ça! Alain, apporte-moi la chainsaw, ça a l'air qu'on doit disséquer ce jeune homme.\nUn mois après la disparition de Cédric, le Rona où il travaillait ferme ses portes. Les employés du Canadian Tire se sont soudainement avérés plus efficaces que ceux de l'entrepôt bleu. À ce jour, personne ne sait pourquoi.",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 11,
        text:
          "— Jamais de la vie! Vous êtes nos compétiteurs!\n— Mauvaise réponse, dit l'homme chauve en sortant un fusil de chasse. Un dernier mot?",
        options: [
          {
            text: "A. Vive le Québec libre!",
            letter: "A",
            next: 17,
          },

          {
            text: "B. Vive le Rona!",
            letter: "B",
            next: 18,
          },
        ],
      },

      {
        id: 12,
        text:
          "— Minecraft? Ye je suis down de jouer.\nCédric suit Buiel jusqu'à sa maison. Ils jouent à Factions au point de s'évanouir. La cactus farm ne valait vraiment pas la peine.",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 13,
        text:
          "— Non, non, je dois faire du géocaching.\nCédric salut Buiel et continue son chemin. Il arrive sur Saint-Raymond et voit à sa surprise un requin devant un arrêt de bus. Le poisson s'approche en sifflant, le bout de sa queue baladant comme une paire de jambes.\n— Yo what's up, dit le requin, moi c'est Laurent Shark et j'ai une mission pour toi. De l'autre côté de la rivière, à Ottawa, il y a un être anti-québécois qui a pris le contrôle du gouvernement canadien. Il est une menace au futur du Québec. Tu devrais aller au parlement pour sauver ton pays. Je t'y amènerai. Il faut juste que t'embarques sur mon dos. Je ne peux pas te forcer, though, c'est à toi de décider.",

        options: [
          {
            text: "A. Sauver le Québec",
            letter: "A",
            next: 19,
          },

          {
            text: "B. Refuser",
            letter: "B",
            next: 15,
          },
        ],
      },

      {
        id: 14,
        text:
          "— Hokay, j'accepte, dit Cédric. Le coyote gratte le tronc et un morceau de l'écorce tombe pour révéler un trou dans l'arbre. L'animal disparaît dans l'ouverture et Cédric le suit. Il se trouve dans l'obscurité totale pour quelques secondes, mais il voit ensuite un rayon lumineux au bout du tunnel. En sortant, il remarque d'abord qu'il ne pleut plus. Ensuite, il voit qu'il est à un arrêt de bus sur Saint-Raymond et que le coyote a disparu. Dernièrement, Cédric voit à sa surprise un requin à quelques mètres de lui. Le poisson s'approche en sifflant, le bout de sa queue baladant comme une paire de jambes.\n— Yo what's up, dit le requin, moi c'est Laurent Shark. Je vois que t'as accepté la quête. Il faut juste que t'embarques sur mon dos et je t'amènerai au parlement.",
        options: [
          {
            text: "A. Embarquer sur Laurent",
            letter: "A",
            next: 19,
          },

          {
            text: "B. Refuser",
            letter: "B",
            next: 15,
          },
        ],
      },

      {
        id: 15,
        text:
          "Cédric se réveille dans un lit avec un drap de lit décoré de feuilles d'érables. Confus, il se lève et enlève ses pyjamas de Raptors pour mettre des jeans. Il entre dans un salon qui lui est inconnu et remarque que la télé est en anglais. Sa mâchoire a presque décroché lorsqu'il a vu que la chaîne de nouvelles était Global Kingston. Il regarde dehors et réalise qu'il n'est pas dans sa maison au plateau, mais dans un apartement dans le centre-ville de Kingston, Ontario. Il a été transformé en Ontarien! Il lâche un cri de désespoir.\n— Why?! hurle Cédric. Why aren't I a froggy anymore, eh?",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 16,
        text:
          "Il fait sombre à l'intérieur de la cabane. Un fort bourdonnement vient du fond de la salle. Cédric suit la source du son et découvre une porte qui mène à une espèce de sous-sol. Il descend les escaliers et voit une machine cylindrique peinturée en rouge. Sur la surface latérale est écrit: Sharkiller L-14. Dû aux vibrations provenant du tueur de requin, Cédric n'entend pas les deux agents fédéraux qui sont sortis de leur cachette courir vers lui. Il est plaqué par les deux hommes.\n— Vous êtes en état d'arrest pour tresspassing du property de le gouvernement fédéral, dit un des agents avec un accent ontarien. Don't resist.\nCédric a été retenu prisonnier dans la base militaire secrète pendant deux jours. Il a été relâché car il parlait trop. Par contre, il a été averti que si jamais il révèle ce qu'il a vu ce jour-là, il disparaîtrait sans laisser de trace... Ainsi commence le génocide des requins parlants. Un par un, ces êtres mystiques disparaissent du Canada. Et le monde ne saura jamais pourquoi, à moins que Cédric brise son silence.",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 17,
        text:
          "— Attends... T'es un souverainiste aussi? demande l'homme chauve. Okay, je vais te donner une dernière chance. Come on, fais le pour le Québec.",
        options: [
          {
            text: "A. Révéler le secret",
            letter: "A",
            next: 10,
          },
        ],
      },

      {
        id: 18,
        text:
          "Les portes automatiques du magasin éclatent en un million de morceaux. Un détachement spécial des employés du Rona entrent dans le bâtiment avec des fusils remplis de peinture Sico évolution et arrosent l'homme chauve et ses soldats du mal. Un employé utilise une scie circulaire Bosch de 6 1/2 pour libérer Cédric.\nAprès l'avoir reconduit au Rona, le gérant de Cédric lui demande s'il voudrait faire un shift ce soir.",
        options: [
          {
            text: "A. Travailler ce soir",
            letter: "A",
            next: 20,
          },

          {
            text: "B. Refuser",
            letter: "B",
            next: 21,
          },
        ],
      },

      {
        id: 19,
        text:
          "— Bin kin, il faut sauver le Québec!\nCédric monte sur le dos glissant de Laurent. Celui-ci commence à sprinter sur Saint-Raymond, vers la rivière des Outaouais.\n— C'est pas la Saint-Louis, mais ça va faire l'affaire, dit-il. Le requin accélère, et saute dans l'eau. Pendant que Laurent nage en direction du parlement, Cédric voit que derrière eux, un navire militaire armé d'un canon massif s'approche d'eux.\n— Ah shit, murmure Laurent. Ils m'ont trouvé.\n— Qui?\n— Antishark. C'est un task force spécial des forces armées qui chasse les requins parlants comme moi. Ils ont développé une arme puissante: le Sharkiller L-14. Son faisceau laser serait assez pour nous vaporiser.\n— Qu'est-ce qu'on va faire? demande Cédric.\n— Yo mais Cédric, c'est à toi de décider. C'est ta quête.\nÀ leur gauche se trouve le barrage des Chaudières et à leur droite, la rive. Au-delà du rivage, il y a le musée de la guerre.",
        options: [
          {
            text: "A. Sauter par dessus du barrage",
            letter: "A",
            next: 22,
          },

          {
            text: "B. Nager vers la rive",
            letter: "B",
            next: 23,
          },
        ],
      },

      {
        id: 20,
        text:
          "— Ye je pourrais travailler ce soir, ça me dérange pas.\nLe gérant de Cédric lui donne une tape sur le dos.\n— Bon, à ce soir alors.\n Cédric rentre chez lui pour se reposer. Après avoir soupé, il met son uniforme et se dirige au Rona pour un 5 à 9.",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 21,
        text:
          "— Non, vous êtes en train d'abuser là! J'ai déjà fait cinq shifts cette semaine là! Come on!\nSon gérant, abasourdi par la réaction de son employé, se demande comment un jeune homme qui est habituellement docile peut devenir si ... indépendant.\n— Désolé, Cédric, dit-il. Ton comportement est inacceptable. Tu es congédié.\n Cédric est ébahi; les mots lui manquent. Il part de l'entrepôt en silence, le coeur brisé. Il aurait dû se douter du côté capitaliste sauvage et du sentiment anti-souverainiste du Rona. Après tout, il s'agit d'une compagnie américaine.",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 22,
        text:
          "Laurent accélère et se propulse vers le dessus du barrage comme un missile. Cédric a envie de vomir. Il ne s'est pas senti aussi étourdi depuis le party d'Halloween. Ils dépassent le mur géant et entrent en chute libre vers les chutes de la Chaudière. Les deux frappent la surface de l'eau avec un gros splash. Le courant est si puissant qu'ils sont emportés au-delà du parlement, jusqu'au canal Rideau.\n— Ight, c'est ici que tu débarques, dit Laurent. Va au parlement, le Gardien te dira quoi faire. Ciao man. Le requin disparaît ensuite sous la surface de l'eau. Cédric voit la tour de la Paix derrière un amas d'arbres. Il ressent une présence sinistre provenir du bâtiment, mais il ressent aussi quelque chose de pure... quelque chose de québécois dans les tunnels du canal. Cédric est attiré par la force des tunnels, mais sa quête est d'affronter l'être maléfique du parlement. Que devrait-il faire?",
        options: [
          {
            text: "A. Aller au parlement",
            letter: "A",
            next: 24,
          },

          {
            text: "B. Explorer les tunnels",
            letter: "B",
            next: 25,
          },
        ],
      },

      {
        id: 23,
        text:
          "Laurent fonce vers la rive, mais il est violemment repoussé par une vague, en raison de la loi céleste « Chilling on the beach, Laurent can't reach ». Cédric et le requin sont séparés par le flot. Le jeune québécois nage vers la plage et réussit à atteindre la terre ferme sain et sauf. Il se retourne et voit que Laurent n'a pas été aussi chanceux : il est pris dans un filet géant qui a été jeté du vaisseau.\n— Sauve toi, man, dit Laurent Shark. Il est trop tard pour moi... Je perds mon pouvoir, on est dans les eaux ontariennes maintenant...",
        options: [
          {
            text: "A. Fuir",
            letter: "A",
            next: 26,
          },

          {
            text:
              "B. Retirer la bouteille d'eau de son sac à dos et la lancer à Laurent",
            letter: "B",
            requiredState: (currentState) => currentState.bottle,
            next: 27,
          },
        ],
      },

      {
        id: 24,
        text:
          "Cédric arrive sur la colline parlementaire. Il commence à avoir des doutes, mais malgré s'il a peur, il doit affronter la chose qui réside au parlement, car il est un Québécois. En s’approchant des escaliers de l’édifice, il remarque un Bull terrier blanc couché devant les portes de bois.\n— Walter, dit le chien d'une voix enfantine. M'appelle Walter. Je connais le parly, suis-moi.\nWalter se tourne vers l'entrée du parlement et les portes s'ouvrent comme par magie.",
        options: [
          {
            text: "A. Suivre Walter",
            letter: "A",
            next: 28,
          },

          {
            text: "B. Refuser d'écouter le chien",
            letter: "B",
            next: 29,
          },
        ],
      },

      {
        id: 25,
        text:
          "Cédric décide de suivre son instinct et entre dans le tunnel sombre. Il voit une lueur bleue émaner du mur. En s'approchant de la source de lumière, il voit qu'il y a une épée encastrée dans la maçonnerie. Il met sa main sur la surface, faisant craquer la paroi du tunnel. Cédric retire l'épée et voit qu'il y a un message gravé dans la lame: « Forgé par Samuel de Champlain pour le futur de Québec ».",
        options: [
          {
            text: "A. Prendre l'épee",
            letter: "A",
            next: 30,
          },

          {
            text: "B. Laisser l'épee dans le tunnel",
            letter: "B",
            next: 31,
          },
        ],
      },

      {
        id: 26,
        text:
          "Cédric abandonne Laurent à son triste sort et s’enfuit vers le musée. Cependant, en s’approchant de son sanctuaire, il voit plusieurs véhicules de la Gendarmerie royale canadienne stationnés devant le musée. Malheureusement, Cédric se fait arrêter par des officiers de la GRC. Il est condamné à 20 ans d’emprisonnement pour avoir été un complice du fameux terroriste domestique Laurent Shark David. À sa libération en 2040, Cédric se dit qu’il serait peut-être temps d’aller faire une autre partie de geocaching, for hold time’s sake!",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 27,
        text:
          "L'eau québécoise de la bouteille alimente le pouvoir divin de Laurent Shark. Il déchire le filet avec ses dents et se libère de sa prison fédéraliste. Avec sa queue de requin, il réussit à faire couler le navire. Il nage jusqu'au bord de la rivière pour rejoindre Cédric. Ce dernier embarque sur son dos.",
        options: [
          {
            text: "A. Retourner au barrage",
            letter: "A",
            next: 22,
          },
        ],
      },

      {
        id: 28,
        text:
          "— On s’en va où, Walter?\n— À la Chambre des communes, répond le chien. Je t'amène au Baby. Ça fait des jours qu'il refuse de leave le parlement.\n—	Dababy? demande Cédric. Walter fait non d’un signe de tête. Il semble dégouté.\nIls s’arrêtent devant les portes de la Chambre. Une odeur répugnante inonde les narines du jeune souverainiste. Quelque chose de sinistre se trouve derrière ces portes. Cédric ouvre les portes de bois et entre.\nIl voit un bébé énorme assis sur le siège du Président de la Chambre. Cette créature aussi grosse qu’un ours polaire était enrobée dans une couche souillée Pampers.\n— Cédricou, dit le Baby. Mon beau souverainiste… Rejoins le côté obscure… Ensemble, nous pourrions conquérir le monde.",
        options: [
          {
            text: "A. Rejoindre le côté obscure",
            letter: "A",
            next: 32,
          },

          {
            text: "B. Refuser",
            letter: "B",
            next: 33,
          },
        ],
      },

      {
        id: 29,
        text:
          "— It’s hokay! Je veux visiter le parlement moi-même. Il bouscule le chien blanc et entre dans l’immeuble. Malheureusement, il se perd aussitôt qu’il met le pied dans le parlement. Tous les couloirs lui semblent pareils : tous les murs ont étés bâtis avec des briques fédéralistes. Plus il avance, moins il voit. Un par un, les lumières du parlement s’éteignent. Au loin, il entend de la musique. Il s’agit de la chanson de Monster Inc. La musique devient de plus en plus forte. Les tympans de Cédric sont sur le point d’éclater. Il sent des gens autour de lui. Ils sont en train de danser. Cette atmosphère est insupportable, mais Cédric ne se plaint pas. Il ne fait que se mettre en boule, car c’est ce que les vrais Québécois font.",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 30,
        text:
          "Cédric attache l’épée autour de son sac à dos. Il pense qu’elle l’aidera à affronter la créature du parlement.",
        options: [
          {
            text: "A. Aller au parlement",
            letter: "A",
            setState: { sword: true },
            next: 24,
          },
        ],
      },

      {
        id: 31,
        text:
          "Cédric décide de ne pas prendre l’épée. Il ne pense pas qu’elle l’aidera à affronter la créature du parlement.",
        options: [
          {
            text: "A. Aller au parlement",
            letter: "A",
            setState: { sword: false },
            next: 24,
          },
        ],
      },

      {
        id: 32,
        text:
          "— Hokay! répond Cédric avec enthousiasme. Le Baby sourit.\n — Viens ici et mets ça, dit le Baby en lui tendant une couche. Cédric obéit son nouveau maître.\nQuelques mois plus tard, l’Empereur Baby et le Commandant suprême Dubois mènent l’armée impérial du Baby vers Washington afin de conquérir la Maison-Blanche. Le Canada et le nord-est des États-Unis sont déjà sous leur contrôle. En remplaçant le président américain, le Baby se rapprochera de son rêve de conquérir le monde. Des explosions illuminent le ciel du District de Columbia. Cédric sait qu’il est trop tard, mais il ne peut s’empêcher de penser au pays qu’il a trahi. Il pense au Québec.",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 33,
        text:
          "— Non, it’s hokay, répond Cédric. Ça me tente pas, là…\n — Alors tu mourras. Le Baby descend de sa chaise et court vers le souverainiste. Ses flatulences sont visibles. Cédric doit se défendre.",
        options: [
          {
            text: "A. Lui donner un coup de poing",
            letter: "A",
            next: 34,
          },

          {
            text: "B. Lui donner un coup d'épée",
            letter: "B",
            requiredState: (currentState) => currentState.sword,
            next: 35,
          },
        ],
      },

      {
        id: 34,
        text:
          "Cédric donne un coup de poing au bébé démoniaque, mais le Baby esquive et mord le jeune Dubois. Le venin de l’enfant monstrueux paralyse son corps et il meurt de déshydration pour prêter hommage à un certain mime bioéthique. ",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },

      {
        id: 35,
        text:
          "Cédric sort l’épée de Samuel de Champlain et donne un coup au bébé démoniaque. L’énergie québécoise de la lame tranche la créature, qui entre en combustion spontanée. Ensuite, le plafond de la Chambre des communes s’ouvre et un rayon de lumière divin tombe sur Cédric. Le jeune Dubois commence à flotter vers la source de la lumière et se fait transporter au ciel.\nCédric se trouve face à face avec l’esprit de René Lévesque, qui lui dit :\n— Je suis tellement fier de toi, Cédric. Tu as sauvé le Québec.\nLes deux souverainistes se donnent un long câlin francophone. Lorsque Cédric ouvre ses yeux, il se trouve dans sa chambre. Il sait que son aventure n’était pas un rêve, car il sent la présence du René en lui. Il a été béni. Il est devenu le Fils du Québec, le plus souverainiste des souverainistes.",
        options: [
          {
            text: "A. Recommencer",
            letter: "A",
            next: 0,
          },

          {
            text: "B. Quitter",
            letter: "B",
            next: -1,
          },
        ],
      },
    ];

    this.client.dispatcher.addInhibitor(() => {
      return isActiveGeocaching;
    });

    isActiveGeocaching = true;

    startGame();
  }
};
