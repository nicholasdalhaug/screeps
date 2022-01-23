let { harvesterIteration } = require("./creeps.harvester")
let { upgraderIteration } = require("./creeps.upgrader")

const main = () => {
    removeDeadCreepsFromMemory()

    runCreepIterations()

    ensureNumberOfCreeps()
}

const removeDeadCreepsFromMemory = () => {
    for(let memCreepName in Memory.creeps){
        if(Game.creeps[memCreepName] == undefined){
            delete Memory.creeps[memCreepName]
        }
    }
}

const runCreepIterations = () => {
    const creeps = Object.keys(Game.creeps).map(creepName => Game.creeps[creepName])
    creeps.forEach(creep => {
        if(creep.memory.role == 'harvester') {
            harvesterIteration(creep)
        }
        if(creep.memory.role == 'upgrader') {
            upgraderIteration(creep)
        }
    })
}

const ensureNumberOfCreeps = () => {
    const nHarvestersDesired = 4
    const nUpgradersDesired = 2

    const creeps = Object.keys(Game.creeps).map(creepName => Game.creeps[creepName])
    const nHarvestersCurrent = creeps.filter(creep => creep.memory.role == "harvester").length
    const nUpgradersCurrent = creeps.filter(creep => creep.memory.role == "upgrader").length
    
    if (nHarvestersCurrent < nHarvestersDesired) {
        createCreep("harvester")
    }
    else if (nUpgradersCurrent < nUpgradersDesired) {
        createCreep("upgrader")
    }
}

const createCreep = (role) => {
    const spawn = Game.spawns["Spawn1"]
    
    const creepUUID = createUUID()
    const creepName = `${role}${creepUUID}`

    spawn.createCreep([WORK, WORK, MOVE, CARRY], creepName, 
        {role, state: "gathering"}
    )
}

const createUUID = () => {
    const timeMs = new Date().getTime()
    const uuid = 'xxxxx'.replace(/[x]/g, (c) => {
        const r = Math.floor((timeMs + Math.random()*16)%16)
        return r.toString(16)
    })
    return uuid
}

module.exports.loop = function(){
    main()
}
