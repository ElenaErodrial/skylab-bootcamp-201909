// const call = require('../../helpers/call')
// const validate = require('../../utils/validate')
// const favFilter = require('../../utils/favFilter')

// module.exports = function (id, token) {
//     validate.string(id)
//     validate.string.notVoid('id', id)
//     validate.string(token)
//     validate.string.notVoid('token', token)

//     return new Promise((resolve, reject) => {
//         call('GET', undefined, 'https://duckling-api.herokuapp.com/api/search', undefined, result => {
//             if (result.error) return reject(new Error(result.error))

//             call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result2 => {
//                 if (result2.error) return reject(new Error(result2.error))

//                 const { data: { favs = [] } } = result2

//                 result.map(duck => { // normalize image url to image
//                     duck.image = duck.imageUrl

//                     delete duck.imageUrl

//                     duck.isFav = favs.includes(duck.id)
//                 })
//                 result = favFilter(result)
//                 resolve(result)
//             })
//         })
//     })
// }

const call = require('../../helpers/call')
const validate = require('../../utils/validate')

module.exports = function (id, token) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(token)


    return new Promise((resolve, reject) => {
        call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, user => {
            if (user.error) return reject(new Error(user.error))

            const { data: { favs = [] } } = user
            debugger
            const favsDucks = favs.map(duckId => new Promise((resolve, reject) => {
                call('GET', undefined, `https://duckling-api.herokuapp.com/api/ducks/${duckId}`, undefined, duckFav => {
                    if (duckFav.error) resolve()
                    resolve(duckFav)
                })
            }))
            Promise.all(favsDucks)
                .then(arrFavs => arrFavs.filter(err => !!err))
                .then(favs => {
                    favs.map(duck => { // normalize image url to image
                        duck.image = duck.imageUrl
                        delete duck.imageUrl
                        duck.isFav = true

                    })
                    resolve(favs)
                })
        })
    })
}