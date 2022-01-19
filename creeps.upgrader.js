const MOVE_OPTIONS = {visualizePathStyle: {stroke: '#ffaa00'}}

const upgraderIteration = function(creep){
    if(creep.memory.state == "gathering"){
        if(creep.store.getFreeCapacity() > 0) {
            const notEmptyContainers = creep.room.find(FIND_STRUCTURES)
                .filter(s => s.structureType == STRUCTURE_CONTAINER)
                .filter(c => c.store.getUsedCapacity() > 0)
            const source = creep.room.find(FIND_SOURCES)[0]
            if(notEmptyContainers.length > 0){
                const notEmptyContainer = notEmptyContainers[0]
                if(creep.withdraw(notEmptyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(notEmptyContainer, MOVE_OPTIONS)
                }
            }
            else {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, MOVE_OPTIONS)
                }
            }
        }
        else{
            creep.memory.state = "working"
        }
    }
    else if(creep.memory.state == "working"){
        if(creep.store.getUsedCapacity() > 0) {
            const controller = creep.room.controller
            const repairableStructures = creep.room.find(FIND_STRUCTURES)
                .filter(s => s.hits < s.hitsMax)
            if(repairableStructures.length > 0){
                const repairableStructure = repairableStructures[0]
                if(creep.repair(repairableStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairableStructure, MOVE_OPTIONS);
                }
            }
            else {
                if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, MOVE_OPTIONS);
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
    upgraderIteration
}
