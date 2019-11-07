const express = require('express')
const View = require('./components/view')
const Landing = require('./components/landing')
const Register = require('./components/register')
const Login = require('./components/login')
const Search = require('./components/search')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const retrieveUser = require('./logic/retrieve-user')
const searchDucks = require('./logic/search-ducks')


const { argv: [, , port = 8080] } = process

const sessions = {}

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register({ path: '/register' }) }))
})
app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {

        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, error => {
                if (error) return res.send('Todo maaaal')
               
                res.redirect('/')
            })
        } catch (error) {
            if (error) res.send('Todo irá bien, pero no ahora')
        }

    })
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const { email, password } = querystring.parse(content)

        try {
            authenticateUser(email, password, (error, credentials) => {
                if (error) return res.send('Problemilla con la autentificación')

                try {
                    const { id, token } = credentials

                    retrieveUser(id, token, (error, user) => {
                        if (error) res.send('no funciona el retrieve')
                        else {
                            const { name } = user
                            res.send(`Hola ${name}`)
                        }
                    })
                } catch (error) {
                    if (error) res.send('todo son problemas con los logins')
                }
            })
        } catch (error) {
            if (error) res.send('otro puto problema más')
        }
    })

})


app.listen(port, () => console.log(`server running on port ${port}`))