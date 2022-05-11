const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.js");
const db = require("orio.db")

const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767
});

module.exports = client;
require("./events/message.js");
require("./events/ready.js");
client.prefix = config.prefix
client.db = require("orio.db")
client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`Uptime Başarılı`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);


const token = process.env.TOKEN
if (!token) {
  console.log("Bu Projeyi Aktif Etmek İçin .env Dosyasına Discord Bot Tokeninizi Yazınız!");
} else {
  client.login(token).catch(e => {
  console.log("BOTUN İNTENTLERİNİ AÇMAZSAN BOT ÇALIŞMAZ DOSTUM!")
})
}


client.on("ready", async () => {
if(db.get("reactions")){
if(Object.keys(db.get("reactions")).length == 0){
await db.delete("reactions")
}}
setInterval(() => {
if(db.get("reactions")){
Object.entries(client.db.get("reactions")).map(j => j[1]).flat().map(async mr => {
if(mr){
const guild = client.guilds.cache.get(mr.guild)
if(guild){
const channel = guild.channels.cache.get(mr.channel)
if(channel){
channel.messages.fetch(mr.message).then(cs => {
}).catch(async e => {
await db.unpush("reactions."+mr.guild, { messsage: mr.message})
await db.delete("messages-"+mr.guild)
await db.delete("channels-"+mr.guild)  
})} else {
await db.unpush("reactions."+mr.guild, { messsage: mr.message})
await db.delete("messages-"+mr.guild)
await db.delete("channels-"+mr.guild)
}} else {
await db.delete("reactions."+mr.guild)
await db.delete("messages-"+mr.guild)
await db.delete("channels-"+mr.guild)
}} else {
await db.unpush("reactions."+mr.guild, { messsage: mr.message})
await db.delete("messages-"+mr.guild)
await db.delete("channels-"+mr.guild)
}})}
}, 200000)
})



client.on("messageReactionAdd", async (reaction, user) => {
if(reaction.message.guild){
if(db.get("reactions."+reaction.message.guild.id)){
const data = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].guild == reaction.message.guild.id).map(me => me[1].guild)
if(data){
const data2 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].channel == reaction.message.channel.id).map(me => me[1].channel)
if(data2){
const data3 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].message == reaction.message.id).map(me => me[1].message)
if(data3){
let data4 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].emoji == reaction.emoji.name)
if(data4){
data4.map(async cs => {
const csr = reaction.message.guild.roles.cache.get(cs[1].role)
if(csr){
const csm = reaction.message.guild.members.cache.get(user.id)
if(csm){
if(!csm.roles.cache.has(csr.id)){
await csm.roles.add(csr.id)  
}}}})
}}}}}}})



client.on("messageReactionRemove", async (reaction, user) => {
  if(reaction.message.guild){
    if(db.get("reactions."+reaction.message.guild.id)){
    const data = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].guild == reaction.message.guild.id).map(me => me[1].guild)
    if(data){
    const data2 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].channel == reaction.message.channel.id).map(me => me[1].channel)
    if(data2){
    const data3 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].message == reaction.message.id).map(me => me[1].message)
    if(data3){
    let data4 = Object.entries(db.get("reactions."+reaction.message.guild.id)).filter(mr => mr[1].emoji == reaction.emoji.name)
    if(data4){
    data4.map(async cs => {
    const csr = reaction.message.guild.roles.cache.get(cs[1].role)
    if(csr){
    const csm = reaction.message.guild.members.cache.get(user.id)
    if(csm){
    if(csm.roles.cache.has(csr.id)){
    await csm.roles.remove(csr.id)  
    }}}})
    }}}}}}})
