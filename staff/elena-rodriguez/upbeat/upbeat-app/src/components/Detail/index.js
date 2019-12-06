import React from 'react'


export default function () {
    return <section className="profile">
<div className="profile__header">
    <h2 className='profile__username'>Oriol Colomé</h2>
    <p className='profile__position'>Guitar player</p>
</div>
<div className="location-container">
    <i className="fas fa-map-marker-alt"></i>
    <p className="profile__ubication">Barcelona</p>
</div>
<div className="user-content">
    <div className="image-container">
        <img className="user-content__img" src="images/oriol.jpg" />
        <a href="#"><i className="far fa-heart"></i></a>
    </div>
    <p className="user-content__description">I'm a guitar player from Barcelona. I finished last year my degree on
        modern
        music and guitar at Taller de Músics.Currently looking for a combo where to play in and do some jazz!
    </p>
    <h2 className='user-content__subtitle'>Some of my work:</h2>
    <a className="user-content__links"
        href="http://tallerdemusics.com/festival-talent/viernes-29-de-junio/oriol-colome/" target="_blank">
        Taller De Músics</a>
    <h2 className='user-content__subtitle'>Upcoming performances:</h2>
    <p className="user-content__activities">Playing on Nota 69, next wednesday 17th November, 18:00h. Free access!
    </p>
    <h2 className='user-content__subtitle'>Contact me: </h2>
    <div className="contact-icons">
        <a href="mailto:elena.erodrial@gmail.com"><i className="far fa-envelope"></i></a>
        <button className="chat"><i className="far fa-comments"></i></button>
    </div>
</div>
<buttom className="go-back">Go back</buttom>
</section>
}