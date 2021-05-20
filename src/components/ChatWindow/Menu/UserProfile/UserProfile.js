import React, {useEffect, useRef, useState} from 'react';
import style from './UserProfile.module.css'
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";
import axios from "axios";
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";

import userIcon from '../../../../media/icons/user.svg'
import email from '../../../../media/icons/email.svg'
import username from '../../../../media/icons/username.svg'
import addContactIcon from '../../../../media/icons/add-contact.svg'
import removeContactIcon from '../../../../media/icons/remove-contact.svg'
import deleteChatIcon from '../../../../media/icons/delete-chat.svg'
import {getBearerToken} from "../../../constants/getBearerToken";
import DeleteChat from "./DeleteChat/DeleteChat";

const UserProfile = (props) => {
    const {
        user, setShowUserProfile, color,
        parentRef, addRef, chatId, setChatIsDeleted
    } = props
    const userProfileRef = useRef(null)
    const [showDeleteChat, setShowDelete] = useState(false)
    const [isContact, setIsContact] = useState(false)
    const [isFromChat, setIsFromChat] = useState(false)

    useEffect(() => {
        console.log('UserProfile.js user', user)
        console.log(chatId)
        console.log(color)
        isUserContact()
        userProfileRef.current.focus()
        if (chatId !== undefined) {
            setIsFromChat(true)
        }
    }, [])

    const isUserContact = () => {
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        const JWT_header = getBearerToken()
        if (JWT_header !== null) {
            axios.get(`${SECURED_API_PATH}/contacts/present/${user.id}`,
                {headers: {authorization: JWT_header}, cancelToken: source.token})
                .then(response => {
                    console.log(response)
                    setIsContact(response.data)
                    //после имплементации сообщений добавить state с успехом в случае 201
                })
                .catch(error => {
                    console.log(error)
                })

        }
    }

    const addContact = () => {
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        const JWT_header = getBearerToken()
        if (JWT_header !== null) {
            axios.post(`${SECURED_API_PATH}/contacts/${user.id}`, {},
                {headers: {authorization: JWT_header}, cancelToken: source.token})
                .then(response => {
                    console.log(response)
                    setIsContact(true)
                    //после имплементации сообщений добавить state с успехом в случае 201
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const removeContact = () => {
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        const JWT_header = getBearerToken()
        if (JWT_header !== null) {
            axios.delete(`${SECURED_API_PATH}/contacts/${user.id}`,
                {headers: {authorization: JWT_header}, cancelToken: source.token})
                .then(response => {
                    console.log(response)
                    setIsContact(false)
                    //после имплементации сообщений добавить state с успехом в случае 201
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeUserProfile()
        }
    }

    const closeUserProfile = () => {
        if (parentRef && addRef) {
            parentRef.style.display = 'block'
            addRef.style.display = 'block'
        }
        toggleBoolean(setShowUserProfile)
    }

    const openDeleteChat = () => {
        if (isFromChat) {
            toggleBoolean(setShowDelete)
        }
    }

    return (
        <div className={style.userProfileWrap}>

            <div className={style.profile} tabIndex='0'
                 onKeyDown={closeOnEscape}
                 ref={userProfileRef}>

                <div className={style.closeIcon}
                     onClick={closeUserProfile}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
                         strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <g>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </g>
                    </svg>
                </div>

                <div className={style.profilePictureWrap}>
                    <div className={style.profilePicture} style={color}>
                        <p className={style.initials}>
                            {((user.firstname || '').charAt(0) || '').toUpperCase()}
                            {((user.lastname || '').charAt(0) || '').toUpperCase()}
                        </p>
                    </div>
                </div>
                {/*//profilePictureWrap*/}

                <div className={style.profileData}>

                    <div className={`${style.name} ${style.fieldWrap}`}>
                        <img src={userIcon} alt="Name" className={style.icon}/>
                        <div className={style.field}>
                            <span>{user.firstname} {user.lastname}</span>
                            <span className={style.fieldHint}>Name</span>
                        </div>
                        <div className={style.icon}/>
                    </div>

                    <div className={`${style.username} ${style.fieldWrap}`}>
                        <img src={username} alt="User" className={style.icon}/>
                        <div className={style.field}>
                            <span>{user.username}</span>
                            <span className={style.fieldHint}>Username</span>
                        </div>
                        <div className={style.icon}/>
                    </div>

                    <div className={`${style.email} ${style.fieldWrap}`}>
                        <img src={email} alt="Email" className={style.icon}/>
                        <div className={style.field}>
                            <span>{user.email}</span>
                            <span className={style.fieldHint}>Email</span>
                        </div>
                        <div className={style.icon}/>
                    </div>


                    <div className={style.contactWrap}>
                        {isContact ?    //if user is in contacts, "remove contact" button is displayed
                            <button className={`${style.button} ${style.remove}`}
                                    onClick={removeContact}>
                                <img src={removeContactIcon}
                                     className={style.buttonIcon}
                                     alt="Remove contact"/>Remove contact
                            </button> :
                            //if user is not in contacts, "Add contact" button is displayed
                            <button className={`${style.button} ${style.add}`}
                                    onClick={addContact}>
                                <img src={addContactIcon}
                                     className={style.buttonIcon}
                                     alt="Add contact"/>
                                Add contact
                            </button>
                        }
                        {isFromChat &&
                        <button className={`${style.button}
                         ${style.remove}
                          ${style.deleteChat}`}
                                onClick={openDeleteChat}>
                            <img src={deleteChatIcon}
                                 className={style.buttonIcon}
                                 alt="Delete chat"/>
                            Delete chat
                        </button>
                        }
                    </div>

                </div>
                {/* //profileData*/}

                {showDeleteChat &&
                <DeleteChat user={user}
                            chatId={chatId}
                            setChatIsDeleted={setChatIsDeleted}
                            setShowDelete={setShowDelete}/>}

            </div>
            {/*//profile*/}

            <div className={style.background} onClick={closeUserProfile}/>
        </div>
    )
}

export default UserProfile