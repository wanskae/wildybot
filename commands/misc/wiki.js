const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'wiki',
    description: "Nimi wikistä",
    cooldown: 10800,
    expire: '3h',
    execute(message, args, client){
        message.delete({ timeout: 850 });

        const filtered = [
            'Adolf Hitler',
            'Emätin',
            'Siitin',
        ]

        var request = require('request');
        
        var r = request.get('https://fi.wikipedia.org/wiki/Special:Random', function wikinimi(err, res, body) {
            var title = this.uri.href
            var parts = title.split('/wiki/', 2);
            var latter = parts[1];
            var nimi = latter.replace(/_/g, ' ')
            var decoded = decodeURIComponent(nimi)

            if(decoded.length > 32){
                const embed = new MessageEmbed()
                .setTitle('Virhe')
                .setColor('0xd62075')
                .setDescription(`Botti löysi Wikipedia-artikkelin **${decoded}**, mutta se oli liian pitkä lempinimeksi.\nSuorita komento uudelleen saadaksesi toisen nimen.`)
                return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
            }else if(filtered.includes(decoded)){
                const embed = new MessageEmbed()
                .setTitle('Virhe')
                .setColor('0xd62075')
                .setDescription(`Botti löysi Wikipedia-artikkelin, joka ei kelpaa lempinimeksi.\nSuorita komento uudelleen saadaksesi toisen nimen.`)
                return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
            }else{
                if(!args[0]){

                    if(message.member.hasPermission('ADMINISTRATOR') || message.member.id === '265879123665223682'){
                        const embed = new MessageEmbed()
                        .setTitle('Satunnainen artikkeli')
                        .setColor('0xd62075')
                        .setDescription(`Generoitiin satunnainen Wikipedia-artikkeli **${decoded}**.\nLue se osoitteesta ${title}`)
                        .setFooter(`Komennon suoritti ${message.author.tag}`)
                        message.channel.send(embed);
                    }else{
                        const embed = new MessageEmbed()
                        .setTitle('Nimi vaihdettu')
                        .setColor('0xd62075')
                        .setDescription(`Käyttäjän **${message.member.nickname}** uusi nimi on **${decoded}**.\nLue Wikipedia-artikkeli osoitteesta ${title}`)
                        .setFooter(`Komennon suoritti ${message.author.tag}`)

                        message.channel.send(embed);
                        message.guild.members.cache.get(message.author.id).setNickname(decoded)
                    }
                }else if(message.mentions.members.size < 1){
                    const embed = new MessageEmbed()
                    .setTitle('Virhe')
                    .setColor('0xd62075')
                    .setDescription(`Virheellinen komennon argumentti. Käytä \`?wiki [@käyttäjä]\``)
                    return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
                }else{

                    const oldUser = message.mentions.members.first().nickname
                    const user = message.mentions.members.first().id

                    if(message.author.id === user && message.member.hasPermission('ADMINISTRATOR') || message.guild.members.cache.get(user).hasPermission('ADMINISTRATOR')){
                        const embed = new MessageEmbed()
                        .setTitle('Satunnainen artikkeli')
                        .setColor('0xd62075')
                        .setDescription(`Generoitiin satunnainen Wikipedia-artikkeli **${decoded}**.\nLue se osoitteesta ${title}`)
                        .setFooter(`Komennon suoritti ${message.author.tag}`)
                        message.channel.send(embed);
                    }else if(message.author.id !== user && message.member.hasPermission('MANAGE_MESSAGES')){
                        const embed = new MessageEmbed()
                        .setTitle('Nimi vaihdettu')
                        .setColor('0xd62075')
                        .setDescription(`Käyttäjän **${oldUser}** uusi nimi on **${decoded}**.\nLue Wikipedia-artikkeli osoitteesta ${title}`)
                        .setFooter(`Komennon suoritti ${message.author.tag}`)

                        message.channel.send(embed);
                        message.guild.members.cache.get(user).setNickname(`${decoded}`)
                    }else if(message.author.id === user && !message.member.hasPermission('MANAGE_MESSAGES')){
                        const embed = new MessageEmbed()
                        .setTitle('Nimi vaihdettu')
                        .setColor('0xd62075')
                        .setDescription(`Käyttäjän **${oldUser}** uusi nimi on **${decoded}**.\nLue Wikipedia-artikkeli osoitteesta ${title}`)
                        .setFooter(`Komennon suoritti ${message.author.tag}`)

                        message.channel.send(embed);
                        message.guild.members.cache.get(user).setNickname(`${decoded}`)
                    }else{
                        const embed = new MessageEmbed()
                        .setTitle('Virhe')
                        .setColor('0xd62075')
                        .setDescription(`Sinulla ei ole oikeuksia vaihtaa muiden käyttäjien nimiä!`)

                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    }
                }
            }
        })
    }
}  