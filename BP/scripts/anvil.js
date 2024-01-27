import {world, Vector, BlockPermutation, system} from '@minecraft/server';

export class Anvil {
    constructor(radius, yLevel) {
        this.radius = radius;
        this.yLevel = yLevel;
        this.placedPositions = [];
    }

    placeAnvils(x, z) {
        const begin = new Vector(x - this.radius, Math.min(this.yLevel, 320), z - this.radius);
        const end = new Vector(x + this.radius, Math.min(this.yLevel, 320), z + this.radius);

        // Store the placement positions for later
        for (let dx = -this.radius; dx <= this.radius; dx++) {
            for (let dz = -this.radius; dz <= this.radius; dz++) {
                this.placedPositions.push(new Vector(x + dx, this.yLevel, z + dz));
            }
        }

        return world.getDimension('overworld').fillBlocks(begin, end, 'minecraft:anvil');
    }

cleanUp(delayInSeconds) {
    // Convert the delay to ticks (Minecraft runs at 20 ticks per second)
    const delayInTicks = delayInSeconds * 20;

    // Schedule the cleanup function to run after the delay
    system.runTimeout(() => {
        this.placedPositions.forEach(position => {
            let y = position.y;
            let block;
            do {
                block = world.getDimension('overworld').getBlock(new Vector(position.x, --y, position.z));
                
            } while (block && block.isAir || block && block.isLiquid);
            
            // If a non-air block was found, replace it with air
            if (block) {
                const begin = new Vector(position.x, y, position.z);
                const end = new Vector(position.x, y, position.z);
                world.getDimension('overworld').fillBlocks(begin, end, 'minecraft:air');
            
                // Spawn particles along the path from the current y level to 5 blocks above
                for (let i = y; i <= y + 5; i++) {
                    world.getDimension('overworld').spawnParticle('minecraft:endrod', {x: position.x, y: i, z: position.z});
                }
            }
            
        });
    }, delayInTicks);
}

    
    
    
    
}
