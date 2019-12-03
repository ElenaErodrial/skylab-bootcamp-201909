import React from 'react'

export default function({ onRegister, onLogin }) {
    return <section className="landing">
        <h1 className="landing__title">UpBeat</h1>
        <h2 className="landing__slogan">From Musicians, For Musicians</h2>
        <a className="landing__register" href="" onClick={event => {event.preventDefault(); onRegister() }}>Register</a>
        <a className="landing__login" href="" onClick={event => {event.preventDefault(); onLogin() }}>Login</a>
    </section>
}