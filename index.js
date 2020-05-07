const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

bot.login(config.token);

bot.on('message', (message) => {
    if(message.content.toLowerCase().includes('ping')
    && message.content.includes("Tu veux savoir ton ping? " +
    "Un peu comme le ping pong? HAHAHA PING PONG COMME LE SPORT.") == false) {
        message.reply('Tu veux savoir ton ping? Un peu comme le ping pong? HAHAHA PING PONG COMME LE SPORT.');
    }
});
