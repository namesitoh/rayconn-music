const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "leave",
        aliases: ["goaway", "disconnect"],
        description: "Salir del canal de Voz!",
        usage: "Leave",
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("Lo siento, debes estar en mi Canal de Voz actual para retirarme!", message.channel);
        if (!message.guild.me.voice.channel) return sendError("No estoy en un Canal de Voz!", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Intentando salir del Canal de Voz...", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("Salir del Canal de Voz", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setColor("GREEN")
            .setTitle("Exitoso")
            .setDescription("🎶 Adios!")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("🎶 Adios!"));
    },
};
