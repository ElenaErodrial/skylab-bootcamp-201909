const validate = require('../../utils/validate')
const users = require('../../data/users.json')
const fs = require('fs')
const path = require('path')

module.exports = function(email , password) {
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.string(password)
    validate.string.notVoid('password', password)

    



}