let { harvesterIteration } = require("./creeps.harvester")


const main = () => {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name]
        if(creep.memory.role == 'harvester') {
            harvesterIteration(creep)
        }
    }
}

module.exports.loop = function(){
    main()
}
