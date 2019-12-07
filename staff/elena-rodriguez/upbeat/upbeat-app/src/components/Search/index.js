import React from 'react'
import { Link } from 'react-router-dom'

import Results from '../Results'

export default function ({ user, onSearch, results, onDetail }) {
    debugger
    return <>
        <section className="search">
            <p className='greeting'>Hello, {user}! </p>
            <form className='searcher' onSubmit={event => {
                event.preventDefault();
                const { query: { value: query } } = event.target
                onSearch(query)
            }}>
                <input type="text" className='searcher__bar' name="query" placeholder="what are you looking for?" />
                <button className="searcher__button">Search</button>
            </form>
            <Results results={results} onDetail = {onDetail}/>
        </section>
    </>
}