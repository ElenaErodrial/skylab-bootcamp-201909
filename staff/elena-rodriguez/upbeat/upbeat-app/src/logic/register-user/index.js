const call = require('../../utils/call')
const { validate, errors: { ContentError, ConflictError } } = require('upbeat-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL
//const API_URL = "http://localhost:8000"


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
    validate.array(instruments)
    if (rol === 'solo') {
        if (instruments.length === 0) throw new ContentError(`${instruments} can't be empty`)
        instruments.forEach(instrument =>
            validate.matches('instrument', instrument, 'drums', 'guitar', 'piano', 'violin', 'bass', 'cello', 'clarinet', 'double-bass', 'flute', 'oboe', 'saxophone', 'trombone', 'trumpet', 'ukelele', 'viola', 'voice')
        )
    }
    validate.string(groups)
    if (rol === 'groups') {
        validate.string.notVoid('groups', groups)
        validate.matches('groups', groups, 'band', 'choir', 'modern-ensemble', 'orchestra', 'classic-chamber')
    }

    return (async () => {
        const res = await call(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, rol, instruments, groups })
        })

        if (res.status === 201) return
        
        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)

    })()

}