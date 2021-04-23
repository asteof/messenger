import React from 'react';
import s from './header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>

            <div className={s.logoWrap}>
                <p className={s.logo}>Messenger <span>huiessenger</span></p>
            </div>
            {/*<div className={s.mess}>*/}
            <nav className={s.navigation}>
                <NavLink to='/signup' className={s.headerLink}>Sign Up</NavLink>
                <NavLink to='/login' className={s.headerLink}>Login</NavLink>
                <NavLink to='/chat' className={s.headerLink}>Chat</NavLink>
                <NavLink to='/test' className={s.headerLink}>Test</NavLink>
            </nav>
            {/*<a href="#" onClick='document.history.go(0)'>Logout</a>*/}
            {/*</div>*/}

        </header>
    )
}

export default Header;