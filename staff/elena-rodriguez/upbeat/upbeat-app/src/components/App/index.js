import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Holi from '../holi'
import Header from '../Header'
// import Board from '../Board'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser} from '../../logic/'
// import { authenticateUser, registerUser, retrieveUser, listTasks, modifyTask, createTask } from '../../logic'

export default withRouter(function ({ history }) {
    const [name, setName] = useState()
    const [tasks, setTasks] = useState([])

    // useEffect(() => {
    //     const { token } = sessionStorage;

    //     (async () => {
    //         if (token) {
    //             const { name } = await retrieveUser(token)

    //             setName(name)

    //             await retrieveTasks(token)
    //         }
    //     })()
    // }, [sessionStorage.token])

   

    async function handleRegister(username, email, password, rol, instruments, groups, latitude, longitude) {
        try {
            await registerUser(username, email, password, rol, instruments, groups, latitude, longitude)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(email, password) {
        try {
            const token = await authenticateUser(email, password)

            sessionStorage.token = token

            history.push('/holi')
            console.log('ok login')
        } catch (error) {
            console.error(error)
        }
    }

    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }

 

   

    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/holi" /> : <Landing />} />
        <Route path="/register" render={() => token ? <Redirect to="/holi" /> : <><Header/><Register onRegister={handleRegister}  /> </>} />
        <Route path="/login" render={() => token ? <Redirect to="/holi" /> : <><Header/><Login onLogin={handleLogin}  /> </>} />
        <Route path="/holi" render={() => <Holi />} />    
       
    </>
})