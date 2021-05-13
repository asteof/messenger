import React, {useEffect, useRef, useState} from 'react';
import style from './chat.module.css'
import * as SockJS from 'sockjs-client'
import * as Stomp from '@stomp/stompjs'
import {API_PATH} from "../../../constants/API_PATH_DEFAULT";
// import axios from "axios";
import getFormattedTime from "../../../constants/getFormattedTime";
// import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import RandomColor from "../../../constants/RandomColor";
import getMessagesFromChat from '../../../constants/getMessagesFromChat'
import {getToken} from "../../../constants/getToken";

const Chat = (props) => {
    const [messageTime, setMessageTime] = useState(null)
    let chatClass = style.chat;     //ordinary chat style
    const chatClassActive = `${style.chat} ${style.active}`;    //chat style when selected

    const {
        chatId,
        secondUser, setSecondChatUser,
        selectedChat, setSelectedChat,
        setIsLoggedIn, setMessages, lastMessage,
        profilePictureColors, setProfilePictureColors
    } = props

    const selectChat = async () => {
        const JWT_header = getToken()
        if (JWT_header !== null) {
            try {
                const messages = await getMessagesFromChat(JWT_header, chatId)
                if (messages !== null) {
                    setMessages(messages)
                } else {
                    setIsLoggedIn(false)
                    localStorage.removeItem('token')
                }
                console.log(messages)
            } catch (e) {
                console.log(e)
            }

        } else {
            setIsLoggedIn(false)
            localStorage.removeItem('token')
        }


        // let socket = new WebSocket()
        // socket = new SockJS(`${API_PATH}/ws`)
        // let stompClient = Stomp.Stomp.over(socket)
        //
        // stompClient.connect({}, function (frame) {
        //     stompClient.setConnected(true);
        // });
        //
        // stompClient.subscribe('/topic/messages/user/1', function (msg) {
        //     console.log(msg);
        // });
        //
        // stompClient.send("/app/chat", {}, JSON.stringify({'text' : "hello kirill", 'senderId' : 1, 'recipientId': 2}));
        setSecondChatUser(secondUser)
        // console.log(secondUser)
        setSelectedChat(chatId)
    }

    useEffect(() => {
        setProfilePictureColors(prevColors => ({
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
                <div className={style.lastMessageWrap}>
                        <span className={style.lastMessage}>
                            {lastMessage.text || ''}
                        </span>
                    <span className={style.messageTime}>{messageTime || ''}</span>
                </div>
            </div>

        </div>
    )
}

export default Chat