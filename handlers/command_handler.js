const fs = require('fs');

module.exports = async (client, Discord) => {

    const load_dir = (category) => {
    const command_files = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/${category}/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
            console.log(`Load '${category}' cmd: '${command.name}'`);
        }else{
            console.log(`Erro '${category}' cmd: '${command.name}'`);
            continue;
        }
    }
}
['fiscal', 'mod', 'owner', 'geral' ].forEach(e => load_dir(e));
}