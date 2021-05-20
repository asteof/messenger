import React from 'react';
import style from './FoundUser.module.css'

import sendMessage from '../../../../../media/icons/send-message.svg'
import addContactIcon from '../../../../../media/icons/add-contact.svg'
import removeContact from '../../../../../media/icons/remove-contact.svg'
import {toggleBoolean} from "../../../../constants/ChangeDisplayStyle";
import {getBearerToken} from "../../../../constants/getBearerToken";
import axios from "axios";
import {SECURED_API_PATH} from "../../../../constants/API_PATH_DEFAULT";


const FoundUser = (props) => {
    const {
        userColor, setShowMessage, setShowUserProfile,
        setShowRemove, user, addRef,
        isContact, setIsContact, parentRef
    } = props

    const {id, username, lastname, firstname} = user

    const openMessageForm = () => {
        parentRef.style.display = 'none'
        toggleBoolean(setShowMessage)
    }

    const openRemoveContact = () => {
        toggleBoolean(setShowRemove)
    }

    const openProfile=()=>{
        addRef.style.display = 'none'
        parentRef.style.display = 'none'
        toggleBoolean(setShowUserProfile)
    }

    const addContact = () => {
        const JWT_header = getBearerToken()
        if (JWT_header !== null) {
            axios.post(`${SECURED_API_PATH}/contacts/${id}`, {},
                {headers: {authorization: JWT_header}})
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

    return (
        <div className={style.foundWrap}>
            <div className={style.profilePicture}
                 style={userColor} onClick={openProfile}>
                            <span className={style.initials}>
                                {((firstname || '').charAt(0) || '').toUpperCase()}
                                {((lastname || '').charAt(0) || '').toUpperCase()}
                            </span>
            </div>
            <div className={style.contactField}>
                <div className={style.username}>{username}</div>
                <div className={style.fullname}>{firstname} {lastname}</div>
            </div>
            <div className={style.buttons}>

                <button className={style.button} onClick={openMessageForm}>
                    <img src={sendMessage} className={style.icon} alt="Send message"/>
                </button>
                <div className={style.hint}>Send message</div>

                {!isContact ?
                    <div>
                        <button className={style.button} onClick={addContact}>
                            <img src={addContactIcon} className={style.icon} alt="Add contact"/>
                        </button>
                        <div className={style.hint}>Add contact</div>
                    </div> :

                    <div>
                        <button className={style.button} onClick={openRemoveContact}>
                            <img src={removeContact} className={style.icon} alt="Remove contact"/>
                        </button>
                        <div className={style.hint}>Remove contact</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default FoundUser