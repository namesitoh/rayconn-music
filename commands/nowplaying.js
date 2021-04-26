const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "nowplaying",
    description: "Ver la cancion que esta actualmente sonando",
    usage: "",
    aliases: ["np"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Nada se esta reproduciendo actualmente.", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Actualmente sonando", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("ORANGE")
      .addField("Nombre", song.title, true)
      .addField("Duracion", song.duration, true)
      .addField("Pedido por", song.req.tag, true)
      .setFooter(`Visitas: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
};
