const Discord = require('discord.js');
const botDB = require('../../models/botschema');

module.exports = async (Discord, client, message) => {

    // Textos do Bot feitos por: Predo#1599 DISCORD <-

    let atividades = [
        `Tutorial de como acabar com pobres de forma facil.`,
        `Pobres sao engraçados aovivo`,
        `Como fica rico - PobreNoYoutube`,
        `Ajudando um total de ${client.users.cache.size} pobres `,
        `Como assassinar pobres de forma dolorosa`,
        `Como transformar pobres em ricos`,
        `Pobres com amnésia`,
        `Como pobres conservam seu playstation 2`,
        `Por que pobres veem o nilson papinho como deus supremo?`,
        `Como matar pobres usando aim lab`

    ],
    i = 0;
    setInterval(() => client.user.setActivity(`${atividades[i++ % atividades.length]}`, {
        type: 'WATCHING' // WATCHING, LISTENNING, PLAYING
    }), 30000);
    
    console.log('ESTOU ONLINE E PRONTO PARA DESTRUIR POBRES');
}
