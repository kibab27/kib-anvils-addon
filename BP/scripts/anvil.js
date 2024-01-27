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
            // Create a promise for each anvil
            const promises = this.placedPositions.map(position => {
                return new Promise((resolve, reject) => {
                    // Start scanning from the anvil position downwards
                    let direction = new Vector(0, -1, 0);
                    let hit = world.getDimension('overworld').getBlockFromRay(position, direction);
    
                    // If a non-air block was found, replace it with air
                    if (hit && !hit.block.isAir && !hit.block.isLiquid) {
                        const begin = hit.block.location;
                        const end = hit.block.location;
                        world.getDimension('overworld').runCommand(`fill ${begin.x} ${begin.y} ${begin.z} ${end.x} ${end.y} ${end.z} minecraft:air replace minecraft:anvil`);
    
                        // Spawn particles along the path from the current y level to 5 blocks above
                        for (let i = hit.block.location.y; i <= hit.block.location.y + 1; i++) {
                            world.getDimension('overworld').spawnParticle('minecraft:endrod', {x: hit.block.location.x, y: i, z: hit.block.location.z});
                        }
                    }
    
                    resolve();
                });
            });
    
            // Wait for all the promises to complete
            Promise.all(promises).then(() => {
                console.log('All anvils have been cleaned up.');
            }).catch(error => {
                console.error('Error during cleanup: ', error);
            });
        }, delayInTicks);
    }
    
    

    

    
    
    
    
}
