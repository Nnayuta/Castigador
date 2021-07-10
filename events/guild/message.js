require('dotenv').config();

const cooldowns = new Map();

module.exports = (Discord, client, message) =>
{
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    //ADICIONA COOLDOWN AO COMANDO

    const command = client.commands.get(cmd) ||
     client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amout = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id))
    {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amout;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;

            return message.reply(`Seu pobre os comandos não sao de graça então aguarde ${time_left.toFixed(1)} para poder usar o comando ${command.name}`);
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amout);

    //Nivel de Acesso

    const SAdmin = message.member.roles.cache.has(process.env.SadmRole);
    const Admin = message.member.roles.cache.has(process.env.AdmRole);
    const Fiscal = message.member.roles.cache.has(process.env.FiscalRole);

    const ServerOwner = message.member.roles.cache.has(process.env.HgznID);
    const BotOwner = message.member.roles.cache.has(process.env.NayutaID);

    if(command.permlevel == '5')//BotOwner
    {
        if(BotOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else
        {
        message.reply("Este comando não esta disponivel para pobres.");
        }

    }

    if(command.permlevel == '4')//ServerOwner
    {
        if(BotOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(ServerOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else
        {
        message.reply("Este comando não esta disponivel para pobres.");
        }

    }
    
    if(command.permlevel == '3')//SAdmin
    {
        if(BotOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(ServerOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(SAdmin) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else
        {
        message.reply("Este comando não esta disponivel para pobres.");
        }

    }

    if(command.permlevel == '2')//Admin
    {
        if(BotOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(ServerOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(SAdmin) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(Admin) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else
        {
        message.reply("Este comando não esta disponivel para pobres.");
        }

    }

    if(command.permlevel == '1') //Fiscal
    {
        if(BotOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(ServerOwner) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(SAdmin) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(Admin) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else if(Fiscal) {try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}}
        else
        {
        message.reply("Este comando não esta disponivel para pobres.");
        }
    }

    if(command.permlevel == '0')//Geral
    {
        try{command.execute(client, message, cmd, args, Discord);}catch(err){message.reply("Não disponivel");console.log(err);}
    }
}