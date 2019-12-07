import React from 'react'
import { Link } from 'react-router-dom'

export default function({onLogout}) {
    return <footer className="footer">
        <Link className="footer__account" to="/myacount"><i className="far fa-user"></i></Link>
        <Link className="footer__favs" to="/myfavs"><i className="fas fa-hand-holding-heart"></i></Link>
        <Link className='footer__chats' to="/chats"><i className="far fa-comment-dots"></i></Link>
        <Link className="footer__modify" to="/edit"><i className="fas fa-user-cog"></i></Link>
        {/* <a className="footer__logout" onClick={onLogout()}><i className="fas fa-sign-out-alt"></i></a> */}
        <form className="footer__logout" onSubmit={event => { event.preventDefault(); onLogout() }}><button><i className="fas fa-sign-out-alt"></i></button></form>
        </footer>
}
