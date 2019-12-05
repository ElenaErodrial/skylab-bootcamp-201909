const { validate, errors: { NotFoundError, ContentError } } = require('upbeat-util')
const { ObjectId, models: { User } } = require('upbeat-data')


module.exports = function (id) {
    debugger
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id).populate('favs')

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const { favs } = user

        result = favs.map((fav) => {
            const {username, email, rol, image, format, location, description, links, upcomings} = fav
            return { username, email, rol, image, format, location, description, links, upcomings }
        })

        return result

    })()
}