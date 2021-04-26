const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "pause",
    description: "Pausar la musica",
    usage: "[pause]",
    aliases: ["pause"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: La cancion fue pausada y la cola se ha eliminado.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Musica pausada para ti!")
      .setColor("ORANGE")
      .setTitle("Musica pausada!")
      return message.channel.send(xd);
    }
    return sendError("Nada se esta reproduciendo actualmente.", message.channel);
  },
};
