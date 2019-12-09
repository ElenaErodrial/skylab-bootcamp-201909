const { validate, errors: { NotFoundError, ContentError } } = require('upbeat-util')
const { ObjectId, models: { User } } = require('upbeat-data')
const bcrypt = require('bcryptjs')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        user.lastAccess = new Date

        await user.save()

        const { username, email, rol, format, location: {coordinates: [latitude, longitude]}, description, image, links, upcomings, favs } = user.toObject()

        return {  id, username, email, rol, format, location: {coordinates: [latitude, longitude]}, description, image, links, upcomings, favs }
        
    })()
}
