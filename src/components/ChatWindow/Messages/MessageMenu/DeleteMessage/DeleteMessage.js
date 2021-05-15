import React, {useEffect, useRef, useState} from 'react';
import style from './DeleteMessage.module.css'
import {setFalseBoolean, setTrueBoolean, toggleBoolean} from "../../../../constants/ChangeDisplayStyle";
import {getBearerToken} from "../../../../constants/getBearerToken";
import axios from "axios";
import {SECURED_API_PATH} from "../../../../constants/API_PATH_DEFAULT";

const DeleteMessage = (props) => {
    const {
        messageMenuData, setShowMessageMenu,
        secondChatUser, setMessageChanged
    } = props

    const {
        fromMe, messageId, messageText,
        recipientName, senderName, sentAt
    } = messageMenuData

    const deleteMessageRef = useRef(null)
    const fullname = `${secondChatUser.firstname} ${secondChatUser.lastname}`

    const deleteMessage = () => {
        const JWT_header = getBearerToken('contextMenu')
        if (JWT_header !== '') {
            console.log('hui')
            axios.delete(
                `${SECURED_API_PATH}/messages/${messageId}`,
                {headers: {authorization: JWT_header}}
            ).then(response => {
                console.log(response)
                if (response.status === 202){
                    setMessageChanged(prevMsg =>({
                        ...prevMsg,
                        id: messageId,
                        time: Date.now(),
                        deleted: true
                    }))
                }

            }).catch(error => {
                console.log(error)
            })
        }
        closeMessageMenu()
    }

    const closeMessageMenu = ()=>{
        toggleBoolean(setShowMessageMenu)
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeMessageMenu()
        }
    }

    useEffect(()=>{
        deleteMessageRef.current.focus()
    }, [])

    return (
        <div className={style.deleteMessage}
             ref={deleteMessageRef}
             onKeyDown={closeOnEscape} tabIndex='0'>
            <div className={style.warning}>
                Delete message?
                Message will be removed both
                for you and {fullname}
                <p>
                    This action cannot be undone.
                </p>
            </div>
            <div className={style.confirmation}>
                <div className={style.confirmBtn}
                     onClick={closeMessageMenu}>Cancel
                </div>
                <div className={`${style.confirmBtn} ${style.delete}`}
                     onClick={deleteMessage}>Delete
                </div>
            </div>
        </div>
    )
}
export default DeleteMessage