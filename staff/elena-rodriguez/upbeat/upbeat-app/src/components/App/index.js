import React, { useState, useEffect, UseParams } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Header from '../Header'
import Search from '../Search'
import Footer from '../Footer'
import Detail from '../Detail'
import Account from '../Account'
import EditProfile from '../Edit-profile'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, searchUsers, retrieveMusician, editProfile } from '../../logic/'
// import { authenticateUser, registerUser, retrieveUser, listTasks, modifyTask, createTask } from '../../logic'

export default withRouter(function ({ history }) {
    const [username, setUsername] = useState()
    const [user, setUser] = useState(undefined)
    const [result, setResult] = useState([])
    const [musician, setMusician] = useState({})
    const [render, setRender] = useState(true)

    useEffect(() => {
        const { token, musicianId } = sessionStorage;
         
        
        (async () => {
            if (token) {
                
                const user = await retrieveUser(token)
                
                setUsername(user.username)
                setUser(user)
                if(musicianId !== undefined) {
                const musician = await retrieveMusician(musicianId)
                setMusician(musician)
                }

            }
        })()
    }, [sessionStorage.token, sessionStorage.musicianId, setUser, render])




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
        
        } catch (error) {
            console.error(error)
        }
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

        try {
            
            const musician = await retrieveMusician(id)
            
            sessionStorage.musicianId = id
            setMusician(musician)
            history.push(`/detail/${id}`)
        }
            catch (error) {
                console.error(error)
        }
            
    }

    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }

    function handleGoToEdit() { 
        history.push('/edit') 
    }

    async function handleEdit(id, username, email, description, upcomings) { 
        
        try { 
            const token = sessionStorage.token

            await editProfile(id, token, username, email, description, upcomings)
            const user = await retrieveUser(token)
            setUser(user)
            setRender(!render)
            history.push('/') 
        }
            catch (error) {
                console.error(error)
        }
            
    }

    function handleGoToAccount() {
        history.push('/account')
    }

    async function handleAccount(token) {

        try {
            
            const user = await retrieveUser(token)
            
        }
            catch (error) {
                console.error(error)
        }
            
    }
        


    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/search" /> : <Landing />} />
        <Route path="/register" render={() => token ? <Redirect to="/search" /> : <><Header /><Register onRegister={handleRegister} /> </>} />
        <Route path="/login" render={() => token ? <Redirect to="/search" /> : <><Header /><Login onLogin={handleLogin} /> </>} />
        <Route path="/search" render={() => token ? <><Header /><Search username={username} onSearch={handleSearch} results={result} onDetail={handleDetail}/><Footer onLogout={handleLogout} onEdit={handleGoToEdit} onAccount={handleGoToAccount}/> </> : <Redirect to="/" />} />
        <Route path="/detail/:id" render={() => token ? <><Header /><Detail musician={musician}/><Footer onLogout={handleLogout} onEdit={handleGoToEdit} onAccount={handleGoToAccount}/> </> : <Redirect to= "/" />} />
        <Route path="/edit" render={() => token? <><Header /><EditProfile  user={user} onEdit={handleEdit}/> <Footer onLogout={handleLogout} onEdit={handleGoToEdit} onAccount={handleGoToAccount}/> </>: <Redirect to= "/" />}/>
        <Route path="/account" render={() => token && user ? <><Header /><Account onAccount={handleAccount} user={user}/><Footer onLogout={handleLogout} onEdit={handleGoToEdit} onAccount={handleGoToAccount}/> </> :  <Redirect to= "/" />  }/>        
    </>
})