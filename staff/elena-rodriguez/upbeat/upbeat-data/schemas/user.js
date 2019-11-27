const {Schema} = require('mongoose')
const Links = require('./links')
const { validators: { isEmail } } = require('upbeat-util')

module.exports = new Schema ({
    username: {
        type: String,
        required: true,    
    },
    email: {
        type: String,
        required: true,
        validate: isEmail,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },

    image: {
        type: String,
        //required: true
    },

    rol: {
        type: String,
        required: true,
        enum: ['solo', 'groups']
    },

    format: {
        type: Object
    },
   
    description: {
        type: String
    },

    upcomings: {
        type: String
    },

    links : [Links],

    favs: {
        type: Array
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
        }
    }
   
})