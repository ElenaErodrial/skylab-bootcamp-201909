import React from 'react'

export default function({onLogin, onBack, error}) {
return <section className="login">
<h1 className="login__title">Login</h1>

<form className="login-form" onSubmit={function (event) {
            event.preventDefault()

            const { email: { value: email },  password: { value: password } } = event.target

            onLogin(email, password)
        }}>

    <input className="login-form__email" type="email" name="email" placeholder="e-mail"/>
    <input className="login-form__password" type="password" name="password" placeholder="password"/>
    <button className="login-form__submit">Submit</button>
    <a className="login-form__register" href="#">Create an account</a>
</form>

</section>


}
