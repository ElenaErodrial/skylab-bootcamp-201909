import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ user }) {
    return <section className="search">
        <p className='greeting'>Hello, {user}! </p>
        <form className='searcher'>
            <input type="text" className='searcher__bar' name="instruments" placeholder="what are you looking for?" />
            <button className="searcher__button">Search</button>
        </form>
    </section>

}