function Landing({ onRegister, onLogin }) {
    return <section className="view landing">
        <h1 className="landing__title">Welcome to Duck App 🐥</h1>
        <p className="landing__options">Please, proceed to <a href="" onClick={event => {
            event.preventDefault()

            onRegister()
        }}>Register</a> or <a href="" onClick={event => {
            event.preventDefault()

            onLogin()
        }}>Login</a>.</p>
    </section>
}

/*Lo que hace es que te muestra la pantalla de Landing, 
incluyendo un link para register(con la llamada a función 
correspondiente, y un link a login incluyendo la llamada a función correspondiente. */