const Discord = require("discord.js");
const db = require("orio.db")
exports.run = async (client, message, args) => {
if(!message.member.permissions.has("MANAGE_GUİLD" && "MANAGE_ROLES")) return message.reply("> **❌ Bu Komutu Kullana Bilmek İçin \`Sunucuyu Yönet\` ve \`Rolleri Yönet\` Yetkilerine Sahip Olman Gerekli!**")
  
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if(!channel) return message.reply("> **❌ Bir Kanal Etiketlemen veya ID'sini Yazman Gerekli!**")
if(channel){
  if(channel.type === "GUILD_TEXT"){    
    
await db.set("channels-"+message.guild.id, channel.id)
 const cse = new Discord.MessageEmbed()
 .setTitle(message.guild.name+" Emoji Rol Sistemi")
 .setColor("BLUE")
 .setThumbnail(client.user.displayAvatarURL())
 .setDescription("> **✅ Başarılı Emoji Eklenecek Mesaj Kanalı Ayarlandı! <#"+channel.id+">**")
 .setTimestamp()
 .setFooter("Made By Umut Bayraktar")
  return message.channel.send({embeds : [cse]});
    
  } else {
    return message.reply("> **❌ Lütfen Bir Metin Kanalı Belirt!**")
  }
} else { 
return message.reply("> **❌ Bir Kanal Etiketlemen veya ID'sini Yazman Gerekli!**")
}}

exports.conf = {
  aliases: []
}

exports.help = {
  name: "channel"
}