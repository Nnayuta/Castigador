require('dotenv').config();
const profileModel = require('../../models/profileSchema');
const ValorantModel = require('../../models/valorantSchema');
const { MessageEmbed, MessageButton } = require('discord-buttons');
const Canvas = require('canvas');


module.exports = {
    name: 'valorantaccount', //nome do comando que vai ser executado
    aliases: ['val', 'valorant', 'vava', 'devval'], //como usar: ['aliases', 'separados']
    cooldown: 3, // Valor em segundos
    permLevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    CoinCost: 0, // Custo da moeda do servidor para usar comandos
    description: "Você registra suas informações do valorant para outros membros do discord poderem visualizar!",
    async execute(client, message, cmd, args, Discord, profileData, valorantProfile) {


        let menu = args[0];
        const targetinfo = message.mentions.users.first();

        switch (menu) {
            default:
                perfil()
                break;

            case 'nick' || 'tag' || 'n' || 't':
                EditarTag();
                break

        }

        // PERFIL PRINCIPAL

        async function perfil() {

            if (targetinfo) {
                const TargetData = await ValorantModel.findOne({ userID: targetinfo.id });
                console.log(targetinfo.id);
                if (!TargetData) return message.reply('Pobre não encontrado');

                const TargetDefaultEmb = new Discord.MessageEmbed()
                    .setColor(profileData.colorComands)
                    .setAuthor(`Valorant Perfil de: ${targetinfo.username}`, targetinfo.displayAvatarURL())
                    .setTitle(`Valorant Tag: ${targetinfo.username}`)
                    .setThumbnail(targetinfo.displayAvatarURL())
                    .setDescription(`
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

            }
            else {

                const PerfilEmb = new Discord.MessageEmbed()
                    .setColor(profileData.colorComands)
                    .setAuthor(`Valorant Perfil de: ${message.author.username}`, message.author.displayAvatarURL())
                    .setTitle(`Valorant Tag: ${valorantProfile.Tag}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`
                
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
                
                
                `)
                    .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')

                const EditPerfil = new MessageButton()
                    .setStyle('red')
                    .setLabel('Editar Perfil')
                    .setID('editperfil')


                let PerfilMessage = await message.channel.send({
                    button: EditPerfil,
                    embed: PerfilEmb
                });


                
            }

        }

        // EDITAR PERFIL

        async function EditarPerfil() {
            const EditarMenuEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setAuthor(`Valorant Perfil de: ${message.author.username}`, message.author.displayAvatarURL())
                .setTitle(`Editar Perfil`)
                .setDescription(` `)
                .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')

            const AgentMainEdit = new MessageButton()
                .setStyle('red')
                .setLabel('Editar Agente')
                .setID('editagent')

            const RankEdit = new MessageButton()
                .setStyle('red')
                .setLabel('Editar Rank')
                .setID('editrank')

            const TagMessage = new MessageButton()
                .setStyle('red')
                .setLabel('Editar Nick#Tag')
                .setID('edittag')
            const RoleEdit = new MessageButton()
                .setStyle('red')
                .setLabel('Editar Classe')
                .setID('editrole')


            let EditarPerfilMessage = await message.channel.send({
                buttons: [RoleEdit, AgentMainEdit, RankEdit, TagMessage],
                embed: EditarMenuEmb
            });

            client.on('clickButton', async (button) => {
                if (button.id == 'editagent' && button.clicker.id == message.author.id) {
                    editAgent();
                    EditarPerfilMessage.delete();
                }
                else if (button.id == 'editrank' && button.clicker.id == message.author.id) {
                    editRank();
                    EditarPerfilMessage.delete();
                } else if (button.id == 'edittag' && button.clicker.id == message.author.id) {
                    TagMessage();
                    EditarPerfilMessage.delete();
                }
                else if (button.id == 'editrole' && button.clicker.id == message.author.id) {
                    RolePrincipal();
                    EditarPerfilMessage.delete();
                }



            })

        }

        // SISTEMA PARA ALTERA O AGENTE PRINCIPAL
        let NovoAgent;
        async function UpdateAgent() {
            const changeagentmain = await ValorantModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                Agent: NovoAgent,
            });

            const AgentupdateEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setAuthor(`Valorant Perfil: **${message.author.username}**`, message.author.displayAvatarURL())
                .setDescription(`Valorant: Agente principal atualizado para: ${NovoAgent}`)
                .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            message.channel.send(AgentupdateEmb).then(msg => { setTimeout(() => msg.delete(), 5000) });

            perfil();
        }

        async function editAgent() {

            const selectAgent = [
                //CONTROLADOR
                '<:Brimstone:863724767822479390>',
                '<:Viper:863724767784992788>',
                '<:Omen:863724767819595776>',
                '<:Astra:863724767730597909>',
                //DUELISTAS
                '<:Phoenix:863724767974653972>',
                '<:Jett:863724767717359626>',
                '<:Reyna:863724767667814462>',
                '<:Raze:863724767780929556>',
                '<:Yoru:863724767805964309>',
                //INICIADOR
                '<:Sova:863724767777783828>',
                '<:Breach:863724767693504532>',
                '<:Skye:863724767587860511>',
                '<:KAYO:863724767836110849>',
                //SENTINELA
                '<:Killjoy:863724767805833257>',
                '<:Cypher:863724767361237024>',
                '<:Sage:863724768184107028>'
            ]
            const EditarMenuEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setAuthor(`Valorant Perfil: **${message.author.username}**`, message.author.displayAvatarURL())
                .setTitle(`Mudar agente principal`)
                .setDescription(`

                <:ControllerClass:864581773485015070>

                <:Brimstone:863724767822479390> | <:Viper:863724767784992788> | <:Omen:863724767819595776> |<:Astra:863724767730597909> 

                <:DuelistClass:864581773388283905>

                <:Phoenix:863724767974653972> | <:Jett:863724767717359626> | <:Reyna:863724767667814462> | <:Raze:863724767780929556> | <:Yoru:863724767805964309>

                <:InitiatorClass:864581773399818280>

                <:Sova:863724767777783828> | <:Breach:863724767693504532> | <:Skye:863724767587860511> | <:KAYO:863724767836110849>

                <:SentinelClass:864581773455130664>

                <:Killjoy:863724767805833257> | <:Cypher:863724767361237024> | <:Sage:863724768184107028>
                `)

                .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            let MenuEmbedReact = await message.channel.send(EditarMenuEmb);

            for (const agente of selectAgent) {
                await MenuEmbedReact.react(agente);
            }

            const Filter = (reaction, user) => user.id == message.author.id;
            MenuEmbedReact.awaitReactions(Filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();
                reaction.message.delete();

                NovoAgent = `<:${reaction.emoji.name}:${reaction.emoji.id}>`;

                UpdateAgent();
            })

        }

        // SISTEMA PARA ALTERAR O RANK

        async function AlterarRank(RankID, RankAtual) {

            if (RankID > valorantProfile.MaxRankID) {
                const changeRankMax = await ValorantModel.findOneAndUpdate({
                    userID: message.author.id,
                }, {
                    MaxRank: RankAtual,
                    MaxRankID: RankID,
                });

                const ParabensPorUpar = new Discord.MessageEmbed()
                    .setColor(profileData.colorComands)
                    .setAuthor(`Valorant Perfil: **${message.author.username}**`, message.author.displayAvatarURL())
                    .setTitle(`Parabens por ter upado :D`)
                message.channel.send(ParabensPorUpar).then(msg => { setTimeout(() => msg.delete(), 5000) });
            }

            const changeRank = await ValorantModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                CurrentRank: RankAtual,
                CurrentRankID: RankID,
            });


            const RankChanged = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setAuthor(`Valorant Perfil: **${message.author.username}**`, message.author.displayAvatarURL())
                .setTitle(`VALORANT`)
                .setDescription(`Rank atualizado para: ${RankAtual}`)
                .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            await message.channel.send(RankChanged).then(msg => { setTimeout(() => msg.delete(), 5000) });

            perfil();
        }

        async function editRank() {

            const selectrank = [
                //FERRO
                '<:Ferro1:864005733003296819>',
                '<:Ferro2:864005733213667338>',
                '<:Ferro3:864005733170413588>',
                //BRONZE
                '<:Bronze1:864005733035933716>',
                '<:Bronze2:864005733397430282>',
                '<:Bronze3:864005733196496917>',
                //PRATA
                '<:Prata1:864005733166743552>',
                '<:Prata2:864005732881793045>',
                '<:Prata3:864005734789283850>',
                //OURO
                '<:Ouro1:864005732839325717>',
                '<:Ouro2:864005734835945483>',
                '<:Ouro3:864005735276740629>',
                //PLATINA
                '<:Platina1:864005734526222357>',
                '<:Platina2:864005734805798912>',
                '<:Platina3:864005734932283392>',
                //DIAMANTE
                '<:Diamante1:864005734600802345>',
                '<:Diamante2:864005734839484426>',
                '<:Diamante3:864005735205961738>',
                //IMORTAL
                '<:Imortal:864005735699447818>',
                //RADIANTE
                '<:Radiante:864005734924419122>'
            ]

            const RankEditorEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setAuthor(`Valorant Perfil: **${message.author.username}**`, message.author.displayAvatarURL())
                .setTitle(`Editar rank`)
            let RankMenu = await message.channel.send(RankEditorEmb);

            for (const rank of selectrank) {
                await RankMenu.react(rank);
            }

            const Filter = (reaction, user) => user.id == message.author.id;
            RankMenu.awaitReactions(Filter, { max: 1, timer: 30000, erros: ["time"] }).then(collected => {

                const reaction = collected.first();
                reaction.message.delete();
                // 1 = Ferro | 20 = Radiante

                const UpdateRank = new Discord.MessageEmbed()
                    .setColor(profileData.colorComands)
                    .setAuthor(`Valorant Perfil: **${message.author.username}**`, message.author.displayAvatarURL())
                    .setDescription(`Valorant: rank atualizado para: `)
                    .setFooter('Ajudando pobres desde 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                message.channel.send(UpdateRank).then(msg => { setTimeout(() => msg.delete(), 5000) });

                switch (reaction.emoji.name) {

                    case 'Ferro1':
                        AlterarRank(1, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Ferro2':
                        AlterarRank(2, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Ferro3':
                        AlterarRank(3, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Bronze1':
                        AlterarRank(4, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Bronze2':
                        AlterarRank(5, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Bronze3':
                        AlterarRank(6, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Prata1':
                        AlterarRank(7, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Prata2':
                        AlterarRank(8, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Prata3':
                        AlterarRank(9, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Ouro1':
                        AlterarRank(10, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Ouro2':
                        AlterarRank(11, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Ouro3':
                        AlterarRank(12, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Platina1':
                        AlterarRank(13, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Platina2':
                        AlterarRank(14, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Platina3':
                        AlterarRank(15, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Diamante1':
                        AlterarRank(16, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Diamante2':
                        AlterarRank(17, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Diamante3':
                        AlterarRank(18, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Imortal':
                        AlterarRank(19, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                    case 'Radiante':
                        AlterarRank(18, `<:${reaction.emoji.name}:${reaction.emoji.id}>`);
                        break
                }


            })
        }

        // ALTERAR VALORANT TAG

        async function EditarTag() {

            const vtag = args.slice(1).join(" ");

            const changeTag = await ValorantModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                Agent: NovoAgent,
            });

            let TagUpdated = Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setAuthor(`Valorant Perfil de: ${message.author.username}`, message.author.displayAvatarURL())
                .setTitle(`Valorant Tag atualizada ${vtag}`)
            message.channel.send(TagUpdated).then(msg => { setTimeout(() => msg.delete(), 5000) });
            perfil()

        }

        async function TagMessage() {
            const TagMesageEmb = new Discord.MessageEmbed()
                .setColor(profiledata.colorComands)
                .setDescription(`

            COMO EDITAR SUA TAG:

            EXEMPLO: $val nick suatag#br1

            `)
            message.channel.send(TagMesageEmb).then(msg => { setTimeout(() => msg.delete(), 5000) });;
        }

        // ALTERAR CLASSE

        async function UpdateRoleMain(MainRoleUpdate) {

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
            message.channel.send(AgentupdateEmb).then(msg => { setTimeout(() => msg.delete(), 5000) });

            perfil();
        }

        async function RolePrincipal() {

            const classe = [
                '<:ControllerClass:864581773485015070>',
                '<:DuelistClass:864581773388283905>',
                '<:InitiatorClass:864581773399818280>',
                '<:SentinelClass:864581773455130664>'
            ]

            const EditroleEmb = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setAuthor(`Valorant Perfil de: ${message.author.username}`, message.author.displayAvatarURL())
                .setTitle(`Agente Principal`)
                .setDescription(`Selecione sua Main Classe`)
            let EmbedEdit = await message.channel.send(EditroleEmb);

            for (const cl of classe) {
                await EmbedEdit.react(cl);
            }

            const Filter = (reaction, user) => user.id == message.author.id;
            EmbedEdit.awaitReactions(Filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();
                reaction.message.delete();

                switch (reaction.emoji.name) {

                    case 'ControllerClass':
                        UpdateRoleMain(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)
                        break
                    case 'DuelistClass':
                        UpdateRoleMain(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)
                        break

                    case 'InitiatorClass':
                        UpdateRoleMain(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)
                        break

                    case 'SentinelClass':
                        UpdateRoleMain(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)
                        break
                }

            })
        }






    }
}