function Search({onSearch, error}) {
    return <section className="view search _hide">
        <h1 className="search__title">search</h1>

        <form  onSubmit ={event => {

            event.preventDefault();
        
            const { query: {value: query} } = event.target

            onSearch(query);

        }}>


            <span className ="search__icon">🐣</span>
            <input className = "search__criteria" type= "text" name = "query" placeholder="criteria" ></input>
            <button className = "search__submit">🔍</button>

        </form>

        {error && <Feedback message={error} />}

    </section>



}