const Discord = require("discord.js");
const db = require("orio.db")
exports.run = async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
    .setTitle("Emoji Rol Yardım Menüsü")
    .setDescription(`\`${client.prefix}channel <#kanal>\` - Tepki Eklenecek Mesajın Olduğu Kanalı Ayarlarsınız!
    \`${client.prefix}message <mesaj-id>\` - Tepki Eklenecek Mesajı Ayarlarsınız!
    \`${client.prefix}normal <@rol> ❤️\` - Tepkiye Basınca Verilecek Rolü ve Tepkiyi Ayarlarsınız!
    \`${client.prefix}delete <mesaj-id>\` - Belirtilen Mesajdaki Tepki Rollerini Silersiniz!
    \`${client.prefix}list\` - Sunucunuzda Aktif Olan Emoji Rolleri Gösterir!`)
    .setColor("BLUE")
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    return message.channel.send({embeds : [embed]});

};
exports.conf = {
  aliases: ["y","h","help"]
};

exports.help = {
  name: "yardım"
};
