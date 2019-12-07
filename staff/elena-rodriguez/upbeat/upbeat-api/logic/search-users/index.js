const { errors: { NotFoundError } } = require('upbeat-util')
const { models: { User } } = require('upbeat-data')

module.exports = function (query) {

    return (async () => {
        const musicians = await User.find({ $or:[ { "username": {$regex: `.*${query}*`,$options: 'i'}  } , { "format.instruments": { $in: [query] } }, { "format.groups": { $regex: `.*${query}*` } }] })
        // {$or:[{ 'username' : {$regex : `.*piano*`}},{ 'format.instruments': {$in: ["piano"]}},{ 'format.groups': {$regex : `.*orchestra*`}}]}
        if (musicians.length === 0) return musicians

        let results = []
        musicians.forEach(musician => {
            const {id, username, rol, format: {instruments, groups}} = musician
            musician = {id, username, rol, format : {instruments, groups}}
            results.push(musician)
        })
    
        return results

    })()
}



