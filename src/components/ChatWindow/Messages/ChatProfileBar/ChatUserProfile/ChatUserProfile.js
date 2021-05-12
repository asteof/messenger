import React, {useEffect, useRef, useState} from 'react';
import style from './ChatUserProfile.module.css'
import {SECURED_API_PATH} from "../../../../constants/API_PATH_DEFAULT";
import axios from "axios";
// import {getLocalWithExpiry} from "../../Authorization/localStorage";
import {toggleBoolean} from "../../../../constants/ChangeDisplayStyle";
import {getLocalWithExpiry} from "../../../../constants/localStorage";

import user from '../../../../../media/icons/user.svg'
import email from '../../../../../media/icons/email.svg'
import username from '../../../../../media/icons/username.svg'
import addContactIcon from '../../../../../media/icons/add-contact.svg'
import removeContactIcon from '../../../../../media/icons/remove-contact.svg'

const ChatUserProfile = (props) => {
    const {secondUser, setShowUserProfile, color} = props
    const userProfileRef = useRef(null)
    const [isContact, setIsContact] = useState(false)

    useEffect(() => {
        console.log('ChatUserProfile.js secondUser', secondUser)
        isUserContact()
        userProfileRef.current.focus()
    }, [])

    const isUserContact = () => {
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        const JWT = getLocalWithExpiry('token')
        let JWT_header
        if (JWT !== null && JWT !== '') {
            JWT_header = `Bearer ${JWT}`
            console.log(`ChatUserProfile.js ${JWT_header}`)
        }
        if (JWT_header !== '') {
            axios.get(`${SECURED_API_PATH}/contacts/present/${secondUser.id}`,
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

        const JWT = getLocalWithExpiry('token')
        let JWT_header
        if (JWT !== null && JWT !== '') {
            JWT_header = `Bearer ${JWT}`
            console.log(`ChatUserProfile.js ${JWT_header}`)
        }
        if (JWT_header !== '') {
            axios.post(`${SECURED_API_PATH}/contacts/${secondUser.id}`, {},
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

        const JWT = getLocalWithExpiry('token')
        let JWT_header = ''
        if (JWT !== null && JWT !== '') {
            JWT_header = `Bearer ${JWT}`
            console.log(`ChatUserProfile.js ${JWT_header}`)
        }
        if (JWT_header !== '') {
            axios.delete(`${SECURED_API_PATH}/contacts/${secondUser.id}`,
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
        toggleBoolean(setShowUserProfile)
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
                        {/*{secondUser !== {} &&*/}
                        <p className={style.initials}>
                            {((secondUser.firstname || '').charAt(0) || '').toUpperCase()}
                            {((secondUser.lastname || '').charAt(0) || '').toUpperCase()}
                        </p>
                        {/*}*/}
                    </div>
                </div>
                {/*//profilePictureWrap*/}

                <div className={style.profileData}>

                    <div className={`${style.name} ${style.fieldWrap}`}>
                        <img src={user} alt="Name" className={style.icon}/>
                        <div className={style.field}>
                            <span>{secondUser.firstname} {secondUser.lastname}</span>
                            <span className={style.fieldHint}>Name</span>
                        </div>
                        <div className={style.icon}/>
                    </div>

                    <div className={`${style.username} ${style.fieldWrap}`}>
                        <img src={username} alt="User" className={style.icon}/>
                        <div className={style.field}>
                            <span>{secondUser.username}</span>
                            <span className={style.fieldHint}>Username</span>
                        </div>
                        <div className={style.icon}/>
                    </div>

                    <div className={`${style.email} ${style.fieldWrap}`}>
                        <img src={email} alt="Email" className={style.icon}/>
                        <div className={style.field}>
                            <span>{secondUser.email}</span>
                            <span className={style.fieldHint}>Email</span>
                        </div>
                        <div className={style.icon}/>
                    </div>


                    <div className={style.contactWrap}>
                        {isContact ?    //if user is in contacts, "remove contact" button is displayed
                            <button className={`${style.contactBtn} ${style.remove}`}
                                    onClick={removeContact}>
                                <img src={removeContactIcon}
                                     className={style.contactIcon}
                                     alt="Remove contact"/>Remove contact
                            </button> :
                            //if user is not in contacts, "Add contact" button is displayed
                            <button className={`${style.contactBtn} ${style.add}`}
                                    onClick={addContact}>
                                <img src={addContactIcon}
                                     className={style.contactIcon}
                                     alt="Add contact"/>
                                Add contact
                            </button>
                        }
                    </div>

                </div>
                {/* //profileData*/}

            </div>
            {/*//profile*/}

            <div className={style.background} onClick={() => toggleBoolean(setShowUserProfile)}/>
        </div>
    )
}

export default ChatUserProfile