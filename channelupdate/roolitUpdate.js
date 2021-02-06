const { MessageEmbed } = require('discord.js');

module.exports = async (client, message, Discord, args) => {
    const channelId = '739593376957071392';

    const embed = new MessageEmbed()
    .setTitle('YLEISTIETOA RANKEISTA')
    .setColor('0xd62075')
    .setDescription('<@&235483050845143040>: Serverin ylläpitäjät.\n'
        + `<@&235484896854802433>: Huolehtivat palvelimen järjestyksestä. Heidät voi kutsua apuun, jos huomaat sääntöjä rikkovan käyttäjän.\n`
        + `<@&798638539012571146>: Palvelimen tapahtumien järjestäjät ja suunnittelijat.\n`
        + `<@&701760018252300370>: Tämän palvelimen boostaajat.\n`
        + `<@&318411726230126613>: Tämä rank on varattu erityisille ihmisille.\n`
        + `<@&607978146100281354>: Serverin mukavat, aktiiviset ja avuliaat käyttäjät.\n`
        + `<@&362680100765827082>: 🤔\n`
        + `<@&610745684416659457>: Survisarjan wikin aktiiviset muokkailijat.\n`
        + `<@&733794611994165270>: Pokémon GO -pelaajat, jotka haluavat esimerkiksi kutsuja raideihin.\n`
        + `<@&801912866634465290>: Event-rooli niille, jotka haluavat ilmoituksia tapahtumista.\n`
        + `<@&803987661345914932>: Rooli niille, jotka haluavat ilmoituksia taidetorstaista.\n\n`
        + `Huomaathan että rooleihin ei voi erikseen hakea.`);

    client.channels.cache.get(channelId).messages.fetch('797853100307382292').then(msg => msg.edit(embed));
}