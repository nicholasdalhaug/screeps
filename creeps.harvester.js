const MOVE_OPTIONS = {visualizePathStyle: {stroke: '#ffaa00'}}

const harvesterIteration = function(creep){
    if(creep.memory.state == "gathering"){
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], MOVE_OPTIONS);
            }
        }
        else{
            creep.memory.state = "working"
        }
    }
    else if(creep.memory.state == "working"){
        if(creep.store.getUsedCapacity() > 0){
            const spawn = Game.spawns["Spawn1"]
            const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES)
            const notFullContainers = creep.room.find(FIND_STRUCTURES)
                .filter(s => s.structureType == STRUCTURE_CONTAINER)
                .filter(c => c.store.getFreeCapacity() > 0)
            if(spawn.store.getFreeCapacity("energy") > 0){
                if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn, MOVE_OPTIONS);
                }
            }
            else if(constructionSites.length > 0) {
                const constructionSite = constructionSites[0]
                if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, MOVE_OPTIONS);
                }
            }
            else if(notFullContainers.length > 0){
                const notFullContainer = notFullContainers[0]
                if(creep.transfer(notFullContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(notFullContainer, MOVE_OPTIONS);
                }
            }
        }
        else{
            creep.memory.state = "gathering"
        }
    }
    else{
        console.log(`No such upgrader creep state: ${creep.memory.state}`)
    }
}

module.exports = {
    harvesterIteration
}
