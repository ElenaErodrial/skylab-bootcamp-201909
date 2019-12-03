import React from 'react'
// import './index.sass'

export default function({ onRegister, onBack, error }) {
    return <section className="register">

        <h1 className="register__title">Register</h1>
        <h2 className="register__intro">New at UpBeat?</h2>
        <h2 className="register__intro">Create an account, it's easy and free!</h2>
        <div className="line"></div>
        <form className="register-form" onSubmit={function (event) {
            event.preventDefault()

            const { username: { value: username }, email: { value: email },  password: { value: password }, rol: { value: rol} } = event.target

            onRegister(username, email, password, rol)
        }}>


        <input className="register-form__username" type="name" name="name" placeholder="user or artistic name"/>
        <input className="register-form__email" type="email" name="email" placeholder="e-mail"/>
        <input className="register-form__password" type="password" name="password" placeholder="password"/>
        <div className="checking-container">
                <p className="instructions">Single musician or a group?</p>

                <label>Single musician</label><input className="register-form__option" id="type-single" type="radio"
                    name="type" value="single"/>
                <br/>
                <label>Group</label>
                <input className="register-form__option" id="type-groups" type="radio" name="type" value="group"/>

                <div className="type-groups">
                    <p className="instructions">Type of group</p>
                    <div className="checkbox-container">
                        <label>Rock Band</label><input className="register-form__option" id="type-groups" type="radio"
                            name="type" value="group" />
                        <label>Classic ensemble</label><input className="register-form__option" id="type-groups"
                            type="radio" name="type" value="group"/>
                        <label>Choir</label><input className="register-form__option" id="type-groups" type="radio"
                            name="type" value="group"/>
                        <label>Orchestra</label><input className="register-form__option" id="type-groups" type="radio"
                            name="type" value="group"/>
                    </div>
                </div>

                <div className="type-single">
                    <p className="instructions">Instruments</p>
                    <div className="checkbox-container">
                        <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="oboe"/>Oboe</label>
                        <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="drums"/>Drums</label>
                        <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="violin"/>Violin</label>
                        <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="piano"/>Piano</label>
                        <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="guitar"/>Guitar</label>
                        <label><input className="register-form__option" type="checkbox" name="instruments[]"
                                value="bass"/>Bass</label>
                    </div>
                </div>
            </div>
            <button className="register-form__submit">Submit</button>
            <a className="register-form__login" href="#">Go back to Login</a>
          
           </form>
    </section>
}




