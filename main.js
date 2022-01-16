let { harvesterIteration } = require("./creeps.harvester")


const main = () => {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name]
        if(creep.memory.role == 'harvester') {
            harvesterIteration(creep)
        }
    }

    const spawn = Game.spawns["Spawn1"]
    spawn.createCreep([MOVE, WORK, WORK, CARRY], undefined, {role: "harvester"})
}

module.exports.loop = function(){
    main()
}
