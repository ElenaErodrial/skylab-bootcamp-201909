//we get the framework express
const express = require('express')
//we get components, logic and middlewares by using destructuring
const { View, Landing, Register, Login, Search, Detail } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks, toggleFavDuck, retrieveDuck } = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')

//command line argument viw the built-in way process.argv. Destructuring again
//its a global object we can use withou libraries.
//The first element of the process.argv array will always be a file system path pointing to the node executable.
//The second element is the name of the JavaScript file that is being executed. 
//And the third element is the first argument that was actually passed by the user. In our case, the port. 
const { argv: [, , port = 8080] } = process

const sessions = {}

const app = express()

app.use(express.static('public'))


//basically, we print the view landing, with register and login access.
app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})


//we print the view register
app.get('/register', (req, res) => {
    res.send(View({ body: Register({ path: '/register' }) }))
})

//bodyParse is a middleware, what is doing is just parsing the body of the register
app.post('/register', bodyParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password)
            .then(() => res.redirect('/'))
            .catch(({ message }) => res.send(View({ body: Register({ path: '/register', error: message }) })))
    } catch (error) {
        res.send(View({ body: Register({ path: '/register', error: error.message }) }))
    }
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', bodyParser, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(credentials => {
                const { id, token } = credentials
                sessions[id] = { token }
                res.setHeader('set-cookie', `id=${id}`)
                res.redirect('/search')

            }).catch(({ message }) => {
                res.send(View({ body: Login({ path: '/login', error: message }) }))
            })
    } catch ({ message }) {
        res.send(View({ body: Login({ path: '/login', error: message }) }))
    }
})



app.get('/search', cookieParser, (req, res) => {
    try {

        const { cookies: { id }, query: { q: query } } = req
        if (!id) return res.redirect('/')
        const session = sessions[id]

        if (!session) return res.redirect('/')
        const { token } = sessions[id]

        if (!token) return res.redirect('/')

        let name

        retrieveUser(id, token)
            .then(user => {
                name = user.name

                if (!query) return res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))

                session.query = query

                return searchDucks(id, token, query)
                    .then(ducks => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', results: ducks, favPath: '/fav', detailPath: '/ducks' }) })))
            })
            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
    }
})



app.post('/logout', cookieParser, (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { cookies: { id } } = req

    if (!id) return res.redirect('/')

    delete sessions[id]

    res.redirect('/')
})

app.post('/fav', cookieParser, bodyParser, (req, res) => {
    try {
        const { cookies: { id }, body: { id: duckId } } = req

        if (!id) return res.redirect('/')

        const session = sessions[id]

        if (!session) return res.redirect('/')

        const { token, query } = session

        if (!token) return res.redirect('/')

        retrieveDuck(id, token, duckId)
            .then(() => res.redirect(`/search?q=${query}`))
            .catch(({ message }) => {
                res.send('TODO error handling')
            })
    } catch ({ message }) {
        //res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
        res.send('TODO error handling')
    }
})


app.get('/ducks/:id', cookieParser, (req, res) => {
    // TODO control session, etc

    try {
        const { cookies: { id }, params: { id: duckId } } = req
        if (!id) return res.redirect('/')
        const session = sessions[id]
        if (!session) return res.redirect('/')
        const { token, query } = session
        if (!token) return res.redirect('/')
        retrieveDuck(id, token, duckId)
            .then(duck =>
                res.send(View({ body: Detail({ duck, resultsPath: '/search?q=' + query, favPath: '/fav'}) }))
            )

            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, logout: '/logout', error: message }) }))

            )

    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', logout: '/logout', error: message }) }))
    }
})


app.listen(port, () => console.log(`server running on port ${port}`))