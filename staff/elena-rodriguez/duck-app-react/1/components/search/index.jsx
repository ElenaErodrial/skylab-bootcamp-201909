//función te crea la section de Search
function Search({ onSubmit, results, error, onResultsRender }) {
    return <section className="view search">
        <h1 className="search__title">Search</h1>

        <form onSubmit={event => {
            event.preventDefault()

            //const query = event.target.query.value
            const {query:{value : query}}= event.target

            onSubmit(query)
        }}>
            <span className="search__icon">🐣</span>
            <input className="search__criteria" type="text" name="query" placeholder="criteria" />
            <button className="search__submit">🔍</button>
        </form>

        {error && <Feedback message={error} />}

        {results && onResultsRender(results)}
    </section>
}

//las últimas líneas son un if, else. Si devuelve error, nos lanza mensaje de error.
//si hay results, nos ejecuta onResultsRender(que nos imprime o muestra los patos)