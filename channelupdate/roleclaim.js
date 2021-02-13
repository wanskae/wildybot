const { MessageEmbed } = require('discord.js');

module.exports = async (client, message, Discord, args) => {
    const channelId = '739593376957071392';
    const messageId = '810112109613416469'
    client.channels.cache.get(channelId).messages.fetch(messageId)

    const embed = new MessageEmbed()
    .setTitle('EVENTTIEN REAKTIOROOLIT')
    .setColor('0xd62075')
    .setDescription('Reagoi emojilla saadaksesi haluamasi roolin. Kun sinulla on tietty rooli, saat ilmoituksia tätä roolia koskevista aikatauluista, muistutuksista, aktiviteeteista ja muista tiedotteista.\n\n'
        + `<:dynKana:374966528011010051> - <@&801912866634465290>\n`
        + `<:magikarp:741769087205507122> - <@&803987661345914932>\n`
        + `<:psyduck2:238954360560680961> - <@&803364819830702080>\n\n`
        + `Saat halutessasi roolin pois itseltäsi poistamalla reaktiosi.`)
    .setFooter('Jos sinulla on jo tietty rooli valmiiksi, ei tähän tarvitse reagoida uudestaan. Jos kuitenkin haluat poistaa roolin itseltäsi, reagoi ja poista sitten oma reaktiosi.')

    client.channels.cache.get(channelId).messages.fetch(messageId).then(msg => msg.edit(embed));

    client.on('messageReactionAdd', async (reaction, user) => {
        if(!reaction.message.guild) return;

        if (reaction.message.id === messageId && !user.bot) {
            let roleId

            if(reaction.emoji.name === "dynKana"){
                roleId = '801912866634465290'
            }else if(reaction.emoji.name === "magikarp"){
                roleId = '803987661345914932'
            }else if(reaction.emoji.name === "psyduck2"){
                roleId = '803364819830702080'
            }
            reaction.message.guild.member(user).roles.add(roleId).catch();
        }    
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if(!reaction.message.guild) return;

        if (reaction.message.id === messageId && !user.bot) {
            let roleId

            if(reaction.emoji.name === "dynKana"){
                roleId = '801912866634465290'
            }else if(reaction.emoji.name === "magikarp"){
                roleId = '803987661345914932'
            }else if(reaction.emoji.name === "psyduck2"){
                roleId = '803364819830702080'
            }
            reaction.message.guild.member(user).roles.remove(roleId).catch();
        }    
    });

}