import React from 'react'
import Detail from '../Detail'

export default function ({result , onDetail}) {
    const { username, format, image, rol } = result
    return <a href="#" className="item" onClick={event => {event.preventDefault()

onDetail(result.id)    
}}>
    { rol === "solo" && <img className="item__image" src={image ? image : "images/default/solo.jpg"}/>}
    { rol === "groups" && <img className="item__image" src={image ? image : "images/default/groups.jpg"}/>}
    <div className="item__contdata">
        <i className="far fa-heart"></i>
        <h2 className="item__contdata-username">{username}</h2>
        <h3 className="item__contdata-position">{format.groups ? format.groups : format.instruments.join() }</h3>
        <p className="item__contdata-ubication">Barcelona📍</p>
    </div>
</a>
}