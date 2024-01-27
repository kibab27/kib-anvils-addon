import './chat.js';

import { Anvil } from './anvil.js';
import { system, world } from '@minecraft/server';
import { addAnviltoArr } from './chat.js';

let currentTime = 30;
let timer = true;
system.runInterval(() => {
    const players = world.getAllPlayers();

    if (system.currentTick % 20 == 0 && !(currentTime < 1) && timer) {
        currentTime--;
    }

    if (currentTime == 0) {
        for (let player of players) {
            player.onScreenDisplay.setActionBar(`Anvils are falling from the sky!`);
            const av = new Anvil(10, player.location.y + 50);
            addAnviltoArr(av);
            av.placeAnvils(player.location.x, player.location.z);
            av.cleanUp(10);
        }

            currentTime = 30;

    } else {
        for (let player of players) {
            player.onScreenDisplay.setActionBar(`Timer: ${currentTime}`)
        }
    }


});
    

