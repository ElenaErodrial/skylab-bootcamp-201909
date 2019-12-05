const { errors: { NotFoundError } } = require('upbeat-util')
const { models: { User } } = require('upbeat-data')

module.exports = function (query) {

    return (async () => {
        const musicians = await User.find({ $or:[ { "username": { $regex: `.*${query}*` } }, { "format.instruments": { $in: [query] } }, { "groups": { $regex: `.*${query}*` } }] })
        // {$or:[{ 'username' : {$regex : `.*piano*`}},{ 'format.instruments': {$in: ["piano"]}},{ 'format.groups': {$regex : `.*orchestra*`}}]}
        if (musicians.length === 0) return musicians

        let results = []
        musicians.forEach(musician => {
            const {username, format: {instruments, groups}} = musician
            musician = {username, instruments, groups}
            results.push(musician)
        })
    
        return results

    })()
}



