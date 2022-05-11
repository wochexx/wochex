const Discord = require("discord.js");
const db = require("orio.db")
exports.run = async (client, message, args) => {
if(!message.member.permissions.has("MANAGE_GUİLD" && "MANAGE_ROLES")) return message.reply("> **❌ Bu Komutu Kullana Bilmek İçin \`Sunucuyu Yönet\` ve \`Rolleri Yönet\` Yetkilerine Sahip Olman Gerekli!**")

const channel = db.get("channels-"+message.guild.id)
if(channel){
if(message.guild.channels.cache.get(channel)){
  
message.guild.channels.cache.get(channel).messages.fetch(args[0]).then(async msg => {
if(!msg) return message.reply("> **❌ Geçerli Bir Mesaj ID'si Yazman Gerekli, Girilen Mesaj <#"+channel+"> İsimli Kanalda Bulunamadı!**")
if(msg){
  
await db.set("messages-"+message.guild.id, msg.id)
  const cse = new Discord.MessageEmbed()
 .setTitle(message.guild.name+" Emoji Rol Sistemi")
 .setColor("BLUE")
 .setThumbnail(client.user.displayAvatarURL())
 .setDescription("> **✅ Başarılı Emoji Eklenecek Mesaj Ayarlandı! ([Mesaja Git]("+msg.url+"))**")
 .setTimestamp()
 .setFooter("Made By Umut Bayraktar")
  return message.channel.send({embeds : [cse]});
    
} else {
return message.reply("> **❌ Geçerli Bir Mesaj ID'si Yazman Gerekli, Girilen Mesaj <#"+channel+"> İsimli Kanalda Bulunamadı!**")
}}).catch(e => {
   return message.reply("> **❌ Geçerli Bir Mesaj ID'si Yazman Gerekli, Girilen Mesaj <#"+channel+"> İsimli Kanalda Bulunamadı!**")
})
} else {
return message.reply("> **❌ İlk Önce Emoji Eklenecek Mesajın Bulunduğu Kanalı Ayarlamanız Gerekir!**\n> **Örnek: \`"+client.prefix+"channel <#kanal>\`**")
}} else {
return message.reply("> **❌ İlk Önce Emoji Eklenecek Mesajın Bulunduğu Kanalı Ayarlamanız Gerekir!**\n> **Örnek: \`"+client.prefix+"channel <#kanal>\`**")
}}

exports.conf = {
  aliases: []
}

exports.help = {
  name: "message"
}