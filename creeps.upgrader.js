const MOVE_OPTIONS = {visualizePathStyle: {stroke: '#ffaa00'}}

const upgraderIteration = function(creep){
    if(creep.memory.state == "gathering"){
        if(creep.store.getFreeCapacity() > 0) {
            const source = creep.room.find(FIND_SOURCES)[0]
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, MOVE_OPTIONS)
            }
        }
        else{
            creep.memory.state = "working"
        }
    }
    else if(creep.memory.state == "working"){
        if(creep.store.getUsedCapacity() > 0) {
            const controller = creep.room.controller
            if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, MOVE_OPTIONS);
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
