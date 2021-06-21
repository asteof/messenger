import React, {useEffect, useRef, useState} from 'react';
import style from './Search.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import RandomColor from "../../../constants/RandomColor";
import {getBearerToken} from "../../../constants/getBearerToken";
import axios from "axios";
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";
import MessageForm from "../MessageForm/MessageForm";
import RemoveContact from "../ContactsList/RemoveContact/RemoveContact";

import searchIcon from '../../../../media/icons/search.svg'
import FoundUser from "./FoundUser/FoundUser";
import UserProfile from "../UserProfile/UserProfile";

const Search = (props) => {
    const {setShowSearch, profilePictureColors, setMenuMessageSent} = props

    const [username, setUsername] = useState('')
    const [foundUser, setFoundUser] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [userColor, setUserColor] = useState(null)
    const [isContact, setIsContact] = useState(false)
    const [showRemove, setShowRemove] = useState(false)
    const [showMessageForm, setShowMessageForm] = useState(false)
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [contactIsRemoved, setContactIsRemoved] = useState(0)
    const searchRef = useRef(null)
    const searchBgRef = useRef(null)
    const searchFieldRef = useRef(null)
    const [shortUser, setShortUser] = useState({
        id: 0,
    })
    const classes = {
        input: style.searchField,
        hint: style.hint,
        noMatch: style.noMatch,
        warning: style.warning
    }
    const initialClass = {input: classes.input, hint: classes.hint}
    const [styles, setStyles] = useState(initialClass)


    const closeSearch = () => {
        toggleBoolean(setShowSearch)
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeSearch()
        }
    }

    const findUser = event => {
        event.preventDefault()

        if (username.length >= 4 && /^[a-zA-Z0-9_]*$/.test(username)) {
            setStyles(initialClass)
            const JWT_header = getBearerToken("contacts")
            if (JWT_header !== null) {
                searchUser(JWT_header)
            }

        } else {
            setStyles(prevStyles => ({
                ...prevStyles,
                input: `${classes.input} ${classes.noMatch}`,
                hint: `${classes.hint} ${classes.warning}`
            }))
            setNotFound(false)
        }
        searchFieldRef.current.focus()
    }

    //focuses input on entry
    useEffect(() => {
        searchFieldRef.current.focus()
    }, [])

    //detects if contact is removed
    useEffect(() => {
        if (contactIsRemoved !== 0) {
            setIsContact(false)
        }
    }, [contactIsRemoved])

    //sets profile color if no color detected
    useEffect(() => {
        if (foundUser !== null) {
            let color = profilePictureColors[foundUser.id]
            if (color === undefined) {
                color = RandomColor()
            }
            setUserColor(color)
            console.log(foundUser)
        }
    }, [foundUser])

    useEffect(() => {
        if (foundUser !== null && isContact) {

            setShortUser(prevCont => ({
                ...prevCont,
                id: foundUser.id,
                firstname: foundUser.firstname,
                lastname: foundUser.lastname
            }))
        }
    }, [foundUser, isContact])

    const searchUser = (JWT_header) => {
        axios.get(
            `${SECURED_API_PATH}/user/search/username/${username}`,
            {headers: {authorization: JWT_header}})
            .then(response => {
                if (response.status === 200 && response.data !== '') {
                    setFoundUser(response.data)
                    setNotFound(false)
                    setShortUser(prevUser => ({
                        ...prevUser,
                        id: response.data.id,
                        firstname: response.data.firstname,
                        lastname: response.data.lastname
                    }))
                    isUserContact(JWT_header, response.data.id)
                } else if (response.status === 200 && response.data === '') {
                    setFoundUser(null)
                    setNotFound(true)
                }
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                setFoundUser(null)
                setNotFound(true)
            })
    }

    const isUserContact = (JWT_header, id) => {
        axios.get(`${SECURED_API_PATH}/contacts/present/${id}`,
            {headers: {authorization: JWT_header}})
            .then(response => {
                console.log(response)
                setIsContact(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className={style.searchWrap}>

            <div className={style.search}
                 ref={searchRef} tabIndex='0'
                 onKeyDown={closeOnEscape}>

                <div className={style.closeIcon}
                     onClick={closeSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
                         strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <g>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </g>
                    </svg>
                </div>

                <div className={style.heading}>
                    <h2>Search</h2>
                </div>

                <div className={style.searchContent}>

                    <div className={style.formWrap}>
                        <form spellCheck="false"
                              autoComplete="off"
                              className={style.searchForm}
                              onSubmit={findUser}>
                            <div className={style.fieldLabelWrap}>
                                <label htmlFor="username">Find user by username*</label>
                                <div>
                                    <input value={username}
                                           id='username'
                                           type="text"
                                           ref={searchFieldRef}
                                           className={styles.input}
                                           placeholder='username'
                                           onChange={e => setUsername(e.target.value)}
                                    />
                                    <button className={style.findBtn}>
                                        <img src={searchIcon}
                                             className={style.icon}
                                             alt="Find user"/>
                                    </button>
                                </div>
                                <div className={styles.hint}>
                                    At least 4 symbols, only letters, numbers and underscore
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className={style.searchResultWrap}>
                        {foundUser !== null &&
                        <FoundUser setShowRemove={setShowRemove}
                                   setShowMessage={setShowMessageForm}
                                   setShowUserProfile={setShowUserProfile}
                                   isContact={isContact}
                                   setIsContact={setIsContact}
                                   parentRef={searchRef.current}
                                   addRef={searchBgRef.current}
                                   user={foundUser}
                                   userColor={userColor}/>
                        }
                        {notFound &&
                        <div className={style.notFound}>
                            Didn't find anything :(
                            <br/>Try again?
                        </div>
                        }

                    </div>
                </div>
                {/*// search content*/}

                {showRemove &&
                <RemoveContact contactToRemove={shortUser}
                               username={foundUser.username}
                               setShowRemove={setShowRemove}
                               setContactIsRemoved={setContactIsRemoved}/>}


                <div className={style.bottomHint}>
                    *You have to know exact username to find a user
                </div>
            </div>
            {/*// search*/}

            {showMessageForm &&
            <MessageForm setShowMessageForm={setShowMessageForm}
                         parentRef={searchRef.current}
                         setMenuMessageSent={setMenuMessageSent}
                         user={shortUser}/>}

            {showUserProfile &&
            <UserProfile user={foundUser}
                         setShowUserProfile={setShowUserProfile}
                         parentRef={searchRef.current}
                         addRef={searchBgRef.current}
                         color={userColor}/>
            }

            <div className={style.background} ref={searchBgRef} onClick={closeSearch}/>
        </div>
    )
}

export default Search