require('dotenv').config();
const profileModel = require('../../models/profileSchema');
const ValorantModel = require('../../models/valorantSchema');

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create
                ({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: 1000,
                    bank: 0,
                    permLevel: 0,
                    colorComands: 'RANDOM',
                    Level: 0,
                })
        }
    } catch (err) {
        console.log(err);
    }

    //

    let valorantProfile;
    try {
        valorantProfile = await ValorantModel.findOne({ userID: message.author.id });
        if (!valorantProfile) {
            let profile = await ValorantModel.create
                ({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    Tag: 'val#123',
                    CurrentRank: 'ferro1',
                    MaxRank: 'ferro1',
                    Agent: 'agent',
                    CurrentRankID: 0,
                    MaxRankID: 0,
                    RoleMain: 'Necessario Selecionar',

                })
        }

    } catch (err) {
        console.log(err);
    }

    //

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) ||
        client.commands.find(a => a.aliases && a.aliases.includes(cmd));


    const PredoOtario = command.permLevel;

    try {
        let permLeveldata = await profileModel.findOne({ userID: message.author.id });
        console.log('permLeveldata.permLevel ' + permLeveldata.permLevel);
        console.log('command.permLevel: ' + PredoOtario);

        if (permLeveldata.permLevel >= PredoOtario) {
            // ================================================================================================================================== \\
            //                                                      ADICIONA COOLDOWN AO COMANDO                                                   \\
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const current_time = Date.now();
            const time_stamps = cooldowns.get(command.name);
            const cooldown_amout = (command.cooldown) * 1000;

            if (time_stamps.has(message.author.id)) {
                const expiration_time = time_stamps.get(message.author.id) + cooldown_amout;

                if (current_time < expiration_time) {
                    const time_left = (expiration_time - current_time) / 1000;

                    return message.reply(`Seu pobre os comandos não sao de graça então aguarde ${time_left.toFixed(1)} segundos para poder usar o comando ${command.name} novamente.`);
                }
            }

            time_stamps.set(message.author.id, current_time);
            setTimeout(() => time_stamps.delete(message.author.id), cooldown_amout);

            // ======================================================================================= \\

            try { command.execute(client, message, cmd, args, Discord, profileData, valorantProfile); } catch (err) { message.reply("Não disponivel"); console.log(err); }
        }
        else {
            message.reply('Você é muito pobre por isso não tem permissão para fazer isso!');
        }
    }
    catch (err) {
        console.log(err);
    }
}