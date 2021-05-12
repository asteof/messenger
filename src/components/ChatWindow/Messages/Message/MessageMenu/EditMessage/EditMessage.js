import React, {useEffect, useRef, useState} from 'react';
import style from './EditMessage.module.css'
import {setFalseBoolean, setTrueBoolean, toggleBoolean} from "../../../../../constants/ChangeDisplayStyle";
import {getToken} from "../../../../../constants/getToken";
import axios from "axios";
import {SECURED_API_PATH} from "../../../../../constants/API_PATH_DEFAULT";

const EditMessage = (props) => {
    const {
        messageMenuData, setShowMessageMenu, setMessageChanged
    } = props

    const {messageId, messageText} = messageMenuData

    const editMessageRef = useRef(null)

    const [newMessage, setNewMessage] = useState(messageText)

    const messageInput = event => {
        setNewMessage(() => event.target.value)
    }

    const editMessage = () => {
        const JWT_header = getToken('editMessage')
        if (JWT_header !== '') {
            console.log('hui')
            axios.put(
                `${SECURED_API_PATH}/messages/${messageId}`,
                {text: newMessage},
                {headers: {authorization: JWT_header}}
            ).then(response => {
                console.log(response)
                if (response.status === 202) {
                    setMessageChanged(prevMsg => ({
                        ...prevMsg,
                        id: messageId,
                        time: Date.now(),
                        edited: true
                    }))
                }

            }).catch(error => {
                console.log(error)
            })
        }
        closeMessageMenu()
    }

    const closeMessageMenu = () => {
        toggleBoolean(setShowMessageMenu)
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeMessageMenu()
        }
    }

    return (
        <div className={style.editMessage}
             ref={editMessageRef} tabIndex='0'
             onKeyDown={closeOnEscape}>
            <div className={style.title}>
                Edit message
            </div>
            <div className={style.areaWrap}>
                <textarea className={style.area}
                          rows="5"
                          onChange={messageInput}
                          value={newMessage}
                          autoFocus/>
            </div>
            <div className={style.confirmation}>
                <div className={style.confirmBtn}
                     onClick={closeMessageMenu}>Cancel
                </div>
                <div className={style.confirmBtn}
                     onClick={editMessage}>Save
                </div>
            </div>
        </div>
    )
}
export default EditMessage