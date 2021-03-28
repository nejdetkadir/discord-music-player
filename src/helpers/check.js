const ytsr = require('ytsr');
const ytdl = require('ytdl-core');

exports.userOnVoiceChannel = (msg) => {
  if (msg.member.voice.channel) {
    return true
  } else {
    msg.reply('You need to join a voice channel first!');
  }
}

exports.isWorking = (client, msg, showErr) => {
  if (client.voice.connections.size > 0) {
    return true
  } else {
    if (showErr) {
      msg.reply("I am not working!")
    }
  }    
}

exports.searchVideo = async (args) => {
  const searchText = args.join(" ");
  
  const searchFilter = await ytsr.getFilters(searchText);
  const filterVideo = searchFilter.get('Type').get('Video');

  const result = await ytsr(filterVideo.url, { pages: 1 });
  return result.items[0]
}

exports.playMusicWithUrl = async (url, msg, isWorking) => {
  if (ytdl.validateURL(url)) {
    if (isWorking) {
      this.disconnectFromChannel(msg, false)
    }
    try {
      const songInfo = await ytdl.getInfo(url)
      const connection = await msg.member.voice.channel.join()
      connection.play(ytdl(url, { filter: 'audioonly' }))
      msg.reply(`Playing ${songInfo.videoDetails.title}`)
    } catch (error) {
      msg.reply("There is an problem :( i am researching...")
    }
  } else {
    msg.reply("You need to check url!")
  }
}

exports.disconnectFromChannel = (msg, showErr) => {
  msg.guild.me.voice.channel.leave()
  if (showErr) {
    msg.reply("Successfully disconnected")
  }
}