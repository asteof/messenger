import React, {useEffect, useRef, useState} from 'react';
import style from './chat.module.css'
// import * as SockJS from 'sockjs-client'
// import * as Stomp from '@stomp/stompjs'
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../../../Authorization/localStorage";
import axios from "axios";
import getFormattedTime from "../../../constants/getFormattedTime";
// import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import RandomColor from "../../../constants/RandomColor";

const Chat = (props) => {
    const [messageTime, setMessageTime] = useState(null)
    let chatClass = style.chat;//ordinary chat style
    const chatClassActive = `${style.chat} ${style.active}`;//chat style when selected

    const {
        chatId,
        secondUser, setSecondChatUser,
        selectedChat, setSelectedChat,
        setIsLoggedIn, setMessages, lastMessage,
        profilePictureColors, setProfilePictureColors
    } = props

    const selectChat = () => {

        const JWT = getLocalWithExpiry('token')
        let JWT_header = ''
        if (JWT !== null && JWT !== '') {
            JWT_header = `Bearer ${JWT}`
        } else if (JWT === null || JWT === '') {
            if (JWT === '') {
                console.log(JWT)
                localStorage.removeItem('token')
            }
            setIsLoggedIn(false)
        }
        if (JWT_header !== '') {
            axios.get(`${SECURED_API_PATH}/messages/chat/${chatId}`, {
                headers: {authorization: JWT_header},
                params: {
                    size: 80,
                    page: 0
                }
            })
                .then(response => {
                    console.log('messages', response.data)
                    setMessages(response.data)
                })
                .catch(error => {
                    console.log(error, error.response)
                })
        }

        // let socket = new WebSocket()
        // let socket = new SockJS(`${API_PATH}/ws`)
        // let stompClient = Stomp.Stomp.over(socket)
        //
        // // stompClient.connect({}, function (frame) {
        // //     stompClient.setConnected(true);
        // // });
        //
        // stompClient.subscribe('/topic/messages/user/1', function (msg) {
        //     console.log(msg);
        // });
        //
        // stompClient.send("/app/chat", {}, JSON.stringify({'text' : "hello kirill", 'senderId' : 1, 'recipientId': 2}));
        setSecondChatUser(secondUser)
        setSelectedChat(chatId)
    }

    useEffect(() => {
        setProfilePictureColors(prevColors=>({
            ...prevColors,
            [chatId]: RandomColor()
        }))
    }, [])

    useEffect(() => {
        const [messageSentAt] = getFormattedTime(lastMessage.sentAt)
        // console.log(messageSentAt)
        setMessageTime(messageSentAt)
    }, [lastMessage])

    //добавить в чатДТО поле с датой последнего сообщения, чтобы сортировать чаты по дате

    return (
        //if the selectedDialog matches with dialog id it displays active CSS class
        //otherwise it displays usual dialog class
        <div className={selectedChat === chatId ? chatClassActive : chatClass}
             onClick={selectChat}>
                <div className={style.profilePicture}
                     style={profilePictureColors[chatId]}>
                    {secondUser &&
                    <span className={style.initials}>
                        {((secondUser.firstname || '').charAt(0) || '').toUpperCase()}
                        {((secondUser.lastname || '').charAt(0) || '').toUpperCase()}
                    </span>}
                </div>

                <div className={style.chatInfo}>
                    <div className={style.chatUsername}>{secondUser.username}</div>
                    <div className={style.lastMessage}>
                        {lastMessage.text || ''}
                        <span className={style.messageTime}>{messageTime || ''}</span>
                    </div>
                </div>

        </div>
    )
}

export default Chat