require('dotenv').config();
const profileModel = require('../../models/profileSchema');
const ValorantModel = require('../../models/valorantSchema');
const cooldown = require('../../models/cooldown');

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            message.reply('Seu perfil de pobre ainda não estava registrado sistema. Use o comando novamente :D');
            let profile = await profileModel.create
                ({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: 1000,
                    bank: 0,
                    permLevel: 0,
                    colorComands: 'RANDOM',
                    Level: 0,
                    Imposto: 0,
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

    const userInfo = await profileModel.findOne({ userID: message.author.id });
    const CommandPerm = command.permLevel;

        async function commandExecute() {
            if (userInfo.permLevel < CommandPerm) return message.reply('Você não tem permissão para usar este comando');
            try {
                command.execute(client, message, cmd, args, Discord, profileData, valorantProfile);
            } catch (err) {
                message.reply("Não disponivel"); console.log(err);
            }
        }

        if (command.cooldown) {
            const current_time = Date.now();
            const cooldown_amount = (command.cooldown) * 1000

            cooldown.findOne({ userId: message.author.id, cmd: command.name }, async (err, data) => {
                if (data) {
                    const expiration_time = data.time + cooldown_amount;

                    if (current_time < expiration_time) {
                        const time_left = (expiration_time - current_time) / 1000

                        if (time_left.toFixed(1) >= 3600) {
                            let hour = (time_left.toFixed(1) / 3600);
                            return message.reply(`Pobres precisam esperar ${parseInt(hour)} horas para usar novamente \`${command.name}\`!`)
                        }
                        if (time_left.toFixed(1) >= 60) {
                            let minute = (time_left.toFixed(1) / 60);
                            return message.reply(`Pobres precisam esperar ${parseInt(minute)} minutos para usar novamente \`${command.name}\`!`)
                        }
                        let seconds = (time_left.toFixed(1));
                        return message.reply(`Pobres precisam esperar ${parseInt(seconds)} segundos para usar novamente \`${command.name}\`!`)
                    } else {
                        await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
                        commandExecute();
                    }
                } else {
                    commandExecute();
                    new cooldown({
                        userId: message.author.id,
                        cmd: command.name,
                        time: current_time,
                        cooldown: command.cooldown,
                    }).save();
                }
            })
        } else {
            commandExecute();
        };
}