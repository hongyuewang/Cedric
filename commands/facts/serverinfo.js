const { Command } = require('discord.js-commando');

module.exports = class ServerInfo extends Command {
    constructor(bot) {
        super(bot, {
            name: 'server',
            aliases: ['serverinfo'],
            group: 'facts',
            memberName: 'serverinfo',
            description: 'Information on the server the command was invoked.'
        });
    }

    async run(message) {
        message.say("Tu veux avoir de l'information sur ce serveur? Why not let's go!");
		await new Promise(resolve => setTimeout(resolve, 2000)); // set a pause of 2 seconds
		message.say("En parlant de serveur, moi au restaurant je prends toujours une grosse poutine québécoise. C'est tellement bon.");
		await new Promise(resolve => setTimeout(resolve, 3000)); // set a pause of 3 seconds
		message.say(`Le nom de ce serveur est: **${message.guild.name}**.`);
		message.say(`Son dictateur est: **${message.guild.owner}** (Mais moi je préférerais avoir un premier ministre parce que ça démontre plus ton leadership).`);
		message.say(`Son nombre d'habitants est: **${message.guild.memberCount}**.`);
		message.say(`Il est situé au **${message.guild.region}**.`)
    }
};
