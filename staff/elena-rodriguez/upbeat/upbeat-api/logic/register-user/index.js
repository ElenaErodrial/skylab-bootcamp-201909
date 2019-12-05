const { validate, errors: { ConflictError } } = require('upbeat-util')
const { models: { User, Solo, Groups } } = require('upbeat-data')
const bcrypt = require('bcryptjs')

module.exports = function (username, email, password, rol, instruments, groups) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(rol)
    validate.string.notVoid('rol', rol)


    if (rol === 'solo') {
        validate.array(instruments)
        if (instruments.length === 0) throw new ContentError(`${instruments} can't be empty`)
        instruments.forEach(instrument =>
            validate.matches('instrument', instrument, 'drums', 'guitar', 'piano', 'violin', 'bass', 'cello', 'clarinet', 'double-bass', 'flute', 'oboe', 'saxophone', 'trombone', 'trumpet', 'ukelele', 'viola', 'voice')
        )
    }

    if (rol === 'groups') {

        validate.string(groups)
        validate.string.notVoid('groups', groups)
        validate.matches('groups', groups, 'band', 'choir', 'modernEnsemble', 'orchestra', 'classicChamber')
    }
  
    // validate.number(latitude)
    // validate.number(longitude)


    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        const hash = await bcrypt.hash(password, 10)
        let format = {}

        if (rol === 'solo') {
            format = new Solo({ instruments })
        } else {
            format = new Groups({ groups })
        }
        await User.create({ username, email, password: hash, rol, format })

    })()
}
