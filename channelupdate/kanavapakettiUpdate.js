const { MessageEmbed } = require('discord.js');

module.exports = async (client, message, Discord, args) => {
    const channelId = '739590230406856755';

    const embed = new MessageEmbed()
    .setTitle('PALVELIMEN TEKSTIKANAVAT')
    .setColor('0xd62075')
    .setDescription('**INFO**\n'
        + `<#235492687849979905>: Palvelimen säännöt ja muut ohjeet.\n`
        + `<#739590134697164871>: Uutisia liittyen palvelimen toimintaan.\n`
        + `<#801898400592560189>: Palvelimen tapahtumien aikataulut ja muut tiedot.\n`
        + `<#739590230406856755>: Lista palvelimen kanavista ja ohjeita niiden käyttöön.\n`
        + `<#739593376957071392>: Tietoa palvelimen käyttäjien rooleista.\n\n`
        
        + `**ETEINEN**\n`
        + `<#800841322117857280>: Esittele itsesi muille käyttäjille.\n`
        + `<#802170439152566291>: Anna ehdotuksia ja ideoita palvelimen toimintaan liittyen.\n`
        + `<#802172940472942673>: Kaikki bottikomennot tälle kanavalle.\n`
        + `<#802169773479428156>: Postaa tänne kuvia itsestäsi.\n\n`
        
        + `**KAHVIPÖYTÄ**\n`
        + `<#106987754314833920>: Yleistä keskustelua. Palvelimen "pääkanava".\n`
        + `<#802192119795023943>: Kanava sekalaiselle keskustelulle yleisen kanavan täyttyessä.\n`
        + `<#739585485214580897>: Asiallista keskustelua aiheesta kuin aiheesta. Trollivapaa alue.\n`
        + `<#447465474351955968>: Gifejä, kuvia ja huonoja vitsejä.\n`
        + `<#806516006293602304>: Kerro kaikille jotain kivaa ja mahtavaa.\n`
        + `<#806515916325126175>: Kerro miksi juuri sinulla on ikävä tunnelma.\n\n`);

    const embedtwo = new MessageEmbed()
    .setColor('0xd62075')
    .setDescription(`**HARRASTEHUONE**\n`
        + `<#733794532390338631>: Pelaamiseen ja peleihin liittyvä keskustelu sekä peliseuran etsiminen.\n`
        + `<#613359633553162240>: Keskustelua sosiaalisesta mediasta ja videoista.\n`
        + `<#613357581280346122>: Keskustelua ja kuvia omista taiteellisista tuotoksista.\n`
        + `<#739624292391714827>: Keskustelua musiikista, artisteista ja musisoinnista.\n`
        + `<#801614797804273674>: Kuvia söpöistä eläinystävistä.\n\n`
        
        + `**WILDEEM**\n`
        + `<#739591565558939688>: Wildeemin tärkeät ilmoitukset.\n`
        + `<#739597550067384390>: Usein kysyttyjä kysymyksiä Wildeemiin ja hänen videoihinsa liittyen.\n`
        + `<#739587644064923680>: Keskustelua Wildystä ja hänen videoistaan.\n`
        + `<#791814088560214017>: Wildeemille osoitettuja fan art -töitä.\n`
        + `<#786652505562939396>: Survisarjaan liittyvä yleinen keskustelu.\n`
        + `<#609843459632922634>: Survisarjan wikiin liittyvä keskustelu.\n\n`
        
        + `**EVENT**\n`
        + `<#801887046540591154>: Keskustelua palvelimen erityistapahtumista.\n\n`
        
        + `**ÄÄNIKANAVAT**\n`
        + `<#310836819032014849>: Äänikanavilla tapahtuvan keskustelun tueksi. Musabotin komennot tänne.`);

    client.channels.cache.get(channelId).messages.fetch('806546037463318539').then(msg => msg.edit(embed));
    client.channels.cache.get(channelId).messages.fetch('806546110680006695').then(msg => msg.edit(embedtwo));
}