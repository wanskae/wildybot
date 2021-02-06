const Discord = require('discord.js');
const fs = require('fs');
let Intss = new Discord.Intents(Discord.Intents.ALL);

const client = new Discord.Client({ws: { intents: Intss }});
const prefix = '?';

client.config = require('./config');
client.commands = new Discord.Collection();
let recentlyRan = []

fs.readdirSync('./commands/').forEach(dirs => {
    const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for(const file of commandFiles){
        const command = require(`./commands/${dirs}/${file}`);
    
        client.commands.set(command.name.toLowerCase(), command);
    }

});

client.on('ready', async() => {
    
    client.user.setActivity("deliwien", {type: "WATCHING"});

    console.log('Beep beep boop!');

    const updateEvent = fs.readdirSync('./channelupdate').filter(file => file.endsWith('.js'));
    for (const file of updateEvent) {
        const event = require(`./channelupdate/${file}`);
        event(client);
    };
});

client.on('message', async message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
    if(!command) return;

    let cooldownString = `${message.member.id} - ${command.name}`

    if(command.cooldown > 0 && recentlyRan.includes(cooldownString) && !message.member.hasPermission("ADMINISTRATOR")){
        message.delete()

        const embed = new Discord.MessageEmbed()
        .setTitle('Virhe')
        .setColor('0xd62075')
        .setDescription(`Sinun tulee odottaa ennen kuin voit käyttää tätä komentoa uudelleen!\nKomentoa **${prefix}${command.name}** voi käyttää **${command.expire}** välein.`)
        return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }));
    }


    if(commandName && !recentlyRan.includes(cooldownString)){
        command.execute(message, args, client, Discord);
    }


    if (command.cooldown > 0 && !message.member.hasPermission("ADMINISTRATOR")){
        recentlyRan.push(cooldownString)

        setTimeout(() => {
            recentlyRan = recentlyRan.filter((string) => {
                return string !== cooldownString 
            })
        }, 1000 * command.cooldown)
    }else{
        recentlyRan = recentlyRan.filter((string) => {
            return string !== cooldownString 
        })
    }
});

client.login(client.config.discord.token);