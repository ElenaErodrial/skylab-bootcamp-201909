import React from 'react'
import { Link } from 'react-router-dom'
import {saveImage} from '../../logic'

export default function ({ user : {id, username, email, description, upcomings, location }, onEdit }) { 
    const {token} = sessionStorage
    async function onSaveImage(event) {
        event.preventDefault()  
        try {      
            const {file : {files : [image]}} = event.target

            debugger
            
            await saveImage(token, image)

        } catch (error) {
            console.log(error)
        }
    }
    
    return <>

        <section className="edit">
            <h1 className="edit__title">Edit your profile</h1>
            <div className="line"></div>
            <form className='edit-form' onSubmit={event=> {
                event.preventDefault()

                const { username: { value: username }, email: { value: email }, description: { value: description }, upcomings: { value: upcomings }, location : {value: location} } = event.target

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
                <input className="register-form__location" type="location" name="location" defaultValue={location} />
                <button className="edit-form__submit">Submit</button>

            </form>

            <form onSubmit = {
                onSaveImage
            }
            >
            
                        <p className="instructions">Add a profile picture</p>
                        <input className="edit-form__image" type="file" name="file" accept="image/*"/>>
                   
                    <button>Save</button>
            </form>
            <Link className="go-back" to="/search"> Go back</Link>

        </section>
    </>

}
