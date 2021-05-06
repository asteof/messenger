import React, {useEffect, useState} from 'react';
import style from './ChatUserProfile.module.css'
// import {API_PATH} from "../../constants/API_PATH_DEFAULT";
// import {getLocalWithExpiry} from "../../Authorization/localStorage";
import {toggleBoolean} from "../../../../constants/ChangeDisplayStyle";
import {getLocalWithExpiry} from "../../../../Authorization/localStorage";

import user from '../../../../../media/icons/user.svg'
// import phone from '../../../../../media/icons/phone.svg'
import email from '../../../../../media/icons/email.svg'
import username from '../../../../../media/icons/username.svg'
import addContactIcon from '../../../../../media/icons/add-contact.svg'
import removeContactIcon from '../../../../../media/icons/remove-contact.svg'
import close from '../../../../../media/icons/close.svg'
import axios from "axios";
import {SECURED_API_PATH} from "../../../../constants/API_PATH_DEFAULT";

const ChatUserProfile = (props) => {
    const {secondUser, setShowUserProfile, color} = props
    const [isContact, setIsContact] = useState(false)

    useEffect(() => {
        console.log('ChatUserProfile.js secondUser', secondUser)
    }, [])



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
                .then(response=>{
                    console.log(response)
                    //после имплементации сообщений добавить state с успехом в случае 201
                })
                .catch(error =>{
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
                .then(response=>{
                    console.log(response)
                    //после имплементации сообщений добавить state с успехом в случае 201
                })
                .catch(error =>{
                    console.log(error)
                })
        }

    }

    return (
        <div className={style.userProfileWrap}>

            <div className={style.profile}>
                <img src={close} alt="Close" className={style.closeIcon}
                     onClick={() => toggleBoolean(setShowUserProfile)}/>

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
                            {secondUser.firstname} {secondUser.lastname}
                            <span className={style.fieldHint}>Name</span>
                        </div>
                        <div className={style.icon}/>
                    </div>

                    <div className={`${style.username} ${style.fieldWrap}`}>
                        <img src={username} alt="User" className={style.icon}/>
                        <div className={style.field}>
                            {secondUser.username}
                            <span className={style.fieldHint}>Username</span>
                        </div>
                        <div className={style.icon}/>
                    </div>

                    <div className={`${style.email} ${style.fieldWrap}`}>
                        <img src={email} alt="Email" className={style.icon}/>
                        <div className={style.field}>
                            {secondUser.email}
                            <span className={style.fieldHint}>Email</span>
                        </div>
                        <div className={style.icon}/>
                    </div>


                    <div className={style.contactWrap}>
                        {/*<span className='link'>Change password add contact</span>*/}
                        {isContact ?    //if user is in contacts, "remove contact" button is displayed
                            <button className={`${style.contact} ${style.remove}`}
                                    onClick={removeContact}>
                                <img src={removeContactIcon}
                                     className={style.contactIcon}
                                     alt="Remove contact"/>Remove contact
                            </button> :
                            //if user is not in contacts, "Add contact" button is displayed
                            <button className={`${style.contact} ${style.add}`}
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