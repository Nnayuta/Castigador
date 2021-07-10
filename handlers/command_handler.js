const fs = require('fs');

module.exports = (client, Discord) => {

    const load_dir = (category) => {
    const command_files = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/${category}/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
            console.log(`Carregando ${category} comando: ${command.name}`)
        }else{
            continue;
        }
    }
}
['fiscal', 'mod', 'owner', 'geral' ].forEach(e => load_dir(e));
}