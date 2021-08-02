require('dotenv').config();
const fs = require('fs');
const cmdlist = require('../../models/commandlist');

module.exports = {
    name: 'c', //nome do comando que vai ser executado
    aliases: [], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 5, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    CoinCost: 0, // Custo da moeda do servidor para usar comandos
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData) {

        for (const cmds of client.commands.array()) {

            let CmDUpdate;
            try {
                CmDUpdate = await cmdlist.findOne({ cmdName: cmds.name });
                if (!CmDUpdate) {
                    console.log(`Comando: ${cmds.name} adicionado com sucesso`)
                    let profile = await cmdlist.create
                        ({

                            cmdName: cmds.name,
                            permlevel: cmds.permLevel,
                            desc: cmds.description,

                        })
                }
                else { console.log(`Comando: ${cmds.name} já esta registrado`) }
            } catch (err) {
                console.log(err);
            }


        }

    }
    
}