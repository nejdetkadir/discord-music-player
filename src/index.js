const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  if (!msg.author.bot && msg.content.startsWith(process.env.PREFIX)) {
    const [COMMAND, ...args] = msg.content.trim().substring(process.env.PREFIX.length).split(/\s+/);
    if (COMMAND) {
      if (args.length == 0) {
        msg.reply("What do u want ?")
      } else if (args.length == 1) {
        msg.reply("i can play a song for you :)")
      } else {
        msg.reply("i can't help you :(")
      }
    }
  }
});

client.login(process.env.TOKEN);