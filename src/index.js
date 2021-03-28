const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
const ytdl = require('ytdl-core');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async msg => {
  if (!msg.author.bot && msg.content.startsWith(process.env.PREFIX) && msg.guild) {
    const [COMMAND, ...args] = msg.content.trim().substring(process.env.PREFIX.length).split(/\s+/);
    if (COMMAND) {
      if (args.length == 1 && COMMAND == "play") {
        if (msg.member.voice.channel) {
          if (client.voice.connections.size == 0) {
            if (ytdl.validateURL(args[0])) {
              try {
                const songInfo = await ytdl.getInfo(args[0])
                const connection = await msg.member.voice.channel.join()
                connection.play(ytdl(args[0], { filter: 'audioonly' }))
                msg.reply(`Playing ${songInfo.videoDetails.title}`)
              } catch (error) {
                msg.reply("There is an problem :( i am researching...")
              }
            } else {
              msg.reply("You need to check url!")
            }
          } else {
            msg.reply("I am already working!")
          }          
        } else {
          msg.reply('You need to join a voice channel first!');
        }
      } else if (args.length == 0 && (COMMAND == "disconnect" || COMMAND == "disc")) {
        if (client.voice.connections.size > 0) {
          msg.guild.me.voice.channel.leave()
          msg.reply("Successfully disconnected")
        } else {
          msg.reply("I am not working!")
        }       
      } else {
        msg.reply("i can't help you :(")
      }
    }
  }
});

client.login(process.env.TOKEN);