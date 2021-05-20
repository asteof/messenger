import React, {useEffect, useState} from 'react';
import style from './Header.module.css'
import {NavLink} from "react-router-dom";
import logoutOrange from '../../media/icons/logout-orange.svg'
import loginOrange from '../../media/icons/login.svg'

const Header = (props) => {

    const {isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser} = props
    const [logoutLink, setLogoutLink] = useState({
        link: 'Logout',
        pic: logoutOrange,
    })

    useEffect(() => {
        if (isLoggedIn) {
            setLogoutLink(prev => ({
                ...prev,
                link: 'Logout',
                pic: logoutOrange
            }))
        } else {
            setLogoutLink(prev => ({
                ...prev,
                link: 'Login',
                pic: loginOrange
            }))
        }
    }, [isLoggedIn])

    const logout = () => {
        if (isLoggedIn === true) {
            setIsLoggedIn(false)
            localStorage.removeItem('token')
            setCurrentUser({})
        }
    }

    return (
        <header className={style.header}>

            <div className={style.logoWrap}>
                <p className={style.logo}>Messenger <span className={style.memogo}>memessenger</span></p>
            </div>


            <div className={style.rightBar}>
                <div className={style.username}>
                    {currentUser.username || ''}
                </div>
                <NavLink to='/login'
                         className={`${style.logoutLink} ${style.headerLink}`}
                         onClick={logout}>
                    {logoutLink.link}
                    <img src={logoutLink.pic}
                         className={style.icon}
                         alt="Logout"/>
                </NavLink>
            </div>

        </header>
    )
}

export default Header;