require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const registerUser = require('.')
const { random } = Math
const { errors: { ContentError } } = require('upbeat-util')
const { database, models: { User } } = require('upbeat-data')
const bcrypt = require('bcryptjs')

describe('logic - register user', () => {


    before(() => database.connect(TEST_DB_URL))

    let username, email, password, rol, rols, longitude, latitude, instruments, groups
    rols = ['solo', 'groups']
    instrumentsList = ['drums', 'guitar', 'piano', 'violin', 'bass', 'cello', 'clarinet', 'double-bass', 'flute', 'oboe', 'saxophone', 'trombone', 'trumpet', 'ukelele', 'viola', 'voice']
    groupsList = ['band', 'choir', 'modern-ensemble', 'orchestra', 'classic-chamber']

    beforeEach(async () => {
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        rol = rols[Math.floor(Math.random() * rols.length)]
        longitude = random()
        latitude = random()
        instruments = [instrumentsList[Math.floor(Math.random() * instrumentsList.length)]]
        groups = groupsList[Math.floor(Math.random() * groupsList.length)]
        /* if (rol === 'solo') format = new Solo({ instruments })
        else format = new Groups({ groups }) */
        //User.create({ username, email, password, rol, format, location: { coordinates: [latitude, longitude] } })
        hash = await bcrypt.hash(password, 10)

        await User.deleteMany()
    })

    it('should succeed on correct credentials', async () => {

        const response = await registerUser(username, email, password, rol, instruments, groups, latitude, longitude)

        expect(response).to.be.undefined

        const user = await User.findOne({ email })

        expect(user).to.exist

        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)

        const match = await bcrypt.compare(password, user.password)
        expect(match).to.be.true

        expect(user.rol).to.equal(rol)
        //expect(instruments).to.include(user.format.instruments)
        user.rol === 'solo' && expect(user.format.instruments).to.eql(instruments)
        user.rol === 'groups' && expect(user.format.groups).to.equal(groups)
        expect(user.location.coordinates[0]).to.equal(latitude)
        expect(user.location.coordinates[1]).to.equal(longitude)

    })

    describe('when user already exists', () => {
        beforeEach(() => User.create({ username, email, password, rol, location: { coordinates: [latitude, longitude] } }))

        it('should fail on already existing user', async () => {
            try {
                await registerUser(username, email, password, rol, instruments, groups, latitude, longitude)

                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error.message).to.exist
                expect(typeof error.message).to.equal('string')
                expect(error.message.length).to.be.greaterThan(0)
                expect(error.message).to.equal(`user with username ${username} already exists`)
            }
        })
    })

    it('should fail on incorrect username, email, password, latitude, longitude or expression type and content', () => {

        expect(() => registerUser(1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser([])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser('')).to.throw(ContentError, 'username is empty or blank')
        expect(() => registerUser(' \t\r')).to.throw(ContentError, 'username is empty or blank')

        expect(() => registerUser(username, '')).to.throw(ContentError, 'e-mail is empty or blank')
        expect(() => registerUser(username, ' \t\r')).to.throw(ContentError, 'e-mail is empty or blank')

        expect(() => registerUser(username, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(username, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(username, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(username, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(username, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(username, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(username, email, '')).to.throw(ContentError, 'password is empty or blank')
        expect(() => registerUser(username, email, ' \t\r')).to.throw(ContentError, 'password is empty or blank')



        expect(() => registerUser(username, email, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(username, email, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(username, email, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(username, email, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(username, email, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(username, email, null)).to.throw(TypeError, 'null is not a string')


        expect(() => registerUser(username, email, password, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(username, email, password, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(username, email, password, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(username, email, password, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(username, email, password, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(username, email, password, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(username, email, password, '')).to.throw(ContentError, 'rol is empty or blank')
        expect(() => registerUser(username, email, password, ' \t\r')).to.throw(ContentError, 'rol is empty or blank')

        expect(() => registerUser(username, email, password, rol, 1)).to.throw(TypeError, '1 is not a Array')
        expect(() => registerUser(username, email, password, rol, true)).to.throw(TypeError, 'true is not a Array')
        //expect(() => registerUser(username, email, password, rol, [])).to.throw(TypeError, ' is not a Array')
        expect(() => registerUser(username, email, password, rol, {})).to.throw(TypeError, '[object Object] is not a Array')
        expect(() => registerUser(username, email, password, rol, undefined)).to.throw(TypeError, 'undefined is not a Array')
        expect(() => registerUser(username, email, password, rol, null)).to.throw(TypeError, 'null is not a Array')



        expect(() => registerUser(username, email, password, rol, instruments, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(username, email, password, rol, instruments, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(username, email, password, rol, instruments, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(username, email, password, rol, instruments, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(username, email, password, rol, instruments, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(username, email, password, rol, instruments, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(username, email, password, rol, instruments, groups, 'a')).to.throw(TypeError, 'a is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, true)).to.throw(TypeError, 'true is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, [])).to.throw(TypeError, ' is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, {})).to.throw(TypeError, '[object Object] is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, undefined)).to.throw(TypeError, 'undefined is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, null)).to.throw(TypeError, 'null is not a number')

        expect(() => registerUser(username, email, password, rol, instruments, groups, latitude, 'a')).to.throw(TypeError, 'a is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, latitude, true)).to.throw(TypeError, 'true is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, latitude, [])).to.throw(TypeError, ' is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, latitude, {})).to.throw(TypeError, '[object Object] is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, latitude, undefined)).to.throw(TypeError, 'undefined is not a number')
        expect(() => registerUser(username, email, password, rol, instruments, groups, latitude, null)).to.throw(TypeError, 'null is not a number')

        



    })


    after(() => User.deleteMany().then(database.disconnect))
})
