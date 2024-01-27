import './chat.js';

import { Anvil } from './anvil.js';
import { system, world } from '@minecraft/server';

let currentTime = 10;
let timer = true;
system.runInterval(() => {
    const players = world.getAllPlayers();

    if (system.currentTick % 20 == 0 && !(currentTime < 1)) {
        currentTime--;
    }

    if (currentTime == 0) {
        for (let player of players) {
            player.onScreenDisplay.setActionBar(`Anvils are falling from the sky!`);
        }

        system.runTimeout(() => {
            currentTime = 10;
        },40)
    } else {
        for (let player of players) {
            player.onScreenDisplay.setActionBar(`Timer: ${currentTime}`)
        }
    }


});
    

