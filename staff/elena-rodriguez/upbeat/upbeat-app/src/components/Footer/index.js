import React from 'react'
import { Link } from 'react-router-dom'

export default function({onLogout, onEdit, onAccount}) {
    return <footer className="footer">
         <form className="footer__modify" onSubmit={event => { event.preventDefault(); onAccount() }}><button><i className="far fa-user"></i></button></form>
        <Link className="footer__favs" to="/myfavs"><i className="fas fa-hand-holding-heart"></i></Link>
        <Link className='footer__chats' to="/chats"><i className="far fa-comment-dots"></i></Link>
        <form className="footer__modify" onSubmit={event => { event.preventDefault(); onEdit() }}><button><i className="fas fa-user-cog"></i></button></form>
         {/* <Link className="footer__modify" to="/edit"><i className="fas fa-user-cog"></i></Link> */}
        {/* <a className="footer__logout" onClick={onLogout()}><i className="fas fa-sign-out-alt"></i></a> */}
        <form className="footer__logout" onSubmit={event => { event.preventDefault(); onLogout() }}><button><i className="fas fa-sign-out-alt"></i></button></form>
        </footer>
}
