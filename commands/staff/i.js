const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'i',
    description: "Kustomoitu siisti ilmoitusviesti",
    execute(message, args){
        message.delete({ timeout: 850 });

        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            const embed = new MessageEmbed()
            .setTitle('Virhe')
            .setColor('0xd62075')
            .setDescription('Sinulla ei ole oikeuksia käyttää tätä komentoa!')
            return message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
        }

        let split = '|';

        if(!args[0]){
            const embed = new MessageEmbed()
            .setTitle('Virhe')
            .setColor('0xd62075')
            .setDescription(`Sinun tulee määrittää ilmoitusviesti!\n\n\`\`\`?i <otsikko> ${split} <viesti>\`\`\``)
            return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }));
        }

        args = args.join(' ').split(split)

        const embed = new MessageEmbed()
        .setTitle(`${args[0]}`)
        .setColor('0xd62075')
        .setDescription(`${args[1]}`)
        message.channel.send(embed)
    }
}    