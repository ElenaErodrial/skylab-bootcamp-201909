const express = require('express')
const View = require('./components/view')
const Landing = require('./components/landing')
const Register = require('./components/register')
const Login = require('./components/login')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')


const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({body : Landing({register: '/register' , login: '/login'})})) 
})

app.get('/register', (req, res) => {
    res.send(View({body : Register({landing: '/'})})) 
})
app.post('/register', (req, res) => {
     let content = ''

     req.on('data' , chunk => content += chunk)

     req.on('end' , () => {
        
        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, error => {
                if (error) res.send('Todo maaaal')
                else res.send(View({body : Login({landing: '/'})}))
            })
        } catch(error) {
            if (error) res.send('Todo va a ir bien, pero no ahora')
        }

     })
})

app.get('/login', (req, res) => {
    res.send(View({body : Login({landing: '/'})})) 
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data' , chunk => content += chunk)

    req.on('end' , () => {
        const { email, password } = querystring.parse(content)

        try {
            authenticateUser(email, password, error => {
                if (error) res.send('Problemilla con la autentificación')
                else res.send(View({body : Landing({register: '/register' , login: '/login'})})) 
            })
        }catch(error) {
            if(error) res.send('todo son problemas con los logins')
        }
    })
})




app.listen(port, () => console.log(`server running on port ${port}`))