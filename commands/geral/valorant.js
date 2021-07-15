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

        let menu = args[0];
        const targetinfo = message.mentions.users.first();


        switch (menu) {
            default:
                Principal();
                break

            case 'nick':
                EditTagNew();
                break
        }

        const Yoru = '<:Yoru:863724767805964309>';
        const Viper = '<:Viper:863724767784992788>';
        const Sova = '<:Sova:863724767777783828>';
        const Skye = '<:Skye:863724767587860511>';
        const Sage = '<:Sage:863724768184107028>';
        const Reyna = '<:Reyna:863724767667814462>';
        const Raze = '<:Raze:863724767780929556>';
        const Phoenix = '<:Phoenix:863724767974653972>';
        const Omen = '<:Omen:863724767819595776>';
        const Killjoy = '<:Killjoy:863724767805833257>';
        const KAYO = '<:KAYO:863724767836110849>';
        const Jett = '<:Jett:863724767717359626>';
        const Cypher = '<:Cypher:863724767361237024>';
        const Brimstone = '<:Brimstone:863724767822479390>';
        const Breach = '<:Breach:863724767693504532>';
        const Astra = '<:Astra:863724767730597909>';

        // ============================================== \\

        const Ferro1 = '<:Ferro1:864005733003296819>';
        const Ferro2 = '<:Ferro2:864005733213667338>';
        const Ferro3 = '<:Ferro3:864005733170413588>';
        const Bronze1 = '<:Bronze1:864005733035933716>';
        const Bronze2 = '<:Bronze2:864005733397430282>';
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

        let RankSet;
        let RanKID;
        async function AlterarRank() {

            if (RanKID > valorantProfile.MaxRankID) {
                const changeRankMax = await ValorantModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    MaxRank: RankSet,
                    MaxRankID: RanKID,
                });
                // ENVIAR UMA MENSSAGEM DE PARABENS POR TER UPADO DE RANK :D
            }

            const changeRank = await ValorantModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                CurrentRank: RankSet,
                CurrentRankID: RanKID,
            });
        }

        async function Principal() {
            const Editar = '📔'

            if (targetinfo) {
                const TargetData = await ValorantModel.findOne({ userID: targetinfo.id });
                console.log(targetinfo.id);
                if (!TargetData) return message.reply('Pobre não encontrado');

                const TargetDefaultEmb = new Discord.MessageEmbed()
                    .setColor(profileData.colorComands)
                    .setTitle(`VALORANT: ${targetinfo.username}`)
                    .setThumbnail(targetinfo.displayAvatarURL())
                    .setDescription(`

                **Valorant:** **${TargetData.Tag}**
                \u200B
                        ** - AGENTES E CLASSE -**
                \u200B
                **Classe:** ${TargetData.RoleMain}
                **Agente Principal:** ${TargetData.Agent}
                \u200B
                         **- RANK (ELO) -**
                \u200B
                **Rank Atual:** ${TargetData.CurrentRank}
                **Rank Maximo:** ${TargetData.MaxRank}
                \u200B
                \u200B
              `)

                    .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
             message.channel.send(TargetDefaultEmb);

                return
            }

            const DefaultEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`VALORANT: ${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`

                **Valorant:** **${valorantProfile.Tag}**
                \u200B
                        ** - AGENTES E CLASSE -**
                \u200B
                **Classe:** ${valorantProfile.RoleMain}
                **Agente Principal:** ${valorantProfile.Agent}
                \u200B
                         **- RANK (ELO) -**
                \u200B
                **Rank Atual:** ${valorantProfile.CurrentRank}
                **Rank Maximo:** ${valorantProfile.MaxRank}
                \u200B
                \u200B
                📔- Para editar seu perfil do VALORANT
              `)

                .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            let MenuEmbed = await message.channel.send(DefaultEmb);
            await MenuEmbed.react(Editar);

            const Filter = (reaction, user) => user.id == message.author.id;
            MenuEmbed.awaitReactions(Filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();

                if (reaction.emoji.name == '📔') {
                    EditarFunc();
                }
            })


        }

        const rankemoji = '<:EditRank:864414767007399966>';
        const tagemoji = '🎚️';
        const agenEmoji = '🔫';
        const classEmoji = '💸';

        async function EditarFunc() {
            console.log('Menu Editar');
            const EditarMenuEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`VALORANT: Editar ${message.author.username} Perfil`)
                .setDescription(` 
                \u200B
                <:EditRank:864414767007399966> - Editar seu Rank(Elo) atual
                🎚️ - Para saber como alterar sua ValorantTag
                🔫 - Para editar seu agente principal
                💸 - para editar sua classe exemplo: Duelista
                \u200B
                \u200B
                `)
                .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            let MenuEmbedReact = await message.channel.send(EditarMenuEmb);
            await MenuEmbedReact.react(rankemoji);
            await MenuEmbedReact.react(tagemoji);
            await MenuEmbedReact.react(agenEmoji);
            await MenuEmbedReact.react(classEmoji);

            const Filter = (reaction, user) => user.id == message.author.id;
            MenuEmbedReact.awaitReactions(Filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();
                reaction.message.delete();

                if (reaction.emoji.name == 'EditRank') {
                    EditRank();
                } else if (reaction.emoji.name == '🎚️') {
                    EditTag();
                }
                else if (reaction.emoji.name == '🔫') {
                    AgentMain();
                } else if (reaction.emoji.name == '💸') {
                    RoleMain();
                }


            })
        }

        async function EditRank() {

            console.log('Menu Rank');

            const RankEditorEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`VALORANT: Editar Rank
                Aguarde o bot reagir a todos os ranks o ultimo é o: <:Radiante:864005734924419122>
                    
                    Apos isso é so reagir ao seu rank(elo) atual
                    `)
            let RankReaction = await message.channel.send(RankEditorEmb);
            await RankReaction.react(Ferro1);
            await RankReaction.react(Ferro2);
            await RankReaction.react(Ferro3);
            await RankReaction.react(Bronze1);
            await RankReaction.react(Bronze2);
            await RankReaction.react(Bronze3);
            await RankReaction.react(Prata1);
            await RankReaction.react(Prata2);
            await RankReaction.react(Prata3);
            await RankReaction.react(Ouro1);
            await RankReaction.react(Ouro2);
            await RankReaction.react(Ouro3);
            await RankReaction.react(Platina1);
            await RankReaction.react(Platina2);
            await RankReaction.react(Platina3);
            await RankReaction.react(Diamante1);
            await RankReaction.react(Diamante2);
            await RankReaction.react(Diamante3);
            await RankReaction.react(Imortal);
            await RankReaction.react(Radiante);

            const Filter = (reaction, user) => user.id == message.author.id;
            RankReaction.awaitReactions(Filter, { max: 1, time: 120000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();
                reaction.message.delete();
                reaction.message.delete();

                console.log('ID ' + reaction.emoji.id);
                console.log('Nome ' + reaction.emoji.name);

                switch (reaction.emoji.name) {

                    case 'Ferro1':

                        const Ferro1Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Ferro1}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Ferro1Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Ferro1;
                        RanKID = 1;

                        AlterarRank();

                        break

                    case 'Ferro2':

                        const Ferro2Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Ferro3}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Ferro2Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Ferro2;
                        RanKID = 2;

                        AlterarRank();

                        break

                    case 'Ferro3':

                        const Ferro3Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Ferro3}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Ferro3Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Ferro3;
                        RanKID = 3;

                        AlterarRank();

                        break

                    case 'Bronze1':

                        const Bronze1Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Bronze1}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Bronze1Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Bronze1;
                        RanKID = 4;

                        AlterarRank();

                        break

                    case 'Bronze2':

                        const Bronze2Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Bronze2}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Bronze2Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Bronze2;
                        RanKID = 5;

                        AlterarRank();

                        break


                    case 'Bronze3':

                        const Bronze3Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Bronze3}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Bronze3Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Bronze3;
                        RanKID = 6;

                        AlterarRank();

                        break

                    case 'Prata1':

                        const Prata1Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Prata1}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Prata1Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Prata1;
                        RanKID = 7;

                        AlterarRank();

                        break

                    case 'Prata2':

                        const Prata2Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Prata2}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Prata2Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Prata2;
                        RanKID = 8;

                        AlterarRank();

                        break

                    case 'Prata3':

                        const Prata3Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Prata3}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Prata3Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Prata3;
                        RanKID = 9;

                        AlterarRank();

                        break

                    case 'Ouro1':

                        const Ouro1Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Ouro1}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Ouro1Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Ouro1;
                        RanKID = 10;

                        AlterarRank();

                        break

                    case 'Ouro2':

                        const Ouro2Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Ouro2}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Ouro2Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Ouro2;
                        RanKID = 11;

                        AlterarRank();

                        break

                    case 'Ouro3':

                        const Ouro3Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Ouro3}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Ouro3Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Ouro3;
                        RanKID = 12;

                        AlterarRank();

                        break

                    case 'Platina1':

                        const Platina1Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Platina1}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Platina1Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Platina1;
                        RanKID = 13;

                        AlterarRank();

                        break

                    case 'Platina2':

                        const Platina2Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Platina2}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Platina2Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Platina2;
                        RanKID = 14;

                        AlterarRank();

                        break

                    case 'Platina3':

                        const Platina3Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Platina3}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Platina3Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Platina3;
                        RanKID = 15;

                        AlterarRank();

                        break

                    case 'Diamante1':

                        const Diamante1Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Diamante1}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Diamante1Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Diamante1;
                        RanKID = 16;

                        AlterarRank();

                        break

                    case 'Diamante2':

                        const Diamante2Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Diamante2}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Diamante2Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Diamante2;
                        RanKID = 17;

                        AlterarRank();

                        break

                    case 'Diamante3 ':

                        const Diamante3Emb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Diamante3}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(Diamante3Emb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Diamante3;
                        RanKID = 18;

                        AlterarRank();

                        break

                    case 'Imortal ':

                        const ImortalEmb = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Imortal}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(ImortalEmb).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Imortal;
                        RanKID = 19;

                        AlterarRank();

                        break

                    case 'Radiante ':

                        const ShowFerro1Rank = new Discord.MessageEmbed()
                            .setColor(profileData.colorComands)
                            .setTitle(`Valorant: ${message.author.username}`)
                            .setDescription(`Valorant: rank atualizado para: ${Radiante}`)
                            .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                        message.channel.send(ShowFerro1Rank).then(msg => { setTimeout(() => msg.delete(), 120000) });

                        RankSet = Radiante;
                        RanKID = 20;

                        AlterarRank();

                        break
                }

            })

        }

        async function EditTag() {

            console.log('Menu Tag');

            const RankEditorEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`
                VALORANT: Editar Tag

        Exemplo: Digite: $val nick suatag#br1
                    `)
            message.channel.send(RankEditorEmb);

        }

        async function EditTagNew() {
            const Vtag = args.slice(1).join(" ");

            const changeTag = await ValorantModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                Tag: Vtag,
            });

            message.reply(`seu valorant nick foi atualizada para: ${Vtag}`)

        }

        let NovoAgent;
        async function UpdateAgent() {
            const changeagentmain = await ValorantModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                Agent: NovoAgent,
            });

            const AgentupdateEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`Valorant: ${message.author.username}`)
                .setDescription(`Valorant: Agente principal atualizado para: ${NovoAgent}`)
                .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            message.channel.send(AgentupdateEmb).then(msg => { setTimeout(() => msg.delete(), 120000) });
        }

        async function AgentMain() {

            console.log('Menu Editar Agente Principal');
            const EditarMenuEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`VALORANT: Editar Perfil`)
                .setDescription(` 
            
                Aguarde até aparecer o ultimo agente -> ${Astra} <-

                `)
                .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            let MenuEmbedReact = await message.channel.send(EditarMenuEmb);
            await MenuEmbedReact.react(Yoru);
            await MenuEmbedReact.react(Viper);
            await MenuEmbedReact.react(Sova);
            await MenuEmbedReact.react(Skye);
            await MenuEmbedReact.react(Sage);
            await MenuEmbedReact.react(Reyna);
            await MenuEmbedReact.react(Raze);
            await MenuEmbedReact.react(Phoenix);
            await MenuEmbedReact.react(Omen);
            await MenuEmbedReact.react(Killjoy);
            await MenuEmbedReact.react(KAYO);
            await MenuEmbedReact.react(Jett);
            await MenuEmbedReact.react(Cypher);
            await MenuEmbedReact.react(Brimstone);
            await MenuEmbedReact.react(Breach);
            await MenuEmbedReact.react(Astra);


            const Filter = (reaction, user) => user.id == message.author.id;
            MenuEmbedReact.awaitReactions(Filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();
                reaction.message.delete();

                if (reaction.emoji.name == 'Yoru') {
                    NovoAgent = Yoru;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Viper') {
                    NovoAgent = Viper;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Sova') {
                    NovoAgent = Sova;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Skye') {
                    NovoAgent = Skye;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Sage') {
                    NovoAgent = Sage;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Reyna') {
                    NovoAgent = Reyna;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Phoenix') {
                    NovoAgent = Phoenix;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Omen') {
                    NovoAgent = Omen;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Killjoy') {
                    NovoAgent = Killjoy;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'KAYO') {
                    NovoAgent = KAYO;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Jett') {
                    NovoAgent = Jett;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Cypher') {
                    NovoAgent = Cypher;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Brimstone') {
                    NovoAgent = Brimstone;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Breach') {
                    NovoAgent = Breach;
                    UpdateAgent();

                } else if (reaction.emoji.name == 'Astra') {
                    NovoAgent = Astra;
                    UpdateAgent();

                }

            })


        }

        let MainRoleUpdate;

        async function UpdateRoleMain() {

            const changeRole = await ValorantModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                RoleMain: MainRoleUpdate,
            });

            const AgentupdateEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`Valorant: ${message.author.username}`)
                .setDescription(`Valorant: sua classe foi alterada para: ${MainRoleUpdate}`)
                .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            message.channel.send(AgentupdateEmb).then(msg => { setTimeout(() => msg.delete(), 120000) });

        }


        const ControllerClass = '<:ControllerClass:864581773485015070>';
        const DuelistClass = '<:DuelistClass:864581773388283905>';
        const InitiatorClass = '<:InitiatorClass:864581773399818280>';
        const SentinelClass = '<:SentinelClass:864581773455130664>';

        async function RoleMain() {

            console.log('Menu Editar Agente Principal');
            const EditarMenuEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`VALORANT: Editar Perfil`)
                .setDescription(` 
            
                Aguarde até aparecer a ultimo classe aparecer -> ${SentinelClass} <-

                `)
                .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            let MenuEmbedReact = await message.channel.send(EditarMenuEmb);
            await MenuEmbedReact.react(ControllerClass);
            await MenuEmbedReact.react(DuelistClass);
            await MenuEmbedReact.react(InitiatorClass);
            await MenuEmbedReact.react(SentinelClass);


            const Filter = (reaction, user) => user.id == message.author.id;
            MenuEmbedReact.awaitReactions(Filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();
                reaction.message.delete();

                if (reaction.emoji.name == 'ControllerClass') {
                    MainRoleUpdate = ControllerClass;
                    UpdateRoleMain();

                } else if (reaction.emoji.name == 'DuelistClass') {
                    MainRoleUpdate = DuelistClass;
                    UpdateRoleMain();

                } else if (reaction.emoji.name == 'InitiatorClass') {
                    MainRoleUpdate = InitiatorClass;
                    UpdateRoleMain();

                } else if (reaction.emoji.name == 'SentinelClass') {
                    MainRoleUpdate = SentinelClass;
                    UpdateRoleMain();

                }

            })

        }

    }
}