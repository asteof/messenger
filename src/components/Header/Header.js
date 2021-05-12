import React, {useEffect, useState} from 'react';
import style from './Header.module.css'
import {NavLink} from "react-router-dom";
import CreateDefaultUsers from "../test/CreateDefault/createDefaultUsers";

const Header = (props) => {

    const {isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser} = props
    const [logoutLinkText, setLogoutLinkText] = useState('Logout')

    useEffect(() => {
        if (isLoggedIn) {
            setLogoutLinkText('Logout')
        } else {
            setLogoutLinkText('Login')
        }
    }, [isLoggedIn])

    const logout = (e) => {
        if (isLoggedIn === true) {
            setIsLoggedIn(false)
            localStorage.removeItem('token')
            setCurrentUser({})
        }
    }

    return (
        <header className={style.header}>

            <div className={style.logoWrap}>
                <p className={style.logo}>Messenger <span className={style.huiogo}>huiessenger</span></p>
            </div>
            {/*<div className={s.mess}>*/}
            <nav className={style.navigation}>
                <NavLink to='/signup' className={style.headerLink}>Sign Up</NavLink>
                <NavLink to='/login' className={style.headerLink}>Login</NavLink>
                <NavLink to='/chat' className={style.headerLink}>Chat</NavLink>
                <NavLink to='/test' className={style.headerLink}>Test</NavLink>
                {/*<CreateDefaultUsers/>*/}
            </nav>

            <div className={style.rightBar}>
                <div className={style.username}>
                    {currentUser.username || ''}
                </div>
                <NavLink to='/login'
                         className={`${style.logoutLink} ${style.headerLink}`}
                         onClick={logout}>
                    {logoutLinkText}
                </NavLink>
            </div>
            {/*</div>*/}


        </header>
    )
}

export default Header;