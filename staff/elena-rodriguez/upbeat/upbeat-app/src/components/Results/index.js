import React from 'react'
import ResultsItem from '../Results-item'

export default function ({ results }) {
    debugger
    return <ul className="results">
        {results?results.map(result => <li className="task-list__item" key={result.id}><ResultsItem result={result} /></li>): <></>}
    </ul>
    
}
// {results && results.map(result => <li className="results__item" key={result.id}><ResultsItem result={result} /></li>)}