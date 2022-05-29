import React, {useEffect, useRef, useState} from 'react';
import style from './Menu.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import Profile from "./Profile/Profile";
import ContactsList from "./ContactsList/ContactsList";
import Search from '../Menu/Search/Search'

import searchIcon from '../../../media/icons/search.svg'
import contactsIcon from '../../../media/icons/contacts.svg'
import profileIcon from '../../../media/icons/user.svg'
import logoutIcon from '../../../media/icons/logout.svg'

const Menu = (props) => {
    const {
        setShowMenu, setIsLoggedIn, setCurrentUser, currentUser,
        profilePictureColors, setMenuMessageSent
    } = props

    const menuRef = useRef(null)
    const menuBgRef = useRef(null)
    const [showProfile, setShowProfile] = useState(false)
    const [showContacts, setShowContacts] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const closeMenu = () => {
        toggleBoolean(setShowMenu)
    }

    const openProfile = () => {
        toggleBoolean(setShowProfile)
        menuRef.current.style.display = 'none'
        menuBgRef.current.style.display = 'none'
    }

    const openContacts = () => {
        toggleBoolean(setShowContacts)
        menuRef.current.style.display = 'none'
        menuBgRef.current.style.display = 'none'
    }

    const openSearch = () => {
        toggleBoolean(setShowSearch)
        menuRef.current.style.display = 'none'
        menuBgRef.current.style.display = 'none'
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        setCurrentUser({})
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeMenu()
        }
    }

    useEffect(() => {
        menuRef.current.focus()
    }, [])

    useEffect(() => {
        if (!showSearch)
            showMenu()
    }, [showSearch])

    useEffect(() => {
        if (!showContacts)
            showMenu()
    }, [showContacts])

    useEffect(() => {
        if (!showProfile)
            showMenu()
    }, [showProfile])

    const showMenu = () => {
        menuRef.current.style.display = 'block'
        menuBgRef.current.style.display = 'block'
        menuRef.current.focus()
    }


    return (
        <div className={style.menuWrap}>

            <div className={style.menu}
                 tabIndex='0' onKeyDown={closeOnEscape}
                 ref={menuRef}>

                <div className={style.menuElement}
                     onClick={openProfile}>
                    Profile
                    <img src={profileIcon}
                         className={style.icon}
                         alt="Search"/>
                </div>

                <div className={style.menuElement}
                     onClick={openSearch}>
                    Search users
                    <img src={searchIcon}
                         className={style.icon}
                         alt="Search"/>
                </div>

                <div className={style.menuElement}
                     onClick={openContacts}>
                    Contacts
                    <img src={contactsIcon}
                         className={style.icon}
                         alt="Search"/>
                </div>


                <div className={style.menuElement}
                     onClick={logout}>
                    Logout
                    <img src={logoutIcon}
                         className={style.icon}
                         alt="Search"/>
                </div>

            </div>
            {/*  messageMenu  */}

            {showSearch &&
            <Search setShowSearch={setShowSearch}
                    profilePictureColors={profilePictureColors}
                    setMenuMessageSent={setMenuMessageSent}/>}

            {showProfile &&
            <Profile setShowProfile={setShowProfile}
                     currentUser={currentUser}
                     setCurrentUser={setCurrentUser}
                     color={profilePictureColors[currentUser.id]}/>}

            {showContacts &&
            <ContactsList setShowContacts={setShowContacts}
                          profilePictureColors={profilePictureColors}
                          setMenuMessageSent={setMenuMessageSent}/>}

            <div className={style.background} ref={menuBgRef} onClick={closeMenu}/>
        </div>//menuWrap
    )
}
export default Menu
