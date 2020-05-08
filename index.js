const Discord = require('discord.js');
const time = require('./time');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;

bot.login(config.token);

bot.once('ready', () => {
	var greetingChannel = bot.channels.cache.find(channel => channel.name === 'general-2');
	console.log('Ready!');
	setInterval( () => {
		var currentDate = new Date();
		if (currentDate.getHours() == 9 && currentDate.getMinutes() == 00) {
			greetingChannel.send("Bon matin ma bande de *heggrolls*!");
		}
		if (currentDate.getHours() == 23 && currentDate.getMinutes() == 00) {
			greetingChannel.send("Bonne nuit mes *heggrolls*");
		}

	}, 60000);


});

bot.on('message', message => {
	console.log(message.content);
});

// The Ping Command: Cédric replies with a bad pun about ping pong whenever a message contains the word 'ping'.
bot.on('message', (message) => {
    if(message.content.toLowerCase().includes('ping')) {
        if(message.author.id === bot.user.id) return;
        message.reply('Tu veux savoir ton ping? Un peu comme le ping pong? HAHAHA PING PONG COMME LE SPORT.');
    }
});

// The Quebec Command: Cédric talks about the province of Quebec whenever someone in the server mentions it.
bot.on('message', (message) => {
    let randomNumber;
    const quebecReplies = [
        "Le Québec c'est un pays!", // 0
        "Si on me donnait 1 million pour haïr le Québec, je le ferais jamais!", // 1
        "Le Québec *his* my *ome*. Bin kin, comme mon *ome* dans Minecraft!", // 2
        "Au Québec, on est une nation. On a notre propre identité au Québec. " + // 3
		"On est différent du reste du Canada. On a notre propre culture. Une super " +
		"belle culture. On a la Saint-Jean, des usines québécoise. On a de la bonne bière. " +
		"Genre en revenant de la job, je prends souvent de l'Unibroue ou de l'Archibald. C'est super bon. " +
		"Au Vieux-Hull, il y a des bonnes brasseries.",
        "On a des super belles entreprises qu Québec (des PME). Si on investissait plus dans " + // 4
		"les PME, l'économie serait bien stimulée dans la belle province. Je pense même que ça va " +
		"même favoriser le nombre d'emplois parce que les entreprises auront tellement d'argent qu'ils " +
		"pourront embaucher plus de monde. À moment donné, je suis allé au Mont-Tremblant avec mes " +
		"grand-parents et il y avait un petit magasin local, je m'en rappelle plus du nom. Ah oui, " +
		"le marché Bourassa. C'était super nice.",
        "Le drapeau du Québec il est super beau, super attirant. Un drapeau pas trop compliqué et " + // 5
		"ça rend fier parce que ça a été fait dans un temps où le nationalisme commençait à grandir " +
		"parce que c'était juste avant les élections de Maurice Duplessis. Et on le voit à la Saint-Jean. " +
		"Comme j'en ai acheté un pour le after au Dollarama pour 3 piasses. Et c'est juste nice de courir " +
		"avec ça sur ton dos là. T'as le Québec en toi.",
        "Tsé c'est pas pour rien qu'on est toujours en conflit avec les anglophones. Ça va jamais partir. " + // 6
		"Même quand Pierre Elliot Trudeau a refait la constitution, ça a fait un genre de scandale parce que " +
		"ça mettait les québécois en minorité.",
        "On a eu des super bons leaders québécois dans le temps du nationalisme. C'est dommage qu'on en a plus " + // 7
		"aujourd'hui. Des super bons leaders comme René Lévesque, Robert Bourassa, Jean Lesage... Et aujourd'hui... " +
		"Mais François Legault il fait exception parce qu'il est nationaliste. Mais je pense que la rébellion avec " +
		"Louis-Joseph Papineau, ça c'était le moment le plus québécois.",
        "Nous autres au Québec on a des super bons joueurs de hockey. Mais malheuresement, la majorité du Canada est anglophone " + // 8
		"alors l'équipe de hockey du Canada a pas tant de joueurs québécois, tsé parce que c'est le Canada au complet. " +
		"Comme au championnat du monde, on a perdu contre les Russes 6-0 parce qu'ils ont pas bien choisi les joueurs.",
        "Les Simpsons je trouve que j'aime plus la voix de Homer Simpson en québécois qu'en anglais parce que je trouve " + // 9
		"qu'il rentre plus dans le personnage d'un père québécois épais. En anglais on dirait qu'il essaie trop d'être cave."
    ];

    if ((message.content.toLowerCase().includes('quebec') || message.content.toLowerCase().includes('québec')
    || message.content.toLowerCase().includes('québécois'))) {
        if(message.author.id === bot.user.id) return;
        randomNumber = Math.floor(Math.random() * 10 ); // returns a random number between 0 and 9
        message.channel.send(quebecReplies[randomNumber]);
    }

});

// The Bashing Command: Cédric bashes whoever suggests that Quebec is not a country.




// Server Info: returns the name of the Server
bot.on('message', async (message) => {
    if (message.content === `${prefix}server`) {
        message.channel.send(`Le nom de ce serveur (comme au restaurant hahaha) est: **${message.guild.name}**.`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // set a pause of 5 seconds
        message.channel.send("Moi au restaurant je prends toujours une grosse poutine québécoise. C'est tellement bon.");
    }
});
