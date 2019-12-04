import React from 'react'
import Holi from '../holi'
import { Link } from 'react-router-dom'
//import './index.sass'

export default function ({ onRegister, error }) {
    return <>
        <section className="register">

            <h1 className="register__title">Register</h1>
            <h2 className="register__intro">New at UpBeat?</h2>
            <h2 className="register__intro">Create an account, it's easy and free!</h2>
            <div className="line"></div>
            <form className="register-form" onSubmit={function (event) {
                
                event.preventDefault()

                const { username: { value: username }, email: { value: email }, password: { value: password }, rol: { value: rol },  groups: { value: groups } , instruments: { value: instruments }} = event.target

                onRegister(username, email, password, rol, groups, instruments)
            }}>


                <input className="register-form__username" type="username" name="username" placeholder="user or artistic name" />
                <input className="register-form__email" type="email" name="email" placeholder="e-mail" />
                <input className="register-form__password" type="password" name="password" placeholder="password" />
                <div className="checking-container">
                    <p className="instructions">Single musician or a group?</p>

                    <label>Single musician</label>
                    <input className="register-form__option" id="type-single" type="radio"
                        name="rol" value="solo" />
                    <br />
                    <label>Group</label>
                    <input className="register-form__option" id="type-groups" type="radio" name="rol" value="groups" />

                    <div className="type-groups">
                        <p className="instructions">Type of group</p>
                        <div className="checkbox-container">
                            <select name="groups">
                                <option value="band" selected>Band</option>
                                <option value="choir">Choir</option>
                                <option value="modern ensemble">Modern ensemble</option>
                                <option value="orchestra">Orchestra</option>
                                <option value="classic chamber">Classic chamber</option>

                            </select>



                            {/* 

                            <label>Band</label><input className="register-form__option" type="radio"
                                name="groups" value="band" />
                            <label>Choir</label><input className="register-form__option" type="radio"
                                name="groups" value="choir" />
                            <label>Modern ensemble</label><input className="register-form__option"
                                type="radio" name="groups" value="modern ensemble" />
                            <label>Orchestra</label><input className="register-form__option" type="radio"
                                name="groups" value="orchestra" />
                            <label>Classic chamber</label><input className="register-form__option" type="radio"
                                name="groups" value="classic chamber" /> */}
                        </div>
                    </div>

                    <div className="type-single">
                        <p className="instructions">Instruments</p>
                        <div className="checkbox-container">
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="drums" />Drums</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="guitar" />Guitar</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="piano" />Piano</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="violin" />Violin</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="bass" />Bass</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="cello" />Cello</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="clarinet" />Clarinet</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="double-bass" />Double-bass</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="flute" />Flute</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="saxophone" />Saxophone</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="trombone" />Trombone</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="trumpet" />Trumpet</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="ukelele" />Ukelele</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="viola" />Viola</label>
                            <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="voice" />Voice</label>
                        </div>
                    </div>
                </div>
                <button className="register-form__submit">Submit</button>
                <Link className="register-form__login" to="/"> Go back</Link>
            </form>
        </section>
    </>
}




