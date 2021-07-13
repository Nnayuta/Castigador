require('dotenv').config();
const profileModel = require('../../models/profileSchema');
const ValorantModel = require('../../models/valorantSchema');

module.exports = {
    name: 'valorantaccount', //nome do comando que vai ser executado
    aliases: ['val', 'valorant', 'vava',], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData, valorantProfile) {

        const Ferro1 = '<:Ferro1:864005733003296819>';
        const Ferro2 = '<:Ferro2:864005733213667338>';
        const Ferro3 = '<:Ferro3:864005733170413588>';
        const Bronze1 = '<:Bronze1:864005733035933716>';
        const Bronze2 = '<:Bronze2:864005733196496917>';
        const Bronze3 = '<:Bronze3:864005733196496917>';
        const Prata1 = '<:Prata1:864005733166743552>';
        const Prata2 = '<:Prata2:864005732881793045>';
        const Prata3 = '<:Prata3:864005734789283850>';
        const Ouro1 = '<:Ouro1:864005732839325717>';
        const Ouro2 = '<:Ouro2:864005734835945483>';
        const Ouro3 = '<:Ouro3:864005735276740629>';
        const Platina1 = '<:Platina1:864005734526222357>';
        const Platina2 = '<:Platina2:864005734805798912>';
        const Platina3 = '<:Platina3:864005734932283392>';
        const Diamante1 = '<:Diamante1:864005734600802345>';
        const Diamante2 = '<:Diamante2:864005734839484426>';
        const Diamante3 = '<:Diamante3:864005735205961738>';
        const Imortal = '<:Imortal:864005735699447818>';
        const Radiante = '<:Radiante:864005734924419122>';


        async function Principal() {
            console.log('Menu Principal');

            const Editar = '📔'

            const DefaultEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`MENU: Seu Perfil`)
                .setThumbnail('https://cdn6.aptoide.com/imgs/d/5/a/d5ad5aa0742f465d25ef4ba57a76dca1_icon.png')
                .setDescription(`
                Valorant Tag: 
                ${valorantProfile.Tag}

                Rank Atual: ${valorantProfile.CurrentRank}
                
                Rank Maximo: ${valorantProfile.MaxRank}

                Agente Principal: ${valorantProfile.Agent}

                
                📔 - Editar seu perfil

              `)
                .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            let MenuEmbed = await message.channel.send(DefaultEmb);
            await MenuEmbed.react(Editar);

            const Filter = (reaction, user) => user.id == message.author.id;
            MenuEmbed.awaitReactions(Filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();

                switch (reaction.emoji.name) {

                    case '📔':
                        const reactPerfilEmb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`MENU: Editar Perfil`)
                            .setDescription(`Em Breve`)

                            .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(reactPerfilEmb).then(msg => {
                            setTimeout(() => msg.delete(), 10000)
                        })
                        break

                }
            })


        }


    }
}