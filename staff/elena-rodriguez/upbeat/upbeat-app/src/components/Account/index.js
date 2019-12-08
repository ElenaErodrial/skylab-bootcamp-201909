import React, { useEffect } from 'react'
// import { retrieveMusician } from '../../logic/'
import { Link } from 'react-router-dom'

export default function ({ user }) {


    const { username, description, rol, format, email, image, links, upcomings } = user
   


    return <>{user && <section className="profile">
        <div className="profile__header">
            <h2 className='profile__username'>{username}</h2>
            <p className='profile__position'>{(rol === "solo") ? format.instruments.join() : format.groups}</p>
        </div>
        <div className="location-container">
            <i className="fas fa-map-marker-alt"></i>
            <p className="profile__ubication">Barcelona</p>
        </div>
        <div className="user-content">
            <div className="image-container">
            { rol === "solo" && <img className="user-content__img" src={image ? image : "images/default/solo.jpg"}/>}
            { rol === "groups" && <img className="user-content__img" src={image ? image : "images/default/groups.jpg"}/>}
                <a href="#"><i className="far fa-heart"></i></a>
            </div>
            <p className="user-content__description">{description}</p>
            <h2 className='user-content__subtitle'>Some of my work:</h2>
            <a className="user-content__links"
                href="http://tallerdemusics.com/festival-talent/viernes-29-de-junio/oriol-colome/" target="_blank">
                Taller De Músics</a>
            <h2 className='user-content__subtitle'>Upcoming performances:</h2>
            <p className="user-content__activities">{upcomings}
            </p>
            <h2 className='user-content__subtitle'>Contact me: </h2>
            <div className="contact-icons">
                <a href={"mailto:" + email}><i className="far fa-envelope"></i></a>
                <button className="chat"><i className="far fa-comments"></i></button>
            </div>
        </div>
        <Link className="register-form__login" to="/"> Go back</Link>
    </section>}</>
}