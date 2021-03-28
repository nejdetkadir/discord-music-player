const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
const check = require("./helpers/check")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  if (!msg.author.bot && msg.content.startsWith(process.env.PREFIX) && msg.guild) {
    const [COMMAND, ...args] = msg.content.trim().substring(process.env.PREFIX.length).split(/\s+/);
    if (COMMAND) {
      if (args.length == 1 && COMMAND == "play") {
        if (check.userOnVoiceChannel(msg)) {
          if (client.voice.connections.size == 0) {
            check.playMusicWithUrl(args[0], msg)
          } else {
            msg.reply("I am already working!")
          }          
        }
      } else if (args.length == 0 && (COMMAND == "disconnect" || COMMAND == "disc")) {
        if (check.isWorking(client, msg, true)) {
          check.disconnectFromChannel(msg, true)
        }      
      } else if (args.length > 0 && COMMAND == "search") {
        if (!check.isWorking(client, msg, false)) {
          check.searchVideo(args).then(res => {
            check.playMusicWithUrl(res.url, msg)
          })
        }
      } else {
        msg.reply("i can't help you :(")
      }
    }
  }
});

client.login(process.env.TOKEN);