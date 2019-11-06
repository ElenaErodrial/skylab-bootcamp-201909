const express = require('express')
const Landing = require('./components/landing')
const Login = require('./components/login')
const Register = require('./components/register')
const View = require('./components/view')

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
     
})

app.get('/login', (req, res) => {
    res.send(View({body : Login({landing: '/'})})) 
})



app.listen(port, () => console.log(`server running on port ${port}`))