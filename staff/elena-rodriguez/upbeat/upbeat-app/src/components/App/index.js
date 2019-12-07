import React, { useState, useEffect, UseParams } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Holi from '../holi'
import Header from '../Header'
import Search from '../Search'
import Footer from '../Footer'
import Detail from '../Detail'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, searchUsers, retrieveMusician } from '../../logic/'
// import { authenticateUser, registerUser, retrieveUser, listTasks, modifyTask, createTask } from '../../logic'

export default withRouter(function ({ history }) {
    const [username, setUsername] = useState()
    const [result, setResult] = useState([])
    const [musician, setMusician] = useState({})

    useEffect(() => {
        const { token, musicianId } = sessionStorage;
         
        
        (async () => {
            if (token) {
                
                const { username } = await retrieveUser(token)
                setUsername(username)

                if(musicianId !== undefined) {
                    const musician = await retrieveMusician(musicianId)
                setMusician(musician)
                }

            }
        })()
    }, [sessionStorage.token, sessionStorage.musicianId])




    async function handleRegister(username, email, password, rol, groups, instruments, latitude, longitude) {
        try {
            await registerUser(username, email, password, rol, groups, instruments, latitude, longitude)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(email, password) {
        try {
            const token = await authenticateUser(email, password)

            sessionStorage.token = token

            history.push('/search')
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

    async function handleSearch(query) {

        try {
            if (query) {const result = await searchUsers(query)
                
                setResult(result) 
            } else {setResult([])}
            }   
            
         catch (error) {
            console.error(error)
        }

    }

    async function handleDetail(id) {
        console.log(id)
debugger
        try {
            
            const musician = await retrieveMusician(id)
            debugger
            sessionStorage.musicianId = id
            setMusician(musician)
            history.push(`/detail/${id}`)
        }
            catch (error) {
                console.log(error)
        }
            
    }




    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/holi" /> : <Landing />} />
        <Route path="/register" render={() => token ? <Redirect to="/holi" /> : <><Header /><Register onRegister={handleRegister} /> </>} />
        <Route path="/login" render={() => token ? <Redirect to="/search" /> : <><Header /><Login onLogin={handleLogin} /> </>} />
        <Route path="/search" render={() => token ? <><Header /><Search user={username} onSearch={handleSearch} results={result} onDetail={handleDetail}/><Footer /> </> : <Redirect to="/" />} />
        <Route path="/detail/:id" render={() => token ? <Detail musician={musician}/> : <Redirect to= "/" />} />
        <Route path="/holi" render={() => <Holi />} />

    </>
})