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

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register({ path: '/' }) }))
})
app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {

        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, error => {
                if (error) res.send('Todo maaaal')
                else res.redirect('/')
            })
        } catch (error) {
            if (error) res.send('Todo va a ir bien, pero no ahora')
        }

    })
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/' }) }))
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const { email, password } = querystring.parse(content)

        try {
            authenticateUser(email, password, (error, data) => {
                if (error) res.send('Problemilla con la autentificación')

                try {
                    const { id, token } = data

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