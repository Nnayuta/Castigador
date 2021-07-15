const profileModel = require('../../models/profileSchema');
const Canvas = require('canvas');
const DD = require('discord.js');

module.exports = async (client, Discord, member) => {

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: member.id });
        if (!profileData) {
            let profile = await profileModel.create
                ({

                    userID: member.id,
                    serverID: member.guild.id,
                    coins: 1000,
                    bank: 0,
                    permLevel: 0,
                    colorComands: 'RANDOM',
                    Level: 0,

                })
            profile.save();
        }
        else {
            console.log('Novo usuario ja registrado em nosso banco de dados.')
        }
    } catch (err) {
        console.log(err);
    }

    //============================================================================================================\\

    const applyText = (canvas, text) => {
        const context = canvas.getContext('2d');
        let fontSize = 70;

        do {
            context.font = `${fontSize -= 10}px sans-serif`;
        } while (context.measureText(text).width > canvas.width - 300);

        return context.font;
    };

    const channel = member.guild.channels.cache.find(ch => ch.name === 'bem-vindo');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');

    let RandomBackGround = [
        "https://i.imgur.com/xREdieH.gif",
        "https://i.imgur.com/FtLAOXx.gif",
        "https://i.imgur.com/5Rfkr5Q.gif"
    ]

    const idrandom = Math.floor(Math.random() * 3) + 1;

    const background = await Canvas.loadImage(RandomBackGround[idrandom]);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#74037b';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    const BemVindo = await Canvas.loadImage('https://i.imgur.com/2nSlafi.png');
    const canvas2 = Canvas.createCanvas(470, 100);
    context.drawImage(BemVindo, 220, 0, canvas2.width, canvas2.height);

    context.font = applyText(canvas, `${member.displayName}!`);
    context.fillStyle = profileData.colorComands;
    context.fillText(`${member.displayName}!`, canvas.width / 2.0, canvas.height / 1.5);

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    context.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new DD.MessageAttachment(canvas.toBuffer(), `${member.displayName}_bemvindo.jpg`);

    channel.send(`Bem vindo(a) ${member} Pobre!`, attachment);

}
