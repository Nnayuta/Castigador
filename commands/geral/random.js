require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'random', //nome do comando que vai ser executado
    aliases: [], //como usar: ['aliases', 'separados']
    cooldown: 3, // Valor em segundos
    permLevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Escolhe algo do valorant aleatoriamente.",
    async execute(client, message, cmd, args, Discord, profileData) {


        let Menu = args[0];

        if (!Menu) return message.reply('Você precisa definir oque sera random (Mapa aleatorio (para usar no modo personalizado): **$random mapa** | Random Agentes: **$random agent** | Você tbm pode filtrar por classes usando  **"c"** apos agent para selecionar controladores | **"d"** para duelistas | **"i"** para Iniciadores | **"s"** para sentinelas. Exemplo: **$random agent s** é eu vou escolher sentinela para você jogar) ') .then(msg => {
            msg.delete({ timeout: 20000 })
          })


        if (Menu == 'map' || Menu == 'mapa' || Menu == 'm') {
            var rating = Math.floor(Math.random() * 6) + 1;


            switch (rating) {

                case 1:
                    RandomMapa('https://static.wikia.nocookie.net/valorant/images/1/1e/Valorant_Loading_Breeze.png', 'Breeze');
                    break

                case 2:
                    RandomMapa('https://static.wikia.nocookie.net/valorant/images/3/34/Loading_Icebox.png', 'Icebox');
                    break

                case 3:
                    RandomMapa('https://static.wikia.nocookie.net/valorant/images/2/23/Loading_Screen_Bind.png', 'Bind')
                    break

                case 4:
                    RandomMapa('https://static.wikia.nocookie.net/valorant/images/7/70/Loading_Screen_Haven.png', 'Haven')
                    break

                case 5:
                    RandomMapa('https://static.wikia.nocookie.net/valorant/images/d/d6/Loading_Screen_Split.png', 'Split')
                    break

                case 6:
                    RandomMapa('https://static.wikia.nocookie.net/valorant/images/e/e7/Loading_Screen_Ascent.png', 'Ascent')
                    break

            }

            async function RandomMapa(MapaLink, MapaName) {
                const TargetDefaultEmb = new Discord.MessageEmbed()
                    .setColor(profileData.colorComands)
                    .setTitle(`Mapa escolhido: ${MapaName}`)
                    .setImage(MapaLink)
                    .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                message.channel.send(TargetDefaultEmb);
            }

        }

        if (Menu == 'agente' || Menu == 'agent') {

            let SelectClass = args[1];

            if(SelectClass)
            {
                if(SelectClass == 'controlador' || SelectClass == 'c'){
                    var rating = Math.floor(Math.random() * 4) + 1;
                }

                if(SelectClass == 'duelista' || SelectClass == 'd'){
                    var rating = Math.floor(Math.random() * 5) + 5;
                }

                if(SelectClass == 'iniciador' || SelectClass == 'i'){
                    var rating = Math.floor(Math.random() * 4) + 10;
                }

                if(SelectClass == 'sentinela' || SelectClass == 's'){
                    var rating = Math.floor(Math.random() * 3) + 14;
                }

            }
            else if(!SelectClass)
            {
                var rating = Math.floor(Math.random() * 16) + 1;
            }
            
            
            switch (rating) {

                case 1:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/3/37/Brimstone_artwork.png', 'Brimstone'); //Controller
                    break

                case 2:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/9/91/Viper_artwork.png', 'Viper'); //Controller
                    break

                case 3:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/0/06/Omen_artwork.png', 'Omen');//Controller
                    break
                case 4:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/8/8a/Astra_artwork.png', 'Astra'); //Controller
                    break
                case 5:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/f/fa/Phoenix_artwork.png', 'Phoenix'); // Duelist
                    break
                case 6:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/7/79/Jett_artwork.png', 'Jett'); // Duelist
                    break
                case 7:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/4/41/Reyna_artwork.png', 'Reyna'); // Duelist
                    break
                case 8:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/c/c4/Raze_artwork.png', 'Raze'); // Duelist
                    break
                case 9:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/1/1a/Yoru_artwork.png', 'Yoru'); // DUelist
                    break
                case 10:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/6/61/Sova_artwork.png', 'Sova'); // Initiator
                    break
                case 11:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/5/5c/Breach_artwork.png', 'Breach'); // Initiator
                    break
                case 12:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/d/d6/Skye_artwork.png', 'Skye');// Initiator
                    break
                case 13:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/a/a9/KAYO_artwork.png', 'KAY/O');// Initiator
                    break
                case 14:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/6/6b/Killjoy_artwork.png', 'Killjoy');
                    break
                case 15:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/b/bb/Cypher_artwork.png', 'Cypher');
                    break
                case 16:
                    RandomAgent('https://static.wikia.nocookie.net/valorant/images/1/1e/Sage_artwork.png', 'Sage');
                    break


            }

            async function RandomAgent(AgentLink, AgentName) {
                const TargetDefaultEmb = new Discord.MessageEmbed()
                    .setColor(profileData.colorComands)
                    .setTitle(`**${message.author.username}** eu escolho: **${AgentName}**, Boa sorte pobre`)
                    .setImage(AgentLink)
                    .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
                message.channel.send(TargetDefaultEmb);
            }

        }


    }
}