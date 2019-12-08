import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ user : {id, username, email, description, upcomings }, onEdit }) { 
    return <>

        <section className="edit">
            <h1 className="edit__title">Edit your profile</h1>
            <div className="line"></div>
            <form className='edit-form' onSubmit={function (event) {
                event.preventDefault()

                const { username: { value: username }, email: { value: email }, description: { value: description }, upcomings: { value: upcomings } } = event.target

                onEdit( id, username, email, description,  upcomings)
            }}>
                <p className="instructions">{username}, tell us something about you: </p>
                <textarea className="edit-form__description" name="description" cols="30" rows="10"
                    placeholder="write something about you">{description ? description : ""}</textarea>

                <p className="instructions">You next performaces or activities </p>
                <textarea className="edit-form__activities" name="upcomings" cols="30" rows="10"
                    placeholder="tell people about your next activites/performances">{upcomings ? upcomings : ""}</textarea>

                <p className="instructions">Modify your info here: </p>
                <input className="register-form__username" type="username" name="username" defaultValue={username} />
                <input className="register-form__email" type="email" name="email" defaultValue={email} />
                <button className="edit-form__submit">Submit</button>

            </form>
            <Link className="go-back" to="/search"> Go back</Link>

        </section>
    </>

}
