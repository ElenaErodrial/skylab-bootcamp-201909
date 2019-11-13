const { expect } = require('chai')
const { ContentError } = require('../../utils/errors')
//Combiene tipificar errores,ya veremos la explicación.  
const authenticateUser = require('.')
const fs = require('fs').promises
const path = require('path')

describe('logic - authenticate user', () => {
    let name, surname,  email, username, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`

        //do register
        
    })

    it('should succeed on correct credentials', () =>
        authenticateUser(email, password)
            .then(response => {
                expect(response).to.exist

                const { id, token } = response

                expect(id).to.exist
                expect(typeof id).to.equal('string')
                expect(id.length).to.be.greaterThan(0)

                expect(token).to.exist
                expect(typeof token).to.equal('string')
                expect(token.length).to.be.greaterThan(0)
            })
    )

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        expect(() => authenticateUser(1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateUser(true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateUser([])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateUser({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateUser(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateUser(null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateUser('')).to.throw(ContentError, 'e-mail is empty or blank')
        expect(() => authenticateUser(' \t\r')).to.throw(ContentError, 'e-mail is empty or blank')

        expect(() => authenticateUser(email, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateUser(email, true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateUser(email, [])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateUser(email, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateUser(email, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateUser(email, null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateUser(email, '')).to.throw(ContentError, 'password is empty or blank')
        expect(() => authenticateUser(email, ' \t\r')).to.throw(ContentError, 'password is empty or blank')
    })

    // TODO other cases
})