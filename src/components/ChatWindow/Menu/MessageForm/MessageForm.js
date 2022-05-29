import React, {useRef, useState} from 'react';
import style from './MessageForm.module.css'
import {toggleBoolean} from "../../../../constants/ChangeDisplayStyle";
import {getBearerToken} from "../../../../constants/getBearerToken";
import axios from "axios";
import {SECURED_API_PATH} from "../../../../constants/API_PATH_DEFAULT";

const MessageForm = (props) => {
    const {
        setShowMessageForm, parentRef,
        user, setMenuMessageSent
    } = props

    const messageRef = useRef(null)

    const [newMessage, setNewMessage] = useState('')

    const messageInput = event => {
        setNewMessage(() => event.target.value)
    }

    const sendMessage = () => {
        if (newMessage !== '') {

            const JWT_header = getBearerToken('sendMessage from contactsList')
            if (JWT_header !== null) {
                axios.post(
                    `${SECURED_API_PATH}/messages/`,
                    {text: newMessage, recipientId: user.id},
                    {headers: {authorization: JWT_header}}
                ).then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        setMenuMessageSent(prevMsg => ({
                            ...prevMsg,
                            id: response.data.id,
                            time: Date.now(),
                            recipientId: user.id,
                            chatId: response.data.chatId
                        }))
                    }
                    closeMessage()
                }).catch(error => {
                    console.log(error)
                    closeMessage()
                })
            }

        } else {

        }
    }

    const closeMessage = () => {
        toggleBoolean(setShowMessageForm)
        parentRef.style.display = 'block'
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeMessage()
        }
    }

    return (
        <div className={style.sendMessage}
             ref={messageRef} tabIndex='0'
             onKeyDown={closeOnEscape}>
            <div className={style.title}>
                Send message to <span>{user.firstname} {user.lastname}</span>
            </div>
            <div className={style.areaWrap}>
                <textarea className={style.area}
                          rows="6"
                          onChange={messageInput}
                          value={newMessage}
                          autoFocus/>
            </div>
            <div className={style.confirmation}>
                <div className={style.confirmBtn}
                     onClick={closeMessage}>
                    Cancel
                </div>
                <div className={style.confirmBtn}
                     onClick={sendMessage}>
                    Send
                </div>
            </div>
        </div>

    )
}
export default MessageForm
