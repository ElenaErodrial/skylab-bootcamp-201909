import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Holi from '../holi'
// import Board from '../Board'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser} from '../../logic/'
// import { authenticateUser, registerUser, retrieveUser, listTasks, modifyTask, createTask } from '../../logic'
// import Hello from '../Hello'

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

   

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }

    async function handleRegister(username, email, password, rol) {
        try {
            // await registerUser(username, email, password)

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
        <Route exact path="/" render={() => token ? <Redirect to="/holi" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/holi" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token ? <Redirect to="/holi" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/holi" render={() => <Holi  />} />           
       
    </>
})