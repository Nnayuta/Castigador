const Discord = require('discord.js');
const botDB = require('../../models/botschema');

module.exports = async (Discord, client, message) => {

    let atividades = [
        `Tutorial de como acabar com pobres de forma facil.`,
        `Pobres sao engraçados aovivo`,
        `Como fica rico - PobreNoYoutube`,
        `Ajudando um total de ${client.users.cache.size} pobres `
    ],
    i = 0;
    setInterval(() => client.user.setActivity(`${atividades[i++ % atividades.length]}`, {
        type: 'WATCHING' // WATCHING, LISTENNING, PLAYING
    }), 30000);
    
    console.log('ESTOU ONLINE E PRONTO PARA DESTRUIR POBRES');
}