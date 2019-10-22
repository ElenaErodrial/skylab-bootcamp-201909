const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', error: undefined }

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleBackFromRegister = this.handleBackFromRegister.bind(this)
        this.handleBackFromLogin = this.handleBackFromLogin.bind(this)
    }

    handleGoToRegister() {
        this.setState({ view: 'register' })
    }


    handleRegister(name, surname, email, password) {
        try {
            registerUser(name, surname, email, password, error => {
                if (error) this.setState({ error: error.message }) // error de la API
                else this.setState({ view: 'landing' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackFromRegister() {
        this.setState({ view: 'landing', error: undefined })
    }

    handleGoToLogin() {
        this.setState({ view: 'login'})
    }

    handleLogin(email, password) {
        try {
            authenticateUser(email,password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState({view: 'search'})
            })
        } catch (error) {
            this.setState({ error: error.message})
        }

    }


    handleBackFromLogin() {
        this.setState({ view: 'landing', error: undefined })
    }

    render() {
        const { state: { view, error }, handleGoToRegister, handleGoToLogin, handleRegister, handleLogin,handleBackFromRegister, handleBackFromLogin} = this

        return <>
            {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
            {view === 'register' && <Register onRegister={handleRegister} onBack={handleBackFromRegister} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onBack={handleBackFromLogin} error={error} />}
        </>
    }
}

// TODO login and search

ReactDOM.render(<App />, document.getElementById('root'))