const { MessageEmbed } = require('discord.js');

const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('../../client_secret.json');
const prefix = require('../../main.js');

module.exports = {
    name: 'pokemon',
    description: "Tällä komennolla voit lisätä Pokémon GO -kaverikoodisi listaan ja saat itsellesi erityisen Poksupoppoo-rankin.",
    cooldown: 30,
    expire: '30s',
    execute(message, args){
        message.delete({ timeout: 850 });

        let split = '|';

            if(!args[0] || isNaN(args[0])){
                const embed = new MessageEmbed()
                .setTitle('Virhe')
                .setColor('0xd62075')
                .setDescription('Sinun tulee syöttää Pokémon GO -kaverikoodisi!')
                .setFooter(`Komennon suoritti ${message.author.tag}`)
                return message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
            }

            let giveID = args.join(" ").split(split);

            if(message.member.roles.cache.get('733794611994165270')){
                const embed = new MessageEmbed()
                .setTitle('Virhe')
                .setColor('0xd62075')
                .setDescription('Olet jo antanut Pokémon GO -kaverikoodisi, löydät listan kaverikoodeista osoitteesta\nhttps://bit.ly/2XC5yW0\nMikäli uskot tämän olevan virhe, otathan yhteyttä adminiin <@236826409287286784>')
                .setFooter(`Komennon suoritti ${message.author.tag}`)
                return message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
            } else {
                    const pokemonNimi = message.author.tag
                    const pokemonID = giveID

                    console.log(`Nimi: ${pokemonNimi}, ID: ${pokemonID}`);

                    message.guild.members.cache.get(message.member.id).roles.add('733794611994165270').catch();
                    
                    async function accessSpreadsheet() {
                        const doc = new GoogleSpreadsheet('18y32wc-Iapk557pV_pvP05aBMRQc0ytQ9PIrP-rSNZs');
                        await promisify(doc.useServiceAccountAuth)(creds);
                        const info = await promisify(doc.getInfo)();
                        const sheet = info.worksheets[0];
                        
                        const row = {
                            Nimi: `${pokemonNimi}`,
                            Koodi: `'${pokemonID}`
                        }
                    
                        await promisify(sheet.addRow)(row).catch();
                    
                    }    
                    
                    accessSpreadsheet();

                    const embed = new MessageEmbed()
                    .setTitle('Kaverikoodisi lisätty onnistuneesti')
                    .setColor('0xd62075')
                    .setDescription(`Kaverikoodisi lisättiin luetteloon, jonka löydät kätevästi osoitteesta https://bit.ly/2XC5yW0. \n\nSinulla on nyt myös erityinen Poksupoppoo-rankki!`)
                    .setFooter(`Komennon suoritti ${message.author.tag}`)
                    return message.channel.send(embed).catch().then(msg => msg.delete({ timeout: 8000 }));
               }               
            }
        }       