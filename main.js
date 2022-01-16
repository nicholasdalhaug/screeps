let { harvesterIteration } = require("./creeps.harvester")

const nHarvestersDesired = 4

const main = () => {
    const creeps = Object.keys(Game.creeps).map(creepName => Game.creeps[creepName])
    creeps.forEach(creep => {
        if(creep.memory.role == 'harvester') {
            harvesterIteration(creep)
        }
    })

    const nHarvestersCurrent = creeps.filter(creep => creep.memory.role == "harvester").length
    if (nHarvestersCurrent < nHarvestersDesired) {
        const spawn = Game.spawns["Spawn1"]
        spawn.createCreep([MOVE, WORK, WORK, CARRY], undefined, {role: "harvester"})
    }
}

module.exports.loop = function(){
    main()
}
