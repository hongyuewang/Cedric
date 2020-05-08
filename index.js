const Discord = require('discord.js');
const time = require('./time');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;

bot.login(config.token);

bot.once('ready', () => {
	var greetingChannel = bot.channels.cache.find(channel => channel.id === '708041420161941526');
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
        "Le Québec c'est un pays!",
        "Si on me donnait 1000$ pour haïr le Québec, je le ferais jamais!",
        "Le Québec *his* my *ome*.",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum"
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
