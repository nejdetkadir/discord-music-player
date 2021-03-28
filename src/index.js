const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  if (!msg.author.bot && msg.content.startsWith(process.env.PREFIX)) {
    msg.reply("i am here")
  }
});

client.login(process.env.TOKEN);