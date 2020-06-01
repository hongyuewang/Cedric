const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const {CommandoClient} = require('discord.js-commando');
const path = require('path');

const bot = new CommandoClient({
	commandPrefix: 'ced!',
	owner: '306624719338209282'
});

// Registering command groups
bot.registry
	.registerDefaultTypes()
	.registerGroups([
		['facts', 'Facts'],
		['greetings', 'Greetings'],
		['games', 'Games']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

// Login
bot.login(process.env.TOKEN);

bot.once('ready', () => {
	var greetingChannel = bot.channels.cache.find(channel => channel.name === 'general');
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

// Keyword Commands

// The Ping Command: Cédric replies with a bad pun about ping pong whenever a message contains the word 'ping'.
bot.on('message', (message) => {
	if(message.content.toLowerCase().includes('ping')) {
		if(message.author.id === bot.user.id) return;
		message.reply('Tu veux savoir ton ping? Un peu comme le ping pong? HAHAHA PING PONG COMME LE SPORT.');
	}
});

// The Quebec Command: Cédric talks about the province of Quebec whenever someone in the server mentions it.
bot.on('message', async (message) => {
	let randomNumber;
	const quebecReplies = [
		"Le Québec c'est un pays!", // 0
		"Si on me donnait 1 million pour haïr le Québec, je le ferais jamais!", // 1
		"Le Québec *his* my *ome*. Bin kin, comme mon *ome* dans Minecraft!", // 2
		"Au Québec, on est une nation. On a notre propre identité au Québec. " + // 3
		"On est différent du reste du Canada. On a notre propre culture. Une super belle culture. On a la Saint-Jean, des usines québécoises. On a de la bonne bière. " +
		"Genre en revenant de la job, je prends souvent de l'Unibroue ou de l'Archibald. C'est super bon. " +
		"Au Vieux-Hull, il y a des bonnes brasseries.",
		"On a des super belles entreprises au Québec (des PME). Si on investissait plus dans " + // 4
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
		"Nous autres au Québec on a des super bons joueurs de hockey. Mais"
		+ " malheuresement, la majorité du Canada est anglophone alors l'équipe"
		+ " de hockey du Canada a pas tant de joueurs québécois, tsé parce que"
		+ " c'est le Canada au complet. Comme au championnat du monde, on a"
		+ " perdu contre les Russes 6-0 parce qu'ils ont pas bien choisi les"
		+ " joueurs.",
		"Les Simpsons je trouve que j'aime plus la voix de Homer Simpson en québécois qu'en anglais parce que je trouve qu'il rentre plus dans le personnage d'un père québécois épais. En anglais on dirait qu'il essaie trop d'être cave."
	];

	if ((message.content.toLowerCase().includes('quebec') || message.content.toLowerCase().includes('québec')
	|| message.content.toLowerCase().includes('québécois'))) {
		if(message.author.id === bot.user.id) return;
		if ((message.content.toLowerCase().includes('pas') && message.content.toLowerCase().includes('pays')) === false) {
			message.channel.send("Le Québec?");
			// set a pause of 2 seconds
			await new Promise(resolve => setTimeout(resolve, 2000));
			// returns a random number between 0 and 9
			randomNumber = Math.floor(Math.random() * quebecReplies.length );
			message.channel.send(quebecReplies[randomNumber]);
		}
	}

});

// The Anti-Quebec Command: Cédric responds to whoever suggests that Quebec is not a country.
bot.on('message', async (message) => {

	if ( (message.content.toLowerCase().includes('quebec')  ||
	message.content.toLowerCase().includes('québec') ) && message.content.toLowerCase().includes('pas')
	&& message.content.toLowerCase().includes('pays')) {
		if(message.author.id === bot.user.id) return;
		message.channel.send("Tu dis que le Québec c'est pas un pays?");
		// set a pause of 2 seconds
		await new Promise(resolve => setTimeout(resolve, 2000));
		message.channel.send("Techniquement t'as raison là, mais ça devrait l'être.");
		// set a pause of 10 seconds
		await new Promise(resolve => setTimeout(resolve, 10000));
		message.channel.send("Légalement c'est pas un pays, mais légitimement ça devrait l'être. " +
		"Le Québec c'est plutôt une nation.");
		await new Promise(resolve => setTimeout(resolve, 10000)); // set a pause of 10 seconds
		message.channel.send("Mais tsé, Maurice Richard était un précurseur " +
		"du Québec dans le temps de la Grande Noirceur.");
		// set a pause of 10 seconds
		await new Promise(resolve => setTimeout(resolve, 10000));
		message.channel.send("Ben c'était du nationalisme aussi, mais " +
		"ça motivait pas tant là. T'étais pas vraiment comfortable.");
		// set a pause of 10 seconds
		await new Promise(resolve => setTimeout(resolve, 10000));
		message.channel.send("Mais là il faut pas encourager les compagnies américaines au Québec. " +
		"Tu les encourages seulement si c'est de la qualité. ");
		// set a pause of 10 seconds
		await new Promise(resolve => setTimeout(resolve, 10000));
		message.channel.send("Sinon tu devrais encourager les petites compagnies locales.");

	}
});

/* The Cool Hwhip Command: Cédric talks about Cool Hwip and Family Guy whenever
the word 'cool' is present in a message. */

bot.on('message', async (message) => {
	if (message.content.toLowerCase().includes('cool')) {
		if (message.author.id === bot.user.id) return;
		message.channel.send("Cool? Comme la cool hwip?");
		await new Promise(resolve => setTimeout(resolve, 2000));
		message.channel.send("Moi j’aime d’la cool hwhip, hahahahahaha!");
		await new Promise(resolve => setTimeout(resolve, 10000));
		message.channel.send("Cool whip, c’est pas nice à dire. T'as juste les"
		+ " américains qui disent cool whip, pis ben ça fait vraiment"
		+ " américain. C’est du cool hwhip! Genre d’la bonne crème fouettée"
		+ " qu’on prend sur notre gâteau quand on est jeune.");
		await new Promise(resolve => setTimeout(resolve, 10000));
		message.channel.send("Moi j'en ai mangé beaucoup de cool hwhip."
		+ " Mettons, tu peux pas avoir une tarte sans cool hwhip.");
		await new Promise(resolve => setTimeout(resolve, 10000));
		message.channel.send("C’est pour ça que j’aime Family Guy, ça l’amène"
		+ " des choses qui sont random mais tu ris pareil! C’est américain"
		+ " mais, je sais pas là, j’aime ça!");
		await new Promise(resolve => setTimeout(resolve, 10000));
		message.channel.send("McFarlane c’est pas un républicain, c’est un"
		+ " démocrate, so c’est chill! C’est pas genre le gros américain"
		+ " capitaliste sauvage.");
	}
});
