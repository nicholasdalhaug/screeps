let { harvesterIteration } = require("./creeps.harvester")
let { upgraderIteration } = require("./creeps.upgrader")

const nHarvestersDesired = 4
const nUpgradersDesired = 1

const main = () => {
    const creeps = Object.keys(Game.creeps).map(creepName => Game.creeps[creepName])
    creeps.forEach(creep => {
        if(creep.memory.role == 'harvester') {
            harvesterIteration(creep)
        }
        if(creep.memory.role == 'upgrader') {
            upgraderIteration(creep)
        }
    })

    const nHarvestersCurrent = creeps.filter(creep => creep.memory.role == "harvester").length
    const nUpgradersCurrent = creeps.filter(creep => creep.memory.role == "upgrader").length
    const spawn = Game.spawns["Spawn1"]
    if (nHarvestersCurrent < nHarvestersDesired) {
        spawn.createCreep([MOVE, WORK, WORK, CARRY], undefined, {role: "harvester", state: "gathering"})
    }
    else if (nUpgradersCurrent < nUpgradersDesired) {
        spawn.createCreep([MOVE, WORK, WORK, CARRY], undefined, {role: "upgrader", state: "gathering"})
    }
}

module.exports.loop = function(){
    main()
}
