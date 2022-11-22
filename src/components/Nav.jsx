import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'
import { } from '../config/firebase'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useUser } from '../utils/db'

function Nav() {

    const [user, setUser] = useState(false)

    const auth = getAuth()

    const handleSignOut = async () => {
        const res = await signOut(auth)

    }

    useEffect(() => {
        onAuthStateChanged(auth, () => { setUser(auth.currentUser) })
    })


    const onSuccess = (data) => {
        console.log(data.data)
    }

    const onError = (error) => {
        console.log(error)
    }

    // const [isLoading, data, error] = useUser(user.uid, onSuccess, onError)




    return (
        <div className='navbar-ctn'>
            <Link className='nav-btn' to='/'>Home</Link>
            <Link className='nav-btn' to='/login'>Login</Link>
            {
                !auth.currentUser
                    ? <Link to='/signup'>Sign up</Link>
                    : <div onClick={() => handleSignOut()}>Log out</div>
            }
            <Link className='nav-btn' to='/discover'>Discover</Link>
            <Link className='nav-btn' to='/watchlist'>Watchlist</Link>
            <div className='nav-btn'>{auth.currentUser?.email}</div>
        </div>
    )
}

export default Nav