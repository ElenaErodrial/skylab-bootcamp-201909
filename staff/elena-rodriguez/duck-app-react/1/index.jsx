const { Component } = React

class App extends Component {
    constructor() {
        super() 

        this.state = { view: 'landing', error: undefined, ducks: [], duck : undefined}

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleDetail = this.handleDetail.bind(this)
        this.handleBackToSearch = this.handleBackToSearch.bind(this)
    }


    handleGoToRegister() {
        this.setState({ view: 'register' })
    }



    handleGoToLogin() {
        this.setState({ view: 'login'})
    }

    
    handleRegister(name, surname, email, password) {
        try {


            registerUser(name, surname, email, password, error => {
                if (error) this.setState({ error: error.message }) 
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }



handleBackToLanding(){
    this.setState({ view: 'landing', error: undefined })
}


handleLogin(email, password) {
    try {
        authenticateUser(email,password, (error, data) => {
            if (error) this.setState({ error: error.message })
            else this.setState({view: 'search', data})
        })
    } catch (error) {
        this.setState({ error: error.message})
    }

}

handleSearch(query) {
    try{
        searchDucks(query, (error, ducks) => {
            if (error) this.setState({ error: error.message })
            else this.setState({ error: undefined, ducks })
        })   
    } catch (error) {
        this.setState({error: error.message})
        }
}

handleDetail(id) {
    try {
        retrieveDuck(id, (error, duck) => {
            if (error) this.setState({error: error.message})
            else this.setState({error: undefined, duck, view : 'detail'})
        })

    } catch (error) {
        this.setState({error: error.message})
    }
}

handleBackToSearch(){
    this.setState({ view: 'search', error: undefined })
}


render() {
    const { state: { view, error, ducks , duck}, handleGoToRegister, handleGoToLogin, handleRegister, handleLogin, handleBackToLanding, handleSearch, handleDetail, handleBackToSearch} = this

    return <>
        {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
        {view === 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding} error={error} />}
        {view === 'login' && <Login onLogin={handleLogin} onBack={handleBackToLanding} error={error} />}
        {view === 'search' && <Search onSubmit={handleSearch} results= {ducks} error= {error} onResultsRender={results => <Results items={results} onItemRender={item => <ResultItem item={item} key={item.id} onClick={handleDetail} />}/>}/>}
        {view === 'detail' && <Detail result={duck} error={error} onBack={handleBackToSearch} />}
        
        </>
    
    }
}

ReactDOM.render(<App />, document.getElementById('root'))