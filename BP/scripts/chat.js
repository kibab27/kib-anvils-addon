import { world } from '@minecraft/server';
import {Anvil} from './anvil.js';


world.beforeEvents.chatSend.subscribe((data) => {
    let { message } = data;
    const commandPrefix = ';a';
    const commandRegex = new RegExp(`^${commandPrefix}\\s*(\\S+)?`, 'i');
    const match = message.match(commandRegex);
  
    if (!match) return;
  
    const command = match[1];
    const commandLowerCase = command ? command.toLowerCase() : '';
  
    data.message = message.replace(commandRegex, `${commandPrefix} ${commandLowerCase}`);
    data.sendToTargets = true;
    data.setTargets([]);
  });
  
  
  
  world.afterEvents.chatSend.subscribe((data) => {
    const { sender, message } = data;
    if (!message.startsWith(';a')) return;
  
    const modifiedMessage = message.replace(/"/g, "'"); // Replace double quotes with single quotes
  
    const args = modifiedMessage
      .slice(3)
      .trim()
      .match(/'(?:\\'|[^'])*'|\S+/g) || [];
  
    const cmd = args.shift();
    const joinedArgs = args.join(' ');
  
    handleCommand(cmd, args, joinedArgs, sender);
  });



const handleCommand = (cmd, args, msg, sender) => {

    const sendMessage = (message) => {
        sender.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${message}"}]}`);
      };

    const commandHandlers = {
        info: () => {
            const myAnvil = new Anvil(10, sender.location.y + 50);
            console.warn(myAnvil.placeAnvils(sender.location.x, sender.location.z)); // Prints the number of blocks placed
            myAnvil.cleanUp(20);
        }
    };

    if (cmd in commandHandlers) {
        commandHandlers[cmd]();
      } else {
        if (cmd === undefined) cmd = '';
        sendMessage(
    
          `§cUnknown command: ${cmd}. Please check that the command exists and that you have permission to use it.`,
        );
      }
    

}