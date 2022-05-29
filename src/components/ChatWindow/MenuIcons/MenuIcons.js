import React, {useState} from 'react';
import style from './MenuIcons.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import ContactsList from "../Menu/ContactsList/ContactsList";

import searchIcon from '../../../media/icons/search.svg'
import menuIcon from '../../../media/icons/menu.svg'
import contactsIcon from '../../../media/icons/contacts.svg'
import Search from "../Menu/Search/Search";
import Menu from "../Menu/Menu";

const MenuIcons = (props) => {
    const {profilePictureColors, setMenuMessageSent, currentUser,
        setIsLoggedIn, setCurrentUser} = props

    const [showMenu, setShowMenu] = useState(false)
    const [showContacts, setShowContacts] = useState(false)
    const [showSearch, setShowSearch] = useState(false)


    return (
        <div className={style.icons}>
            <div className={style.iconWrap}>
                <img src={menuIcon}
                     className={style.icon}
                     onClick={() => toggleBoolean(setShowMenu)}
                     alt="Menu"/>
                <span className={style.iconName}>Menu</span>
            </div>

            <div className={`${style.iconWrap} ${style.searchIcon}`}>
                <img src={searchIcon}
                     className={style.icon}
                     onClick={() => toggleBoolean(setShowSearch)}
                     alt="Search"/>
                <span className={style.iconName}>Search</span>
            </div>

            <div className={`${style.iconWrap} ${style.contactsIcon}`}>
                <img src={contactsIcon}
                     className={style.icon}
                     onClick={() => toggleBoolean(setShowContacts)}
                     alt="Contacts"/>
                <span className={style.iconName}>Contacts</span>
            </div>
            {showMenu &&
            <Menu setShowMenu={setShowMenu}
                  setIsLoggedIn={setIsLoggedIn}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  profilePictureColors={profilePictureColors}
                  setMenuMessageSent={setMenuMessageSent}/>}

            {showSearch &&
            <Search setShowSearch={setShowSearch}
                    profilePictureColors={profilePictureColors}
                    setMenuMessageSent={setMenuMessageSent}/>}

            {showContacts &&
            <ContactsList profilePictureColors={profilePictureColors}
                          setShowContacts={setShowContacts}
                          setMenuMessageSent={setMenuMessageSent}/>}


        </div>
    )
}

export default MenuIcons;
