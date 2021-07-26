const Discord = require('discord.js');

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

    /// ADICIONAR SEPARADORES AUTOMATICAMENTE A CARA 1 MINUTO

    setInterval(async function(){
        
        const guild = client.guilds.cache.get('830235047512637470');
        guild.members.cache.array().forEach(member => {
    
            const roles = member._roles;
            //VERIFICAR SE JÁ TEM A ROLE ANTES DE TENTA ADICIONAR
            if (!member.roles.cache.has("863203432046788628")) {
    
                // ADICIONAR SEPARADOR NA SELEÇÃO DE PRONOMES!
                const femrole = roles.find(id => id == '863203627194515457'); // caso tenha a role Feminino add separador
                const SemPre = roles.find(id => id == '863203614373707828'); // caso tenha a role Sem Preferencia add separador
                const maleRole = roles.find(id => id == '863203654404276254'); // caso tenha a role Masculino add separador
    
    
                if (femrole || SemPre || maleRole) {
                    member.roles.add("863203432046788628").catch(console.error);
                }
    
            }
    
            if (!member.roles.cache.has("862921323479433216")) {
    
                const MINECRAFT = roles.find(id => id == '862921835862687784'); // caso tenha a role Minecraft add separador
                const VALORANT = roles.find(id => id == '832807085795835905'); // caso tenha a role Valorant add separador
    
                if (MINECRAFT || VALORANT) {
    
                    member.roles.add("862921323479433216").catch(console.error);
    
                }
            }
    
        });
   }, 900000)

   // NÃO DEIXA SAIR DA SALA CASTIGO

   setInterval(async function(){

    const guild = client.guilds.cache.get('830235047512637470');
    guild.members.cache.array().forEach(member => {

        if(member.roles.cache.has("862784246530441307")){
           member.voice.setChannel("857488932212178964").catch(console.error);
        }

   });
}, 5000)

    console.log('ESTOU ONLINE E PRONTO PARA DESTRUIR POBRES');

}
