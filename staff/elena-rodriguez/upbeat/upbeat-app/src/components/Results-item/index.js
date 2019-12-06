import React from 'react'

export default function ({result}) {
    return <a href="#" className="item">
    <img className="item__image" src="../images/oriol.jpg"/>
    <div className="item__contdata">
        <i className="far fa-heart"></i>
        <h2 className="item__contdata-username">{result.username}</h2>
        <h3 className="item__contdata-position">{result.format.groups}</h3>
        <h3 className="item__contdata-position">{result.format.instruments&&result.format.instruments.join()}</h3>
        <p className="item__contdata-ubication">Barcelona📍</p>
    </div>
</a>
}